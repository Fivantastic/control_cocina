const fs = require('fs');
const path = require('path');
const pool = require('./database');

async function createMenuTables() {
    try {
        // Leer el archivo SQL
        const sql = fs.readFileSync(
            path.join(__dirname, 'create-menu-tables.sql'),
            'utf8'
        );

        // Dividir el contenido en declaraciones individuales
        const statements = sql
            .split(';')
            .filter(statement => statement.trim().length > 0);

        // Ejecutar cada declaración
        for (const statement of statements) {
            await pool.query(statement);
            console.log('Ejecutada declaración SQL:', statement.substring(0, 50) + '...');
        }

        console.log('Tablas de menús creadas exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear las tablas de menús:', error);
        process.exit(1);
    }
}

createMenuTables();
