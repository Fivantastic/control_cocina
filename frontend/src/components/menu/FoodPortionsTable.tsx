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
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import { 
  getFoodPortionsByDay, 
  getFoodTotals,
  PatientCountsByColor,
  FoodTotalsByType
} from '../../services/foodPortionsService';

interface FoodPortionsTableProps {
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  weekNumber: number;
}

const FoodPortionsTable: React.FC<FoodPortionsTableProps> = ({ dayOfWeek: initialDayOfWeek, weekNumber }) => {
  const [mealType, setMealType] = useState<'Comida' | 'Cena'>('Comida');
  const [dayOfWeek, setDayOfWeek] = useState<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'>(initialDayOfWeek);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [portionsData, setPortionsData] = useState<Record<string, any[]> | null>(null);
  const [patientCounts, setPatientCounts] = useState<PatientCountsByColor>({
    'Rojo': 0,
    'Amarillo': 0,
    'Azul': 0
  });
  const [totals, setTotals] = useState<FoodTotalsByType | null>(null);

  // Cargar las porciones de comida para el día y tipo de comida seleccionados
  useEffect(() => {
    const fetchPortions = async () => {
      try {
        setLoading(true);
        const data = await getFoodPortionsByDay(dayOfWeek, weekNumber, mealType);
        setPortionsData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching food portions:', err);
        setError('Error al cargar las porciones de comida. Por favor, inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortions();
  }, [dayOfWeek, weekNumber, mealType]);

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

  // Manejar el cambio en el conteo de pacientes
  const handlePatientCountChange = (color: string, value: string) => {
    const count = parseInt(value) || 0;
    setPatientCounts(prev => ({
      ...prev,
      [color]: count
    }));
  };

  // Calcular los totales de comida necesaria
  const calculateTotals = async () => {
    try {
      setLoading(true);
      const totalsData = await getFoodTotals(dayOfWeek, patientCounts, weekNumber, mealType);
      setTotals(totalsData);
      setError(null);
    } catch (err) {
      console.error('Error calculating food totals:', err);
      setError('Error al calcular los totales de comida. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar el cambio de tipo de comida (comida/cena)
  const handleMealTypeChange = (_: React.SyntheticEvent, newValue: 'Comida' | 'Cena') => {
    setMealType(newValue);
    setTotals(null); // Reiniciar los totales al cambiar el tipo de comida
  };

  if (loading && !portionsData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !portionsData) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!portionsData) {
    return <Alert severity="info">No hay información de porciones disponible.</Alert>;
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={mealType} onChange={handleMealTypeChange}>
              <Tab label="Comidas" value="Comida" />
              <Tab label="Cenas" value="Cena" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={dayOfWeek} 
              onChange={(_, newValue) => setDayOfWeek(newValue as 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo')}
            >
              <Tab label="Lunes" value="Lunes" />
              <Tab label="Martes" value="Martes" />
              <Tab label="Miércoles" value="Miércoles" />
              <Tab label="Jueves" value="Jueves" />
              <Tab label="Viernes" value="Viernes" />
              <Tab label="Sábado" value="Sábado" />
              <Tab label="Domingo" value="Domingo" />
            </Tabs>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Porciones de comida para {dayOfWeek} - Semana {weekNumber} - {mealType}
      </Typography>

      {/* Conteo de pacientes */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Número de pacientes por color
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                backgroundColor: '#FF0000', 
                mr: 1,
                border: '1px solid #ccc'
              }}></Box>
              <TextField
                label="Rojo"
                type="number"
                size="small"
                value={patientCounts.Rojo}
                onChange={(e) => handlePatientCountChange('Rojo', e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                backgroundColor: '#FFFF00', 
                mr: 1,
                border: '1px solid #ccc'
              }}></Box>
              <TextField
                label="Amarillo"
                type="number"
                size="small"
                value={patientCounts.Amarillo}
                onChange={(e) => handlePatientCountChange('Amarillo', e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                backgroundColor: '#0000FF', 
                mr: 1,
                border: '1px solid #ccc'
              }}></Box>
              <TextField
                label="Azul"
                type="number"
                size="small"
                value={patientCounts.Azul}
                onChange={(e) => handlePatientCountChange('Azul', e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={calculateTotals}
            disabled={loading}
          >
            Calcular totales
          </Button>
        </Box>
      </Paper>

      {/* Tabla de porciones individuales */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
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
            {Object.entries(portionsData).map(([portionType, portionsList]) => {
              // Ordenar por nombre de color para asegurar que aparezcan en el orden correcto
              const sortedPortions = [...portionsList].sort((a, b) => {
                const colorOrder: Record<string, number> = { 'Azul': 1, 'Amarillo': 2, 'Rojo': 3 };
                const colorA = a.colorName || '';
                const colorB = b.colorName || '';
                return (colorOrder[colorA] || 0) - (colorOrder[colorB] || 0);
              });

              // Crear un objeto para acceder fácilmente a las cantidades por color
              const quantitiesByColor: Record<string, string> = {};
              sortedPortions.forEach(portion => {
                if (portion.colorName) {
                  quantitiesByColor[portion.colorName] = `${portion.quantity} ${portion.unit}`;
                }
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

      {/* Tabla de totales */}
      {totals && (
        <Paper>
          <Typography variant="h6" sx={{ p: 2 }}>
            Totales de comida necesaria
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Tipo de Plato</strong></TableCell>
                  <TableCell><strong>Azul</strong></TableCell>
                  <TableCell><strong>Amarillo</strong></TableCell>
                  <TableCell><strong>Rojo</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totals && Object.entries(totals).map(([portionType, colorData]) => (
                  <TableRow key={portionType}>
                    <TableCell><strong>{translatePortionType(portionType)}</strong></TableCell>
                    <TableCell>
                      {colorData.Azul ? `${colorData.Azul.quantity} ${colorData.Azul.unit} × ${patientCounts.Azul}` : '-'}
                    </TableCell>
                    <TableCell>
                      {colorData.Amarillo ? `${colorData.Amarillo.quantity} ${colorData.Amarillo.unit} × ${patientCounts.Amarillo}` : '-'}
                    </TableCell>
                    <TableCell>
                      {colorData.Rojo ? `${colorData.Rojo.quantity} ${colorData.Rojo.unit} × ${patientCounts.Rojo}` : '-'}
                    </TableCell>
                    <TableCell>
                      <strong>{colorData.Total} {(colorData.Azul && colorData.Azul.unit) || (colorData.Amarillo && colorData.Amarillo.unit) || (colorData.Rojo && colorData.Rojo.unit) || 'gr'}</strong>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default FoodPortionsTable;
