import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    FormHelperText,
    Box,
    CircularProgress,
    SelectChangeEvent
} from '@mui/material';
import { Product, ProductType, Unit } from '../types/product';
import { useProducts } from '../hooks/useProducts';

interface ProductFormProps {
    open: boolean;
    onClose: () => void;
    product?: Product;
    onSave: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'> | Partial<Product>) => void;
    isLoading: boolean;
    error: Error | null;
    title: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
    open,
    onClose,
    product,
    onSave,
    isLoading,
    error,
    title
}) => {
    const { productTypes, units, isLoadingProductTypes, isLoadingUnits } = useProducts();
    
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        code: '',
        type_id: undefined,
        purchase_unit_id: undefined,
        base_unit_id: undefined,
        unit_quantity: undefined,
        actual_stock: 0,
        minimum_stock: 0,
        price: 0,
        notes: ''
    });

    // Inicializar el formulario con los datos del producto si existe
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                code: product.code || '',
                type_id: product.type_id,
                purchase_unit_id: product.purchase_unit_id,
                base_unit_id: product.base_unit_id,
                unit_quantity: product.unit_quantity,
                actual_stock: product.actual_stock ?? 0,
                minimum_stock: product.minimum_stock ?? 0,
                price: product.price || 0,
                notes: product.notes || ''
            });
        } else {
            // Resetear el formulario si estamos creando un nuevo producto
            setFormData({
                name: '',
                code: '',
                type_id: undefined,
                purchase_unit_id: undefined,
                base_unit_id: undefined,
                unit_quantity: undefined,
                actual_stock: 0,
                minimum_stock: 0,
                price: 0,
                notes: ''
            });
        }
    }, [product, open]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? undefined : Number(value)
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name) {
            // Permitir valores exactos sin redondeo
            const numValue = value === '' ? undefined : Number(value);
            setFormData(prev => ({
                ...prev,
                [name]: numValue
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Nombre del producto"
                                value={formData.name || ''}
                                onChange={handleTextChange}
                                fullWidth
                                required
                                margin="normal"
                                error={!formData.name}
                                helperText={!formData.name ? "El nombre es obligatorio" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="code"
                                label="Código"
                                value={formData.code || ''}
                                onChange={handleTextChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Tipo de producto</InputLabel>
                                <Select
                                    name="type_id"
                                    value={formData.type_id?.toString() ?? ''}
                                    onChange={handleSelectChange}
                                    label="Tipo de producto"
                                    disabled={isLoadingProductTypes}
                                >
                                    {isLoadingProductTypes ? (
                                        <MenuItem value="">
                                            <CircularProgress size={20} />
                                        </MenuItem>
                                    ) : (
                                        (productTypes || []).map((type: ProductType) => (
                                            <MenuItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Unidad de compra</InputLabel>
                                <Select
                                    name="purchase_unit_id"
                                    value={formData.purchase_unit_id?.toString() ?? ''}
                                    onChange={handleSelectChange}
                                    label="Unidad de compra"
                                    disabled={isLoadingUnits}
                                >
                                    {isLoadingUnits ? (
                                        <MenuItem value="">
                                            <CircularProgress size={20} />
                                        </MenuItem>
                                    ) : (
                                        (units || []).map((unit: Unit) => (
                                            <MenuItem key={unit.id} value={unit.id.toString()}>
                                                {unit.name} ({unit.abbreviation})
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Unidad base</InputLabel>
                                <Select
                                    name="base_unit_id"
                                    value={formData.base_unit_id?.toString() ?? ''}
                                    onChange={handleSelectChange}
                                    label="Unidad base"
                                    disabled={isLoadingUnits}
                                >
                                    {isLoadingUnits ? (
                                        <MenuItem value="">
                                            <CircularProgress size={20} />
                                        </MenuItem>
                                    ) : (
                                        (units || []).map((unit: Unit) => (
                                            <MenuItem key={unit.id} value={unit.id.toString()}>
                                                {unit.name} ({unit.abbreviation})
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="unit_quantity"
                                label="Formato (cantidad)"
                                type="number"
                                value={formData.unit_quantity ?? ''}
                                onChange={handleNumberChange}
                                fullWidth
                                margin="normal"
                                inputProps={{ step: "any" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="actual_stock"
                                label="Stock actual"
                                type="number"
                                value={formData.actual_stock ?? ''}
                                onChange={handleNumberChange}
                                fullWidth
                                margin="normal"
                                inputProps={{ step: "any" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="minimum_stock"
                                label="Stock mínimo"
                                type="number"
                                value={formData.minimum_stock ?? ''}
                                onChange={handleNumberChange}
                                fullWidth
                                margin="normal"
                                inputProps={{ step: "any" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="price"
                                label="Precio"
                                type="number"
                                value={formData.price ?? ''}
                                onChange={handleNumberChange}
                                fullWidth
                                margin="normal"
                                inputProps={{ step: "any" }}
                                InputProps={{
                                    endAdornment: <Typography variant="body2">€</Typography>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="notes"
                                label="Notas"
                                value={formData.notes || ''}
                                onChange={handleTextChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>

                    {error && (
                        <Box mt={2} p={1} bgcolor="error.light" borderRadius={1}>
                            <Typography color="error" variant="body2">
                                Error: {error.message}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained" 
                        disabled={isLoading || !formData.name}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Guardar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductForm;
