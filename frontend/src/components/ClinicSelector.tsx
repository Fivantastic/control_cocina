import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  CircularProgress,
  Container,
  Paper
} from '@mui/material';
import { useClinic } from '../contexts/ClinicContext';

const ClinicSelector: React.FC = () => {
  const { clinics, selectedClinic, loading, error, setSelectedClinic } = useClinic();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Selecciona una Clínica
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Elige la clínica con la que deseas trabajar
          </Typography>
          
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            {clinics.map((clinic) => (
              <Grid item xs={12} sm={6} key={clinic.id}>
                <Card 
                  raised={selectedClinic?.id === clinic.id}
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: selectedClinic?.id === clinic.id ? 'scale(1.03)' : 'scale(1)',
                    border: selectedClinic?.id === clinic.id ? '2px solid #1976d2' : 'none',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                  onClick={() => setSelectedClinic(clinic)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {clinic.name}
                    </Typography>
                    {clinic.address && (
                      <Typography variant="body2" color="text.secondary">
                        {clinic.address}
                      </Typography>
                    )}
                    <Box display="flex" justifyContent="center" mt={2}>
                      <Button 
                        variant={selectedClinic?.id === clinic.id ? "contained" : "outlined"}
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClinic(clinic);
                        }}
                      >
                        {selectedClinic?.id === clinic.id ? "Seleccionada" : "Seleccionar"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ClinicSelector;
