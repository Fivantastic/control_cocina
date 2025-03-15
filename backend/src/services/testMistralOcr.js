import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';
import fs from 'fs/promises';

async function testOcr() {
    try {
        console.log('Iniciando test de OCR con Mistral...');
        const apiKey = process.env.MISTRAL_API_KEY;
        console.log('API Key encontrada:', apiKey ? 'Sí' : 'No');

        // Leer una imagen de prueba
        console.log('Leyendo imagen...');
        const imageBuffer = await fs.readFile('../docs/albaran1.jpeg');
        const base64Image = imageBuffer.toString('base64');

        // Realizar OCR usando el modelo de chat con document understanding
        console.log('Procesando OCR con document understanding...');
        const client = new Mistral({ apiKey });
        const ocrResponse = await client.chat.complete({
            model: "pixtral-large-latest", // Usando el modelo más nuevo de visión
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Extrae la información de los productos del albarán. Para cada línea:

1. FORMATO:
Código: [número exacto]
Descripción: [texto exacto como aparece]
U.M.: [CAJ o UNI]
Cantidad: [número exacto]
Precio: [número exacto con 4 decimales]
TOTAL: [número exacto con 3 decimales]

2. INSTRUCCIONES ESPECÍFICAS:
- NO interpretes ni corrijas el texto, cópialo EXACTAMENTE como aparece
- Presta especial atención a los números y símbolos
- Mantén los espacios y puntuación original
- Si hay un carácter que no estás seguro, marca con [?]

3. ESTRUCTURA:
- Separa cada producto con una línea de guiones
- Lista los productos en el orden exacto que aparecen
- NO omitas ningún campo

Extrae ahora la información:
   - NO corrijas ni interpretes lo que lees
   - Mantén cada letra, número y símbolo tal cual aparece

2. ATENCIÓN ESPECIAL:
   - Cada letra individual en nombres de productos
   - Números de referencia completos
   - Espacios y símbolos especiales
   - Precios con TODOS sus decimales

3. VERIFICACIÓN:
   - Revisa cada carácter dos veces
   - Confirma que no hay interpretaciones
   - Asegúrate de que cada símbolo es exacto

Para cada línea de la tabla, muestra:
---
Código: [exactamente como aparece]
Descripción: [transcripción literal, carácter por carácter]
Detalles Uni.: [línea completa, exactamente como aparece]
Precio: [todos los dígitos y decimales]
Total: [todos los dígitos y decimales]
---`
                        },
                        {
                            type: "image_url",
                            imageUrl: `data:image/jpeg;base64,${base64Image}`
                        }
                    ]
                }
            ]
        });

        console.log('¡OCR exitoso!');
        console.log('\nTexto extraído del albarán:');
        console.log('='.repeat(80));
        
        if (ocrResponse.choices && ocrResponse.choices.length > 0) {
            const texto = ocrResponse.choices[0].message.content;
            
            // Dividir por secciones para mejor visualización
            const secciones = texto.split('\n\n');
            secciones.forEach((seccion, index) => {
                if (seccion.trim()) {
                    console.log(seccion.trim());
                    if (index < secciones.length - 1) {
                        console.log('-'.repeat(80));
                    }
                }
            });
        } else {
            console.log('No se encontró contenido en la respuesta');
        }
        
        console.log('='.repeat(80));
        console.log('\nEstadísticas de procesamiento:');
        console.log('- Tokens utilizados:', ocrResponse.usage.totalTokens);
        console.log('- Tokens en prompt:', ocrResponse.usage.promptTokens);
        console.log('- Tokens en respuesta:', ocrResponse.usage.completionTokens);
        
        return true;
    } catch (error) {
        console.error('Error al hacer OCR con Mistral:', error);
        throw error;
    }
}

// Ejecutar el test
testOcr()
    .then(() => console.log('Test OCR completado'))
    .catch(error => console.error('Test OCR fallido:', error));
