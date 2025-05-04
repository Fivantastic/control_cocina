/**
 * Módulo para extraer datos estructurados del texto de albaranes
 */

export class StructuredDataExtractor {
  /**
   * Extrae datos estructurados a partir del texto de un albarán
   * @param {string} text - Texto del albarán
   * @returns {Object} - Datos estructurados
   */
  extractStructuredData(text) {
    try {
      console.log('Extrayendo datos estructurados del texto...');
      
      if (!text || text.trim() === '') {
        console.error('No hay texto para extraer datos estructurados');
        return {
          supplier_name: '',
          delivery_date: new Date().toISOString().split('T')[0],
          items: [],
          raw_text: text
        };
      }
      
      // Buscar nombre del proveedor
      let supplierName = this.extractSupplierName(text);
      
      // Buscar fecha de entrega
      let deliveryDate = this.extractDeliveryDate(text);
      
      // Extraer productos
      const items = this.extractProducts(text);
      
      return {
        supplier_name: supplierName,
        delivery_date: deliveryDate,
        items: items,
        raw_text: text
      };
    } catch (error) {
      console.error('Error al extraer datos estructurados:', error);
      return {
        supplier_name: 'Error en extracción',
        delivery_date: new Date().toISOString().split('T')[0],
        items: [],
        raw_text: text,
        error: error.message
      };
    }
  }

  /**
   * Extrae el nombre del proveedor del texto
   * @param {string} text - Texto del albarán
   * @returns {string} - Nombre del proveedor
   */
  extractSupplierName(text) {
    // Patrones comunes para proveedores
    const proveedoresPosibles = [
      'DISBESA', 'MAKRO', 'LOGIREST', 'MERCADONA', 'DRINKS SOL', 
      'GRUPO DISBESA', 'CARREFOUR', 'ALCAMPO', 'SISTEMA CASH', 
      'SYSCO', 'HEINEKEN ESPAÑA', 'BODEGAS', 'DISTRIBUCIONES'
    ];
    
    let supplierName = 'Proveedor desconocido';
    
    // Buscar en las primeras 15 líneas del texto (normalmente el encabezado)
    const lineas = text.split('\n').slice(0, 15);
    
    for (const linea of lineas) {
      // Buscar coincidencias con proveedores conocidos
      for (const proveedor of proveedoresPosibles) {
        if (linea.toUpperCase().includes(proveedor)) {
          supplierName = proveedor;
          
          // Intentar extraer el nombre completo de la línea
          const lineaTrimmed = linea.trim();
          if (lineaTrimmed.length > proveedor.length + 5) {
            // Si la línea es más larga que el nombre del proveedor, probablemente contiene el nombre completo
            supplierName = lineaTrimmed;
          }
          
          return supplierName;
        }
      }
    }
    
    return supplierName;
  }

  /**
   * Extrae la fecha de entrega del texto
   * @param {string} text - Texto del albarán
   * @returns {string} - Fecha de entrega en formato YYYY-MM-DD
   */
  extractDeliveryDate(text) {
    // Por defecto usar la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];
    
    // Buscar patrones de fecha en el texto (dd/mm/yyyy, dd-mm-yyyy, etc.)
    const patronesFecha = [
      /(\d{1,2})[/-](\d{1,2})[/-](20\d{2})/,  // dd/mm/yyyy o dd-mm-yyyy
      /(\d{1,2})[/-](\d{1,2})[/-](\d{2})/,    // dd/mm/yy o dd-mm-yy
      /(\d{2})(\d{2})(20\d{2})/,              // ddmmyyyy
      /(20\d{2})[/-](\d{1,2})[/-](\d{1,2})/   // yyyy/mm/dd o yyyy-mm-dd
    ];
    
    // Buscar en las primeras 20 líneas del texto
    const lineas = text.split('\n').slice(0, 20);
    
    for (const linea of lineas) {
      // Buscar palabras clave relacionadas con fechas
      const palabrasClave = ['fecha', 'entrega', 'albaran', 'albarán', 'pedido', 'delivery'];
      let lineaRelevante = false;
      
      for (const palabra of palabrasClave) {
        if (linea.toLowerCase().includes(palabra)) {
          lineaRelevante = true;
          break;
        }
      }
      
      if (lineaRelevante || /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/.test(linea)) {
        // Probar cada patrón de fecha
        for (const patron of patronesFecha) {
          const match = linea.match(patron);
          if (match) {
            // Determinar el formato según el patrón que hizo match
            if (patron.toString().includes('20\\d{2})[/-](\\d{1,2})')) {
              // Formato yyyy/mm/dd
              const anio = match[1];
              const mes = match[2].padStart(2, '0');
              const dia = match[3].padStart(2, '0');
              return `${anio}-${mes}-${dia}`;
            } else {
              // Formato dd/mm/yyyy o similar
              let dia = match[1].padStart(2, '0');
              let mes = match[2].padStart(2, '0');
              let anio = match[3];
              
              // Si el año tiene 2 dígitos, convertir a 4 dígitos
              if (anio.length === 2) {
                anio = `20${anio}`;
              }
              
              return `${anio}-${mes}-${dia}`;
            }
          }
        }
      }
    }
    
    return fechaActual;
  }

  /**
   * Extrae los productos del texto del albarán
   * @param {string} text - Texto del albarán
   * @returns {Array} - Lista de productos
   */
  extractProducts(text) {
    const productos = [];
    const lineas = text.split('\n');
    
    // Patrones para identificar líneas de productos
    const patronCantidad = /\b\d+([,.]\d+)?\s*(ud|kg|l|g|ml|unid|unidades|kilos|litros|gramos|botellas|cajas|paquetes|bolsas)?\b/i;
    const patronPrecio = /\b\d+([,.]\d+)?\s*(€|eur|euros)?\b/i;
    
    // Palabras que indican secciones de productos
    const seccionesProductos = ['artículo', 'producto', 'descripción', 'concepto', 'referencia', 'cant', 'cantidad', 'precio'];
    
    // Determinar si estamos en una sección de productos
    let enSeccionProductos = false;
    let lineaActual = 0;
    
    while (lineaActual < lineas.length) {
      const linea = lineas[lineaActual].trim();
      
      // Verificar si esta línea indica el inicio de una sección de productos
      if (!enSeccionProductos) {
        const lineaLower = linea.toLowerCase();
        for (const seccion of seccionesProductos) {
          if (lineaLower.includes(seccion)) {
            enSeccionProductos = true;
            break;
          }
        }
        
        lineaActual++;
        continue;
      }
      
      // Si la línea está vacía o contiene palabras clave de fin de sección, salir de la sección
      if (linea === '' || 
          linea.toLowerCase().includes('total') || 
          linea.toLowerCase().includes('subtotal') ||
          linea.toLowerCase().includes('suma') ||
          linea.toLowerCase().includes('base imponible')) {
        enSeccionProductos = false;
        lineaActual++;
        continue;
      }
      
      // Verificar si la línea contiene información de un producto
      const tieneCantidad = patronCantidad.test(linea);
      const tienePrecio = patronPrecio.test(linea);
      
      if (tieneCantidad || tienePrecio) {
        // Extraer nombre del producto (puede estar en esta línea o en líneas anteriores/siguientes)
        let nombreProducto = linea;
        let cantidad = 0;
        let unidad = 'ud';
        let precio = 0;
        
        // Extraer cantidad
        const matchCantidad = linea.match(patronCantidad);
        if (matchCantidad) {
          cantidad = parseFloat(matchCantidad[0].replace(',', '.'));
          if (matchCantidad[2]) {
            unidad = matchCantidad[2].toLowerCase();
          }
        }
        
        // Extraer precio
        const matchPrecio = linea.match(patronPrecio);
        if (matchPrecio) {
          precio = parseFloat(matchPrecio[0].replace(',', '.').replace('€', '').replace('eur', '').replace('euros', '').trim());
        }
        
        // Limpiar el nombre del producto
        nombreProducto = nombreProducto
          .replace(patronCantidad, '')
          .replace(patronPrecio, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Si el nombre es muy corto, buscar en líneas adyacentes
        if (nombreProducto.length < 3 && lineaActual > 0) {
          nombreProducto = lineas[lineaActual - 1].trim();
        }
        
        // Añadir el producto si tiene nombre y cantidad
        if (nombreProducto && nombreProducto.length > 2 && cantidad > 0) {
          productos.push({
            name: nombreProducto,
            quantity: cantidad,
            unit: unidad,
            price: precio
          });
        }
      }
      
      lineaActual++;
    }
    
    return productos;
  }
}

export default StructuredDataExtractor;
