import express from 'express';
const router = express.Router();
import MenuController from '../controllers/menuController.js';

// Obtener menú por número de semana
router.get('/week/:weekNumber', MenuController.getMenuByWeek);

// Obtener todas las semanas disponibles
router.get('/weeks', MenuController.getAllMenuWeeks);

export default router;
