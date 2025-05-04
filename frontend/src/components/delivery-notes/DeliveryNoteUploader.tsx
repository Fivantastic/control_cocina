import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    IconButton,
    TextField,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface ExtractedItem {
    product_code: string;
    product_name: string;
    quantity: number;
    unit: string;
    batch_number?: string;
    expiry_date?: string;
    price?: number;
}

interface DeliveryNoteData {
    supplier_name: string;
    delivery_date: string;
    items: ExtractedItem[];
    debug_logs?: {
        parsed_text?: string;
        supplier_detection?: string;
        product_lines?: string[];
    };
}

const DeliveryNoteUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<DeliveryNoteData>({
        supplier_name: '',
        delivery_date: new Date().toISOString().split('T')[0],
        items: [],
        debug_logs: {
            parsed_text: '',
            supplier_detection: '',
            product_lines: []
        }
    });
    const [showPreview, setShowPreview] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [newProducts, setNewProducts] = useState<any[]>([]);
    const [showNewProductsDialog, setShowNewProductsDialog] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        // Validar tipo de archivo
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(selectedFile.type)) {
            setError('Por favor, sube un archivo PDF o una imagen (JPEG/PNG)');
            return;
        }

        setFile(selectedFile);
        setError(null);
        await processFile(selectedFile);
    };

    const processFile = async (file: File) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:3000/api/delivery-notes-upload/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al procesar el archivo');
            }

            const data = await response.json();
            if (data.success) {
                // Actualizar el estado con los datos extraídos
                const extractedData = data.data;
                setExtractedData({
                    supplier_name: extractedData.supplier_name || '',
                    delivery_date: extractedData.delivery_date || new Date().toISOString().split('T')[0],
                    items: extractedData.items.map((item: ExtractedItem) => ({
                        product_code: item.product_code || '',
                        product_name: item.product_name || '',
                        quantity: item.quantity || 0,
                        unit: item.unit || 'ud',
                        batch_number: item.batch_number || '',
                        expiry_date: item.expiry_date || '',
                        price: item.price || 0
                    })),
                    debug_logs: extractedData.debug_logs
                });
                setShowPreview(true);
            } else {
                setError(data.error || 'Error al extraer datos del archivo');
            }
        } catch (err) {
            setError('Error al procesar el archivo');
            console.error('Error processing file:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/delivery-notes-upload/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(extractedData)
            });

            if (!response.ok) {
                throw new Error('Error al confirmar el albarán');
            }

            const data = await response.json();
            if (data.success) {
                setFile(null);
                setExtractedData({
                    supplier_name: '',
                    delivery_date: new Date().toISOString().split('T')[0],
                    items: [],
                    debug_logs: {
                        parsed_text: '',
                        supplier_detection: '',
                        product_lines: []
                    }
                });
                setShowPreview(false);
                setSuccessMessage(data.message || 'Albarán guardado correctamente');
                
                // Verificar si hay productos nuevos
                if (data.newProducts && data.newProducts.length > 0) {
                    setNewProducts(data.newProducts);
                    setShowNewProductsDialog(true);
                }
            } else {
                setError(data.error || 'Error al confirmar el albarán');
            }
        } catch (err) {
            setError('Error al confirmar el albarán');
            console.error('Error confirming delivery note:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading}
                    >
                        Subir Albarán
                        <VisuallyHiddenInput
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {file && (
                        <Typography variant="body2" color="text.secondary">
                            Archivo seleccionado: {file.name}
                        </Typography>
                    )}
                    {loading && <CircularProgress size={24} />}
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Paper>

            <Dialog
                open={showPreview}
                onClose={() => setShowPreview(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Verificar Datos Extraídos</DialogTitle>
                <DialogContent>
                    {/* Sección de Logs OCR */}
                    {extractedData.debug_logs && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>Información de Depuración OCR</Typography>
                            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" gutterBottom>Texto Reconocido:</Typography>
                                <Box sx={{ 
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    mb: 2,
                                    p: 1,
                                    bgcolor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: 1,
                                    maxHeight: '200px',
                                    overflow: 'auto'
                                }}>
                                    {extractedData.debug_logs.parsed_text || 'No hay texto reconocido'}
                                </Box>

                                <Typography variant="subtitle2" gutterBottom>Detección de Proveedor:</Typography>
                                <Box sx={{ 
                                    p: 1,
                                    mb: 2,
                                    bgcolor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: 1
                                }}>
                                    {extractedData.debug_logs.supplier_detection || 'No se detectó proveedor'}
                                </Box>

                                <Typography variant="subtitle2" gutterBottom>Productos Detectados:</Typography>
                                <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    <Table size="small" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Código</TableCell>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Cantidad</TableCell>
                                                <TableCell>Precio</TableCell>
                                                <TableCell>Lote</TableCell>
                                                <TableCell>Caducidad</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {extractedData.items.map((item, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell>{item.product_code}</TableCell>
                                                    <TableCell>{item.product_name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{item.price?.toFixed(2)} €</TableCell>
                                                    <TableCell>{item.batch_number}</TableCell>
                                                    <TableCell>
                                                        {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : ''}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    )}

                    {/* Sección de Datos Extraídos */}
                    <Typography variant="h6" gutterBottom>Datos Extraídos</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Proveedor"
                            value={extractedData.supplier_name}
                            onChange={(e) => setExtractedData({
                                ...extractedData,
                                supplier_name: e.target.value
                            })}
                            fullWidth
                        />
                        <TextField
                            label="Fecha de entrega"
                            type="date"
                            value={extractedData.delivery_date}
                            onChange={(e) => setExtractedData({
                                ...extractedData,
                                delivery_date: e.target.value
                            })}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Productos</Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => setExtractedData({
                                        ...extractedData,
                                        items: [
                                            ...extractedData.items,
                                            {
                                                product_code: '',
                                                product_name: '',
                                                quantity: 0,
                                                unit: 'ud',
                                                batch_number: '',
                                                expiry_date: '',
                                                price: 0
                                            }
                                        ]
                                    })}
                                >
                                    Añadir Producto
                                </Button>
                            </Box>
                            <List>
                                {extractedData.items.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                            mb: 1,
                                            flexDirection: 'column',
                                            alignItems: 'stretch'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                            <TextField
                                                label="Código"
                                                value={item.product_code}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        product_code: e.target.value
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                sx={{ width: 150 }}
                                            />
                                            <TextField
                                                label="Producto"
                                                value={item.product_name}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        product_name: e.target.value
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Cantidad"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        quantity: Number(e.target.value)
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                sx={{ width: 150 }}
                                            />
                                            <TextField
                                                label="Unidad"
                                                value={item.unit}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        unit: e.target.value
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                sx={{ width: 100 }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField
                                                label="Lote"
                                                value={item.batch_number || ''}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        batch_number: e.target.value
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                            />
                                            <TextField
                                                label="Caducidad"
                                                type="date"
                                                value={item.expiry_date || ''}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        expiry_date: e.target.value
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                            <TextField
                                                label="Precio"
                                                type="number"
                                                value={item.price || ''}
                                                onChange={(e) => {
                                                    const newItems = [...extractedData.items];
                                                    newItems[index] = {
                                                        ...item,
                                                        price: Number(e.target.value)
                                                    };
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                sx={{ width: 150 }}
                                            />
                                            <IconButton
                                                edge="end"
                                                onClick={() => {
                                                    const newItems = extractedData.items.filter((_, i) => i !== index);
                                                    setExtractedData({
                                                        ...extractedData,
                                                        items: newItems
                                                    });
                                                }}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPreview(false)} color="inherit">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Confirmar'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage(null)}
                message={successMessage}
            />

            {/* Diálogo para mostrar productos nuevos */}
            <Dialog
                open={showNewProductsDialog}
                onClose={() => setShowNewProductsDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Productos Nuevos Detectados</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" paragraph>
                        Se han detectado {newProducts.length} productos nuevos que no existían en el almacén:
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Unidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newProducts.map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.code || 'N/A'}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.unit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                        Estos productos han sido añadidos automáticamente al inventario.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowNewProductsDialog(false)} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeliveryNoteUploader;
