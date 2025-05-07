import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';
import { getFoodPortions, FoodPortionsByType } from '../../services/foodPortionsService';

interface FoodPortionsLegendProps {
  showTitle?: boolean;
}

const FoodPortionsLegend: React.FC<FoodPortionsLegendProps> = ({ showTitle = true }) => {
  const [portions, setPortions] = useState<FoodPortionsByType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortions = async () => {
      try {
        setLoading(true);
        const data = await getFoodPortions();
        setPortions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching food portions:', err);
        setError('Error al cargar las porciones de comida. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortions();
  }, []);

  // Traducir el tipo de porción a español
  const translatePortionType = (portionType: string): string => {
    const translations: { [key: string]: string } = {
      '1ro': 'Primer plato',
      '2ndo': 'Segundo plato',
      'Acomp': 'Acompañamiento',
      'Postre': 'Postre'
    };
    return translations[portionType] || portionType;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!portions) {
    return <Alert severity="info">No hay información de porciones disponible.</Alert>;
  }

  return (
    <Box>
      {showTitle && (
        <Typography variant="h6" gutterBottom>
          Leyenda de Colores y Gramajes
        </Typography>
      )}
      
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Tipo de Plato</strong></TableCell>
              <TableCell><strong>Azul</strong></TableCell>
              <TableCell><strong>Amarillo</strong></TableCell>
              <TableCell><strong>Rojo</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(portions).map(([portionType, portionsList]) => {
              // Ordenar por nombre de color para asegurar que aparezcan en el orden correcto
              const sortedPortions = [...portionsList].sort((a, b) => {
                const colorOrder = { 'Azul': 1, 'Amarillo': 2, 'Rojo': 3 };
                return colorOrder[a.colorName as keyof typeof colorOrder] - colorOrder[b.colorName as keyof typeof colorOrder];
              });

              // Crear un objeto para acceder fácilmente a las cantidades por color
              const quantitiesByColor: { [key: string]: string } = {};
              sortedPortions.forEach(portion => {
                quantitiesByColor[portion.colorName] = `${portion.quantity} ${portion.unit}`;
              });

              return (
                <TableRow key={portionType}>
                  <TableCell><strong>{translatePortionType(portionType)}</strong></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        backgroundColor: '#0000FF', 
                        mr: 1,
                        border: '1px solid #ccc'
                      }}></Box>
                      {quantitiesByColor['Azul'] || '-'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        backgroundColor: '#FFFF00', 
                        mr: 1,
                        border: '1px solid #ccc'
                      }}></Box>
                      {quantitiesByColor['Amarillo'] || '-'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        backgroundColor: '#FF0000', 
                        mr: 1,
                        border: '1px solid #ccc'
                      }}></Box>
                      {quantitiesByColor['Rojo'] || '-'}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FoodPortionsLegend;
