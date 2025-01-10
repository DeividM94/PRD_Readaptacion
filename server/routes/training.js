import express from 'express';
import trainingControllers from '../controllers/trainingControllers.js';

const router = express.Router();

router.get('/formaciones', trainingControllers.getTraining)

export default router;