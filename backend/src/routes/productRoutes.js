import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';

// Get all products
router.get('/', productController.getAllProducts);

// Get products with low stock
router.get('/low-stock', productController.getLowStock);

// Search products
router.get('/search', productController.searchProducts);

// Get products by type
router.get('/type/:typeId', productController.getProductsByType);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product stock
router.patch('/:id/stock', productController.updateStock);

// Update minimum stock
router.patch('/:id/minimum-stock', productController.updateMinimumStock);

export default router;
