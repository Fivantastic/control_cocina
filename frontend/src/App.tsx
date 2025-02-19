import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './containers/ProductsPage';
import MenuPage from './containers/MenuPage';

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/menus" element={<MenuPage />} />
              <Route path="/reports" element={<div>Reportes (En desarrollo)</div>} />
              <Route path="/settings" element={<div>Configuración (En desarrollo)</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
