const express = require('express');
const router = express.Router();
const DeliveryNoteUploadController = require('../controllers/deliveryNoteUploadController');

router.post('/upload', DeliveryNoteUploadController.uploadFile);
router.post('/confirm', DeliveryNoteUploadController.confirmDeliveryNote);

module.exports = router;
