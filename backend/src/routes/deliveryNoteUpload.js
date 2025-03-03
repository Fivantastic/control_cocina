import express from 'express';
const router = express.Router();
import DeliveryNoteUploadController from '../controllers/deliveryNoteUploadController.js';

router.post('/upload', DeliveryNoteUploadController.uploadFile);
router.post('/confirm', DeliveryNoteUploadController.confirmDeliveryNote);

export default router;
