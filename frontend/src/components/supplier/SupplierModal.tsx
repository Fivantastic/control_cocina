import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem
} from '@mui/material';
import { Supplier } from '../../types/supplier';
import { supplierService } from '../../services/api';

interface SupplierModalProps {
    open: boolean;
    supplier: Supplier | null;
    onClose: () => void;
    onSave: () => void;
}

const SUPPLIER_TYPES = ['SECO', 'CONGELADO', 'FRESCO'];

const SupplierModal: React.FC<SupplierModalProps> = ({
    open,
    supplier,
    onClose,
    onSave
}) => {
    const [formData, setFormData] = useState<Partial<Supplier>>({
        code: '',
        name: '',
        tax_id: '',
        address: '',
        contact_phone: '',
        type: '',
        delivery_schedule: '',
        temperature_requirements: '',
        sales_rep_name: '',
        sales_rep_id: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (supplier) {
            setFormData(supplier);
        } else {
            setFormData({
                code: '',
                name: '',
                tax_id: '',
                address: '',
                contact_phone: '',
                type: '',
                delivery_schedule: '',
                temperature_requirements: '',
                sales_rep_name: '',
                sales_rep_id: ''
            });
        }
        setErrors({});
    }, [supplier]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = 'El nombre es obligatorio';
        if (!formData.code) newErrors.code = 'El código es obligatorio';
        if (!formData.type) newErrors.type = 'El tipo es obligatorio';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (supplier) {
                await supplierService.updateSupplier(supplier.id, formData);
            } else {
                await supplierService.createSupplier(formData as Omit<Supplier, 'id' | 'created_at' | 'updated_at'>);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            setErrors({ submit: 'Error al guardar el proveedor' });
        }
    };

    const handleChange = (field: keyof Supplier) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
        // Limpiar error del campo cuando se modifica
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {supplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Código"
                            value={formData.code || ''}
                            onChange={handleChange('code')}
                            error={!!errors.code}
                            helperText={errors.code}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={formData.name || ''}
                            onChange={handleChange('name')}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Tipo"
                            value={formData.type || ''}
                            onChange={handleChange('type')}
                            error={!!errors.type}
                            helperText={errors.type}
                        >
                            {SUPPLIER_TYPES.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="CIF/NIF"
                            value={formData.tax_id || ''}
                            onChange={handleChange('tax_id')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            value={formData.address || ''}
                            onChange={handleChange('address')}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            value={formData.contact_phone || ''}
                            onChange={handleChange('contact_phone')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Horario de entrega"
                            value={formData.delivery_schedule || ''}
                            onChange={handleChange('delivery_schedule')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Requisitos de temperatura"
                            value={formData.temperature_requirements || ''}
                            onChange={handleChange('temperature_requirements')}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre del comercial"
                            value={formData.sales_rep_name || ''}
                            onChange={handleChange('sales_rep_name')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID del comercial"
                            value={formData.sales_rep_id || ''}
                            onChange={handleChange('sales_rep_id')}
                        />
                    </Grid>
                </Grid>
                {errors.submit && (
                    <Grid item xs={12}>
                        <p style={{ color: 'red' }}>{errors.submit}</p>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {supplier ? 'Guardar' : 'Crear'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SupplierModal;
