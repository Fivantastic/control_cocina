// Prueba de la API de OCR de Mistral usando una URL de GitHub
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
 * Prueba la API de OCR de Mistral con diferentes URLs
 */
async function testWithUrls() {
    try {
        // Crear directorio para resultados si no existe
        const resultDir = path.join(__dirname, '../../ocr_results');
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir, { recursive: true });
        }
        
        // Lista de imágenes para probar
        const imagesToTest = [
            {
                name: 'mistral_example',
                description: 'Imagen de ejemplo de Mistral (recibo)',
                url: 'https://raw.githubusercontent.com/mistralai/cookbook/refs/heads/main/mistral/ocr/receipt.png'
            },
            {
                name: 'albaran_github',
                description: 'Imagen de albarán en GitHub',
                url: 'https://raw.githubusercontent.com/Fivantastic/control_cocina/main/docs/albaran1.jpeg'
            },
            {
                name: 'invoice_example',
                description: 'Ejemplo de factura',
                url: 'https://www.invoicesimple.com/wp-content/uploads/2018/06/Invoice-Template.png'
            },
            {
                name: 'receipt_example',
                description: 'Ejemplo de recibo de supermercado',
                url: 'https://media.istockphoto.com/id/1301251858/photo/shopping-receipt.jpg?s=612x612&w=0&k=20&c=UpMXmQGP-wy_WqKwWD_z-bxXBwIcQZEQBCNpTYUm9_c='
            },
            {
                name: 'document_example',
                description: 'Ejemplo de documento de texto',
                url: 'https://www.w3.org/WAI/WCAG21/working-examples/pdf-table/table.png'
            }
        ];
        
        // Procesar cada imagen
        for (const image of imagesToTest) {
            console.log(`\n=== PRUEBA CON ${image.description.toUpperCase()} ===`);
            console.log(`URL de la imagen: ${image.url}`);
            
            try {
                // Procesar la imagen
                const result = await processImageWithOCR(image.url);
                
                // Mostrar el resultado
                console.log(`Resultado del procesamiento de ${image.description}:`);
                console.log(JSON.stringify(result, null, 2));
                
                // Guardar el resultado en un archivo
                const resultPath = path.join(resultDir, `${image.name}_result.json`);
                fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));
                console.log(`Resultado guardado en: ${resultPath}`);
                
                // Verificar si se extrajo texto o solo una referencia a la imagen
                const hasExtractedText = result.pages && 
                                        result.pages[0] && 
                                        result.pages[0].markdown && 
                                        !result.pages[0].markdown.startsWith('![img-');
                
                console.log(`¿Se extrajo texto? ${hasExtractedText ? 'SÍ' : 'NO'}`);
                
                if (hasExtractedText) {
                    // Mostrar las primeras líneas del texto extraído
                    const extractedText = result.pages[0].markdown;
                    console.log('Primeras líneas del texto extraído:');
                    console.log(extractedText.substring(0, 200) + '...');
                } else {
                    console.log('No se extrajo texto, solo se devolvió una referencia a la imagen.');
                }
            } catch (error) {
                console.error(`Error al procesar ${image.description}:`, error);
            }
        }
        
        console.log('\nTodas las pruebas completadas');
    } catch (error) {
        console.error('Error al ejecutar las pruebas:', error);
    }
}

// Ejecutar las pruebas
testWithUrls();
