import { DisbesaParser } from './deliveryNotes/DisbesaParser.js';
import parserRegistry from './ParserRegistry.js';

// Inicializar los parsers
export function initializeParsers() {
    // Registrar el parser de Disbesa
    parserRegistry.registerParser('disbesa', new DisbesaParser());
    
    // Aquí se pueden registrar más parsers en el futuro
}

// Función para obtener el parser adecuado según el texto OCR
export function getParser(ocrText) {
    // Asegurar que los parsers están inicializados
    initializeParsers();
    
    // Buscar el parser adecuado
    const availableParsers = [
        new DisbesaParser()
    ];

    for (const parser of availableParsers) {
        if (parser.canParse(ocrText)) {
            return parser;
        }
    }

    return null;
}
