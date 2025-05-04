// Prueba directa de la API de OCR de Mistral usando fetch
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function encodeImage(imagePath) {
    try {
        // Read the image file as a buffer
        const imageBuffer = fs.readFileSync(imagePath);

        // Convert the buffer to a Base64-encoded string
        const base64Image = imageBuffer.toString('base64');
        return base64Image;
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}

async function testMistralOcrWithLocalImage() {
    // Ruta a la imagen de prueba
    const imagePath = path.join(__dirname, '../../../docs/albaran_logirest.jpeg');
    console.log(`Procesando imagen local: ${imagePath}`);

    // Verificar que la imagen existe
    if (!fs.existsSync(imagePath)) {
        console.error(`Error: La imagen no existe en la ruta ${imagePath}`);
        return;
    }

    const base64Image = await encodeImage(imagePath);
    console.log(`Imagen convertida a base64. Primeros 100 caracteres: ${base64Image.substring(0, 100)}...`);

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
        return;
    }

    try {
        console.log('Enviando solicitud a la API de OCR usando fetch con imagen local...');
        
        // Usar el formato exacto que se muestra en el ejemplo cURL
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
                    image_url: `data:image/jpeg;base64,${base64Image}`
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la respuesta de la API:', errorData);
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }
        
        const ocrResponse = await response.json();
        console.log('Respuesta de OCR recibida para imagen local:');
        console.log(JSON.stringify(ocrResponse, null, 2));
        
        // Crear directorio para resultados si no existe
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        // Guardar la respuesta en un archivo para análisis
        const resultPath = path.join(resultDir, 'fetch_test_local_result.json');
        fs.writeFileSync(resultPath, JSON.stringify(ocrResponse, null, 2));
        console.log(`Resultado guardado en: ${resultPath}`);
    } catch (error) {
        console.error("Error processing OCR with local image:", error);
    }
}

async function testMistralOcrWithExampleImage() {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
        return;
    }

    try {
        console.log('Enviando solicitud a la API de OCR usando fetch con imagen de ejemplo de Mistral...');
        
        // Usar la imagen de ejemplo de Mistral
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
                    image_url: 'https://raw.githubusercontent.com/mistralai/cookbook/refs/heads/main/mistral/ocr/receipt.png'
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la respuesta de la API:', errorData);
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }
        
        const ocrResponse = await response.json();
        console.log('Respuesta de OCR recibida para imagen de ejemplo:');
        console.log(JSON.stringify(ocrResponse, null, 2));
        
        // Crear directorio para resultados si no existe
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        // Guardar la respuesta en un archivo para análisis
        const resultPath = path.join(resultDir, 'fetch_test_example_result.json');
        fs.writeFileSync(resultPath, JSON.stringify(ocrResponse, null, 2));
        console.log(`Resultado guardado en: ${resultPath}`);
    } catch (error) {
        console.error("Error processing OCR with example image:", error);
    }
}

// Ejecutar las pruebas
async function runTests() {
    console.log('=== PRUEBA CON IMAGEN LOCAL ===');
    await testMistralOcrWithLocalImage();
    
    console.log('\n=== PRUEBA CON IMAGEN DE EJEMPLO DE MISTRAL ===');
    await testMistralOcrWithExampleImage();
    
    console.log('\nTodas las pruebas completadas');
}

runTests()
    .then(() => console.log('Script finalizado'))
    .catch(error => console.error('Error en el script:', error));
