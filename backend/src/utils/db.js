import mysql from 'mysql2/promise';
import { dbConfig } from '../config/env.js';

const pool = mysql.createPool(dbConfig);


// Función para probar la conexión
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        return false;
    }
};

// Exportar tanto el pool como la función de prueba
export {
    pool,
    testConnection
};
