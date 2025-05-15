import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token }) {
  const navigate = useNavigate();

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

        <div className="space-x-6 flex items-center">
          <Link
            to="/"
            className="text-amber-50 hover:text-sky-200 font-semibold"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/capacitaciones"
                className="text-amber-50 hover:text-sky-200 font-semibold"
              >
                Capacitaciones
              </Link>
              <Link
                to="/perfil"
                className="text-amber-50 hover:text-sky-200 font-semibold"
              >
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
              <Link
                to="/login"
                className="text-amber-50 hover:text-sky-200 font-semibold"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-amber-50 hover:text-sky-200 font-semibold"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
