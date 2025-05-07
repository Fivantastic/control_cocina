import React, { useState, useEffect } from 'react';
import { useClinic } from '../contexts/ClinicContext';
import { 
  getPatientBreadAssignmentsTable, 
  PatientWithBreadAssignments,
  translateMealType,
  translateRestrictionType,
  deletePatient
} from '../services/patientService';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PatientForm from '../components/patients/PatientForm';

const PatientsPage: React.FC = () => {
  const { selectedClinic } = useClinic();
  const [patients, setPatients] = useState<PatientWithBreadAssignments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientWithBreadAssignments | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [patientToDelete, setPatientToDelete] = useState<PatientWithBreadAssignments | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatientBreadAssignmentsTable();
      setPatients(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Error al cargar los pacientes. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClinic?.id === 2) { // Solo para la clínica Korian Ita (ID 2)
      fetchPatients();
    } else {
      setPatients([]);
      setLoading(false);
    }
  }, [selectedClinic]);

  // Renderizar un color de celda basado en el código de color
  const renderColorCell = (mealType: string, patient: PatientWithBreadAssignments) => {
    const assignment = patient.breadAssignments[mealType];
    
    if (!assignment) {
      return <TableCell>-</TableCell>;
    }

    const isExtra = assignment.isExtra;
    const style = {
      backgroundColor: assignment.colorCode || '#ffffff',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'inline-block',
      border: '1px solid #ccc'
    };

    // Crear un componente que solo muestre el círculo de color y posiblemente 'EXT'
    return (
      <TableCell>
        <Tooltip title={assignment.description || ''}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              backgroundColor: assignment.colorCode || '#ffffff',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'inline-block',
              border: '1px solid #ccc'
            }}></div>
            {isExtra && (
              <Typography variant="caption" sx={{ ml: 1 }}>
                EXT
              </Typography>
            )}
          </div>
        </Tooltip>
      </TableCell>
    );
  };

  // Renderizar las restricciones dietéticas
  const renderRestrictions = (patient: PatientWithBreadAssignments) => {
    if (!patient.restrictions || patient.restrictions.length === 0) {
      return <Typography variant="body2">Sin restricciones</Typography>;
    }

    return (
      <Box>
        {patient.restrictions.map((restriction, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Chip 
              label={translateRestrictionType(restriction.restriction_type)} 
              size="small" 
              color={
                restriction.restriction_type === 'ALERGIAS' ? 'error' :
                restriction.restriction_type === 'INTOLERANCIAS' ? 'warning' : 'default'
              }
              sx={{ mr: 1, mb: 0.5 }}
            />
            <Typography variant="body2">{restriction.description}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const handleAddPatient = () => {
    setSelectedPatient(undefined);
    setFormOpen(true);
  };

  const handleEditPatient = (patient: PatientWithBreadAssignments) => {
    setSelectedPatient(patient);
    setFormOpen(true);
  };

  const handleDeletePatient = (patient: PatientWithBreadAssignments) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePatient = async () => {
    if (patientToDelete) {
      try {
        await deletePatient(patientToDelete.id);
        fetchPatients();
        setDeleteDialogOpen(false);
        setPatientToDelete(null);
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
        setError('Error al eliminar el paciente. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  if (selectedClinic?.id !== 2) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="info">
          La gestión de pacientes solo está disponible para la clínica Korian Ita.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Pacientes - {selectedClinic?.name}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddPatient}
        >
          Nuevo Paciente
        </Button>
      </Box>
      
      <Typography variant="subtitle1" gutterBottom>
        Sistema de codificación por colores para el pan y restricciones dietéticas
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Paciente</strong></TableCell>
                  <TableCell><strong>Desayuno</strong></TableCell>
                  <TableCell><strong>Tentempié</strong></TableCell>
                  <TableCell><strong>Comida</strong></TableCell>
                  <TableCell><strong>Merienda</strong></TableCell>
                  <TableCell><strong>Cena</strong></TableCell>
                  <TableCell><strong>Observaciones</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell><strong>{patient.name}</strong></TableCell>
                    {renderColorCell('breakfast', patient)}
                    {renderColorCell('morning_snack', patient)}
                    {renderColorCell('lunch', patient)}
                    {renderColorCell('afternoon_snack', patient)}
                    {renderColorCell('dinner', patient)}
                    <TableCell sx={{ maxWidth: 300 }}>
                      {renderRestrictions(patient)}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeletePatient(patient)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Leyenda de Colores
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Desayuno
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Rojo - 1 bollo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - 1 bollo y 1/2</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Azul - 2 bollos</Typography>
            </Box>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Merienda
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Rojo - Medio bollo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - Un poco más de la mitad del bollo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Azul - 1 bollo</Typography>
            </Box>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Almuerzo y Cena
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Rojo - Un poco menos de la mitad del bollo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - Medio bollo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>Azul - 1 bollo</Typography>
            </Box>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Extra
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
              <Typography variant="body2" sx={{ ml: 1 }}>EXT - No lleva pan ni en almuerzo ni cena</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Formulario para añadir/editar pacientes */}
      <PatientForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        patient={selectedPatient}
        onSave={fetchPatients}
      />

      {/* Diálogo de confirmación para eliminar pacientes */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar al paciente {patientToDelete?.name}? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDeletePatient} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientsPage;
