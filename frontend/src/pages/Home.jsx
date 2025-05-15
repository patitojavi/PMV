import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-12">
      <h1 className="text-5xl font-extrabold mb-6 text-blue-700 text-center">Bienvenido a <span className="text-indigo-600">CapacitAPP</span></h1>

      {token ? (
        <p className="text-shadow-blue-950 text-xl font-semibold text-center mb-8">¡Estás logueado! Explora las capacitaciones disponibles.</p>
      ) : (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4">Inicia sesión para continuar</h2>
          <p className="text-gray-700 mb-6">
            Accede a capacitaciones online, crea o únete a videollamadas fácilmente desde cualquier lugar.
          </p>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition">
              Crear Cuenta
            </Link>
          </div>
        </div>
      )}

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4 text-center">¿Por qué elegir CapacitAPP?</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-gray-700">
          <li className="bg-white p-6 rounded shadow">
            <strong>Fácil de usar</strong>
            <p className="mt-2">Interfaz simple para usuarios y capacitadores.</p>
          </li>
          <li className="bg-white p-6 rounded shadow">
            <strong>Reuniones en vivo</strong>
            <p className="mt-2">Conéctate en Zoom, Meet u otra plataforma sin complicaciones.</p>
          </li>
          <li className="bg-white p-6 rounded shadow">
            <strong>Seguridad</strong>
            <p className="mt-2">Tu información y sesiones están protegidas con autenticación JWT.</p>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-4 text-center">¿Cómo funciona?</h3>
        <ol className="list-decimal list-inside max-w-xl mx-auto text-gray-700 space-y-3">
          <li>Regístrate y crea tu cuenta de usuario.</li>
          <li>Inicia sesión para acceder a las capacitaciones.</li>
          <li>Si eres capacitador, crea reuniones con un enlace para tus alumnos.</li>
          <li>Únete a reuniones activas para aprender o capacitar en línea.</li>
        </ol>
      </section>
    </div>
  );
}

export default Home;
