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
  Alert,
  Tabs,
  Tab,
  Grid,
  Divider,
  Button
} from '@mui/material';
import { 
  getPatientMealsReport,
  PatientMealsReport as PatientMealsReportType
} from '../../services/foodPortionsService';

// Tipo para la información de unidades de los platos
interface DishUnitTypes {
  [key: string]: boolean;
}

interface PatientMealsReportProps {
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  weekNumber: number;
}

const PatientMealsReport: React.FC<PatientMealsReportProps> = ({ dayOfWeek: initialDayOfWeek, weekNumber }) => {
  const [mealType, setMealType] = useState<'Comida' | 'Cena'>('Comida');
  const [dayOfWeek, setDayOfWeek] = useState<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'>(initialDayOfWeek);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<PatientMealsReportType | null>(null);
  const [dishUnitTypes, setDishUnitTypes] = useState<DishUnitTypes>({});

  // Cargar el informe de comidas por paciente
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getPatientMealsReport(dayOfWeek, weekNumber, mealType);
        setReport(data);
        // Guardar la información sobre qué platos se miden por unidades
        if (data.dishUnitTypes) {
          setDishUnitTypes(data.dishUnitTypes);
        }
        setError(null);
      } catch (err: any) { 
        console.error('Error fetching patient meals report:', err);
        // Si el error es específico para días sin datos, mostrar un mensaje más amigable
        if (err?.response && err.response.status === 404) {
          setError(`No hay datos disponibles para ${dayOfWeek} en la semana ${weekNumber}.`);
        } else {
          setError('Error al cargar el informe de comidas por paciente. Por favor, inténtelo de nuevo más tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [dayOfWeek, weekNumber, mealType]);

  // Manejar el cambio de tipo de comida (comida/cena)
  const handleMealTypeChange = (_: React.SyntheticEvent, newValue: 'Comida' | 'Cena') => {
    setMealType(newValue);
  };

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

  // Imprimir el informe
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="info">{error}</Alert>;
  }

  if (!report) {
    return <Alert severity="info">No hay información disponible para {dayOfWeek} en la semana {weekNumber}. Por favor, seleccione otro día o verifique que existan datos para este día.</Alert>;
  }

  return (
    <Box className="patient-meals-report">
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={mealType} onChange={handleMealTypeChange}>
              <Tab label="Comidas" value="Comida" />
              <Tab label="Cenas" value="Cena" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={dayOfWeek} 
              onChange={(_, newValue) => setDayOfWeek(newValue as 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo')}
              variant="fullWidth"
              aria-label="días de la semana"
            >
              <Tab label="Lunes" value="Lunes" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Martes" value="Martes" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Miércoles" value="Miércoles" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Jueves" value="Jueves" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Viernes" value="Viernes" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Sábado" value="Sábado" sx={{ minWidth: 0, px: 1 }} />
              <Tab label="Domingo" value="Domingo" sx={{ minWidth: 0, px: 1 }} />
            </Tabs>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Informe de Comidas por Paciente - {dayOfWeek} - Semana {weekNumber} - {mealType}
        </Typography>
        <Button 
          variant="contained" 
          onClick={handlePrint}
          sx={{ '@media print': { display: 'none' } }}
        >
          Imprimir
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Paciente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Color</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>{translatePortionType('1ro')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>{translatePortionType('2ndo')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>{translatePortionType('Acomp')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>{translatePortionType('Postre')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.patients.map((patient, index) => (
              <TableRow 
                key={`patient-${patient.id || 'testigo'}-${index}`}
                sx={{ 
                  backgroundColor: patient.name === 'MUESTRA TESTIGO' ? '#e3f2fd' : 'inherit',
                  fontWeight: patient.name === 'MUESTRA TESTIGO' ? 'bold' : 'normal'
                }}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      backgroundColor: patient.color === 'Rojo' ? '#FF0000' : 
                                      patient.color === 'Amarillo' ? '#FFFF00' : 
                                      patient.color === 'Azul' ? '#0000FF' : '#CCCCCC', 
                      mr: 1,
                      border: '1px solid #ccc'
                    }}></Box>
                    {patient.color}
                  </Box>
                </TableCell>
                <TableCell>
                  {patient.meals['1ro'] ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {patient.meals['1ro'].dishName}
                      </Typography>
                      <Typography variant="body2">
                        {patient.meals['1ro'].quantity} {patient.meals['1ro'].unit}
                      </Typography>
                    </Box>
                  ) : '-'}
                </TableCell>
                <TableCell>
                  {patient.meals['2ndo'] ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {patient.meals['2ndo'].dishName}
                      </Typography>
                      <Typography variant="body2">
                        {patient.meals['2ndo'].quantity} {patient.meals['2ndo'].unit}
                      </Typography>
                    </Box>
                  ) : '-'}
                </TableCell>
                <TableCell>
                  {patient.meals['Acomp'] ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {patient.meals['Acomp'].dishName}
                      </Typography>
                      <Typography variant="body2">
                        {patient.meals['Acomp'].quantity} {patient.meals['Acomp'].unit}
                      </Typography>
                    </Box>
                  ) : '-'}
                </TableCell>
                <TableCell>
                  {patient.meals['Postre'] ? (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {patient.meals['Postre'].dishName}
                      </Typography>
                      <Typography variant="body2">
                        {patient.meals['Postre'].quantity} {patient.meals['Postre'].unit}
                      </Typography>
                    </Box>
                  ) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Totales de Comida Necesaria
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(report.totals).map(([portionType, total]) => (
            <Grid item xs={12} sm={6} md={3} key={portionType}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {translatePortionType(portionType)}
                </Typography>
                <Typography variant="h4">
                  {total.quantity} {total.unit}
                </Typography>
                {dishUnitTypes[portionType] && (
                  <Typography variant="caption" color="text.secondary">
                    (Se mide por unidades)
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}

        </Grid>
      </Paper>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Divider />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          * La muestra testigo (color azul) se guarda diariamente para posibles análisis.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          * Los platos como jamoncitos, hamburguesas, filetes, etc. se miden por unidades (u) en lugar de gramos (gr).
        </Typography>
        <Typography variant="body2" color="text.secondary">
          * Este informe fue generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}.
        </Typography>
      </Box>

      {/* Estilos de impresión */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white;
          }
          .patient-meals-report {
            padding: 20px;
          }
        }
      `}} />
    </Box>
  );
};

export default PatientMealsReport;
