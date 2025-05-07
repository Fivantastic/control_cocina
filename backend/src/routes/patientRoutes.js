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

// Crear un nuevo paciente
router.post('/', async (req, res) => {
  try {
    const { name, notes } = req.body;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    if (!name) {
      return res.status(400).json({ message: 'El nombre del paciente es obligatorio' });
    }

    const [result] = await pool.query(
      'INSERT INTO patients (name, notes, clinic_id) VALUES (?, ?, ?)',
      [name, notes || '', clinicId]
    );

    const patientId = result.insertId;

    res.status(201).json({ 
      id: patientId, 
      name, 
      notes, 
      clinic_id: clinicId,
      message: 'Paciente creado correctamente' 
    });
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).json({ message: 'Error al crear paciente', error: error.message });
  }
});

// Actualizar un paciente existente
router.put('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const { name, notes } = req.body;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    if (!name) {
      return res.status(400).json({ message: 'El nombre del paciente es obligatorio' });
    }

    // Verificar que el paciente exista y pertenezca a la clínica
    const [patients] = await pool.query(
      'SELECT id FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    await pool.query(
      'UPDATE patients SET name = ?, notes = ? WHERE id = ?',
      [name, notes || '', patientId]
    );

    res.json({ 
      id: parseInt(patientId), 
      name, 
      notes, 
      clinic_id: parseInt(clinicId),
      message: 'Paciente actualizado correctamente' 
    });
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).json({ message: 'Error al actualizar paciente', error: error.message });
  }
});

// Eliminar un paciente
router.delete('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    // Verificar que el paciente exista y pertenezca a la clínica
    const [patients] = await pool.query(
      'SELECT id FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Eliminar primero las restricciones dietéticas
    await pool.query('DELETE FROM dietary_restrictions WHERE patient_id = ?', [patientId]);
    
    // Eliminar las asignaciones de categorías dietéticas
    await pool.query('DELETE FROM patient_dietary_categories WHERE patient_id = ?', [patientId]);
    
    // Eliminar las asignaciones de pan
    await pool.query('DELETE FROM patient_meal_bread WHERE patient_id = ?', [patientId]);
    
    // Finalmente eliminar el paciente
    await pool.query('DELETE FROM patients WHERE id = ?', [patientId]);

    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ message: 'Error al eliminar paciente', error: error.message });
  }
});

// Asignar color de pan a un paciente para una comida específica
router.post('/:id/bread-assignment', async (req, res) => {
  try {
    const patientId = req.params.id;
    const { mealType, breadColorId, isExtra, notes } = req.body;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    if (!mealType || !breadColorId) {
      return res.status(400).json({ message: 'El tipo de comida y el color del pan son obligatorios' });
    }

    // Verificar que el paciente exista y pertenezca a la clínica
    const [patients] = await pool.query(
      'SELECT id FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Verificar que el color de pan exista y pertenezca a la clínica
    const [breadColors] = await pool.query(
      'SELECT id FROM bread_color_codes WHERE id = ? AND clinic_id = ?',
      [breadColorId, clinicId]
    );

    if (breadColors.length === 0) {
      return res.status(404).json({ message: 'Código de color no encontrado' });
    }

    // Verificar si ya existe una asignación para esta comida
    const [existingAssignments] = await pool.query(
      'SELECT id FROM patient_meal_bread WHERE patient_id = ? AND meal_type = ?',
      [patientId, mealType]
    );

    if (existingAssignments.length > 0) {
      // Actualizar la asignación existente
      await pool.query(
        'UPDATE patient_meal_bread SET bread_color_id = ?, is_extra = ?, notes = ? WHERE patient_id = ? AND meal_type = ?',
        [breadColorId, isExtra ? 1 : 0, notes || '', patientId, mealType]
      );
    } else {
      // Crear una nueva asignación
      await pool.query(
        'INSERT INTO patient_meal_bread (patient_id, meal_type, bread_color_id, is_extra, notes) VALUES (?, ?, ?, ?, ?)',
        [patientId, mealType, breadColorId, isExtra ? 1 : 0, notes || '']
      );
    }

    // Obtener la asignación actualizada con los detalles del color
    const [updatedAssignment] = await pool.query(
      `SELECT pmb.*, bcc.color_name, bcc.color_code, bcc.description
       FROM patient_meal_bread pmb
       JOIN bread_color_codes bcc ON pmb.bread_color_id = bcc.id
       WHERE pmb.patient_id = ? AND pmb.meal_type = ?`,
      [patientId, mealType]
    );

    res.json({
      assignment: updatedAssignment[0],
      message: 'Asignación de pan actualizada correctamente'
    });
  } catch (error) {
    console.error('Error al asignar pan:', error);
    res.status(500).json({ message: 'Error al asignar pan', error: error.message });
  }
});

// Eliminar asignación de pan para un paciente y comida específica
router.delete('/:id/bread-assignment/:mealType', async (req, res) => {
  try {
    const patientId = req.params.id;
    const mealType = req.params.mealType;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    // Verificar que el paciente exista y pertenezca a la clínica
    const [patients] = await pool.query(
      'SELECT id FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Eliminar la asignación
    await pool.query(
      'DELETE FROM patient_meal_bread WHERE patient_id = ? AND meal_type = ?',
      [patientId, mealType]
    );

    res.json({ message: 'Asignación de pan eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar asignación de pan:', error);
    res.status(500).json({ message: 'Error al eliminar asignación de pan', error: error.message });
  }
});

// Añadir una restricción dietética a un paciente
router.post('/:id/restriction', async (req, res) => {
  try {
    const patientId = req.params.id;
    const { restrictionType, description } = req.body;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    if (!restrictionType || !description) {
      return res.status(400).json({ message: 'El tipo de restricción y la descripción son obligatorios' });
    }

    // Verificar que el paciente exista y pertenezca a la clínica
    const [patients] = await pool.query(
      'SELECT id FROM patients WHERE id = ? AND clinic_id = ?',
      [patientId, clinicId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Crear la restricción
    const [result] = await pool.query(
      'INSERT INTO dietary_restrictions (patient_id, restriction_type, description) VALUES (?, ?, ?)',
      [patientId, restrictionType, description]
    );

    const restrictionId = result.insertId;

    res.status(201).json({
      id: restrictionId,
      patient_id: parseInt(patientId),
      restriction_type: restrictionType,
      description,
      message: 'Restricción dietética añadida correctamente'
    });
  } catch (error) {
    console.error('Error al añadir restricción dietética:', error);
    res.status(500).json({ message: 'Error al añadir restricción dietética', error: error.message });
  }
});

// Actualizar una restricción dietética
router.put('/restriction/:id', async (req, res) => {
  try {
    const restrictionId = req.params.id;
    const { restrictionType, description } = req.body;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    if (!restrictionType || !description) {
      return res.status(400).json({ message: 'El tipo de restricción y la descripción son obligatorios' });
    }

    // Verificar que la restricción exista y pertenezca a un paciente de la clínica
    const [restrictions] = await pool.query(
      `SELECT dr.id FROM dietary_restrictions dr
       JOIN patients p ON dr.patient_id = p.id
       WHERE dr.id = ? AND p.clinic_id = ?`,
      [restrictionId, clinicId]
    );

    if (restrictions.length === 0) {
      return res.status(404).json({ message: 'Restricción dietética no encontrada' });
    }

    // Actualizar la restricción
    await pool.query(
      'UPDATE dietary_restrictions SET restriction_type = ?, description = ? WHERE id = ?',
      [restrictionType, description, restrictionId]
    );

    res.json({
      id: parseInt(restrictionId),
      restriction_type: restrictionType,
      description,
      message: 'Restricción dietética actualizada correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar restricción dietética:', error);
    res.status(500).json({ message: 'Error al actualizar restricción dietética', error: error.message });
  }
});

// Eliminar una restricción dietética
router.delete('/restriction/:id', async (req, res) => {
  try {
    const restrictionId = req.params.id;
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    // Verificar que la restricción exista y pertenezca a un paciente de la clínica
    const [restrictions] = await pool.query(
      `SELECT dr.id FROM dietary_restrictions dr
       JOIN patients p ON dr.patient_id = p.id
       WHERE dr.id = ? AND p.clinic_id = ?`,
      [restrictionId, clinicId]
    );

    if (restrictions.length === 0) {
      return res.status(404).json({ message: 'Restricción dietética no encontrada' });
    }

    // Eliminar la restricción
    await pool.query('DELETE FROM dietary_restrictions WHERE id = ?', [restrictionId]);

    res.json({ message: 'Restricción dietética eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar restricción dietética:', error);
    res.status(500).json({ message: 'Error al eliminar restricción dietética', error: error.message });
  }
});

export default router;
