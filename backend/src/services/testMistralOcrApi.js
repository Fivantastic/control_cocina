// Script para probar la API específica de OCR de Mistral
import { Mistral } from '@mistralai/mistralai';
import { config } from 'dotenv';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { mistralOcrService } from './mistralOcrService.js';

// Cargar variables de entorno
config();

// Verificar que la API key esté configurada
if (!process.env.MISTRAL_API_KEY) {
  console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
  process.exit(1);
}

// Función para convertir una imagen a base64
async function imageToBase64(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  return imageBuffer.toString('base64');
}

// Función principal para probar el OCR
async function testMistralOcr() {
  try {
    const resultsDir = join(process.cwd(), 'ocr_results');
    await fs.mkdir(resultsDir, { recursive: true }).catch(() => {});
    
    // Vamos a probar directamente con nuestras imágenes JPEG locales
    console.log('\n=== PRUEBA CON IMÁGENES LOCALES ===\n');
    return testWithLocalImage();
  } catch (error) {
    console.error('Error principal:', error);
    return testWithLocalImage();
  }
}

async function testWithLocalImage() {
  try {
    // Ruta a la imagen de prueba desde la carpeta docs en la raíz del proyecto
    // Cambiar a albaran_logirest.jpeg para probar con otra imagen
    const imagePath = join(process.cwd(), '../docs/albaran_logirest.jpeg');
    
    // Si no existe la imagen de prueba, intentar con otra alternativa
    let exists = false;
    try {
      await fs.access(imagePath);
      exists = true;
    } catch (e) {
      exists = false;
    }
    
    if (!exists) {
      console.error(`Error: La imagen de prueba no existe en la ruta ${imagePath}`);
      console.log('Intentando usar una imagen alternativa...');
      
      const alternativeImagePath = join(process.cwd(), '../docs/disbesa_albaran.jpeg');
      
      let alternativeExists = false;
      try {
        await fs.access(alternativeImagePath);
        alternativeExists = true;
      } catch (e) {
        alternativeExists = false;
      }
      
      if (!alternativeExists) {
        console.error(`Error: La imagen alternativa tampoco existe en la ruta ${alternativeImagePath}`);
        console.log('Por favor, verifica que las imágenes existen en la carpeta docs.');
        process.exit(1);
      }
      
      console.log(`Usando imagen alternativa: ${alternativeImagePath}`);
      return processImage(alternativeImagePath, 'nuestra_imagen');
    }
    
    return processImage(imagePath, 'logirest_albaran');
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
  }
}

// Función para procesar una imagen específica usando varias técnicas
async function processImage(imagePath, testName) {
  console.log(`Procesando imagen: ${imagePath}`);
  console.log('Convirtiendo imagen a base64...');
  const imageBuffer = await fs.readFile(imagePath);
  console.log('Imagen convertida correctamente.');
  
  // Directorio para guardar resultados
  const resultsDir = join(process.cwd(), 'ocr_results');
  try {
    await fs.mkdir(resultsDir, { recursive: true });
  } catch (error) {
    // Directorio ya existe
  }
  
  // Intentar diferentes enfoques con la API OCR
  console.log('\n=== INICIANDO TEST DE OCR CON LA API ESPECÍFICA DE MISTRAL ===\n');
  
  try {
    // Usar el servicio Mistral OCR con la nueva implementación
    console.log('Procesando imagen con el servicio Mistral OCR...');
    // Pasar el buffer de imagen directamente, no la cadena base64
    const result = await mistralOcrService.processImage(imageBuffer);
    
    console.log('Respuesta recibida:');
    console.log(JSON.stringify(result, null, 2));
    
    // Guardar resultado para análisis posterior
    await fs.writeFile(join(resultsDir, `result_${testName}_ocr_api.json`), JSON.stringify(result, null, 2));
    console.log(`Resultado guardado en ${join(resultsDir, `result_${testName}_ocr_api.json`)}`);
    
    console.log('\n=== TEST DE OCR COMPLETADO ===\n');
    return "Test completado";
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    throw error;
  }
}

// Ejecutar la función principal
testMistralOcr()
  .then(() => console.log('Test completado'))
  .catch(error => console.error('Error en el test:', error));
