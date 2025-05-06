import express from 'express';
const router = express.Router();
import MenuController from '../controllers/menuController.js';
import { extractClinicIdSimple } from '../middleware/clinicMiddleware.js';

// Aplicar el middleware a todas las rutas
router.use(extractClinicIdSimple);

// Obtener menú por número de semana
router.get('/week/:weekNumber', MenuController.getMenuByWeek);

// Obtener todas las semanas disponibles
router.get('/weeks', MenuController.getAllMenuWeeks);

export default router;
