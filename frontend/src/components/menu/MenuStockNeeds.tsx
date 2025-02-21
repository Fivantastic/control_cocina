import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Alert,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { menuStockService } from '../../services/api';

interface MenuNeed {
    day: number;
    menu_type: string;
    dishes: {
        [dishName: string]: Array<{
            product_name: string;
            quantity_needed: number;
            unit_name: string;
            product_id: number;
        }>;
    };
}

interface StockAnalysis {
    product_id: number;
    product_name: string;
    total_needed: number;
    available: number;
    status: 'sufficient' | 'insufficient';
    unit_name: string;
}

interface Props {
    weekNumber: number;
    onStockApplied?: () => void;
}

const MenuStockNeeds: React.FC<Props> = ({ weekNumber, onStockApplied }) => {
    const [menuNeeds, setMenuNeeds] = useState<{ [key: string]: MenuNeed }>({});
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const loadStockNeeds = async () => {
        if (!weekNumber) return;
        
        try {
            setLoading(true);
            const response = await menuStockService.getStockNeeds(weekNumber);
            
            if (response.success) {
                setMenuNeeds(response.data.menuNeeds);
                setStockAnalysis(response.data.stockAnalysis);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError('Error al cargar las necesidades de stock');
            console.error('Error loading stock needs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStockNeeds();
    }, [weekNumber]);

    const handleApplyStock = async () => {
        if (!weekNumber) return;
        
        try {
            setConfirmDialogOpen(false);
            const stockUsage = stockAnalysis.map(item => ({
                product_id: item.product_id,
                quantity_needed: item.total_needed
            }));
            
            await menuStockService.applyStock(weekNumber, stockUsage);
            
            if (onStockApplied) {
                onStockApplied();
            }
        } catch (err) {
            setError('Error al aplicar el stock');
            console.error('Error applying stock:', err);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    const insufficientStock = stockAnalysis.some(item => item.status === 'insufficient');

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Necesidades de Stock - Semana {weekNumber}
            </Typography>

            {/* Análisis general del stock */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Resumen de Stock
                </Typography>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell align="right">Necesario</TableCell>
                                <TableCell align="right">Disponible</TableCell>
                                <TableCell align="right">Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stockAnalysis.map((item) => (
                                <TableRow key={item.product_id}>
                                    <TableCell>{item.product_name}</TableCell>
                                    <TableCell align="right">
                                        {item.total_needed} {item.unit_name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.available} {item.unit_name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            icon={item.status === 'sufficient' ? <CheckCircleIcon /> : <WarningIcon />}
                                            label={item.status === 'sufficient' ? 'Suficiente' : 'Insuficiente'}
                                            color={item.status === 'sufficient' ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Detalles por día */}
            {Object.entries(menuNeeds).map(([key, need]) => (
                <Accordion key={key}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Día {need.day} - {need.menu_type === 'lunch' ? 'Comida' : 'Cena'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.entries(need.dishes).map(([dishName, products]) => (
                            <Box key={dishName} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {dishName}
                                </Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Producto</TableCell>
                                                <TableCell align="right">Cantidad</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{product.product_name}</TableCell>
                                                    <TableCell align="right">
                                                        {product.quantity_needed} {product.unit_name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmDialogOpen(true)}
                    disabled={insufficientStock}
                >
                    Aplicar Stock al Menú
                </Button>
            </Box>

            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Confirmar Aplicación de Stock</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas aplicar estos cambios al stock? 
                        Esta acción actualizará el inventario basado en las necesidades del menú.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleApplyStock} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MenuStockNeeds;
