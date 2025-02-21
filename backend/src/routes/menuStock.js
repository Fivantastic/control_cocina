const express = require('express');
const router = express.Router();
const MenuStockController = require('../controllers/menuStockController');

// Obtener las necesidades de stock para un menú semanal
router.get('/week/:weekNumber/stock-needs', MenuStockController.getMenuStockNeeds);

// Aplicar el uso de stock para un menú semanal
router.post('/week/:weekNumber/apply-stock', MenuStockController.applyMenuStock);

module.exports = router;
