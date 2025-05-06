import express from 'express';
const router = express.Router();
import deliveryNoteController from '../controllers/deliveryNoteController.js';
import { extractClinicIdSimple } from '../middleware/clinicMiddleware.js';

// Aplicar el middleware a todas las rutas
router.use(extractClinicIdSimple);

// Get all delivery notes
router.get('/', deliveryNoteController.getAllDeliveryNotes);

// Get delivery notes by date range
router.get('/date-range', deliveryNoteController.getDeliveryNotesByDateRange);

// Get delivery notes by supplier
router.get('/supplier/:supplierId', deliveryNoteController.getDeliveryNotesBySupplier);

// Get delivery note by ID
router.get('/:id', deliveryNoteController.getDeliveryNoteById);

// Create new delivery note
router.post('/', deliveryNoteController.createDeliveryNote);

// Update delivery note
router.put('/:id', deliveryNoteController.updateDeliveryNote);

// Delete delivery note
router.delete('/:id', deliveryNoteController.deleteDeliveryNote);

export default router;
