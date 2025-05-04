import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ocrService from './services/ocrService.js';

// Configurar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde la raíz del proyecto
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Verificar que las variables de entorno se cargaron correctamente
console.log('OCR_API_KEY:', process.env.OCR_API_KEY ? 'Configurada' : 'No configurada');
console.log('USE_MISTRAL_OCR:', process.env.USE_MISTRAL_OCR);

// Función principal
async function testOCRSpace() {
    console.log('Iniciando prueba de OCR con OCR.space...');
    
    // Ruta a la imagen de prueba
    const testImagePath = path.join(__dirname, '..', '..', 'docs', 'disbesa_albaran.jpeg');
    console.log(`Usando imagen de prueba: ${testImagePath}`);
    
    // Leer la imagen
    const imageBuffer = fs.readFileSync(testImagePath);
    console.log(`Imagen leída correctamente, tamaño: ${imageBuffer.length} bytes`);
    
    try {
        console.log('Procesando imagen con OCR.space...');
        const result = await ocrService.processImage(imageBuffer);
        
        console.log('\n===== RESULTADOS DEL OCR =====');
        console.log(JSON.stringify(result, null, 2));
        console.log('==============================\n');
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
    }
    
    console.log('Prueba de OCR completada');
}

// Ejecutar la prueba
testOCRSpace();
