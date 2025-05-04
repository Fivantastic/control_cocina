import { Mistral } from '@mistralai/mistralai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configurar dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Verificar API key
if (!process.env.MISTRAL_API_KEY) {
  console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
  process.exit(1);
}

// Inicializar cliente Mistral
const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
});

// Ruta a la imagen de prueba (usar ruta absoluta si se proporciona como argumento)
const imagePath = process.argv[2];
const absoluteImagePath = imagePath ? 
  (path.isAbsolute(imagePath) ? imagePath : path.resolve(process.cwd(), imagePath)) : 
  path.resolve(process.cwd(), '../docs/albaran1.jpeg');

console.log(`Usando imagen: ${absoluteImagePath}`);

// Leer la imagen
try {
  const imageBuffer = fs.readFileSync(absoluteImagePath);
  console.log(`Imagen leída correctamente, tamaño: ${imageBuffer.length} bytes`);
  
  // Convertir a base64
  const base64Image = imageBuffer.toString('base64');
  console.log(`Imagen convertida a base64, longitud: ${base64Image.length} caracteres`);
  
  // Determinar el tipo MIME basado en la extensión
  const ext = path.extname(absoluteImagePath).toLowerCase();
  let mimeType = 'image/jpeg'; // Por defecto
  
  if (ext === '.png') {
    mimeType = 'image/png';
  } else if (ext === '.pdf') {
    mimeType = 'application/pdf';
  }
  
  // Crear data URL
  const dataUrl = `data:${mimeType};base64,${base64Image}`;
  console.log(`Data URL creada con tipo MIME: ${mimeType}`);
  console.log(`Primeros 100 caracteres de la data URL: ${dataUrl.substring(0, 100)}...`);
  
  // Llamar a la API de Mistral
  console.log('Llamando a la API de Mistral OCR...');
  
  const processOcr = async () => {
    try {
      // Estructura corregida según la documentación de la API de Mistral
      const ocrResponse = await client.ocr.process({
        model: 'mistral-ocr-latest',
        document: {
          type: 'document_url',
          documentUrl: dataUrl
        },
        include_image_base64: true
      });
      
      console.log('Respuesta de OCR recibida:');
      console.log(JSON.stringify(ocrResponse, null, 2));
      
      if (ocrResponse.pages && ocrResponse.pages.length > 0) {
        console.log('\nTexto extraído:');
        console.log(ocrResponse.pages[0].markdown);
      } else {
        console.log('No se encontró texto en la imagen');
      }
    } catch (error) {
      console.error('Error al procesar OCR:', error);
      
      // Mostrar información detallada del error
      if (error.response) {
        console.error('Detalles de la respuesta de error:');
        console.error(JSON.stringify(error.response.data, null, 2));
      }
    }
  };
  
  processOcr();
  
} catch (error) {
  console.error(`Error al leer la imagen: ${error.message}`);
}
