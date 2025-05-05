import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Capacitaciones from './pages/Capacitaciones';
import Perfil from './pages/Perfil';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/capacitaciones" element={token ? <Capacitaciones /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={token ? <Perfil /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
