import { Mistral } from '@mistralai/mistralai';
import 'dotenv/config';

async function testConnection() {
    try {
        console.log('Iniciando test de conexión con Mistral...');
        const apiKey = process.env.MISTRAL_API_KEY;
        console.log('API Key encontrada:', apiKey ? 'Sí' : 'No');
        
        const client = new Mistral({
            apiKey: apiKey
        });

        // Intentar una llamada simple al chat
        const chatResponse = await client.chat.complete({
            model: "mistral-tiny",
            messages: [{ role: "user", content: "Hola, ¿estás ahí?" }],
            stream: false
        });

        console.log('¡Conexión exitosa!');
        console.log('Respuesta:', chatResponse);
        
        return true;
    } catch (error) {
        console.error('Error al conectar con Mistral:', error);
        throw error;
    }
}

// Ejecutar el test
testConnection()
    .then(() => console.log('Test completado'))
    .catch(error => console.error('Test fallido:', error));
