import express from 'express';
import Meeting from '../models/Meeting.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear reunión (solo para capacitadores o admin)
router.post('/', verifyToken, async (req, res) => {
  const { title, url, date } = req.body;
  const { role, id } = req.user;

  if (role !== 'capacitador' && role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado para crear reuniones' });
  }

  try {
    const newMeeting = new Meeting({ title, url, date, createdBy: id });
    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear reunión' });
  }
});

// Obtener reuniones disponibles
router.get('/', verifyToken, async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('createdBy', 'name');
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reuniones' });
  }
});

export default router;
