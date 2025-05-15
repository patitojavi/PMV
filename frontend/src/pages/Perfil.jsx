import { useEffect, useState } from 'react';
import axios from 'axios';

function Perfil() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch {
        alert('Error al cargar perfil');
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-amber-50">Mi Perfil</h2>
      {user ? (
        <>
          <div className="mb-4">
            <label className="block text-amber-50 font-semibold mb-1">Nombre</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full border border-black rounded px-6 py-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-amber-50 font-semibold mb-1">Correo electrónico</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-black rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label className="block text-amber-50 font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              value="********"
              disabled
              className="w-full border border-black rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <button
            onClick={() => alert('Funcionalidad próximamente')}
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition mb-3"
          >
            Cambiar contraseña
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500 transition"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  );
}

export default Perfil;
