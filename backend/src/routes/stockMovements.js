import express from 'express';
const router = express.Router();
import StockMovementController from '../controllers/stockMovementController.js';

// Crear un nuevo movimiento de stock
router.post('/', StockMovementController.createMovement);

// Obtener movimientos de un item específico
router.get('/by-item/:itemId', StockMovementController.getMovementsByItem);

// Obtener estado del stock de un producto
router.get('/product/:productId', StockMovementController.getProductStock);

// Ajustar stock (para correcciones manuales)
router.post('/adjust', StockMovementController.adjustStock);

export default router;
