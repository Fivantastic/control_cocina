import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Patient, BreadColorCode, createPatient, updatePatient, getBreadColorCodes, assignBreadColor } from '../../services/patientService';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface PatientFormProps {
  open: boolean;
  onClose: () => void;
  patient?: Patient;
  onSave: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ open, onClose, patient, onSave }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [breadColors, setBreadColors] = useState<BreadColorCode[]>([]);
  const [newRestriction, setNewRestriction] = useState({ type: 'ALERGIAS', description: '' });
  const [restrictions, setRestrictions] = useState<{ type: string; description: string }[]>([]);
  const [mealAssignments, setMealAssignments] = useState<{
    [key: string]: { colorId: number; isExtra: boolean }
  }>({
    breakfast: { colorId: 0, isExtra: false },
    morning_snack: { colorId: 0, isExtra: false },
    lunch: { colorId: 0, isExtra: false },
    afternoon_snack: { colorId: 0, isExtra: false },
    dinner: { colorId: 0, isExtra: false }
  });

  useEffect(() => {
    const fetchBreadColors = async () => {
      try {
        const colors = await getBreadColorCodes();
        setBreadColors(colors);
      } catch (error) {
        console.error('Error al cargar colores de pan:', error);
      }
    };

    fetchBreadColors();

    if (patient) {
      setName(patient.name);
      setNotes(patient.notes || '');
      
      // Cargar restricciones existentes
      if (patient.restrictions) {
        setRestrictions(
          patient.restrictions.map(r => ({
            type: r.restriction_type,
            description: r.description
          }))
        );
      }

      // Cargar asignaciones de pan existentes
      if (patient.breadAssignments) {
        const assignments: any = {};
        
        Object.keys(patient.breadAssignments).forEach(mealType => {
          const assignment = patient.breadAssignments?.[mealType];
          if (assignment) {
            const colorId = breadColors.find(c => c.color_name === assignment.colorName)?.id || 0;
            assignments[mealType] = {
              colorId,
              isExtra: assignment.isExtra
            };
          }
        });

        setMealAssignments({
          ...mealAssignments,
          ...assignments
        });
      }
    }
  }, [patient, open]);

  const handleSave = async () => {
    try {
      let savedPatient;
      
      if (patient) {
        // Actualizar paciente existente
        savedPatient = await updatePatient(patient.id, name, notes);
      } else {
        // Crear nuevo paciente
        savedPatient = await createPatient(name, notes);
      }

      // Si tenemos un ID de paciente, guardar asignaciones de pan
      if (savedPatient && savedPatient.id) {
        // Guardar asignaciones de pan para cada comida
        await Promise.all(
          Object.keys(mealAssignments).map(mealType => {
            const assignment = mealAssignments[mealType];
            if (assignment.colorId > 0) {
              return assignBreadColor(
                savedPatient.id,
                mealType,
                assignment.colorId,
                assignment.isExtra
              );
            }
            return Promise.resolve();
          })
        );
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error al guardar paciente:', error);
    }
  };

  const handleAddRestriction = () => {
    if (newRestriction.description.trim()) {
      setRestrictions([...restrictions, { ...newRestriction }]);
      setNewRestriction({ ...newRestriction, description: '' });
    }
  };

  const handleRemoveRestriction = (index: number) => {
    const newRestrictions = [...restrictions];
    newRestrictions.splice(index, 1);
    setRestrictions(newRestrictions);
  };

  const handleMealAssignmentChange = (mealType: string, field: 'colorId' | 'isExtra', value: any) => {
    setMealAssignments({
      ...mealAssignments,
      [mealType]: {
        ...mealAssignments[mealType],
        [field]: value
      }
    });
  };

  const translateMealType = (mealType: string): string => {
    const translations: { [key: string]: string } = {
      'breakfast': 'Desayuno',
      'morning_snack': 'Tentempié',
      'lunch': 'Comida',
      'afternoon_snack': 'Merienda',
      'dinner': 'Cena'
    };
    return translations[mealType] || mealType;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{patient ? 'Editar Paciente' : 'Nuevo Paciente'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Notas"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Asignaciones de Pan
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(mealAssignments).map((mealType) => (
              <Grid item xs={12} sm={6} md={4} key={mealType}>
                <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
                  <Typography variant="subtitle1">{translateMealType(mealType)}</Typography>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel>Color de Pan</InputLabel>
                    <Select
                      value={mealAssignments[mealType].colorId}
                      onChange={(e) => handleMealAssignmentChange(mealType, 'colorId', e.target.value)}
                      label="Color de Pan"
                    >
                      <MenuItem value={0}>Sin asignar</MenuItem>
                      {breadColors.map((color) => (
                        <MenuItem key={color.id} value={color.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 20, 
                                height: 20, 
                                borderRadius: '50%', 
                                backgroundColor: color.color_code,
                                mr: 1,
                                border: '1px solid #ccc'
                              }} 
                            />
                            {color.color_name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mealAssignments[mealType].isExtra}
                        onChange={(e) => handleMealAssignmentChange(mealType, 'isExtra', e.target.checked)}
                      />
                    }
                    label="Extra (No lleva pan)"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Restricciones Dietéticas
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={newRestriction.type}
                    onChange={(e) => setNewRestriction({ ...newRestriction, type: e.target.value as string })}
                    label="Tipo"
                  >
                    <MenuItem value="ALERGIAS">Alergias</MenuItem>
                    <MenuItem value="INTOLERANCIAS">Intolerancias</MenuItem>
                    <MenuItem value="PREFERENCIAS">Preferencias</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  label="Descripción"
                  value={newRestriction.description}
                  onChange={(e) => setNewRestriction({ ...newRestriction, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRestriction}
                  startIcon={<AddIcon />}
                  fullWidth
                >
                  Añadir
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 2 }}>
            {restrictions.map((restriction, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chip
                  label={restriction.type}
                  color={
                    restriction.type === 'ALERGIAS' ? 'error' :
                    restriction.type === 'INTOLERANCIAS' ? 'warning' : 'default'
                  }
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {restriction.description}
                </Typography>
                <IconButton size="small" onClick={() => handleRemoveRestriction(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={!name.trim()}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;
