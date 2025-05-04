// Prueba de la API de OCR de Mistral con preprocesamiento de imágenes
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import sharp from 'sharp';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Preprocesa una imagen para mejorar su calidad para OCR
 * @param {string} inputPath - Ruta de la imagen de entrada
 * @param {string} outputPath - Ruta para guardar la imagen procesada
 * @returns {Promise<void>}
 */
async function preprocessImage(inputPath, outputPath) {
    try {
        console.log(`Preprocesando imagen: ${inputPath}`);
        
        // Leer la imagen
        const imageBuffer = fs.readFileSync(inputPath);
        
        // Procesar la imagen con sharp
        await sharp(imageBuffer)
            // Convertir a escala de grises para mejorar el contraste
            .greyscale()
            // Aumentar el contraste
            .normalize()
            // Ajustar la nitidez
            .sharpen()
            // Convertir a formato PNG (mejor para OCR que JPEG)
            .png()
            // Guardar la imagen procesada
            .toFile(outputPath);
        
        console.log(`Imagen preprocesada guardada en: ${outputPath}`);
    } catch (error) {
        console.error('Error al preprocesar la imagen:', error);
        throw error;
    }
}

/**
 * Procesa una imagen local con la API de OCR de Mistral
 * @param {string} imagePath - Ruta de la imagen local
 * @returns {Promise<object>} - Respuesta de la API de OCR
 */
async function processLocalImageWithOCR(imagePath) {
    try {
        const apiKey = process.env.MISTRAL_API_KEY;
        if (!apiKey) {
            throw new Error('MISTRAL_API_KEY no está configurada en el archivo .env');
        }

        console.log(`Procesando imagen local: ${imagePath}`);
        
        // Leer la imagen y convertirla a base64
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        
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
                    image_url: `data:image/png;base64,${base64Image}`
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
 * Prueba la API de OCR de Mistral con imágenes preprocesadas
 */
async function testWithPreprocessedImages() {
    try {
        // Crear directorios para resultados y imágenes procesadas
        const resultDir = path.join(__dirname, '../../ocr_results');
        const processedDir = path.join(__dirname, '../../processed_images');
        
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        if (!fs.existsSync(processedDir)) {
            fs.mkdirSync(processedDir, { recursive: true });
        }
        
        // Ruta a la imagen original
        const originalImagePath = path.join(__dirname, '../../../docs/albaran1.jpeg');
        
        // Verificar que la imagen existe
        if (!fs.existsSync(originalImagePath)) {
            throw new Error(`La imagen no existe en la ruta ${originalImagePath}`);
        }
        
        // Ruta para la imagen procesada
        const processedImagePath = path.join(processedDir, 'albaran1_processed.png');
        
        // Preprocesar la imagen
        await preprocessImage(originalImagePath, processedImagePath);
        
        // Procesar la imagen original con OCR
        console.log('\n=== PRUEBA CON IMAGEN ORIGINAL ===');
        const originalResult = await processLocalImageWithOCR(originalImagePath);
        
        // Mostrar el resultado
        console.log('Resultado del procesamiento de la imagen original:');
        console.log(JSON.stringify(originalResult, null, 2));
        
        // Guardar el resultado en un archivo
        const originalResultPath = path.join(resultDir, 'original_image_result.json');
        fs.writeFileSync(originalResultPath, JSON.stringify(originalResult, null, 2));
        console.log(`Resultado guardado en: ${originalResultPath}`);
        
        // Verificar si se extrajo texto o solo una referencia a la imagen
        const hasOriginalExtractedText = originalResult.pages && 
                                  originalResult.pages[0] && 
                                  originalResult.pages[0].markdown && 
                                  !originalResult.pages[0].markdown.startsWith('![img-');
        
        console.log(`¿Se extrajo texto de la imagen original? ${hasOriginalExtractedText ? 'SÍ' : 'NO'}`);
        
        // Procesar la imagen procesada con OCR
        console.log('\n=== PRUEBA CON IMAGEN PREPROCESADA ===');
        const processedResult = await processLocalImageWithOCR(processedImagePath);
        
        // Mostrar el resultado
        console.log('Resultado del procesamiento de la imagen preprocesada:');
        console.log(JSON.stringify(processedResult, null, 2));
        
        // Guardar el resultado en un archivo
        const processedResultPath = path.join(resultDir, 'processed_image_result.json');
        fs.writeFileSync(processedResultPath, JSON.stringify(processedResult, null, 2));
        console.log(`Resultado guardado en: ${processedResultPath}`);
        
        // Verificar si se extrajo texto o solo una referencia a la imagen
        const hasProcessedExtractedText = processedResult.pages && 
                                  processedResult.pages[0] && 
                                  processedResult.pages[0].markdown && 
                                  !processedResult.pages[0].markdown.startsWith('![img-');
        
        console.log(`¿Se extrajo texto de la imagen preprocesada? ${hasProcessedExtractedText ? 'SÍ' : 'NO'}`);
        
        if (hasProcessedExtractedText) {
            // Mostrar las primeras líneas del texto extraído
            const extractedText = processedResult.pages[0].markdown;
            console.log('Primeras líneas del texto extraído de la imagen preprocesada:');
            console.log(extractedText.substring(0, 200) + '...');
        }
        
        console.log('\nPruebas completadas');
    } catch (error) {
        console.error('Error al ejecutar las pruebas:', error);
    }
}

// Ejecutar las pruebas
testWithPreprocessedImages();
