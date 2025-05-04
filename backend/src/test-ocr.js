import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mistralOcrService from './services/mistralOcrService.js';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a una imagen de prueba
const testImagePath = path.join(__dirname, '..', '..', 'docs', 'disbesa_albaran.jpeg');

// Función principal de prueba
async function testOCR() {
    console.log('Iniciando prueba de OCR con Mistral...');
    console.log(`Usando imagen de prueba: ${testImagePath}`);
    
    try {
        // Verificar que la imagen existe
        if (!fs.existsSync(testImagePath)) {
            console.error(`Error: La imagen de prueba no existe en la ruta ${testImagePath}`);
            return;
        }
        
        // Leer la imagen
        const imageBuffer = fs.readFileSync(testImagePath);
        console.log(`Imagen leída correctamente, tamaño: ${imageBuffer.length} bytes`);
        
        // Procesar la imagen con el servicio OCR
        console.log('Procesando imagen con Mistral OCR...');
        const result = await mistralOcrService.processImage(imageBuffer);
        
        // Mostrar resultados
        console.log('\n===== RESULTADOS DEL OCR =====');
        console.log(JSON.stringify(result, null, 2));
        console.log('==============================\n');
        
    } catch (error) {
        console.error('Error durante la prueba de OCR:', error);
    }
}

// Ejecutar la prueba
testOCR().then(() => {
    console.log('Prueba de OCR completada');
}).catch(error => {
    console.error('Error en la prueba de OCR:', error);
});
