import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { format } from 'date-fns';
import { ProductStock } from '../../types/stock';
import { stockService } from '../../services/api';
import StockMovementDialog from './StockMovementDialog';
import StockHistoryDialog from './StockHistoryDialog';

interface Props {
    productId: number;
    productName: string;
}

const statusColors = {
    full: 'success',
    partial: 'warning',
    empty: 'error'
} as const;

const ProductStockStatus: React.FC<Props> = ({ productId, productName }) => {
    const [stockItems, setStockItems] = useState<ProductStock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ProductStock | null>(null);
    const [movementDialogOpen, setMovementDialogOpen] = useState(false);
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

    const loadStockStatus = async () => {
        try {
            setLoading(true);
            const data = await stockService.getProductStock(productId);
            setStockItems(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar el estado del stock');
            console.error('Error loading stock status:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStockStatus();
    }, [productId]);

    const handleAdjustStock = () => {
        setMovementDialogOpen(true);
    };

    const handleViewHistory = () => {
        setHistoryDialogOpen(true);
    };

    if (loading) return <Typography>Cargando estado del stock...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Estado del Stock: {productName}
            </Typography>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Lote</TableCell>
                            <TableCell>Cantidad Inicial</TableCell>
                            <TableCell>Cantidad Restante</TableCell>
                            <TableCell>Unidad</TableCell>
                            <TableCell>Fecha Caducidad</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.batch_number}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.remaining_quantity}</TableCell>
                                <TableCell>{item.unit_type}</TableCell>
                                <TableCell>
                                    {format(new Date(item.expiry_date), 'dd/MM/yyyy')}
                                </TableCell>
                                <TableCell>{item.supplier_name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.status}
                                        color={statusColors[item.status]}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Ajustar stock">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                handleAdjustStock();
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Ver historial">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setSelectedItem(item);
                                                handleViewHistory();
                                            }}
                                        >
                                            <HistoryIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedItem && (
                <>
                    <StockMovementDialog
                        open={movementDialogOpen}
                        onClose={() => {
                            setMovementDialogOpen(false);
                            setSelectedItem(null);
                        }}
                        item={selectedItem}
                        onSave={loadStockStatus}
                    />
                    <StockHistoryDialog
                        open={historyDialogOpen}
                        onClose={() => {
                            setHistoryDialogOpen(false);
                            setSelectedItem(null);
                        }}
                        item={selectedItem}
                    />
                </>
            )}
        </>
    );
};

export default ProductStockStatus;
