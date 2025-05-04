import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Warning as WarningIcon,
    Delete as DeleteIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { Product } from '../types/product';

interface ProductTableProps {
    products: Product[];
    onUpdateStock: (id: number, stock: number) => void;
    onUpdateMinimumStock: (id: number, minimumStock: number) => void;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    onUpdateStock,
    onUpdateMinimumStock,
    onEdit,
    onDelete,
    onAdd
}) => {
    const [editingStock, setEditingStock] = React.useState<{[key: number]: boolean}>({});
    const [editingMinStock, setEditingMinStock] = React.useState<{[key: number]: boolean}>({});
    const [stockValues, setStockValues] = React.useState<{[key: number]: string}>({});
    const [minStockValues, setMinStockValues] = React.useState<{[key: number]: string}>({});

    const handleStockEdit = (product: Product) => {
        setEditingStock(prev => ({ ...prev, [product.id]: true }));
        setStockValues(prev => ({ ...prev, [product.id]: product.actual_stock?.toString() || '' }));
    };

    const handleMinStockEdit = (product: Product) => {
        setEditingMinStock(prev => ({ ...prev, [product.id]: true }));
        setMinStockValues(prev => ({ ...prev, [product.id]: product.minimum_stock?.toString() || '' }));
    };

    const handleStockSave = (product: Product) => {
        const newStock = parseFloat(stockValues[product.id]);
        if (!isNaN(newStock)) {
            onUpdateStock(product.id, newStock);
            setEditingStock(prev => ({ ...prev, [product.id]: false }));
        }
    };

    const handleMinStockSave = (product: Product) => {
        const newMinStock = parseFloat(minStockValues[product.id]);
        if (!isNaN(newMinStock)) {
            onUpdateMinimumStock(product.id, newMinStock);
            setEditingMinStock(prev => ({ ...prev, [product.id]: false }));
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                >
                    Añadir Producto
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Formato</TableCell>
                            <TableCell>Stock Actual</TableCell>
                            <TableCell>Stock Mínimo</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Última Actualización</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography>
                                        {product.name}
                                        {product.actual_stock !== null && 
                                        product.minimum_stock !== null && 
                                        product.actual_stock <= product.minimum_stock && (
                                            <Tooltip title="Stock bajo">
                                                <WarningIcon color="warning" sx={{ ml: 1 }} />
                                            </Tooltip>
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell>{product.type_name}</TableCell>
                                <TableCell>{product.unit_quantity ? `${product.unit_quantity} ${product.base_unit_abbreviation || ''}` : 'N/A'}</TableCell>
                                <TableCell>
                                    {editingStock[product.id] ? (
                                        <TextField
                                            size="small"
                                            value={stockValues[product.id]}
                                            onChange={(e) => setStockValues(prev => ({ 
                                                ...prev, 
                                                [product.id]: e.target.value 
                                            }))}
                                            onBlur={() => handleStockSave(product)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleStockSave(product)}
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            {product.actual_stock ?? 'N/A'}
                                            <IconButton size="small" onClick={() => handleStockEdit(product)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingMinStock[product.id] ? (
                                        <TextField
                                            size="small"
                                            value={minStockValues[product.id]}
                                            onChange={(e) => setMinStockValues(prev => ({ 
                                                ...prev, 
                                                [product.id]: e.target.value 
                                            }))}
                                            onBlur={() => handleMinStockSave(product)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleMinStockSave(product)}
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            {product.minimum_stock ?? 'N/A'}
                                            <IconButton size="small" onClick={() => handleMinStockEdit(product)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>{product.price ? `${Number(product.price).toFixed(2)} €` : 'N/A'}</TableCell>
                                <TableCell>
                                    {product.last_count_date ? 
                                        new Date(product.last_count_date).toLocaleDateString() : 
                                        'Nunca'}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Editar producto">
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => onEdit(product)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar producto">
                                        <IconButton 
                                            color="error" 
                                            onClick={() => onDelete(product.id)}
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
        </>
    );
};

export default ProductTable;
