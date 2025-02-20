import axios from 'axios';
import { Product, UpdateStockPayload, UpdateMinimumStockPayload } from '../types/product';
import { MenuResponse, WeeksResponse } from '../types/menu';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export default api;
