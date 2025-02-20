const DeliveryNote = require('../models/deliveryNote');

const deliveryNoteController = {
    // Get all delivery notes
    getAllDeliveryNotes: async (req, res) => {
        try {
            const deliveryNotes = await DeliveryNote.getAll();
            res.json(deliveryNotes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery notes', error: error.message });
        }
    },

    // Get delivery note by ID
    getDeliveryNoteById: async (req, res) => {
        try {
            const deliveryNote = await DeliveryNote.getById(req.params.id);
            if (deliveryNote) {
                res.json(deliveryNote);
            } else {
                res.status(404).json({ message: 'Delivery note not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery note', error: error.message });
        }
    },

    // Get delivery notes by supplier
    getDeliveryNotesBySupplier: async (req, res) => {
        try {
            const deliveryNotes = await DeliveryNote.getBySupplier(req.params.supplierId);
            res.json(deliveryNotes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery notes', error: error.message });
        }
    },

    // Get delivery notes by date range
    getDeliveryNotesByDateRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).json({ message: 'Start date and end date are required' });
            }
            const deliveryNotes = await DeliveryNote.getByDateRange(startDate, endDate);
            res.json(deliveryNotes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery notes', error: error.message });
        }
    },

    // Create new delivery note
    createDeliveryNote: async (req, res) => {
        try {
            const deliveryNoteData = {
                supplier_id: req.body.supplier_id,
                supplier_delivery_note_number: req.body.supplier_delivery_note_number,
                external_reference: req.body.external_reference,
                expedition_number: req.body.expedition_number,
                client_number: req.body.client_number,
                delivery_date: req.body.delivery_date,
                delivery_location: req.body.delivery_location,
                total_packages: req.body.total_packages,
                total_weight: req.body.total_weight,
                temperature_zone: req.body.temperature_zone,
                delivery_schedule: req.body.delivery_schedule,
                payment_method: req.body.payment_method,
                sales_rep_id: req.body.sales_rep_id,
                total_net_amount: req.body.total_net_amount,
                total_tax_amount: req.body.total_tax_amount,
                total_mer_amount: req.body.total_mer_amount,
                total_amount: req.body.total_amount,
                notes: req.body.notes,
                items: req.body.items,
                tax_summary: req.body.tax_summary
            };

            const newDeliveryNote = await DeliveryNote.create(deliveryNoteData);
            res.status(201).json(newDeliveryNote);
        } catch (error) {
            res.status(500).json({ message: 'Error creating delivery note', error: error.message });
        }
    },

    // Update delivery note
    updateDeliveryNote: async (req, res) => {
        try {
            const deliveryNoteData = {
                supplier_id: req.body.supplier_id,
                supplier_delivery_note_number: req.body.supplier_delivery_note_number,
                external_reference: req.body.external_reference,
                expedition_number: req.body.expedition_number,
                client_number: req.body.client_number,
                delivery_date: req.body.delivery_date,
                delivery_location: req.body.delivery_location,
                total_packages: req.body.total_packages,
                total_weight: req.body.total_weight,
                temperature_zone: req.body.temperature_zone,
                delivery_schedule: req.body.delivery_schedule,
                payment_method: req.body.payment_method,
                sales_rep_id: req.body.sales_rep_id,
                total_net_amount: req.body.total_net_amount,
                total_tax_amount: req.body.total_tax_amount,
                total_mer_amount: req.body.total_mer_amount,
                total_amount: req.body.total_amount,
                notes: req.body.notes,
                items: req.body.items,
                tax_summary: req.body.tax_summary
            };

            const updatedDeliveryNote = await DeliveryNote.update(req.params.id, deliveryNoteData);
            if (updatedDeliveryNote) {
                res.json(updatedDeliveryNote);
            } else {
                res.status(404).json({ message: 'Delivery note not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating delivery note', error: error.message });
        }
    },

    // Delete delivery note
    deleteDeliveryNote: async (req, res) => {
        try {
            const result = await DeliveryNote.delete(req.params.id);
            if (result) {
                res.json({ message: 'Delivery note deleted successfully' });
            } else {
                res.status(404).json({ message: 'Delivery note not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting delivery note', error: error.message });
        }
    }
};

module.exports = deliveryNoteController;
