import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/api';
import { Product, UpdateStockPayload, UpdateMinimumStockPayload, ProductFilters } from '../types/product';
import { useState } from 'react';

export const useProducts = (filters?: ProductFilters) => {
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<Error | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    // Query para obtener productos
    const productsQuery = useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            if (filters?.lowStock) {
                return productService.getLowStock();
            } else if (filters?.type) {
                return productService.getProductsByType(filters.type);
            } else if (filters?.search) {
                return productService.searchProducts(filters.search);
            }
            return productService.getAllProducts();
        },
    });

    // Query para obtener un producto específico
    const useProduct = (id: number) => {
        return useQuery({
            queryKey: ['product', id],
            queryFn: () => productService.getProductById(id),
        });
    };

    // Query para obtener tipos de producto
    const productTypesQuery = useQuery({
        queryKey: ['productTypes'],
        queryFn: () => productService.getAllProductTypes(),
    });

    // Query para obtener unidades
    const unitsQuery = useQuery({
        queryKey: ['units'],
        queryFn: () => productService.getAllUnits(),
    });

    // Mutación para actualizar el stock de un producto
    const updateStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateStockPayload }) => 
            productService.updateStock(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Mutación para actualizar el stock mínimo de un producto
    const updateMinimumStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateMinimumStockPayload }) => 
            productService.updateMinimumStock(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Mutación para crear un producto
    const createProductMutation = useMutation({
        mutationFn: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => 
            productService.createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Mutación para actualizar un producto
    const updateProductMutation = useMutation({
        mutationFn: ({ id, productData }: { id: number; productData: Partial<Product> }) => 
            productService.updateProduct(id, productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Función para eliminar un producto
    const deleteProduct = async (id: number) => {
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await productService.deleteProduct(id);
            // Actualizar la lista de productos después de eliminar
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            queryClient.invalidateQueries({ queryKey: ['products'] });
        } catch (error) {
            console.error('Error deleting product:', error);
            // Extraer el mensaje de error de la respuesta del servidor si está disponible
            if (error instanceof Error) {
                setDeleteError(error);
            } else if (typeof error === 'object' && error !== null && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                setDeleteError(new Error(error.response.data.message as string));
            } else {
                setDeleteError(new Error('Error al eliminar el producto'));
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        products: productsQuery.data || products,
        isLoading: productsQuery.isLoading,
        error: productsQuery.error,
        useProduct,
        updateStock: (id: number, payload: UpdateStockPayload) =>
            updateStockMutation.mutate({ id, payload }),
        updateMinimumStock: (id: number, payload: UpdateMinimumStockPayload) =>
            updateMinimumStockMutation.mutate({ id, payload }),
        productTypes: productTypesQuery.data || [],
        isLoadingProductTypes: productTypesQuery.isLoading,
        units: unitsQuery.data || [],
        isLoadingUnits: unitsQuery.isLoading,
        createProduct: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) =>
            createProductMutation.mutate(productData),
        updateProduct: (id: number, productData: Partial<Product>) =>
            updateProductMutation.mutate({ id, productData }),
        deleteProduct,
        isCreating: createProductMutation.isLoading,
        isUpdating: updateProductMutation.isLoading,
        isDeleting,
        createError: createProductMutation.error as Error | null,
        updateError: updateProductMutation.error as Error | null,
        deleteError
    };
};
