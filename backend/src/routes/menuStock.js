import express from 'express';
const router = express.Router();
import MenuStockController from '../controllers/menuStockController.js';

// Obtener las necesidades de stock para un menú semanal
router.get('/week/:weekNumber/stock-needs', MenuStockController.getMenuStockNeeds);

// Aplicar el uso de stock para un menú semanal
router.post('/week/:weekNumber/apply-stock', MenuStockController.applyMenuStock);

export default router;
