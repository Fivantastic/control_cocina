import { BaseDeliveryNoteParser } from '../BaseDeliveryNoteParser.js';

export class EjemploDistribuidorParser extends BaseDeliveryNoteParser {
    canParse(ocrText) {
        // Aquí defines la lógica para identificar si el texto corresponde a este distribuidor
        // Por ejemplo, buscando el nombre de la empresa o un formato específico
        return ocrText.includes('NOMBRE_DISTRIBUIDOR');
    }

    parse(ocrText) {
        const cleanedText = this.cleanText(ocrText);
        
        // Aquí defines las expresiones regulares específicas para este distribuidor
        const numeroAlbaranRegex = /Nº Albarán:\s*(\d+)/i;
        const fechaRegex = /Fecha:\s*(\d{2}\/\d{2}\/\d{4})/i;
        
        // Extraer los datos según el formato específico del albarán
        return {
            numero_albaran: this.extractValue(cleanedText, numeroAlbaranRegex),
            fecha: this.extractValue(cleanedText, fechaRegex),
            // ... otros campos específicos
        };
    }
}
