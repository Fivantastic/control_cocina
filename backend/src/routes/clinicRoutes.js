import express from 'express';
import {
    getAllClinics,
    getClinicById,
    getClinicByCode,
    createClinic,
    updateClinic,
    deleteClinic
} from '../controllers/clinicController.js';

const router = express.Router();

// Rutas para clínicas
router.get('/', getAllClinics);
router.get('/:id', getClinicById);
router.get('/code/:code', getClinicByCode);
router.post('/', createClinic);
router.put('/:id', updateClinic);
router.delete('/:id', deleteClinic);

export default router;
