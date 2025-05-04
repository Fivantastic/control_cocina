// Este es un ejemplo de cómo implementar la confirmación de albaranes en el frontend
// con la funcionalidad para mostrar productos nuevos y existentes

import React, { useState } from 'react';
import axios from 'axios';

const DeliveryNoteConfirmation = ({ deliveryNoteData, onConfirm, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  
  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Enviar los datos del albarán al backend
      const response = await axios.post('/api/delivery-notes/confirm', deliveryNoteData);
      
      setConfirmationResult(response.data);
      
      // Si hay productos nuevos, mostrar un mensaje de confirmación
      if (response.data.newProducts && response.data.newProducts.length > 0) {
        // Aquí puedes mostrar un modal o un mensaje para confirmar la creación de nuevos productos
        console.log(`Se han creado ${response.data.newProducts.length} productos nuevos`);
      }
      
      // Llamar al callback de confirmación
      if (onConfirm) {
        onConfirm(response.data);
      }
    } catch (err) {
      console.error('Error al confirmar el albarán:', err);
      setError(err.response?.data?.error || 'Error al confirmar el albarán');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Renderizar un modal de confirmación para productos nuevos
  const renderNewProductsConfirmation = () => {
    if (!confirmationResult || !confirmationResult.newProducts) return null;
    
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Productos Nuevos Detectados</h3>
          <p>Se han detectado {confirmationResult.newProducts.length} productos nuevos en este albarán:</p>
          
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Unidad</th>
              </tr>
            </thead>
            <tbody>
              {confirmationResult.newProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.code || 'N/A'}</td>
                  <td>{product.name}</td>
                  <td>{product.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="modal-actions">
            <button onClick={() => setConfirmationResult(null)}>Cerrar</button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="delivery-note-confirmation">
      <h2>Confirmar Albarán</h2>
      
      {/* Mostrar datos del albarán */}
      <div className="delivery-note-summary">
        <p><strong>Proveedor:</strong> {deliveryNoteData.supplier_name}</p>
        <p><strong>Fecha:</strong> {deliveryNoteData.delivery_date}</p>
        <p><strong>Número de Albarán:</strong> {deliveryNoteData.delivery_note_number || 'N/A'}</p>
      </div>
      
      {/* Tabla de productos */}
      <h3>Productos Detectados:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Lote</th>
            <th>Caducidad</th>
          </tr>
        </thead>
        <tbody>
          {deliveryNoteData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product_code || 'N/A'}</td>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.price} €</td>
              <td>{item.batch_number || 'N/A'}</td>
              <td>{item.expiry_date || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Botones de acción */}
      <div className="actions">
        <button 
          onClick={handleConfirm} 
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Guardando...' : 'Confirmar y Guardar'}
        </button>
        <button 
          onClick={onCancel} 
          disabled={isSubmitting}
          className="btn-secondary"
        >
          Cancelar
        </button>
      </div>
      
      {/* Mostrar errores */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Modal de confirmación para productos nuevos */}
      {renderNewProductsConfirmation()}
    </div>
  );
};

export default DeliveryNoteConfirmation;
