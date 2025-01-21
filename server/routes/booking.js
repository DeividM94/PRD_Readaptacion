import express from 'express';
import bookingControllers from '../controllers/bookingControllers.js';

const router = express.Router();

// Ruta de prueba para verificar la conexión
router.post('/reservar', bookingControllers.addBooking);
router.post('/crearSesionPago', bookingControllers.createPaymentSession);


export default router;
