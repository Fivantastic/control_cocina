import fetch from 'node-fetch';

// URL de la API
const apiUrl = 'http://localhost:3000/api/delivery-notes-upload/confirm';

// Datos de ejemplo para un albarán
const deliveryNoteData = {
  supplier_name: "Distribuciones Test",
  delivery_date: "2025-05-03",
  delivery_note_number: "TEST-001",
  items: [
    {
      product_name: "Aceite Girasol Pet 5L x3",
      product_code: "ACG-001",
      quantity: 2,
      unit: "CAJ",
      price: 15.50
    },
    {
      product_name: "ACEITE OLIVA VIRGEN EXTRA 5L",
      product_code: "AOV-002",
      quantity: 1,
      unit: "L",
      price: 25.75
    },
    {
      product_name: "ACEITUNA NEGRA RODAJA 3KG CONSERVA",
      product_code: "ANR-003",
      quantity: 3,
      unit: "KG",
      price: 12.30
    }
  ]
};

// Función para enviar los datos
async function confirmDeliveryNote() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deliveryNoteData),
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error al confirmar el albarán:', error);
  }
}

// Ejecutar la función
confirmDeliveryNote();
