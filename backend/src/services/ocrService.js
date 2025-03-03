import axios from 'axios';
import { ocrConfig } from '../config/ocr.js';
import _ from 'lodash';

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

            const result = this.extractDeliveryNoteData(response.data);
            return result;
        } catch (error) {
            console.error('Error en OCR Service:', error);
            throw error;
        }
    }

    extractDeliveryNoteData(ocrResult) {
        const parsedResults = ocrResult.ParsedResults[0];
        const parsedText = parsedResults.ParsedText;
        
        const deliveryNoteData = {
            supplier_name: '',
            delivery_date: '',
            delivery_note_number: '',
            client_name: '',
            client_code: '',
            delivery_address: '',
            items: [],
            total_amount: 0,
            debug_logs: {
                parsed_text: parsedText,
                supplier_detection: '',
                product_lines: []
            }
        };

        const textLines = parsedText.split('\n').map(line => line.trim()).filter(line => line);
        
        // Extraer información general
        for (const line of textLines) {
            if (line.includes('DISBESA')) {
                deliveryNoteData.supplier_name = 'DISBESA';
                deliveryNoteData.debug_logs.supplier_detection = `Línea detectada: "${line}"`;
            }
            
            const albaranMatch = line.match(/ALBARAN\s*:\s*(\d+)/);
            if (albaranMatch) {
                deliveryNoteData.delivery_note_number = albaranMatch[1];
            }

            const clientMatch = line.match(/CLIENTE\s*:\s*(\d+)\s+(.+)/);
            if (clientMatch) {
                deliveryNoteData.client_code = clientMatch[1];
                deliveryNoteData.client_name = clientMatch[2].trim();
            }

            const fechaMatch = line.match(/FECHA\s*:\s*(\d{2}\/\d{2}\/\d{4})/);
            if (fechaMatch) {
                deliveryNoteData.delivery_date = this.formatDate(fechaMatch[1]);
            }
        }

        // Encontrar las líneas de productos
        const productLines = [];
        let isProductSection = false;
        let currentProduct = null;

        for (let i = 0; i < textLines.length; i++) {
            const line = textLines[i];
            
            if (line.match(/Código\s+(?:Ref\.)?\s*(?:Venta)?\s*(?:Promoción)?/i)) {
                isProductSection = true;
                continue;
            }

            if (isProductSection) {
                if (/^\d{5,6}\t/.test(line) || /^\d{5,6}\s+/.test(line)) {
                    productLines.push(line);
                    if (i + 1 < textLines.length && textLines[i + 1].includes('Uni:')) {
                        productLines.push(textLines[i + 1]);
                    }
                }
            }

            if (isProductSection && line.includes('Base Imponible')) {
                isProductSection = false;
            }
        }

        deliveryNoteData.debug_logs.product_lines = productLines;
        deliveryNoteData.items = this.processProductLines(productLines);

        return deliveryNoteData;
    }

    processProductLines(productLines) {
        const products = [];
        let currentProduct = null;
        let nextLineHasPrice = false;

        for (let i = 0; i < productLines.length; i++) {
            const line = productLines[i].trim();
            console.log('Procesando línea:', line);

            // Si es una línea de producto (comienza con código)
            if (/^\d{5,6}\t/.test(line) || /^\d{5,6}\s+/.test(line)) {
                // Si teníamos un producto pendiente y no es el mismo código
                const productCode = line.split(/\t|\s{2,}/)[0];
                if (currentProduct && currentProduct.product_code !== productCode) {
                    products.push(currentProduct);
                }

                // Extraer información del producto
                const parts = line.split(/\t|\s{2,}/).filter(part => part.trim() !== '');
                console.log('Partes de la línea:', parts);

                if (parts.length >= 2) { // Cambiado de 3 a 2 para aceptar productos sin unidad
                    const code = parts[0];
                    const name = parts[1];
                    const unit = parts[2] || 'UNI'; // Unidad por defecto si no existe
                    const quantity = parts[3] || '1';
                    
                    // Buscar el último número que será el precio total con IVA
                    const numbers = line.match(/\d+[.,]\d+/g);
                    console.log('Números encontrados:', numbers);
                    
                    // Si no hay números o el último número es la cantidad, marcar para buscar precio en la siguiente línea
                    const lastNumber = numbers ? numbers[numbers.length - 1].replace(',', '.') : '0';
                    const price = parseFloat(lastNumber);
                    nextLineHasPrice = numbers === null || numbers.length <= 1;

                    currentProduct = {
                        product_code: code,
                        product_name: name.trim(),
                        quantity: parseFloat(quantity.replace(/[^\d.,]/g, '').replace(',', '.')),
                        unit: unit,
                        price: price,
                        batch_number: '',
                        expiry_date: ''
                    };
                    console.log('Producto creado:', currentProduct);
                }
            } 
            // Si es una línea de información adicional
            else if (line.includes('Uni:')) {
                if (currentProduct) {
                    const match = line.match(/Uni:\s*\d+\s*Cad:\s*(\d{2}\/\d{2}\/\d{2,4})\s*Lote:\s*([^\s]+)/);
                    if (match) {
                        const [, expiryDate, batchNumber] = match;
                        currentProduct.batch_number = batchNumber.trim();
                        currentProduct.expiry_date = this.formatDate(expiryDate);
                        
                        // Buscar el precio en la línea adicional si es necesario
                        const numbers = line.match(/\d+[.,]\d+/g);
                        if (numbers && (nextLineHasPrice || currentProduct.price === 0)) {
                            // Intentar encontrar el precio más alto que no sea una cantidad
                            let maxPrice = 0;
                            for (const num of numbers) {
                                const price = parseFloat(num.replace(',', '.'));
                                if (price > maxPrice && price !== parseFloat(currentProduct.quantity)) {
                                    maxPrice = price;
                                }
                            }
                            if (maxPrice > 0) {
                                currentProduct.price = maxPrice;
                            }
                            nextLineHasPrice = false;
                        }
                        
                        // Guardamos el producto después de procesar la línea adicional
                        products.push(currentProduct);
                        currentProduct = null;
                    }
                }
            }
        }

        // Si queda un producto pendiente al final, lo guardamos
        if (currentProduct) {
            products.push(currentProduct);
        }

        return products;
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('/');
        const fullYear = year.length === 2 ? '20' + year : year;
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
}

export default new OCRService();
