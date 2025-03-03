export const ocrConfig = {
    apiEndpoint: 'https://api.ocr.space/parse/image',
    apiKey: process.env.OCR_API_KEY, // La clave de API se obtiene del archivo .env
    options: {
        language: 'spa',
        detectOrientation: true,
        scale: true,
        OCREngine: 2, // Motor más preciso
        isTable: true // Importante para detectar estructuras tabulares
    }
};
