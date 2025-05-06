import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import ClinicSelector from '../components/ClinicSelector';
import { useClinic } from '../contexts/ClinicContext';
import { Navigate } from 'react-router-dom';

const ClinicSelectionPage: React.FC = () => {
  const { selectedClinic } = useClinic();

  // Si ya hay una clínica seleccionada, redirigir al dashboard
  if (selectedClinic) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'white'
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h3" component="h1" gutterBottom>
              Kitchen Manager
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Sistema de Gestión de Cocina
            </Typography>
          </Box>
          
          <ClinicSelector />
          
          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Selecciona una clínica para comenzar a gestionar su cocina
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ClinicSelectionPage;
