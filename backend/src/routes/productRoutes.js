import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import { extractClinicIdSimple } from '../middleware/clinicMiddleware.js';

// Aplicar el middleware a todas las rutas
router.use(extractClinicIdSimple);

// Get all products
router.get('/', productController.getAllProducts);

// Get products with low stock
router.get('/low-stock', productController.getLowStock);

// Search products
router.get('/search', productController.searchProducts);

// Get all product types
router.get('/types', productController.getAllProductTypes);

// Get all units
router.get('/units', productController.getAllUnits);

// Get products by type
router.get('/type/:typeId', productController.getProductsByType);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', productController.createProduct);

// Update an existing product (complete update)
router.put('/:id', productController.updateProduct);

// Partial update of a product
router.patch('/:id', productController.updateProduct);

// Update product stock
router.patch('/:id/stock', productController.updateStock);

// Update minimum stock
router.patch('/:id/minimum-stock', productController.updateMinimumStock);

// Delete a product
router.delete('/:id', productController.deleteProduct);

export default router;
