import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/api';
import { Product, UpdateStockPayload, UpdateMinimumStockPayload, ProductFilters } from '../types/product';

export const useProducts = (filters?: ProductFilters) => {
    const queryClient = useQueryClient();

    // Query para obtener productos
    const productsQuery = useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            if (filters?.lowStock) {
                return productService.getLowStock();
            }
            if (filters?.type) {
                return productService.getProductsByType(filters.type);
            }
            if (filters?.search) {
                return productService.searchProducts(filters.search);
            }
            return productService.getAllProducts();
        }
    });

    // Query para obtener un producto específico
    const useProduct = (id: number) => useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductById(id)
    });

    // Mutación para actualizar el stock
    const updateStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateStockPayload }) => 
            productService.updateStock(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Mutación para actualizar el stock mínimo
    const updateMinimumStockMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateMinimumStockPayload }) => 
            productService.updateMinimumStock(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    return {
        products: productsQuery.data || [],
        isLoading: productsQuery.isLoading,
        error: productsQuery.error,
        useProduct,
        updateStock: updateStockMutation.mutate,
        isUpdatingStock: updateStockMutation.isPending,
        updateMinimumStock: updateMinimumStockMutation.mutate,
        isUpdatingMinimumStock: updateMinimumStockMutation.isPending,
    };
};

export default useProducts;
