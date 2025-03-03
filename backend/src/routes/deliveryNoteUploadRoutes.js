import express from 'express';
import { upload, processDeliveryNote } from '../controllers/deliveryNoteUploadController.js';

const router = express.Router();

// Ruta para subir y procesar albaranes
router.post('/upload', upload.single('file'), processDeliveryNote);

export default router;
