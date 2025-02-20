import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { SxProps, Theme } from '@mui/material/styles';
import { DeliveryNote } from '../../types/deliveryNote';
import { deliveryNoteService } from '../../services/api';
import DeliveryNoteModal from './DeliveryNoteModal';
import DeliveryNoteDetails from './DeliveryNoteDetails';

function DeliveryNoteList() {
    const tableStyles: SxProps<Theme> = {
        minWidth: 650,
        '& .actions': {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1
        }
    };
    const [deliveryNotes, setDeliveryNotes] = useState<Array<DeliveryNote>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedDeliveryNote, setSelectedDeliveryNote] = useState<DeliveryNote | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (value: Date | null): void => {
        setStartDate(value);
    };

    const handleEndDateChange = (value: Date | null): void => {
        setEndDate(value);
    };

    const loadDeliveryNotes = async (): Promise<void> => {
        try {
            setLoading(true);
            let data: Array<DeliveryNote> = [];
            if (startDate && endDate) {
                try {
                    data = await deliveryNoteService.getDeliveryNotesByDateRange(
                        format(startDate, 'yyyy-MM-dd'),
                        format(endDate, 'yyyy-MM-dd')
                    );
                } catch (err) {
                    console.error('Error al filtrar por fechas:', err);
                    setError('Error al filtrar por fechas');
                    return;
                }
            } else {
                try {
                    data = await deliveryNoteService.getAllDeliveryNotes();
                } catch (err) {
                    console.error('Error al cargar los albaranes:', err);
                    setError('Error al cargar los albaranes');
                    return;
                }
            }
            setDeliveryNotes(data);
            setError(null);
        } catch (err) {
            setError('Error inesperado al cargar los albaranes');
            console.error('Error inesperado:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeliveryNotes();
    }, [startDate, endDate]);

    const handleAddClick = (): void => {
        setSelectedDeliveryNote(null);
        setModalOpen(true);
    };

    const handleEditClick = (deliveryNote: DeliveryNote): void => {
        setSelectedDeliveryNote(deliveryNote);
        setModalOpen(true);
    };

    const handleViewClick = (deliveryNote: DeliveryNote): void => {
        setSelectedDeliveryNote(deliveryNote);
        setDetailsOpen(true);
    };

    const handleDeleteClick = async (id: number): Promise<void> => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este albarán?')) {
            try {
                await deliveryNoteService.deleteDeliveryNote(id);
                await loadDeliveryNotes();
            } catch (err) {
                setError('Error al eliminar el albarán');
                console.error(err);
            }
        }
    };

    const handleModalClose = (): void => {
        setModalOpen(false);
        setSelectedDeliveryNote(null);
    };

    const handleDetailsClose = (): void => {
        setDetailsOpen(false);
        setSelectedDeliveryNote(null);
    };

    const handleDeliveryNoteSave = async (): Promise<void> => {
        await loadDeliveryNotes();
        handleModalClose();
    };

    if (loading) return <Box p={3}>Cargando albaranes...</Box>;
    if (error) return <Box p={3} color="error.main">{error}</Box>;

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" component="h2">
                    Albaranes
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Nuevo Albarán
                </Button>
            </Box>

            <Box mb={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box display="flex" gap={2}>
                        <Box sx={{ width: '50%' }}>
                            <DatePicker
                                label="Fecha inicio"
                                value={startDate}
                                onChange={handleStartDateChange}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'small'
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <DatePicker
                                label="Fecha fin"
                                value={endDate}
                                onChange={handleEndDateChange}
                                format="dd/MM/yyyy"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: 'small'
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </LocalizationProvider>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={tableStyles}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nº Albarán</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deliveryNotes.map((note) => (
                            <TableRow key={note.id}>
                                <TableCell>{note.supplier_delivery_note_number}</TableCell>
                                <TableCell>{note.supplier_name}</TableCell>
                                <TableCell>{new Date(note.delivery_date).toLocaleDateString()}</TableCell>
                                <TableCell>{note.total_amount.toFixed(2)} €</TableCell>
                                <TableCell className="actions">
                                    <Tooltip title="Ver detalles">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleViewClick(note)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditClick(note)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteClick(note.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <DeliveryNoteModal
                open={modalOpen}
                deliveryNote={selectedDeliveryNote}
                onClose={handleModalClose}
                onSave={handleDeliveryNoteSave}
            />

            <DeliveryNoteDetails
                open={detailsOpen}
                deliveryNote={selectedDeliveryNote}
                onClose={handleDetailsClose}
            />
        </Box>
    );
};

export default DeliveryNoteList;
