import axios from 'axios';
import { ocrConfig } from '../config/ocr.js';
import { getParser } from '../parsers/initParsers.js';

class OCRService {
    async processImage(imageBuffer) {
        try {
            const base64Image = imageBuffer.toString('base64');
            const formData = new URLSearchParams();
            formData.append('base64Image', `data:image/png;base64,${base64Image}`);
            formData.append('language', ocrConfig.options.language);
            formData.append('detectOrientation', ocrConfig.options.detectOrientation);
            formData.append('scale', ocrConfig.options.scale);
            formData.append('OCREngine', ocrConfig.options.OCREngine);
            formData.append('isTable', ocrConfig.options.isTable);

            console.log('Enviando petición a OCR.space con configuración:', {
                language: ocrConfig.options.language,
                OCREngine: ocrConfig.options.OCREngine,
                isTable: ocrConfig.options.isTable
            });

            const response = await axios.post(ocrConfig.apiEndpoint, formData, {
                headers: {
                    'apikey': ocrConfig.apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 30000,
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            });

            if (response.data.OCRExitCode !== 1) {
                throw new Error(response.data.ErrorMessage || 'Error en el procesamiento OCR');
            }

            const result = await this.extractDeliveryNoteData(response.data);
            return result;
        } catch (error) {
            console.error('Error en OCR Service:', error);
            throw error;
        }
    }

    async extractDeliveryNoteData(ocrResult) {
        const parsedResults = ocrResult.ParsedResults[0];
        let parsedText = parsedResults.ParsedText;
        
        // Obtener el parser adecuado
        const parser = getParser(parsedText);
        if (!parser) {
            throw new Error('No se encontró un parser adecuado para este albarán');
        }

        // Usar el parser para extraer los datos
        return parser.parse(parsedText);
    }
}

export default new OCRService();
