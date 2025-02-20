import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid
} from '@mui/material';
import { DeliveryNote } from '../../types/deliveryNote';

interface DeliveryNoteDetailsProps {
    open: boolean;
    deliveryNote: DeliveryNote | null;
    onClose: () => void;
}

const DeliveryNoteDetails: React.FC<DeliveryNoteDetailsProps> = ({
    open,
    deliveryNote,
    onClose
}) => {
    if (!deliveryNote) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                Detalles del Albarán
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Información General
                        </Typography>
                        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                            <Typography><strong>Nº Albarán:</strong> {deliveryNote.supplier_delivery_note_number}</Typography>
                            <Typography><strong>Proveedor:</strong> {deliveryNote.supplier_name}</Typography>
                            <Typography><strong>Fecha:</strong> {new Date(deliveryNote.delivery_date).toLocaleDateString()}</Typography>
                            <Typography><strong>Localización:</strong> {deliveryNote.delivery_location}</Typography>
                            <Typography><strong>Nº Expedición:</strong> {deliveryNote.expedition_number}</Typography>
                            <Typography><strong>Nº Cliente:</strong> {deliveryNote.client_number}</Typography>
                            <Typography><strong>Total Bultos:</strong> {deliveryNote.total_packages}</Typography>
                            <Typography><strong>Peso Total:</strong> {deliveryNote.total_weight} kg</Typography>
                            <Typography><strong>Zona Temperatura:</strong> {deliveryNote.temperature_zone}</Typography>
                            <Typography><strong>Horario Entrega:</strong> {deliveryNote.delivery_schedule}</Typography>
                            <Typography><strong>Método Pago:</strong> {deliveryNote.payment_method}</Typography>
                            <Typography><strong>ID Comercial:</strong> {deliveryNote.sales_rep_id}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Líneas del Albarán
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell>Familia</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Peso/Ud</TableCell>
                                        <TableCell align="right">Peso Total</TableCell>
                                        <TableCell align="right">Precio/Ud</TableCell>
                                        <TableCell align="right">Base</TableCell>
                                        <TableCell align="right">IVA %</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deliveryNote.items?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.supplier_product_code}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.product_family}</TableCell>
                                            <TableCell>{item.product_category}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.weight_per_unit}</TableCell>
                                            <TableCell align="right">{item.total_weight}</TableCell>
                                            <TableCell align="right">{item.unit_price.toFixed(2)} €</TableCell>
                                            <TableCell align="right">{item.net_price.toFixed(2)} €</TableCell>
                                            <TableCell align="right">{item.tax_rate}%</TableCell>
                                            <TableCell align="right">{item.total_price.toFixed(2)} €</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Resumen de Impuestos
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Base Imponible</TableCell>
                                        <TableCell>Tipo IVA</TableCell>
                                        <TableCell align="right">Cuota IVA</TableCell>
                                        <TableCell align="right">Recargo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deliveryNote.tax_summary?.map((tax, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{tax.tax_base.toFixed(2)} €</TableCell>
                                            <TableCell>{tax.tax_rate}%</TableCell>
                                            <TableCell align="right">{tax.tax_amount.toFixed(2)} €</TableCell>
                                            <TableCell align="right">{tax.mer_amount.toFixed(2)} €</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Box textAlign="right">
                                <Typography><strong>Base Imponible:</strong> {deliveryNote.total_net_amount.toFixed(2)} €</Typography>
                                <Typography><strong>Total IVA:</strong> {deliveryNote.total_tax_amount.toFixed(2)} €</Typography>
                                <Typography><strong>Total Recargo:</strong> {deliveryNote.total_mer_amount.toFixed(2)} €</Typography>
                                <Typography variant="h6"><strong>Total:</strong> {deliveryNote.total_amount.toFixed(2)} €</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {deliveryNote.notes && (
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Notas
                            </Typography>
                            <Paper sx={{ p: 2 }}>
                                <Typography>{deliveryNote.notes}</Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeliveryNoteDetails;
