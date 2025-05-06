import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './containers/ProductsPage';
import MenuPage from './containers/MenuPage';
import SuppliersPage from './containers/SuppliersPage';
import DeliveryNotesPage from './containers/DeliveryNotesPage';
import ClinicSelectionPage from './pages/ClinicSelectionPage';
import PatientsPage from './pages/PatientsPage';
import { ClinicProvider, useClinic } from './contexts/ClinicContext';

// Crear el tema de la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Crear el cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Componente que verifica si hay una clínica seleccionada
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { selectedClinic, loading } = useClinic();
  
  if (loading) {
    return null; // O un spinner de carga
  }
  
  if (!selectedClinic) {
    return <Navigate to="/select-clinic" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/select-clinic" element={<ClinicSelectionPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProductsPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="menus" element={<MenuPage />} />
          <Route path="proveedores" element={<SuppliersPage />} />
          <Route path="notas-de-entrega" element={<DeliveryNotesPage />} />
          <Route path="pacientes" element={<PatientsPage />} />
          <Route path="reportes" element={<div>Reportes (En desarrollo)</div>} />
          <Route path="configuracion" element={<div>Configuración (En desarrollo)</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ClinicProvider>
            <AppRoutes />
          </ClinicProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
