import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ token }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('login')); // para actualizar estado en App
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-amber-50">
          <Link to="/">CapacitAPP</Link>
        </div>

        {/* Botón hamburguesa en dispositivos pequeños */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-amber-50 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú de navegación para pantallas grandes (siempre visible) */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-amber-50 hover:text-sky-200 font-semibold">
            Home
          </Link>

          {token ? (
            <>
              <Link to="/capacitaciones" className="text-amber-50 hover:text-sky-200 font-semibold">
                Capacitaciones
              </Link>
              <Link to="/perfil" className="text-amber-50 hover:text-sky-200 font-semibold">
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-400 text-amber-50 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-amber-50 hover:text-sky-200 font-semibold">
                Iniciar sesión
              </Link>
              <Link to="/register" className="text-amber-50 hover:text-sky-200 font-semibold">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menú desplegable para dispositivos móviles (visible solo cuando isOpen es true) */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 text-amber-50 p-4 space-y-4">
          <Link to="/" className="block text-lg">Home</Link>
          {token ? (
            <>
              <Link to="/capacitaciones" className="block text-lg">Capacitaciones</Link>
              <Link to="/perfil" className="block text-lg">Perfil</Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-400 text-amber-50 py-2 rounded hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-lg">Iniciar sesión</Link>
              <Link to="/register" className="block text-lg">Crear cuenta</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
