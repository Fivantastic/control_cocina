import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    DialogActions,
    Button,
    Box,
    Chip
} from '@mui/material';
import { format } from 'date-fns';
import { ProductStock, StockMovement } from '../../types/stock';
import { stockService } from '../../services/api';

interface Props {
    open: boolean;
    onClose: () => void;
    item: ProductStock;
}

const movementTypeLabels = {
    in: 'Entrada',
    out: 'Salida',
    adjustment: 'Ajuste'
} as const;

const movementTypeColors = {
    in: 'success',
    out: 'error',
    adjustment: 'warning'
} as const;

const StockHistoryDialog: React.FC<Props> = ({ open, onClose, item }) => {
    const [movements, setMovements] = useState<StockMovement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovements = async () => {
            try {
                setLoading(true);
                const data = await stockService.getMovementsByItem(item.id);
                setMovements(data);
                setError(null);
            } catch (err) {
                setError('Error al cargar el historial de movimientos');
                console.error('Error loading movements:', err);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            loadMovements();
        }
    }, [item.id, open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Historial de Movimientos</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Producto: {item.product_name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Lote: {item.batch_number}
                    </Typography>
                </Box>

                {loading ? (
                    <Typography>Cargando historial...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Restante</TableCell>
                                    <TableCell>Plato</TableCell>
                                    <TableCell>Notas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {movements.map((movement) => (
                                    <TableRow key={movement.id}>
                                        <TableCell>
                                            {format(new Date(movement.movement_date), 'dd/MM/yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={movementTypeLabels[movement.movement_type]}
                                                color={movementTypeColors[movement.movement_type]}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{movement.quantity}</TableCell>
                                        <TableCell>{movement.remaining_quantity}</TableCell>
                                        <TableCell>{movement.dish_name || '-'}</TableCell>
                                        <TableCell>{movement.notes || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StockHistoryDialog;
