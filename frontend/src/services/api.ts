import axios from 'axios';
import { Product, UpdateStockPayload, UpdateMinimumStockPayload } from '../types/product';
import { MenuResponse, WeeksResponse } from '../types/menu';
import { Supplier } from '../types/supplier';
import { DeliveryNote } from '../types/deliveryNote';
import { StockMovement, ProductStock } from '../types/stock';

const API_BASE_URL = 'http://localhost:3000/api';

// Variable para almacenar el ID de la clínica seleccionada
let currentClinicId = localStorage.getItem('selectedClinicId') || '1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Clinic-ID': currentClinicId
    },
    params: {
        clinicId: currentClinicId
    }
});

// Función para establecer el ID de la clínica
export const setClinicId = (clinicId: string) => {
    currentClinicId = clinicId;
    localStorage.setItem('selectedClinicId', clinicId);
    
    // Actualizar los headers y params por defecto
    api.defaults.headers.common['X-Clinic-ID'] = clinicId;
    api.defaults.params = { ...api.defaults.params, clinicId };
    
    console.log(`API: Clínica ID establecido a ${clinicId}`);
};

// Configurar interceptor para asegurar que todas las solicitudes incluyan el ID de la clínica
api.interceptors.request.use((config) => {
    // Asegurarse de que el ID de la clínica esté en los headers
    config.headers = config.headers || {};
    config.headers['X-Clinic-ID'] = currentClinicId;
    
    // Asegurarse de que el objeto params exista
    config.params = config.params || {};
    
    // Añadir el ID de la clínica a los parámetros de consulta
    config.params.clinicId = currentClinicId;
    
    return config;
});

// Inicializar con el ID de la clínica almacenado en localStorage
if (localStorage.getItem('selectedClinicId')) {
    setClinicId(localStorage.getItem('selectedClinicId') || '1');
}

export const productService = {
    // Get all products
    getAllProducts: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },

    // Get product by ID
    getProductById: async (id: number): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Get products by type
    getProductsByType: async (typeId: number): Promise<Product[]> => {
        const response = await api.get(`/products/type/${typeId}`);
        return response.data;
    },

    // Get products with low stock
    getLowStock: async (): Promise<Product[]> => {
        const response = await api.get('/products/low-stock');
        return response.data;
    },

    // Search products
    searchProducts: async (query: string): Promise<Product[]> => {
        const response = await api.get(`/products/search?query=${encodeURIComponent(query)}`);
        return response.data;
    },

    // Update product stock
    updateStock: async (id: number, payload: UpdateStockPayload): Promise<void> => {
        await api.patch(`/products/${id}/stock`, payload);
    },

    // Update minimum stock
    updateMinimumStock: async (id: number, payload: UpdateMinimumStockPayload): Promise<void> => {
        await api.patch(`/products/${id}/minimum-stock`, payload);
    },

    // Get all product types
    getAllProductTypes: async () => {
        const response = await api.get('/products/types');
        return response.data;
    },

    // Get all units
    getAllUnits: async () => {
        const response = await api.get('/products/units');
        return response.data;
    },

    // Create a new product
    createProduct: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
        const response = await api.post('/products', product);
        return response.data.product;
    },

    // Update a product
    updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
        const response = await api.put(`/products/${id}`, product);
        return response.data.product;
    },

    // Delete a product
    deleteProduct: async (id: number): Promise<void> => {
        try {
            await api.delete(`/products/${id}`);
        } catch (error) {
            // Asegurarse de que el error se propague con toda la información
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
};

export const menuStockService = {
    getStockNeeds: async (weekNumber: number) => {
        const response = await axios.get(`/api/menu-stock/week/${weekNumber}/stock-needs`);
        return response.data;
    },
    applyStock: async (weekNumber: number, stockUsage: any[]) => {
        const response = await axios.post(`/api/menu-stock/week/${weekNumber}/apply-stock`, { stockUsage });
        return response.data;
    }
};

export const menuService = {
    // Get menu by week number
    getMenuByWeek: async (weekNumber: number): Promise<MenuResponse> => {
        const response = await api.get(`/menus/week/${weekNumber}`);
        return response.data;
    },

    // Get all available menu weeks
    getAllMenuWeeks: async (): Promise<WeeksResponse> => {
        const response = await api.get('/menus/weeks');
        return response.data;
    }
};

export const supplierService = {
    // Get all suppliers
    getAllSuppliers: async (): Promise<Supplier[]> => {
        const response = await api.get('/suppliers');
        return response.data;
    },

    // Get supplier by ID
    getSupplierById: async (id: number): Promise<Supplier> => {
        const response = await api.get(`/suppliers/${id}`);
        return response.data;
    },

    // Create new supplier
    createSupplier: async (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>): Promise<Supplier> => {
        const response = await api.post('/suppliers', supplier);
        return response.data;
    },

    // Update supplier
    updateSupplier: async (id: number, supplier: Partial<Supplier>): Promise<Supplier> => {
        const response = await api.put(`/suppliers/${id}`, supplier);
        return response.data;
    },

    // Delete supplier
    deleteSupplier: async (id: number): Promise<void> => {
        await api.delete(`/suppliers/${id}`);
    }
};

export const deliveryNoteService = {
    // Get all delivery notes
    getAllDeliveryNotes: async (): Promise<DeliveryNote[]> => {
        const response = await api.get('/delivery-notes');
        return response.data;
    },

    // Get delivery note by ID
    getDeliveryNoteById: async (id: number): Promise<DeliveryNote> => {
        const response = await api.get(`/delivery-notes/${id}`);
        return response.data;
    },

    // Get delivery notes by supplier
    getDeliveryNotesBySupplier: async (supplierId: number): Promise<DeliveryNote[]> => {
        const response = await api.get(`/delivery-notes/supplier/${supplierId}`);
        return response.data;
    },

    // Get delivery notes by date range
    getDeliveryNotesByDateRange: async (startDate: string, endDate: string): Promise<DeliveryNote[]> => {
        const response = await api.get(`/delivery-notes/date-range?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    },

    // Create new delivery note
    createDeliveryNote: async (deliveryNote: Omit<DeliveryNote, 'id' | 'created_at' | 'updated_at'>): Promise<DeliveryNote> => {
        const response = await api.post('/delivery-notes', deliveryNote);
        return response.data;
    },

    // Update delivery note
    updateDeliveryNote: async (id: number, deliveryNote: Partial<DeliveryNote>): Promise<DeliveryNote> => {
        const response = await api.put(`/delivery-notes/${id}`, deliveryNote);
        return response.data;
    },

    // Delete delivery note
    deleteDeliveryNote: async (id: number): Promise<void> => {
        await api.delete(`/delivery-notes/${id}`);
    }
};

export const stockService = {
    // Create stock movement
    createMovement: async (movement: Omit<StockMovement, 'id' | 'created_at' | 'movement_date'>): Promise<{ id: number }> => {
        const response = await api.post('/stock', movement);
        return response.data.data;
    },

    // Get movements by delivery note item
    getMovementsByItem: async (itemId: number): Promise<StockMovement[]> => {
        const response = await api.get(`/stock/by-item/${itemId}`);
        return response.data.data;
    },

    // Get product stock status
    getProductStock: async (productId: number): Promise<ProductStock[]> => {
        const response = await api.get(`/stock/product/${productId}`);
        return response.data.data;
    },

    // Adjust stock manually
    adjustStock: async (adjustment: {
        delivery_note_item_id: number;
        quantity: number;
        remaining_quantity: number;
        notes?: string;
    }): Promise<{ id: number }> => {
        const response = await api.post('/stock/adjust', adjustment);
        return response.data.data;
    }
};

export default api;
