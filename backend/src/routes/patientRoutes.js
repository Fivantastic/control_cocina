import express from 'express';
import { pool } from '../utils/db.js';
import { extractClinicId } from '../middleware/clinicMiddleware.js';

const router = express.Router();

// Middleware para extraer el ID de la clínica
router.use(extractClinicId);

// Obtener todos los pacientes de una clínica
router.get('/', async (req, res) => {
  try {
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    const [patients] = await pool.query(
      'SELECT * FROM patients WHERE clinic_id = ?',
      [clinicId]
    );

    res.json(patients);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'Error al obtener pacientes', error: error.message });
  }
});

// Obtener todos los códigos de colores para el pan de una clínica
router.get('/bread-codes/all', async (req, res) => {
  try {
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    const [breadCodes] = await pool.query(
      'SELECT * FROM bread_color_codes WHERE clinic_id = ?',
      [clinicId]
    );

    res.json(breadCodes);
  } catch (error) {
    console.error('Error al obtener códigos de pan:', error);
    res.status(500).json({ message: 'Error al obtener códigos de pan', error: error.message });
  }
});

// Obtener todas las categorías dietéticas de una clínica
router.get('/dietary-categories/all', async (req, res) => {
  try {
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    const [categories] = await pool.query(
      'SELECT * FROM dietary_categories WHERE clinic_id = ?',
      [clinicId]
    );

    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías dietéticas:', error);
    res.status(500).json({ message: 'Error al obtener categorías dietéticas', error: error.message });
  }
});

// Obtener la tabla completa de asignaciones de pan para todos los pacientes
router.get('/bread-assignments/table', async (req, res) => {
  try {
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    // Obtener todos los pacientes de la clínica
    const [patients] = await pool.query(
      'SELECT id, name FROM patients WHERE clinic_id = ? ORDER BY name',
      [clinicId]
    );

    // Para cada paciente, obtener sus asignaciones de pan
    const patientsWithAssignments = await Promise.all(
      patients.map(async (patient) => {
        const [assignments] = await pool.query(
          `SELECT pmb.meal_type, pmb.is_extra, bcc.color_name, bcc.color_code, bcc.description
           FROM patient_meal_bread pmb
           LEFT JOIN bread_color_codes bcc ON pmb.bread_color_id = bcc.id
           WHERE pmb.patient_id = ?`,
          [patient.id]
        );

        // Convertir el array de asignaciones a un objeto para fácil acceso
        const assignmentsByMeal = {};
        assignments.forEach(assignment => {
          assignmentsByMeal[assignment.meal_type] = {
            colorName: assignment.color_name,
            colorCode: assignment.color_code,
            description: assignment.description,
            isExtra: assignment.is_extra
          };
        });

        // Obtener restricciones dietéticas
        const [restrictions] = await pool.query(
          'SELECT restriction_type, description FROM dietary_restrictions WHERE patient_id = ?',
          [patient.id]
        );

        return {
          ...patient,
          breadAssignments: assignmentsByMeal,
          restrictions
        };
      })
    );

    res.json(patientsWithAssignments);
  } catch (error) {
    console.error('Error al obtener tabla de asignaciones:', error);
    res.status(500).json({ message: 'Error al obtener tabla de asignaciones', error: error.message });
  }
});

// Obtener un paciente específico con sus restricciones dietéticas
router.get('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    // Obtener información del paciente
    const [patients] = await pool.query(
      'SELECT * FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    const patient = patients[0];

    // Obtener restricciones dietéticas
    const [restrictions] = await pool.query(
      'SELECT * FROM dietary_restrictions WHERE patient_id = ?',
      [patientId]
    );

    // Obtener categorías dietéticas
    const [categories] = await pool.query(
      `SELECT dc.* FROM dietary_categories dc
       JOIN patient_dietary_categories pdc ON dc.id = pdc.category_id
       WHERE pdc.patient_id = ?`,
      [patientId]
    );

    // Obtener asignaciones de pan para cada comida
    const [breadAssignments] = await pool.query(
      `SELECT pmb.*, bcc.color_name, bcc.color_code, bcc.description as bread_description
       FROM patient_meal_bread pmb
       LEFT JOIN bread_color_codes bcc ON pmb.bread_color_id = bcc.id
       WHERE pmb.patient_id = ?`,
      [patientId]
    );

    // Combinar toda la información
    patient.restrictions = restrictions;
    patient.categories = categories;
    patient.breadAssignments = breadAssignments;

    res.json(patient);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({ message: 'Error al obtener paciente', error: error.message });
  }
});

export default router;
