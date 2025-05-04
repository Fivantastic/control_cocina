// Prueba de la API de OCR de Mistral usando una URL pública
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import FormData from 'form-data';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sube una imagen a imgbb.com y devuelve la URL
 * @param {string} imagePath - Ruta a la imagen local
 * @returns {Promise<string>} - URL pública de la imagen
 */
async function uploadImageToImgBB(imagePath) {
    try {
        const apiKey = process.env.IMGBB_API_KEY;
        if (!apiKey) {
            throw new Error('IMGBB_API_KEY no está configurada en el archivo .env');
        }

        // Leer la imagen y convertirla a base64
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        // Crear FormData para la solicitud
        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('image', base64Image);

        // Enviar solicitud a imgbb.com
        console.log('Subiendo imagen a imgbb.com...');
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al subir la imagen: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('Imagen subida correctamente');
        
        // Devolver la URL de la imagen
        return data.data.url;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
}

/**
 * Procesa una imagen con la API de OCR de Mistral usando una URL
 * @param {string} imageUrl - URL de la imagen
 * @returns {Promise<object>} - Respuesta de la API de OCR
 */
async function processImageWithOCR(imageUrl) {
    try {
        const apiKey = process.env.MISTRAL_API_KEY;
        if (!apiKey) {
            throw new Error('MISTRAL_API_KEY no está configurada en el archivo .env');
        }

        console.log(`Procesando imagen desde URL: ${imageUrl}`);
        
        // Enviar solicitud a la API de OCR de Mistral
        const response = await fetch('https://api.mistral.ai/v1/ocr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-ocr-latest',
                document: {
                    type: 'image_url',
                    image_url: imageUrl
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la API de OCR: ${JSON.stringify(errorData)}`);
        }

        const ocrResponse = await response.json();
        console.log('Respuesta de OCR recibida');
        
        return ocrResponse;
    } catch (error) {
        console.error('Error al procesar la imagen con OCR:', error);
        throw error;
    }
}

/**
 * Prueba la API de OCR de Mistral con la imagen de ejemplo
 */
async function testWithExampleImage() {
    try {
        console.log('\n=== PRUEBA CON IMAGEN DE EJEMPLO DE MISTRAL ===');
        
        // URL de la imagen de ejemplo de Mistral
        const imageUrl = 'https://raw.githubusercontent.com/mistralai/cookbook/refs/heads/main/mistral/ocr/receipt.png';
        
        // Procesar la imagen con la API de OCR
        const result = await processImageWithOCR(imageUrl);
        
        // Mostrar el resultado
        console.log('Resultado del procesamiento:');
        console.log(JSON.stringify(result, null, 2));
        
        // Guardar el resultado en un archivo
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        const resultPath = path.join(resultDir, 'example_image_result.json');
        fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
        console.log(`Resultado guardado en: ${resultPath}`);
        
        return result;
    } catch (error) {
        console.error('Error en la prueba con imagen de ejemplo:', error);
        throw error;
    }
}

/**
 * Prueba la API de OCR de Mistral con una imagen local subida a imgbb.com
 */
async function testWithLocalImage() {
    try {
        console.log('\n=== PRUEBA CON IMAGEN LOCAL SUBIDA A IMGBB ===');
        
        // Ruta a la imagen local
        const imagePath = path.join(__dirname, '../../../docs/albaran_logirest.jpeg');
        
        // Verificar que la imagen existe
        if (!fs.existsSync(imagePath)) {
            throw new Error(`La imagen no existe en la ruta ${imagePath}`);
        }
        
        // Subir la imagen a imgbb.com
        const imageUrl = await uploadImageToImgBB(imagePath);
        console.log(`Imagen subida a: ${imageUrl}`);
        
        // Procesar la imagen con la API de OCR
        const result = await processImageWithOCR(imageUrl);
        
        // Mostrar el resultado
        console.log('Resultado del procesamiento:');
        console.log(JSON.stringify(result, null, 2));
        
        // Guardar el resultado en un archivo
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        const resultPath = path.join(resultDir, 'local_image_result.json');
        fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
        console.log(`Resultado guardado en: ${resultPath}`);
        
        return result;
    } catch (error) {
        console.error('Error en la prueba con imagen local:', error);
        throw error;
    }
}

// Ejecutar las pruebas
async function runTests() {
    try {
        // Primero probar con la imagen de ejemplo
        await testWithExampleImage();
        
        // Luego probar con la imagen local
        await testWithLocalImage();
        
        console.log('\nTodas las pruebas completadas con éxito');
    } catch (error) {
        console.error('Error al ejecutar las pruebas:', error);
    }
}

runTests();
