import React, { useEffect, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Supplier } from '../../types/supplier';
import { supplierService } from '../../services/api';
import SupplierModal from './SupplierModal';

const SupplierList: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const loadSuppliers = async () => {
        try {
            setLoading(true);
            const data = await supplierService.getAllSuppliers();
            setSuppliers(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los proveedores');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleAddClick = () => {
        setSelectedSupplier(null);
        setModalOpen(true);
    };

    const handleEditClick = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
            try {
                await supplierService.deleteSupplier(id);
                await loadSuppliers();
            } catch (err) {
                setError('Error al eliminar el proveedor');
                console.error(err);
            }
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedSupplier(null);
    };

    const handleSupplierSave = async () => {
        await loadSuppliers();
        handleModalClose();
    };

    if (loading) return <Box p={3}>Cargando proveedores...</Box>;
    if (error) return <Box p={3} color="error.main">{error}</Box>;

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" component="h2">
                    Proveedores
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Añadir Proveedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Comercial</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.code}</TableCell>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.type}</TableCell>
                                <TableCell>{supplier.contact_phone}</TableCell>
                                <TableCell>{supplier.sales_rep_name}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditClick(supplier)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteClick(supplier.id)}
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

            <SupplierModal
                open={modalOpen}
                supplier={selectedSupplier}
                onClose={handleModalClose}
                onSave={handleSupplierSave}
            />
        </Box>
    );
};

export default SupplierList;
