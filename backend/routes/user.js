import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta accesible solo si el usuario tiene token válido
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Perfil accedido correctamente',
    user: req.user // contiene id y role
  });
});

export default router;
