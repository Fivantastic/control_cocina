import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    IconButton,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DeliveryNote, DeliveryNoteItem } from '../../types/deliveryNote';
import { deliveryNoteService } from '../../services/api';

interface DeliveryNoteModalProps {
    open: boolean;
    deliveryNote: DeliveryNote | null;
    onClose: () => void;
    onSave: () => void;
}

const DeliveryNoteModal: React.FC<DeliveryNoteModalProps> = ({
    open,
    deliveryNote,
    onClose,
    onSave
}) => {
    const [formData, setFormData] = useState<Partial<DeliveryNote>>({
        supplier_id: 0,
        supplier_delivery_note_number: '',
        external_reference: '',
        expedition_number: '',
        client_number: '',
        delivery_date: new Date().toISOString().split('T')[0],
        delivery_location: '',
        total_packages: 0,
        total_weight: 0,
        temperature_zone: '',
        delivery_schedule: '',
        payment_method: '',
        sales_rep_id: '',
        total_net_amount: 0,
        total_tax_amount: 0,
        total_mer_amount: 0,
        total_amount: 0,
        notes: '',
        items: []
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (deliveryNote) {
            setFormData(deliveryNote);
        } else {
            setFormData({
                supplier_id: 0,
                supplier_delivery_note_number: '',
                external_reference: '',
                expedition_number: '',
                client_number: '',
                delivery_date: new Date().toISOString().split('T')[0],
                delivery_location: '',
                total_packages: 0,
                total_weight: 0,
                temperature_zone: '',
                delivery_schedule: '',
                payment_method: '',
                sales_rep_id: '',
                total_net_amount: 0,
                total_tax_amount: 0,
                total_mer_amount: 0,
                total_amount: 0,
                notes: '',
                items: []
            });
        }
        setErrors({});
    }, [deliveryNote]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.supplier_id) newErrors.supplier_id = 'El proveedor es obligatorio';
        if (!formData.supplier_delivery_note_number) newErrors.supplier_delivery_note_number = 'El número de albarán es obligatorio';
        if (!formData.delivery_date) newErrors.delivery_date = 'La fecha de entrega es obligatoria';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (deliveryNote) {
                await deliveryNoteService.updateDeliveryNote(deliveryNote.id, formData);
            } else {
                await deliveryNoteService.createDeliveryNote(formData as Omit<DeliveryNote, 'id' | 'created_at' | 'updated_at'>);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar el albarán:', error);
            setErrors({ submit: 'Error al guardar el albarán' });
        }
    };

    const handleChange = (field: keyof DeliveryNote) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    const handleDateChange = (value: Date | null) => {
        if (!value) return;
        try {
            setFormData({
                ...formData,
                delivery_date: format(value, 'yyyy-MM-dd')
            });
        } catch (err) {
            console.error('Error al formatear la fecha:', err);
        }
    };

    const handleAddItem = () => {
        const newItem: DeliveryNoteItem = {
            id: 0,
            delivery_note_id: 0,
            product_id: 0,
            supplier_product_code: '',
            product_family: '',
            product_category: '',
            description: '',
            unit_type: '',
            quantity: 0,
            weight_per_unit: 0,
            total_weight: 0,
            unit_price: 0,
            net_price: 0,
            tax_rate: 0,
            mer_rate: 0,
            total_price: 0,
            batch_number: '',
            expiry_date: new Date().toISOString().split('T')[0],
            ean13_code: '',
            temperature_requirements: ''
        };

        setFormData({
            ...formData,
            items: [...(formData.items || []), newItem]
        });
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...(formData.items || [])];
        newItems.splice(index, 1);
        setFormData({
            ...formData,
            items: newItems
        });
    };

    const handleItemChange = (index: number, field: keyof DeliveryNoteItem) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newItems = [...(formData.items || [])];
        newItems[index] = {
            ...newItems[index],
            [field]: event.target.value
        };
        setFormData({
            ...formData,
            items: newItems
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                {deliveryNote ? 'Editar Albarán' : 'Nuevo Albarán'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Número de albarán"
                            value={formData.supplier_delivery_note_number || ''}
                            onChange={handleChange('supplier_delivery_note_number')}
                            error={!!errors.supplier_delivery_note_number}
                            helperText={errors.supplier_delivery_note_number}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID Proveedor"
                            type="number"
                            value={formData.supplier_id || ''}
                            onChange={handleChange('supplier_id')}
                            error={!!errors.supplier_id}
                            helperText={errors.supplier_id}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fecha de entrega"
                                value={formData.delivery_date ? new Date(formData.delivery_date) : null}
                                onChange={handleDateChange}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'small'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Líneas del albarán</Typography>
                            <Button
                                startIcon={<AddIcon />}
                                onClick={handleAddItem}
                                variant="outlined"
                            >
                                Añadir línea
                            </Button>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formData.items?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField
                                                    size="small"
                                                    value={item.supplier_product_code}
                                                    onChange={handleItemChange(index, 'supplier_product_code')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    size="small"
                                                    value={item.description}
                                                    onChange={handleItemChange(index, 'description')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={handleItemChange(index, 'quantity')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    value={item.unit_price}
                                                    onChange={handleItemChange(index, 'unit_price')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {(item.quantity * item.unit_price).toFixed(2)} €
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                {errors.submit && (
                    <Box mt={2} color="error.main">
                        {errors.submit}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {deliveryNote ? 'Guardar' : 'Crear'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeliveryNoteModal;
