import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../utils/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    try {
        console.log('Iniciando migración para soporte de múltiples clínicas...');
        
        // Leer el archivo SQL
        const sqlFilePath = path.join(__dirname, 'add_clinics_support.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        // Dividir el SQL en comandos individuales
        const commands = sql
            .split(';')
            .filter(command => command.trim() !== '')
            .map(command => command.trim() + ';');
        
        // Ejecutar cada comando
        for (const command of commands) {
            console.log(`Ejecutando: ${command.substring(0, 50)}...`);
            try {
                await pool.query(command);
                console.log('Comando ejecutado correctamente');
            } catch (err) {
                // Si el error es por una columna que ya existe, continuamos
                if (err.code === 'ER_DUP_FIELDNAME') {
                    console.log('La columna ya existe, continuando...');
                } else {
                    throw err;
                }
            }
        }
        
        console.log('Migración completada exitosamente');
    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        // Cerrar la conexión al finalizar
        pool.end();
    }
}

runMigration();
