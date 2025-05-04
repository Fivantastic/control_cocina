// Prueba directa de la API de OCR de Mistral con una imagen en base64
import { Mistral } from '@mistralai/mistralai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

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

async function testMistralOcr() {
    // Ruta a la imagen de prueba - corregida para apuntar al directorio correcto
    const imagePath = path.join(__dirname, '../../../docs/albaran_logirest.jpeg');
    console.log(`Procesando imagen: ${imagePath}`);

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

    const client = new Mistral({ apiKey: apiKey });

    try {
        console.log('Enviando solicitud a la API de OCR...');
        
        // Usar el formato exacto que se muestra en el ejemplo cURL
        const ocrResponse = await client.ocr.process({
            model: "mistral-ocr-latest",
            document: {
                type: "image_url",
                image_url: "data:image/jpeg;base64," + base64Image
            },
            includeImageBase64: true
        });
        
        console.log('Respuesta de OCR recibida:');
        console.log(JSON.stringify(ocrResponse, null, 2));
        
        // Crear directorio para resultados si no existe
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        // Guardar la respuesta en un archivo para análisis
        const resultPath = path.join(resultDir, 'direct_test_result.json');
        fs.writeFileSync(resultPath, JSON.stringify(ocrResponse, null, 2));
        console.log(`Resultado guardado en: ${resultPath}`);
    } catch (error) {
        console.error("Error processing OCR:", error);
    }
}

// Ejecutar la prueba
testMistralOcr()
    .then(() => console.log('Test completado'))
    .catch(error => console.error('Error en el test:', error));
