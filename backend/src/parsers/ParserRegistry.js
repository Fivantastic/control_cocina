class ParserRegistry {
    constructor() {
        this.parsers = new Map();
    }

    registerParser(supplierName, parser) {
        this.parsers.set(supplierName.toLowerCase(), parser);
    }

    getParser(supplierName) {
        const parser = this.parsers.get(supplierName.toLowerCase());
        if (!parser) {
            throw new Error(`No hay parser registrado para el proveedor: ${supplierName}`);
        }
        return parser;
    }

    hasParser(supplierName) {
        return this.parsers.has(supplierName.toLowerCase());
    }
}

export const parserRegistry = new ParserRegistry();
export default parserRegistry;
