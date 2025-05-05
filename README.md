# Plataforma de Capacitaciones Online (PVM)

Este proyecto es un Producto Mínimo Viable (PVM) de una plataforma para gestionar capacitaciones online, desarrollado con tecnologías modernas y pensado para escalar hacia una solución completa en la nube.

## 🚀 Tecnologías utilizadas

### Frontend (React + Vite)
- React
- React Router DOM
- Axios
- HTML y CSS puro

### Backend (Node.js + Express)
- Node.js
- Express.js
- MongoDB (modo local, pronto será desplegado en la nube con MongoDB Atlas)
- Mongoose
- JWT (JsonWebToken)
- Bcrypt.js
- Dotenv
- Cors

---

## 📂 Estructura del proyecto

```
pvm-capacitaciones/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/ (futuros)
│   └── index.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```

---

## ✅ Funcionalidades actuales

- Registro de usuarios con rol (`usuario` por defecto).
- Inicio de sesión con autenticación JWT.
- Middleware que protege rutas en el backend.
- Redirección automática si el usuario no está autenticado.
- Interfaz con Navbar, Home, Capacitaciones, Perfil y botón para cerrar sesión.
- Almacenamiento del token en `localStorage`.

---

## 🔐 Rutas del backend

```
POST   /api/auth/register    → Registro
POST   /api/auth/login       → Inicio de sesión
GET    /api/user/profile     → Ruta protegida (requiere token)
```

---

## 🧑‍💼 Roles de usuario

- `usuario`: Puede iniciar sesión y acceder a las capacitaciones.
- `capacitador`: En futuras versiones, podrá crear y gestionar reuniones.
- `admin`: Tendrá control general del sistema.

---

## 📦 Próximos pasos

- Despliegue de MongoDB Atlas en la nube.
- Integración con plataformas como Zoom o Google Meet.
- Dashboard de administración para capacitadores y admins.
- Estilización avanzada con TailwindCSS o Material UI.
- Protección por rol de rutas frontend y backend.

---

## 🖥️ Desarrollado en entorno local

Todo el desarrollo fue realizado en `localhost`, y se encuentra en fase activa de mejoras y despliegue.

---

## 📎 Autor

Desarrollado por Patricio ⚙️  
Proyecto académico / personal de práctica en tecnologías fullstack.
