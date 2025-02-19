import React from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Stack,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import { ProductFilters } from '../types/product';

const ProductsPage: React.FC = () => {
    const [filters, setFilters] = React.useState<ProductFilters>({});
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const {
        products,
        isLoading,
        error,
        updateStock,
        updateMinimumStock,
    } = useProducts(filters);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (event.target.value) {
            setFilters(prev => ({ ...prev, search: event.target.value }));
        } else {
            const { search, ...restFilters } = filters;
            setFilters(restFilters);
        }
    };

    const handleTypeChange = (event: any) => {
        if (event.target.value) {
            setFilters(prev => ({ ...prev, type: event.target.value }));
        } else {
            const { type, ...restFilters } = filters;
            setFilters(restFilters);
        }
    };

    const handleLowStockToggle = () => {
        setFilters(prev => ({
            ...prev,
            lowStock: !prev.lowStock
        }));
    };

    const handleUpdateStock = (id: number, stock: number) => {
        updateStock({ id, payload: { actualStock: stock } });
    };

    const handleUpdateMinimumStock = (id: number, minimumStock: number) => {
        updateMinimumStock({ id, payload: { minimumStock } });
    };

    if (error) {
        return (
            <Container>
                <Alert severity="error">
                    Error al cargar los productos: {(error as Error).message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Inventario de Cocina
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <TextField
                        label="Buscar productos"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ width: 300 }}
                    />

                    <FormControl sx={{ width: 200 }}>
                        <InputLabel>Tipo de producto</InputLabel>
                        <Select
                            value={filters.type || ''}
                            onChange={handleTypeChange}
                            label="Tipo de producto"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value={1}>Congelado</MenuItem>
                            <MenuItem value={2}>Conserva</MenuItem>
                            <MenuItem value={3}>Fresco</MenuItem>
                            <MenuItem value={4}>Limpieza</MenuItem>
                            <MenuItem value={5}>Seco</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant={filters.lowStock ? "contained" : "outlined"}
                        onClick={handleLowStockToggle}
                        color={filters.lowStock ? "warning" : "primary"}
                    >
                        Stock Bajo
                    </Button>
                </Stack>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography variant="subtitle1" gutterBottom>
                            {products.length} productos encontrados
                        </Typography>
                        <ProductTable
                            products={products}
                            onUpdateStock={handleUpdateStock}
                            onUpdateMinimumStock={handleUpdateMinimumStock}
                        />
                    </>
                )}
            </Box>
        </Container>
    );
};

export default ProductsPage;
