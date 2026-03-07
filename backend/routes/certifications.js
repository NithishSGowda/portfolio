import express from 'express';
import Certification from '../models/Certification.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
