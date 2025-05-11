import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('login'));
      navigate('/');
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h2>Bienvenido a CapacitAPP</h2>
        <h2>Iniciar sesión</h2>
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
