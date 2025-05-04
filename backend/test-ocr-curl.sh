#!/bin/bash

# Ruta al archivo de imagen para probar
IMAGE_PATH="$1"

if [ -z "$IMAGE_PATH" ]; then
  echo "Uso: ./test-ocr-curl.sh ruta/a/la/imagen.jpg"
  exit 1
fi

if [ ! -f "$IMAGE_PATH" ]; then
  echo "Error: El archivo $IMAGE_PATH no existe"
  exit 1
fi

echo "Probando OCR con la imagen: $IMAGE_PATH"

# Llamada a la API de carga de albaranes
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "file=@$IMAGE_PATH" \
  http://localhost:3000/api/delivery-notes-upload/upload \
  | jq '.'

echo "Prueba completada"
