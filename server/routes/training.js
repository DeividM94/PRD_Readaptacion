import express from 'express';
import trainingControllers from '../controllers/trainingControllers.js';

const router = express.Router();

router.get('/formaciones', trainingControllers.getTraining)
router.get("/formaciones/:id", trainingControllers.getOneTraining);

export default router;