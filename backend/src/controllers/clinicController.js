import Clinic from '../models/clinic.js';

export const getAllClinics = async (req, res) => {
    try {
        const clinics = await Clinic.getAll();
        res.json(clinics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClinicById = async (req, res) => {
    try {
        const clinic = await Clinic.getById(req.params.id);
        if (!clinic) {
            return res.status(404).json({ message: 'Clínica no encontrada' });
        }
        res.json(clinic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClinicByCode = async (req, res) => {
    try {
        const clinic = await Clinic.getByCode(req.params.code);
        if (!clinic) {
            return res.status(404).json({ message: 'Clínica no encontrada' });
        }
        res.json(clinic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createClinic = async (req, res) => {
    try {
        const { name, code, address, contact_info } = req.body;
        
        if (!name || !code) {
            return res.status(400).json({ message: 'El nombre y código son obligatorios' });
        }
        
        const clinic = await Clinic.create({ name, code, address, contact_info });
        res.status(201).json(clinic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClinic = async (req, res) => {
    try {
        const { name, code, address, contact_info } = req.body;
        
        if (!name || !code) {
            return res.status(400).json({ message: 'El nombre y código son obligatorios' });
        }
        
        const clinic = await Clinic.update(req.params.id, { name, code, address, contact_info });
        res.json(clinic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteClinic = async (req, res) => {
    try {
        await Clinic.delete(req.params.id);
        res.json({ message: 'Clínica eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
