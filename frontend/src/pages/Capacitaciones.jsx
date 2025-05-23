import { useEffect, useState } from 'react';
import axios from 'axios';

function Capacitaciones() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [editing, setEditing] = useState(null); // Para gestionar la edición de reuniones

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
      // Actualizamos la lista y limpiamos el formulario sin recargar la página
      setTitle('');
      setUrl('');
      setDate('');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meetings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(res.data);
    } catch {
      alert('Error al crear reunión');
    }
  };

  const handleEdit = (meeting) => {
    setEditing(meeting._id);
    setTitle(meeting.title);
    setUrl(meeting.url);
    setDate(meeting.date);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/meetings/${editing}`, {
        title, url, date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditing(null); // Dejar de editar
      setTitle('');
      setUrl('');
      setDate('');

      // Actualizamos la lista de reuniones
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meetings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(res.data);
    } catch {
      alert('Error al actualizar reunión');
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar esta reunión?')) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/meetings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizamos la lista de reuniones
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meetings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(res.data);
    } catch {
      alert('Error al eliminar reunión');
    }
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Capacitaciones Disponibles</h2>

      {(role === 'capacitador' || role === 'admin') && (
        <form onSubmit={editing ? handleUpdate : handleCreate} className="mb-8 space-y-4 bg-gray-200 p-6 rounded shadow-md">
          <h3 className="text-xl font-medium mb-4">{editing ? 'Actualizar Capacitación' : 'Crear nueva capacitación'}</h3>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            placeholder="Enlace (Zoom, Meet...)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editing ? 'Actualizar' : 'Crear'}
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {meetings.map((m) => (
          <li key={m._id} className="bg-gray-200 p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <strong className="text-lg">{m.title}</strong>
              <p className="text-gray-600">{new Date(m.date).toLocaleString()}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium mr-4"
              >
                Unirse a la reunión
              </a>
              <span className="text-gray-500 text-sm">creada por: {m.createdBy?.name || 'N/A'}</span>
            </div>
            {(role === 'capacitador' || role === 'admin') && (
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 transition mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Capacitaciones;
