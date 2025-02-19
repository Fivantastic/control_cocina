const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

// Obtener menú por número de semana
router.get('/week/:weekNumber', MenuController.getMenuByWeek);

// Obtener todas las semanas disponibles
router.get('/weeks', MenuController.getAllMenuWeeks);

module.exports = router;
