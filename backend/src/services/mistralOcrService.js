// Servicio para procesar imágenes con la API de OCR de Mistral
import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';
import { StructuredDataExtractor } from './structuredDataExtractor.js';

dotenv.config();

class MistralOcrService {
  constructor() {
    this.apiKey = process.env.MISTRAL_API_KEY;
    if (!this.apiKey) {
      console.error('Error: MISTRAL_API_KEY no está configurada en el archivo .env');
      throw new Error('MISTRAL_API_KEY no configurada');
    }

    this.client = new Mistral({
      apiKey: this.apiKey
    });

    this.dataExtractor = new StructuredDataExtractor();
    console.log('Servicio MistralOCR inicializado correctamente');
  }

  /**
   * Convierte un buffer de imagen a base64
   * @param {Buffer} imageBuffer - Buffer de la imagen
   * @returns {string} - String en formato base64
   */
  imageBufferToBase64(imageBuffer) {
    return imageBuffer.toString('base64');
  }

  /**
   * Procesa una imagen utilizando la API de OCR de Mistral
   * @param {Buffer} imageBuffer - Buffer de la imagen a procesar
   * @returns {Promise<Object>} - Datos estructurados extraídos de la imagen
   */
  async processImage(imageBuffer) {
    try {
      console.log('Procesando imagen con Mistral OCR...');
      
      try {
        // Intentar usar el SDK de Mistral para OCR
        const extractedData = await this.extractTextWithOCR(imageBuffer);
        console.log('Texto extraído con éxito usando OCR de Mistral');
        return extractedData;
      } catch (error) {
        console.error('Error al extraer texto con OCR de Mistral:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      throw error;
    }
  }
  
  /**
   * Extrae texto de una imagen utilizando la API específica de OCR de Mistral
   * @param {Buffer} imageBuffer - Buffer de la imagen
   * @returns {Promise<Object>} - Datos estructurados extraídos de la imagen
   */
  async extractTextWithOCR(imageBuffer) {
    console.log('Extrayendo texto con la API de OCR de Mistral...');
    
    try {
      // Convertir la imagen a base64
      const base64Image = this.imageBufferToBase64(imageBuffer);
      
      // Imprimir los primeros 100 caracteres del base64 para verificar
      console.log('Primeros 100 caracteres del base64:', base64Image.substring(0, 100) + '...');
      
      // Usar el SDK de Mistral para OCR con el formato correcto según la documentación oficial
      console.log('Enviando solicitud a la API de OCR...');
      const ocrResponse = await this.client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "image_url",
          imageUrl: "data:image/jpeg;base64," + base64Image
        },
        includeImageBase64: true
      });
      
      console.log('Respuesta de OCR recibida:', JSON.stringify(ocrResponse).substring(0, 200) + '...');
      
      // Extraer el texto del resultado de OCR
      let extractedText = '';
      
      // Intentar obtener el texto de diferentes formas según la estructura de respuesta
      if (ocrResponse.text) {
        extractedText = ocrResponse.text;
        console.log('Texto extraído del campo text');
      } else if (ocrResponse.pages && ocrResponse.pages.length > 0) {
        extractedText = ocrResponse.pages.map(page => page.markdown || page.text || '').join('\n');
        console.log('Texto extraído del campo pages.markdown');
      } else if (ocrResponse.content) {
        extractedText = ocrResponse.content;
        console.log('Texto extraído del campo content');
      } else {
        console.log('Estructura de la respuesta OCR:', JSON.stringify(ocrResponse, null, 2));
      }
      
      console.log('Texto extraído con OCR:', extractedText.substring(0, 200) + '...');
      
      if (!extractedText || extractedText.trim() === '') {
        console.warn('No se encontró texto en la imagen');
        return {
          proveedor: '',
          fecha: '',
          numeroAlbaran: '',
          productos: []
        };
      }
      
      // Extraer datos estructurados del texto usando el extractor de datos estructurados
      return this.dataExtractor.extractStructuredData(extractedText);
    } catch (error) {
      console.error('Error al extraer texto con OCR de Mistral:', error);
      throw error;
    }
  }
}

// Exportar una instancia del servicio
export const mistralOcrService = new MistralOcrService();