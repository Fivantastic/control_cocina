import express from 'express';
const router = express.Router();
import supplierController from '../controllers/supplierController.js';
import { extractClinicIdSimple } from '../middleware/clinicMiddleware.js';

// Aplicar el middleware a todas las rutas
router.use(extractClinicIdSimple);

// Get all suppliers
router.get('/', supplierController.getAllSuppliers);

// Get supplier by ID
router.get('/:id', supplierController.getSupplierById);

// Create new supplier
router.post('/', supplierController.createSupplier);

// Update supplier
router.put('/:id', supplierController.updateSupplier);

// Delete supplier
router.delete('/:id', supplierController.deleteSupplier);

export default router;
