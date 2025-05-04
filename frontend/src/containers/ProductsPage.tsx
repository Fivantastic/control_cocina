// @ts-nocheck
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    SelectChangeEvent
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import { ProductFilters, Product } from '../types/product';

const ProductsPage: React.FC = () => {
    const [filters, setFilters] = useState<ProductFilters>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [showLowStock, setShowLowStock] = useState<boolean>(false);
    const [productFormOpen, setProductFormOpen] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const {
        products = [],
        isLoading = false,
        error = null,
        updateStock,
        updateMinimumStock,
        productTypes = [],
        isLoadingProductTypes = false,
        createProduct,
        updateProduct,
        deleteProduct,
        isCreating = false,
        isUpdating = false,
        isDeleting = false,
        createError = null,
        updateError = null,
        deleteError = null
    } = useProducts(filters);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        
        if (value) {
            setFilters(prev => ({ ...prev, search: value }));
        } else {
            const { search, ...rest } = filters;
            setFilters(rest);
        }
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedType(value);
        
        if (value !== '') {
            setFilters(prev => ({ ...prev, type: parseInt(value, 10) }));
        } else {
            const { type, ...rest } = filters;
            setFilters(rest);
        }
    };

    const handleLowStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setShowLowStock(checked);
        
        if (checked) {
            setFilters(prev => ({ ...prev, lowStock: true }));
        } else {
            const { lowStock, ...rest } = filters;
            setFilters(rest);
        }
    };

    const handleAddProduct = () => {
        setCurrentProduct(undefined);
        setProductFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setCurrentProduct(product);
        setProductFormOpen(true);
    };

    const handleDeleteProduct = (id: number) => {
        setProductToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteProduct = () => {
        if (productToDelete) {
            deleteProduct(productToDelete);
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    const handleSaveProduct = (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'> | Partial<Product>) => {
        if (currentProduct) {
            updateProduct(currentProduct.id, productData);
        } else {
            createProduct(productData as Omit<Product, 'id' | 'created_at' | 'updated_at'>);
        }
        setProductFormOpen(false);
    };

    const renderErrorMessage = (err: unknown): string => {
        if (err instanceof Error) {
            return err.message;
        } else if (typeof err === 'string') {
            return err;
        } else {
            return 'Error desconocido';
        }
    };

    return (
        <Container maxWidth="xl">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Inventario
                </Typography>

                {(error || createError || updateError || deleteError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error && `Error al cargar los productos: ${renderErrorMessage(error)}`}
                        {createError && `Error al crear el producto: ${renderErrorMessage(createError)}`}
                        {updateError && `Error al actualizar el producto: ${renderErrorMessage(updateError)}`}
                        {deleteError && `Error al eliminar el producto: ${renderErrorMessage(deleteError)}`}
                    </Alert>
                )}

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Buscar productos"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="product-type-label">Tipo de producto</InputLabel>
                            <Select
                                labelId="product-type-label"
                                value={selectedType}
                                onChange={handleTypeChange}
                                label="Tipo de producto"
                                disabled={isLoadingProductTypes}
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {productTypes.map(type => (
                                    <MenuItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box mb={2}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {products.length} productos encontrados
                            </Typography>
                        </Box>
                        
                        <ProductTable 
                            products={products} 
                            onUpdateStock={updateStock}
                            onUpdateMinimumStock={updateMinimumStock}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                            onAdd={handleAddProduct}
                        />
                    </>
                )}
            </Box>

            {/* Formulario para crear/editar productos */}
            <ProductForm
                open={productFormOpen}
                onClose={() => setProductFormOpen(false)}
                product={currentProduct}
                onSave={handleSaveProduct}
                isLoading={isCreating || isUpdating}
                error={createError || updateError || null}
                title={currentProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            />

            {/* Diálogo de confirmación para eliminar productos */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                    </DialogContentText>
                    {deleteError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {renderErrorMessage(deleteError)}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick={confirmDeleteProduct} 
                        color="error" 
                        variant="contained"
                        disabled={isDeleting}
                    >
                        {isDeleting ? <CircularProgress size={24} /> : 'Eliminar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductsPage;
