const { DateTime } = require('luxon');

class PDFParser {
    static parseText(text) {
        // Dividir el texto en líneas y limpiar espacios en blanco
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);

        // Extraer información del proveedor (asumimos que está en las primeras líneas)
        const supplierInfo = this.extractSupplierInfo(lines);

        // Extraer fecha (buscamos patrones de fecha en las primeras líneas)
        const deliveryDate = this.extractDate(lines);

        // Extraer items (productos, cantidades, etc.)
        const items = this.extractItems(lines);

        return {
            supplier_name: supplierInfo.name,
            delivery_date: deliveryDate,
            items
        };
    }

    static extractSupplierInfo(lines) {
        // Buscar líneas que puedan contener información del proveedor
        const supplierLines = lines.slice(0, 10); // Miramos las primeras 10 líneas
        
        // Patrones comunes para identificar el nombre del proveedor
        const patterns = [
            /proveedor:?\s*(.+)/i,
            /empresa:?\s*(.+)/i,
            /distribuidor:?\s*(.+)/i,
            /razón social:?\s*(.+)/i
        ];

        for (const line of supplierLines) {
            for (const pattern of patterns) {
                const match = line.match(pattern);
                if (match) {
                    return { name: match[1].trim() };
                }
            }
        }

        // Si no encontramos un patrón claro, tomamos la primera línea que no parezca una fecha o número
        for (const line of supplierLines) {
            if (!line.match(/^\d/) && !this.isDate(line)) {
                return { name: line };
            }
        }

        return { name: '' };
    }

    static extractDate(lines) {
        const dateLines = lines.slice(0, 10); // Miramos las primeras 10 líneas
        
        // Patrones comunes de fecha
        const patterns = [
            /fecha:?\s*(.+)/i,
            /date:?\s*(.+)/i,
            /entrega:?\s*(.+)/i,
            // Patrones de fecha comunes en español
            /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/,
            /(\d{2,4})[/-](\d{1,2})[/-](\d{1,2})/
        ];

        for (const line of dateLines) {
            for (const pattern of patterns) {
                const match = line.match(pattern);
                if (match) {
                    const dateStr = match[1] || line;
                    const parsedDate = this.parseDate(dateStr);
                    if (parsedDate) {
                        return parsedDate;
                    }
                }
            }
        }

        // Si no encontramos fecha, usamos la actual
        return DateTime.now().toISODate();
    }

    static extractItems(lines) {
        const items = [];
        let currentItem = null;

        // Patrones para identificar líneas de productos
        const productPatterns = [
            // Cantidad + Unidad + Producto + (Opcional: Lote, Caducidad, Precio)
            /^(\d+[\.,]?\d*)\s*(kg|g|l|ml|ud|unidades|cajas|paquetes|bolsas|botellas|latas)\s+(.+?)(?:\s+lote:?\s*(\w+))?\s*(?:cad:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}))?\s*(?:(\d+[\.,]?\d*)\s*€)?$/i,
            // Producto + Cantidad + Unidad
            /^(.+?)\s+(\d+[\.,]?\d*)\s*(kg|g|l|ml|ud|unidades|cajas|paquetes|bolsas|botellas|latas)(?:\s+lote:?\s*(\w+))?\s*(?:cad:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}))?\s*(?:(\d+[\.,]?\d*)\s*€)?$/i
        ];

        for (const line of lines) {
            let matched = false;

            for (const pattern of productPatterns) {
                const match = line.match(pattern);
                if (match) {
                    matched = true;
                    if (pattern === productPatterns[0]) {
                        // Patrón: Cantidad + Unidad + Producto
                        currentItem = {
                            quantity: parseFloat(match[1].replace(',', '.')),
                            unit: this.normalizeUnit(match[2]),
                            product_name: match[3].trim(),
                            batch_number: match[4] || null,
                            expiry_date: match[5] ? this.parseDate(match[5]) : null,
                            price: match[6] ? parseFloat(match[6].replace(',', '.')) : null
                        };
                    } else {
                        // Patrón: Producto + Cantidad + Unidad
                        currentItem = {
                            product_name: match[1].trim(),
                            quantity: parseFloat(match[2].replace(',', '.')),
                            unit: this.normalizeUnit(match[3]),
                            batch_number: match[4] || null,
                            expiry_date: match[5] ? this.parseDate(match[5]) : null,
                            price: match[6] ? parseFloat(match[6].replace(',', '.')) : null
                        };
                    }
                    items.push(currentItem);
                    break;
                }
            }

            // Si la línea actual no coincide con ningún patrón pero parece ser continuación
            if (!matched && currentItem && !line.match(/^(\d+[\.,]?\d*|\s*€)/)) {
                currentItem.product_name += ' ' + line.trim();
            }
        }

        return items;
    }

    static normalizeUnit(unit) {
        const unitMap = {
            'kg': 'kg',
            'g': 'g',
            'l': 'l',
            'ml': 'ml',
            'ud': 'ud',
            'unidades': 'ud',
            'cajas': 'caja',
            'paquetes': 'paquete',
            'bolsas': 'bolsa',
            'botellas': 'botella',
            'latas': 'lata'
        };

        return unitMap[unit.toLowerCase()] || unit.toLowerCase();
    }

    static parseDate(dateStr) {
        const formats = [
            'dd/MM/yyyy',
            'dd-MM-yyyy',
            'yyyy/MM/dd',
            'yyyy-MM-dd',
            'd/M/yyyy',
            'd-M-yyyy',
            'dd/MM/yy',
            'dd-MM-yy'
        ];

        for (const format of formats) {
            const parsed = DateTime.fromFormat(dateStr, format);
            if (parsed.isValid) {
                return parsed.toISODate();
            }
        }

        return null;
    }

    static isDate(str) {
        return this.parseDate(str) !== null;
    }
}

module.exports = PDFParser;
