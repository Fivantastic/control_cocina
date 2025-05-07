import express from 'express';
import cors from 'cors';
import { serverConfig } from './config/env.js';
import { testConnection } from './utils/db.js';
import productRoutes from './routes/productRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import deliveryNoteRoutes from './routes/deliveryNoteRoutes.js';
import stockMovementRoutes from './routes/stockMovements.js';
import menuStockRoutes from './routes/menuStock.js';
import deliveryNoteUploadRoutes from './routes/deliveryNoteUpload.js';
import clinicRoutes from './routes/clinicRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import foodPortionsRoutes from './routes/foodPortionsRoutes.js';
import { extractClinicIdSimple } from './middleware/clinicMiddleware.js';
import { initializeParsers } from './parsers/initParsers.js';

const app = express();

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Permitir solicitudes sin origen (como las solicitudes móviles o curl)
        if (!origin) return callback(null, true);
        // Permitir localhost y 127.0.0.1 en cualquier puerto
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        // Rechazar otras solicitudes
        callback(new Error('Not allowed by CORS'));
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware para manejar la selección de clínica
app.use(extractClinicIdSimple);

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
app.use('/api/clinics', clinicRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/food-portions', foodPortionsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Probar la conexión a la base de datos antes de iniciar el servidor
async function startServer() {
  try {
    // Inicializar los parsers
    initializeParsers();
    // Probar la conexión a la base de datos
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('No se pudo conectar a la base de datos. Cerrando la aplicación...');
      process.exit(1);
    }

    // Iniciar el servidor
    app.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
      console.log(`API documentation available at http://localhost:${serverConfig.port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
