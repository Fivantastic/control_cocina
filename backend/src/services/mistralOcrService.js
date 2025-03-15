import { Mistral } from '@mistralai/mistralai';

class MistralOCRService {
    constructor() {
        console.log('Inicializando MistralOCRService...');
        console.log('USE_MISTRAL_OCR:', process.env.USE_MISTRAL_OCR);
        
        if (process.env.USE_MISTRAL_OCR === 'true') {
            console.log('Mistral OCR está habilitado, inicializando cliente...');
            this.client = new Mistral({
                apiKey: process.env.MISTRAL_API_KEY
            });
            console.log('Cliente Mistral inicializado correctamente');
        } else {
            console.log('Mistral OCR está deshabilitado');
        }
    }

    async processImage(imageBuffer) {
        if (process.env.USE_MISTRAL_OCR !== 'true') {
            console.log('Mistral OCR está deshabilitado');
            return null;
        }
        
        try {
            console.log('Preparando imagen para OCR...');
            
            if (!Buffer.isBuffer(imageBuffer)) {
                throw new Error('Se esperaba un Buffer de imagen');
            }
            
            // Convertir el buffer a base64
            // Convertir el buffer a base64
            const base64Image = imageBuffer.toString('base64');
            
            // Crear la URL de datos con el prefijo específico para JPEG
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;
            
            console.log('Procesando OCR...');
            const ocrResponse = await this.client.ocr.process({
                model: 'mistral-ocr-latest',
                document: {
                    type: 'image_url',
                    image_url: dataUrl
                },
                include_image_base64: true
            });

            console.log('Respuesta del OCR:', JSON.stringify(ocrResponse, null, 2));
            
            if (ocrResponse.pages && ocrResponse.pages.length > 0) {
                const extractedText = ocrResponse.pages[0].markdown;
                
                return {
                    text: extractedText,
                    pageInfo: {
                        dimensions: ocrResponse.pages[0].dimensions,
                        index: ocrResponse.pages[0].index
                    },
                    usage: ocrResponse.usage_info
                };
            } else {
                throw new Error('No se encontró texto en la imagen');
            }
            
        } catch (error) {
            console.error('Error al procesar la imagen con Mistral OCR:', error);
            throw error;
        }
    }
}

export default new MistralOCRService();