import { pool } from '../utils/db.js';

export const extractClinicId = async (req, res, next) => {
    try {
        // Obtener el ID de la clínica de los headers o query params
        let clinicId = req.headers['x-clinic-id'] || req.query.clinicId;
        
        console.log('Headers:', req.headers);
        console.log('Query params:', req.query);
        console.log('Extracted clinic ID:', clinicId);
        
        // Si no se proporciona un ID de clínica, usar el valor predeterminado (1)
        if (!clinicId) {
            console.log('No clinic ID provided, using default (1)');
            clinicId = 1;
        }
        
        // Convertir a número
        clinicId = parseInt(clinicId, 10);
        
        // Verificar si la clínica existe
        const [clinics] = await pool.query('SELECT id FROM clinics WHERE id = ?', [clinicId]);
        
        if (clinics.length === 0) {
            console.log(`Clinic with ID ${clinicId} not found, using default (1)`);
            clinicId = 1;
        }
        
        // Añadir el ID de la clínica a la solicitud
        req.clinicId = clinicId;
        console.log('Final clinic ID set:', req.clinicId);
        
        next();
    } catch (error) {
        console.error('Error in clinic middleware:', error);
        // En caso de error, usar el ID de clínica predeterminado
        req.clinicId = 1;
        next();
    }
};

// Versión simplificada para rutas que no necesitan verificar la existencia de la clínica
export const extractClinicIdSimple = (req, res, next) => {
    // Obtener el ID de la clínica de los headers o query params
    let clinicId = req.headers['x-clinic-id'] || req.query.clinicId;
    
    console.log('Simple middleware - Headers:', req.headers);
    console.log('Simple middleware - Query params:', req.query);
    console.log('Simple middleware - Extracted clinic ID:', clinicId);
    
    // Si no se proporciona un ID de clínica, usar el valor predeterminado (1)
    if (!clinicId) {
        console.log('Simple middleware - No clinic ID provided, using default (1)');
        clinicId = 1;
    }
    
    // Convertir a número
    clinicId = parseInt(clinicId, 10);
    
    // Añadir el ID de la clínica a la solicitud
    req.clinicId = clinicId;
    console.log('Simple middleware - Final clinic ID set:', req.clinicId);
    
    next();
};

export default extractClinicId;
