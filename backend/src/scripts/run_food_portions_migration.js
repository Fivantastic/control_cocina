import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConfig } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  let connection;
  
  try {
    // Crear conexión a la base de datos
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida');
    
    // Verificar si la tabla ya existe
    console.log('Verificando si la tabla food_portions existe...');
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'food_portions'",
      [dbConfig.database]
    );
    
    if (tables.length > 0) {
      // La tabla ya existe, eliminarla para recrearla
      console.log('La tabla food_portions ya existe, eliminándola...');
      await connection.query('DROP TABLE IF EXISTS food_portions');
      console.log('Tabla food_portions eliminada correctamente');
    }
    
    // Leer el archivo SQL para crear la tabla
    const createTablePath = path.join(__dirname, '../migrations/create_food_portions_table.sql');
    const createTableSql = fs.readFileSync(createTablePath, 'utf8');
    
    // Ejecutar el script para crear la tabla
    console.log('Creando tabla food_portions...');
    await connection.query(createTableSql);
    console.log('Tabla food_portions creada correctamente');
    
    // Verificar los IDs de los colores en la tabla bread_color_codes
    console.log('Verificando IDs de colores en la tabla bread_color_codes...');
    const [colors] = await connection.query(
      "SELECT id, color_name FROM bread_color_codes WHERE color_name IN ('Azul', 'Amarillo', 'Rojo')"
    );
    
    if (colors.length < 3) {
      console.log('ADVERTENCIA: No se encontraron todos los colores necesarios en la tabla bread_color_codes');
      console.log('Asegúrese de que existan los colores Azul, Amarillo y Rojo en la tabla bread_color_codes');
      console.log('Colores encontrados:', colors.map(c => `${c.id}: ${c.color_name}`).join(', '));
    } else {
      console.log('Colores encontrados correctamente:', colors.map(c => `${c.id}: ${c.color_name}`).join(', '));
    }
    
    // Leer el archivo SQL para insertar datos
    const insertDataPath = path.join(__dirname, '../migrations/insert_food_portions_data.sql');
    const insertDataSql = fs.readFileSync(insertDataPath, 'utf8');
    
    // Ejecutar el script para insertar datos
    console.log('Insertando datos de la semana 1 en la tabla food_portions...');
    
    // Dividir el script SQL en sentencias individuales para mejor manejo de errores
    const statements = insertDataSql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i] + ';';
      try {
        await connection.query(stmt);
        if (i % 3 === 0) { // Mostrar progreso cada 3 sentencias
          process.stdout.write('.');
        }
      } catch (error) {
        console.error(`\nError en la sentencia SQL #${i + 1}:`, error.message);
        console.error('Sentencia SQL con error:', stmt.substring(0, 150) + '...');
        throw error; // Propagar el error para detener la migración
      }
    }
    
    console.log('\nDatos insertados correctamente en la tabla food_portions');
    
    // Verificar la cantidad de registros insertados
    const [count] = await connection.query('SELECT COUNT(*) as total FROM food_portions');
    console.log(`Total de registros insertados: ${count[0].total}`);
    
    console.log('Migración completada con éxito');
  } catch (error) {
    console.error('Error al ejecutar la migración:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexión a la base de datos cerrada');
    }
  }
}

runMigration();
