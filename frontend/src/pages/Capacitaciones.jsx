import { useEffect, useState } from 'react';
import axios from 'axios';

function Capacitaciones() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');

  const token = localStorage.getItem('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null; // decodifica el token

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meetings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMeetings(res.data);
      } catch {
        alert('Error al cargar reuniones');
      }
    };
    fetchMeetings();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/meetings`, {
        title, url, date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload();
    } catch {
      alert('Error al crear reunión');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Capacitaciones Disponibles</h2>

      {role === 'capacitador' || role === 'admin' ? (
        <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
          <h3>Crear nueva capacitación</h3>
          <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="url" placeholder="Enlace (Zoom, Meet...)" value={url} onChange={e => setUrl(e.target.value)} required />
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
          <button type="submit">Crear</button>
        </form>
      ) : null}

      <ul>
        {meetings.map((m) => (
          <li key={m._id}>
            <strong>{m.title}</strong> — {new Date(m.date).toLocaleString()} <br />
            <a href={m.url} target="_blank" rel="noreferrer">Unirse a la reunión</a> (creada por: {m.createdBy?.name || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Capacitaciones;
