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
    },

    // Create a new product
    createProduct: async (req, res) => {
        try {
            const {
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            } = req.body;

            // Validar campos requeridos
            if (!name) {
                return res.status(400).json({ message: 'El nombre del producto es obligatorio' });
            }

            const newProduct = await Product.create({
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            });

            res.status(201).json({
                message: 'Producto creado correctamente',
                product: newProduct
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }
    },

    // Update an existing product
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const {
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            } = req.body;

            // Verificar que el producto existe
            const existingProduct = await Product.getById(productId);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            const updatedProduct = await Product.update(productId, {
                name,
                code,
                type_id,
                purchase_unit_id,
                base_unit_id,
                unit_quantity,
                actual_stock,
                minimum_stock,
                price,
                notes
            });

            if (!updatedProduct) {
                return res.status(404).json({ message: 'No se pudo actualizar el producto' });
            }

            res.json({
                message: 'Producto actualizado correctamente',
                product: updatedProduct
            });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
        }
    },

    // Delete a product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;

            // Verificar que el producto existe
            const existingProduct = await Product.getById(productId);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            try {
                const result = await Product.delete(productId);
                if (result) {
                    res.json({ message: 'Producto eliminado correctamente' });
                } else {
                    res.status(404).json({ message: 'No se pudo eliminar el producto' });
                }
            } catch (deleteError) {
                // Capturar errores específicos de eliminación (dependencias, etc.)
                res.status(400).json({ message: deleteError.message });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
        }
    },

    // Get all product types
    getAllProductTypes: async (req, res) => {
        try {
            const types = await Product.getAllTypes();
            res.json(types);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product types', error: error.message });
        }
    },

    // Get all units
    getAllUnits: async (req, res) => {
        try {
            const units = await Product.getAllUnits();
            res.json(units);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving units', error: error.message });
        }
    }
};

export default productController;
