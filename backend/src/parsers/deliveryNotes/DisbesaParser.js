import { BaseDeliveryNoteParser } from '../BaseDeliveryNoteParser.js';

export class DisbesaParser extends BaseDeliveryNoteParser {
    canParse(ocrText) {
        return ocrText.includes('DISBESA');
    }

    parse(ocrText) {
        // Limpiar el texto OCR de manera más suave
        const parsedText = ocrText
            .replace(/\r\n/g, '\n')  // Normalizar saltos de línea
            .replace(/\t+/g, ' ')    // Convertir tabs a espacios
            .replace(/\n\s+/g, '\n') // Eliminar espacios al inicio de línea
            .replace(/\s+$/gm, '')   // Eliminar espacios al final de línea
            .trim();

        console.log('=== TEXTO OCR ORIGINAL ===');
        console.log(parsedText);
        
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

        // Dividir en líneas preservando espacios importantes
        const textLines = parsedText.split('\n')
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(line => line);
        
        console.log('\n=== LÍNEAS PROCESADAS ===');
        textLines.forEach((line, i) => console.log(`${i}: ${line}`));
        
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

        // Encontrar y agrupar las líneas de productos
        const productGroups = [];
        let currentGroup = [];
        let isProductSection = false;

        console.log('\n=== BUSCANDO PRODUCTOS ===');
        for (let i = 0; i < textLines.length; i++) {
            const line = textLines[i];
            console.log(`\nAnalizando línea ${i}:`, line);
            
            // Detectar inicio de sección de productos
            if (line.match(/Código\s+(?:Ref\.)?\s*(?:Venta)?\s*(?:Promoción)?\s*Precio/i) ||
                (line.includes('Artículo') && line.includes('Descripción'))) {
                console.log('Inicio de sección de productos detectado');
                isProductSection = true;
                continue;
            }

            // Detectar fin de sección de productos
            if (line.includes('Base Imponible')) {
                console.log('Fin de sección de productos detectado');
                if (currentGroup.length > 0) {
                    productGroups.push([...currentGroup]);
                    currentGroup = [];
                }
                isProductSection = false;
                continue;
            }

            if (isProductSection) {
                // Si es una nueva línea de producto
                if (/^\s*\d{5,6}\s/.test(line)) {
                    console.log('Nueva línea de producto detectada');
                    if (currentGroup.length > 0) {
                        productGroups.push([...currentGroup]);
                        currentGroup = [];
                    }
                    currentGroup.push(line);
                }
                // Si es una línea adicional (precio, lote, caducidad)
                else if (currentGroup.length > 0 && 
                        (line.match(/^\s*\d+([.,]\d+)?\s*$/) || // Solo números
                         line.includes('Cad:') || line.includes('Lote:') || // Info de lote/caducidad
                         line.match(/^\s*(?:Uni:|\d+\s+Cad:)/))) { // Línea que empieza con Uni: o número seguido de Cad:
                    console.log('Línea adicional detectada');
                    currentGroup.push(line);
                }
            }
        }

        // Guardar último grupo si existe
        if (currentGroup.length > 0) {
            productGroups.push(currentGroup);
        }

        console.log('\n=== GRUPOS DE PRODUCTOS ===');
        productGroups.forEach((group, i) => {
            console.log(`\nGrupo ${i}:`);
            group.forEach(line => console.log(line));
            deliveryNoteData.debug_logs.product_lines.push(...group);
        });

        // Procesar cada grupo como un producto
        deliveryNoteData.items = productGroups.map(group => this.processProductGroup(group));
        
        // Calcular el total
        deliveryNoteData.total_amount = deliveryNoteData.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        return deliveryNoteData;
    }

    processProductGroup(group) {
        console.log('\nProcesando grupo:', group);
        
        // Procesar todas las líneas para encontrar la unidad y precio
        let productLine = group[0];
        let unitLine = '';
        console.log('Procesando grupo:', group);
        
        // Si la primera línea solo contiene la unidad, usar la segunda línea como línea principal
        const firstLineParts = productLine.split(/\s+/).filter(part => part.trim());
        if (firstLineParts.length <= 2 && (firstLineParts.includes('UNI') || firstLineParts.includes('CAJ') || firstLineParts.includes('LAT'))) {
            unitLine = productLine;
            productLine = group[1] || '';
            console.log('Usando segunda línea como principal:', productLine);
        }

        const parts = productLine.split(/\s+/).filter(part => part.trim());
        console.log('Partes de la línea principal:', parts);
        
        const product = {
            product_code: parts[0],
            product_name: '',
            quantity: 1,
            unit: 'UNI',
            price: 0,
            batch_number: '',
            expiry_date: ''
        };

        // Extraer el nombre del producto
        const codeIndex = parts.findIndex(p => p === product.product_code);
        const unitIndex = parts.findIndex(p => p === 'UNI' || p === 'CAJ' || p === 'LAT');

        // Buscar la unidad en la línea de unidad si existe
        if (unitLine) {
            const unitParts = unitLine.split(/\s+/).filter(part => part.trim());
            const unitMatch = unitParts.find(p => p === 'UNI' || p === 'CAJ' || p === 'LAT');
            if (unitMatch) {
                product.unit = unitMatch;
                // Buscar cantidad en la línea de unidad
                const qtyMatch = unitParts.find(p => p.match(/^\d+([.,]\d{0,2})?$/));
                if (qtyMatch) {
                    product.quantity = parseFloat(qtyMatch.replace(',', '.'));
                    console.log(`Cantidad encontrada en línea de unidad: ${product.quantity}`);
                }
            }
        }

        // Si encontramos la unidad en la línea principal
        if (unitIndex > -1) {
            product.unit = parts[unitIndex];
            const nameParts = parts.slice(codeIndex + 1, unitIndex).filter(part => !part.includes('€') && !part.includes('EUR'));
            product.product_name = nameParts.join(' ');
            
            // Buscar cantidad y precio
            let foundQuantity = false;
            
            // Primero buscar el precio tarifa en todas las líneas
            console.log('\nBuscando precio tarifa en todas las líneas:');
            for (const line of group) {
                console.log('Analizando línea:', line);
                // Buscar todos los números con 4 decimales
                const matches = line.match(/\b\d+[.,]\d{4}\b/g);
                if (matches) {
                    console.log('Números con 4 decimales encontrados:', matches);
                    // Tomar el primer precio
                    const priceStr = matches[0].replace(',', '.');
                    const price = parseFloat(priceStr);
                    if (!isNaN(price)) {
                        product.price = price;
                        console.log(`Precio tarifa encontrado: ${price}`);
                        break;
                    }
                } else {
                    console.log('No se encontraron números con 4 decimales en esta línea');
                }
            }

            // Luego buscar la cantidad en la línea principal
            for (let i = unitIndex + 1; i < parts.length; i++) {
                const part = parts[i].replace(',', '.');
                if (!foundQuantity && part.match(/^\d+[.,]?\d{0,2}$/)) {
                    const qty = parseFloat(part);
                    if (!isNaN(qty)) {
                        foundQuantity = true;
                        product.quantity = qty;
                        console.log(`Cantidad encontrada: ${qty}`);
                    }
                }
            }
        } else {
            // Si no hay unidad en la línea principal, usar todo después del código como nombre
            const nameParts = parts.slice(codeIndex + 1).filter(part => !part.includes('€') && !part.includes('EUR'));
            product.product_name = nameParts.join(' ');
        }

        // Si no encontramos cantidad, buscar en el nombre del producto
        if (product.quantity === 1) {
            const xMatch = product.product_name.match(/\b(\d+)\s*[xX]\d*\b/);
            if (xMatch) {
                product.quantity = parseInt(xMatch[1]);
                console.log(`Cantidad encontrada en nombre: ${product.quantity}`);
            }
        }

        // Procesar líneas adicionales para lote, caducidad y precio
        for (let i = 1; i < group.length; i++) {
            const line = group[i];
            
            // Buscar lote
            const loteMatch = line.match(/Lote:\s*([\w\-\.]+)/i);
            if (loteMatch) {
                product.batch_number = loteMatch[1];
            }
            
            // Buscar caducidad
            const cadMatch = line.match(/Cad:\s*(\d{2}\/\d{2}\/\d{2,4})/i);
            if (cadMatch) {
                product.expiry_date = this.formatDate(cadMatch[1]);
            }
            
            // Procesar líneas adicionales para lote, caducidad y precio
            if (product.price === 0) {
                console.log(`Buscando precio en línea adicional para ${product.product_code}:`, line);
                
                // Buscar todos los números en la línea
                const allNumbers = line.match(/\b\d+[.,]\d{2,4}\b/g);
                if (allNumbers) {
                    console.log('Números encontrados:', allNumbers);
                    
                    // Primero intentar encontrar un precio con 4 decimales
                    const price4Dec = allNumbers.find(num => num.match(/\d+[.,]\d{4}/));
                    if (price4Dec) {
                        const price = parseFloat(price4Dec.replace(',', '.'));
                        if (!isNaN(price)) {
                            product.price = price;
                            console.log(`Precio tarifa encontrado: ${price}`);
                        }
                    } else {
                        console.log('No se encontraron precios con 4 decimales');
                    }
                } else {
                    console.log('No se encontraron números en la línea');
                }
            }

            // Buscar cantidad en líneas con 'Uni:'
            const uniMatch = line.match(/Uni:\s*(\d+(?:[.,]\d+)?)/i);
            if (uniMatch) {
                const qty = parseFloat(uniMatch[1].replace(',', '.'));
                if (!isNaN(qty) && qty > 0) {
                    product.quantity = qty;
                }
            }
        }

        return product;
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        dateStr = dateStr.replace(/-/g, '/');
        const [day, month, year] = dateStr.split('/');
        const fullYear = year.length === 2 ? '20' + year : year;
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
}
