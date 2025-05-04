// Script para probar la nueva implementación de Mistral OCR
import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import pkg from '@mistralai/mistralai';
const { Mistral } = pkg;

// Configuración
config();
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

if (!MISTRAL_API_KEY) {
  console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
  process.exit(1);
}

// Inicializar cliente de Mistral
const client = new Mistral(MISTRAL_API_KEY);

// Función para convertir una imagen a base64
function imageToBase64(imagePath) {
  const imageBuffer = readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Función principal para probar el OCR
async function testMistralOcr() {
  try {
    // Ruta a la imagen de prueba desde la carpeta docs en la raíz del proyecto
    const imagePath = join(process.cwd(), '../docs/disbesa_albaran.jpeg');
    
    // Si no existe la imagen de prueba, intentar con otra alternativa
    if (!existsSync(imagePath)) {
      console.error(`Error: La imagen de prueba no existe en la ruta ${imagePath}`);
      console.log('Intentando usar una imagen alternativa...');
      
      const alternativeImagePath = join(process.cwd(), '../docs/albaran_logirest.jpeg');
      
      if (!existsSync(alternativeImagePath)) {
        console.error(`Error: La imagen alternativa tampoco existe en la ruta ${alternativeImagePath}`);
        console.log('Por favor, verifica que las imágenes existen en la carpeta docs.');
        process.exit(1);
      }
      
      console.log(`Usando imagen alternativa: ${alternativeImagePath}`);
      return testMistralOcrWithPath(alternativeImagePath);
    }
    
    return testMistralOcrWithPath(imagePath);
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
  }
}

// Función para procesar una imagen específica
async function testMistralOcrWithPath(imagePath) {
  console.log(`Procesando imagen: ${imagePath}`);
  console.log('Convirtiendo imagen a base64...');
  const base64Image = imageToBase64(imagePath);
  console.log('Imagen convertida correctamente.');
  
  console.log('Enviando solicitud a Mistral OCR...');
  
  // Usar el modelo pixtral-large-latest con la API de chat
  const ocrResponse = await client.chat.complete({
    model: "pixtral-large-latest",
    messages: [
      {
        role: "user",
        content: [
          { 
            type: "text", 
            text: `Extrae la información de los productos del albarán en la imagen. 
            Devuelve los datos en formato JSON con la siguiente estructura:
            {
              "proveedor": "nombre del proveedor",
              "fecha": "fecha del albarán en formato YYYY-MM-DD",
              "productos": [
                {
                  "codigo": "código del producto",
                  "descripcion": "descripción del producto",
                  "cantidad": número,
                  "precio": número
                },
                ...
              ]
            }
            Si no puedes extraer algún campo, déjalo como null.` 
          },
          { 
            type: "image_url", 
            imageUrl: `data:image/jpeg;base64,${base64Image}` 
          }
        ]
      }
    ]
  });
  
  console.log('Respuesta recibida de Mistral OCR:');
  console.log(JSON.stringify(ocrResponse, null, 2));
  
  // Extraer el texto de la respuesta
  const extractedText = ocrResponse.choices[0].message.content;
  console.log('\nTexto extraído:');
  console.log(extractedText);
  
  // Intentar parsear el JSON si existe
  try {
    // Buscar un objeto JSON en el texto
    const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonData = JSON.parse(jsonMatch[0]);
      console.log('\nDatos estructurados:');
      console.log(JSON.stringify(jsonData, null, 2));
    } else {
      console.log('\nNo se pudo encontrar un objeto JSON en la respuesta.');
    }
  } catch (error) {
    console.log('\nError al parsear el JSON:', error.message);
  }
}

// Ejecutar la función principal
testMistralOcr();
