import Supplier from '../models/supplier.js';

const supplierController = {
    // Get all suppliers
    getAllSuppliers: async (req, res) => {
        try {
            const suppliers = await Supplier.getAll(req.clinicId);
            res.json(suppliers);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving suppliers', error: error.message });
        }
    },

    // Get supplier by ID
    getSupplierById: async (req, res) => {
        try {
            const supplier = await Supplier.getById(req.params.id, req.clinicId);
            if (supplier) {
                res.json(supplier);
            } else {
                res.status(404).json({ message: 'Supplier not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving supplier', error: error.message });
        }
    },

    // Create new supplier
    createSupplier: async (req, res) => {
        try {
            const supplierData = {
                code: req.body.code,
                name: req.body.name,
                tax_id: req.body.tax_id,
                address: req.body.address,
                contact_phone: req.body.contact_phone,
                type: req.body.type,
                delivery_schedule: req.body.delivery_schedule,
                temperature_requirements: req.body.temperature_requirements,
                sales_rep_name: req.body.sales_rep_name,
                sales_rep_id: req.body.sales_rep_id
            };

            const newSupplier = await Supplier.create(supplierData, req.clinicId);
            res.status(201).json(newSupplier);
        } catch (error) {
            res.status(500).json({ message: 'Error creating supplier', error: error.message });
        }
    },

    // Update supplier
    updateSupplier: async (req, res) => {
        try {
            const supplierData = {
                code: req.body.code,
                name: req.body.name,
                tax_id: req.body.tax_id,
                address: req.body.address,
                contact_phone: req.body.contact_phone,
                type: req.body.type,
                delivery_schedule: req.body.delivery_schedule,
                temperature_requirements: req.body.temperature_requirements,
                sales_rep_name: req.body.sales_rep_name,
                sales_rep_id: req.body.sales_rep_id
            };

            const updatedSupplier = await Supplier.update(req.params.id, supplierData, req.clinicId);
            if (updatedSupplier) {
                res.json(updatedSupplier);
            } else {
                res.status(404).json({ message: 'Supplier not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating supplier', error: error.message });
        }
    },

    // Delete supplier
    deleteSupplier: async (req, res) => {
        try {
            const result = await Supplier.delete(req.params.id, req.clinicId);
            if (result) {
                res.json({ message: 'Supplier deleted successfully' });
            } else {
                res.status(404).json({ message: 'Supplier not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting supplier', error: error.message });
        }
    }
};

export default supplierController;
