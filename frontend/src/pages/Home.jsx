function Home() {
    const token = localStorage.getItem('token');
  
    return (
      <div>
        <h1>Bienvenido a la Plataforma de Capacitaciones</h1>
        {token ? <p>Estás logueado ✅</p> : <h1>Inicia sesión para continuar</h1>}
      </div>
    );
  }
  
  export default Home;
  