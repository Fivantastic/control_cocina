export class BaseDeliveryNoteParser {
    /**
     * Método principal para extraer datos del texto OCR
     * @param {string} ocrText - Texto extraído por OCR
     * @returns {Object} Datos estructurados del albarán
     */
    parse(ocrText) {
        throw new Error('El método parse debe ser implementado por cada parser específico');
    }

    /**
     * Verifica si el texto corresponde a este tipo de albarán
     * @param {string} ocrText - Texto extraído por OCR
     * @returns {boolean}
     */
    canParse(ocrText) {
        throw new Error('El método canParse debe ser implementado por cada parser específico');
    }

    /**
     * Extrae un valor basado en una expresión regular
     * @param {string} text - Texto donde buscar
     * @param {RegExp} regex - Expresión regular con un grupo de captura
     * @returns {string|null}
     */
    extractValue(text, regex) {
        const match = text.match(regex);
        return match ? match[1].trim() : null;
    }

    /**
     * Limpia el texto de caracteres no deseados
     * @param {string} text 
     * @returns {string}
     */
    cleanText(text) {
        return text
            // Convertir retornos de carro a saltos de línea
            .replace(/\r/g, '\n')
            // Mantener tabulaciones
            // Eliminar espacios al inicio y final
            .trim();
    }
}
