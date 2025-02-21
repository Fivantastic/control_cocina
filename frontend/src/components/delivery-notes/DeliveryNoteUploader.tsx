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
    Snackbar
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
}

const DeliveryNoteUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<DeliveryNoteData>({
        supplier_name: '',
        delivery_date: new Date().toISOString().split('T')[0],
        items: []
    });
    const [showPreview, setShowPreview] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
                setExtractedData(data.data);
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
                    items: []
                });
                setShowPreview(false);
                setSuccessMessage('Albarán guardado correctamente');
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
        </Box>
    );
};

export default DeliveryNoteUploader;
