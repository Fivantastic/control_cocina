import React, { useState } from 'react';
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
    Typography,
    Box
} from '@mui/material';
import { ProductStock, MovementType } from '../../types/stock';
import { stockService } from '../../services/api';

interface Props {
    open: boolean;
    onClose: () => void;
    item: ProductStock;
    onSave: () => void;
}

const StockMovementDialog: React.FC<Props> = ({ open, onClose, item, onSave }) => {
    const [quantity, setQuantity] = useState<string>('');
    const [notes, setNotes] = useState('');
    const [movementType, setMovementType] = useState<MovementType>('adjustment');
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            const numQuantity = parseFloat(quantity);
            if (isNaN(numQuantity)) {
                setError('La cantidad debe ser un número válido');
                return;
            }

            let remainingQuantity: number;
            if (movementType === 'in') {
                remainingQuantity = item.remaining_quantity + numQuantity;
            } else {
                remainingQuantity = item.remaining_quantity - numQuantity;
                if (remainingQuantity < 0) {
                    setError('La cantidad restante no puede ser negativa');
                    return;
                }
            }

            await stockService.adjustStock({
                delivery_note_item_id: item.id,
                quantity: numQuantity,
                remaining_quantity: remainingQuantity,
                notes
            });

            onSave();
            onClose();
        } catch (err) {
            setError('Error al ajustar el stock');
            console.error('Error adjusting stock:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Ajustar Stock</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Producto: {item.product_name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Lote: {item.batch_number}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Cantidad actual: {item.remaining_quantity} {item.unit_type}
                    </Typography>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Tipo de Movimiento</InputLabel>
                        <Select
                            value={movementType}
                            onChange={(e) => setMovementType(e.target.value as MovementType)}
                            label="Tipo de Movimiento"
                        >
                            <MenuItem value="in">Entrada</MenuItem>
                            <MenuItem value="out">Salida</MenuItem>
                            <MenuItem value="adjustment">Ajuste</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Cantidad"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        margin="normal"
                        error={!!error && error.includes('cantidad')}
                        helperText={error && error.includes('cantidad') ? error : ''}
                    />

                    <TextField
                        fullWidth
                        label="Notas"
                        multiline
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        margin="normal"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StockMovementDialog;
