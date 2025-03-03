import Product from '../models/product.js';

const productController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error: error.message });
        }
    },

    // Get product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error: error.message });
        }
    },

    // Get products by type
    getProductsByType: async (req, res) => {
        try {
            const products = await Product.getByType(req.params.typeId);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error: error.message });
        }
    },

    // Update product stock
    updateStock: async (req, res) => {
        try {
            const { actualStock } = req.body;
            const success = await Product.updateStock(req.params.id, actualStock);
            if (success) {
                res.json({ message: 'Stock updated successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating stock', error: error.message });
        }
    },

    // Update minimum stock
    updateMinimumStock: async (req, res) => {
        try {
            const { minimumStock } = req.body;
            const success = await Product.updateMinimumStock(req.params.id, minimumStock);
            if (success) {
                res.json({ message: 'Minimum stock updated successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating minimum stock', error: error.message });
        }
    },

    // Get products with low stock
    getLowStock: async (req, res) => {
        try {
            const products = await Product.getLowStock();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving low stock products', error: error.message });
        }
    },

    // Search products
    searchProducts: async (req, res) => {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ message: 'Search query is required' });
            }
            const products = await Product.search(query);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error searching products', error: error.message });
        }
    }
};

export default productController;
