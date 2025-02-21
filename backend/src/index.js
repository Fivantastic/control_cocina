require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./utils/db');
const productRoutes = require('./routes/productRoutes');
const menuRoutes = require('./routes/menuRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const deliveryNoteRoutes = require('./routes/deliveryNoteRoutes');
const stockMovementRoutes = require('./routes/stockMovements');
const menuStockRoutes = require('./routes/menuStock');
const deliveryNoteUploadRoutes = require('./routes/deliveryNoteUpload');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // URL del frontend
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Kitchen Manager API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      lowStock: '/api/products/low-stock',
      search: '/api/products/search?query=term',
      byType: '/api/products/type/:typeId',
      byId: '/api/products/:id',
      updateStock: '/api/products/:id/stock',
      suppliers: '/api/suppliers',
      deliveryNotes: '/api/delivery-notes',
      updateMinimumStock: '/api/products/:id/minimum-stock',
      menu: {
        byWeek: '/api/menu/week/:weekNumber',
        allWeeks: '/api/menu/weeks'
      }
    }
  });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/delivery-notes', deliveryNoteRoutes);
app.use('/api/delivery-notes-upload', deliveryNoteUploadRoutes);
app.use('/api/stock', stockMovementRoutes);
app.use('/api/menu-stock', menuStockRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

// Probar la conexión a la base de datos antes de iniciar el servidor
async function startServer() {
  try {
    // Probar la conexión a la base de datos
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('No se pudo conectar a la base de datos. Cerrando la aplicación...');
      process.exit(1);
    }

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
