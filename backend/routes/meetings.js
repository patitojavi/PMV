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

// Editar reunión
router.put('/:id', verifyToken, async (req, res) => {
  const { title, url, date } = req.body;
  const { role, id } = req.user;

  if (role !== 'capacitador' && role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado para editar reuniones' });
  }

  try {
    // Verifica si la reunión existe
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Reunión no encontrada' });
    }

    // Verifica si el usuario que intenta editar es el que creó la reunión o un administrador
    if (meeting.createdBy.toString() !== id && role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para editar esta reunión' });
    }

    // Actualiza la reunión
    meeting.title = title || meeting.title;
    meeting.url = url || meeting.url;
    meeting.date = date || meeting.date;

    await meeting.save();
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ message: 'Error al editar reunión' });
  }
});



// Eliminar reunión
router.delete('/:id', verifyToken, async (req, res) => {
  const { role, id } = req.user;

  if (role !== 'capacitador' && role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado para eliminar reuniones' });
  }

  try {
    // Verifica si la reunión existe
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Reunión no encontrada' });
    }

    // Verifica si el usuario que intenta eliminar es el que creó la reunión o un administrador
    if (meeting.createdBy.toString() !== id && role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para eliminar esta reunión' });
    }

    // Elimina la reunión usando findByIdAndDelete
    await Meeting.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reunión eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar reunión:', err);
    res.status(500).json({ message: 'Error al eliminar reunión' });
  }
});



export default router;
