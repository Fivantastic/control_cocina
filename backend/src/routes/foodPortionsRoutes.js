import express from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/env.js';
import { extractClinicId } from '../middleware/clinicMiddleware.js';

const router = express.Router();

// Middleware para extraer el ID de la clínica
router.use(extractClinicId);

// Obtener todas las porciones de comida según colores para una clínica
router.get('/', async (req, res) => {
  try {
    const clinicId = req.query.clinicId || req.headers['x-clinic-id'];
    
    if (!clinicId) {
      return res.status(400).json({ message: 'Se requiere el ID de la clínica' });
    }

    const connection = await mysql.createConnection(dbConfig);
    
    const [portions] = await connection.query(
      `SELECT fp.*, bcc.color_name, bcc.color_code 
       FROM food_portions fp
       JOIN bread_color_codes bcc ON fp.color_id = bcc.id
       WHERE fp.clinic_id = ?
       ORDER BY fp.portion_type, bcc.color_name`,
      [clinicId]
    );
    
    await connection.end();

    // Agrupar por tipo de porción para facilitar el uso en el frontend
    const portionsByType = portions.reduce((acc, portion) => {
      if (!acc[portion.portion_type]) {
        acc[portion.portion_type] = [];
      }
      acc[portion.portion_type].push({
        id: portion.id,
        colorId: portion.color_id,
        colorName: portion.color_name,
        colorCode: portion.color_code,
        quantity: portion.quantity,
        unit: portion.unit
      });
      return acc;
    }, {});

    res.json(portionsByType);
  } catch (error) {
    console.error('Error al obtener porciones de comida:', error);
    res.status(500).json({ message: 'Error al obtener porciones de comida', error: error.message });
  }
});

// Obtener porciones de comida por día de la semana y tipo de comida
router.get('/day/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params;
    const { weekNumber = 1, mealType } = req.query;
    
    if (!dayOfWeek) {
      return res.status(400).json({ message: 'Se requiere el día de la semana' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    let query = `
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.clinic_id = ? AND fp.day_of_week = ? AND fp.week_number = ?
    `;
    
    const queryParams = [req.clinicId, dayOfWeek, weekNumber];
    
    if (mealType) {
      query += ' AND fp.meal_type = ?';
      queryParams.push(mealType);
    }
    
    const [rows] = await connection.query(query, queryParams);
    
    await connection.end();
    
    // Organizar los resultados por tipo de plato
    const result = {
      '1ro': [],
      '2ndo': [],
      'Acomp': [],
      'Postre': []
    };
    
    rows.forEach(row => {
      if (result[row.portion_type]) {
        result[row.portion_type].push(row);
      }
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error al obtener porciones de comida por día:', error);
    res.status(500).json({ message: 'Error al obtener porciones de comida por día' });
  }
});

// Obtener una porción de comida por ID
router.get('/id/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.query(`
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.id = ? AND fp.clinic_id = ?
    `, [req.params.id, req.clinicId]);
    
    await connection.end();
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Porción de comida no encontrada' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener porción de comida:', error);
    res.status(500).json({ message: 'Error al obtener porción de comida' });
  }
});

// Obtener porciones de comida por semana
router.get('/week/:weekNumber', async (req, res) => {
  try {
    const { weekNumber } = req.params;
    const { mealType } = req.query;
    
    if (!weekNumber) {
      return res.status(400).json({ message: 'Se requiere el número de semana' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    let query = `
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.clinic_id = ? AND fp.week_number = ?
    `;
    
    const queryParams = [req.clinicId, weekNumber];
    
    if (mealType) {
      query += ' AND fp.meal_type = ?';
      queryParams.push(mealType);
    }
    
    const [rows] = await connection.query(query, queryParams);
    
    await connection.end();
    
    // Organizar los resultados por día de la semana y tipo de plato
    const result = {
      'Lunes': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Martes': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Miércoles': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Jueves': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Viernes': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Sábado': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] },
      'Domingo': { '1ro': [], '2ndo': [], 'Acomp': [], 'Postre': [] }
    };
    
    rows.forEach(row => {
      if (result[row.day_of_week] && result[row.day_of_week][row.portion_type]) {
        result[row.day_of_week][row.portion_type].push(row);
      }
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error al obtener porciones de comida por semana:', error);
    res.status(500).json({ message: 'Error al obtener porciones de comida por semana' });
  }
});

// Crear una nueva porción de comida
router.post('/', async (req, res) => {
  try {
    const { 
      colorId, 
      portionType, 
      quantity, 
      unit = 'gr', 
      dayOfWeek, 
      mealType, 
      weekNumber = 1 
    } = req.body;
    
    if (!colorId || !portionType || !quantity || !dayOfWeek || !mealType) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.query(
      'INSERT INTO food_portions (color_id, portion_type, quantity, unit, day_of_week, meal_type, week_number, clinic_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [colorId, portionType, quantity, unit, dayOfWeek, mealType, weekNumber, req.clinicId]
    );
    
    const [newPortion] = await connection.query(`
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.id = ? AND fp.clinic_id = ?
    `, [result.insertId, req.clinicId]);
    
    await connection.end();
    
    res.status(201).json(newPortion[0]);
  } catch (error) {
    console.error('Error al crear porción de comida:', error);
    res.status(500).json({ message: 'Error al crear porción de comida' });
  }
});

// Actualizar una porción de comida
router.put('/:id', async (req, res) => {
  try {
    const { 
      colorId, 
      portionType, 
      quantity, 
      unit = 'gr', 
      dayOfWeek, 
      mealType, 
      weekNumber 
    } = req.body;
    
    if (!colorId || !portionType || !quantity || !dayOfWeek || !mealType) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.query(
      'UPDATE food_portions SET color_id = ?, portion_type = ?, quantity = ?, unit = ?, day_of_week = ?, meal_type = ?, week_number = ? WHERE id = ? AND clinic_id = ?',
      [colorId, portionType, quantity, unit, dayOfWeek, mealType, weekNumber, req.params.id, req.clinicId]
    );
    
    if (result.affectedRows === 0) {
      await connection.end();
      return res.status(404).json({ message: 'Porción de comida no encontrada' });
    }
    
    const [updatedPortion] = await connection.query(`
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.id = ? AND fp.clinic_id = ?
    `, [req.params.id, req.clinicId]);
    
    await connection.end();
    
    res.json(updatedPortion[0]);
  } catch (error) {
    console.error('Error al actualizar porción de comida:', error);
    res.status(500).json({ message: 'Error al actualizar porción de comida' });
  }
});

// Eliminar una porción de comida
router.delete('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.query(
      'DELETE FROM food_portions WHERE id = ? AND clinic_id = ?',
      [req.params.id, req.clinicId]
    );
    
    await connection.end();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Porción de comida no encontrada' });
    }
    
    res.json({ message: 'Porción de comida eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar porción de comida:', error);
    res.status(500).json({ message: 'Error al eliminar porción de comida' });
  }
});

// Eliminar todas las porciones de comida de una semana
router.delete('/week/:weekNumber', async (req, res) => {
  try {
    const { weekNumber } = req.params;
    
    if (!weekNumber) {
      return res.status(400).json({ message: 'Se requiere el número de semana' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.query(
      'DELETE FROM food_portions WHERE week_number = ? AND clinic_id = ?',
      [weekNumber, req.clinicId]
    );
    
    await connection.end();
    
    res.json({ 
      message: `Porciones de comida de la semana ${weekNumber} eliminadas correctamente`,
      affectedRows: result.affectedRows
    });
  } catch (error) {
    console.error('Error al eliminar porciones de comida por semana:', error);
    res.status(500).json({ message: 'Error al eliminar porciones de comida por semana' });
  }
});

// Obtener un informe detallado de comidas por paciente
router.get('/patient-meals/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params;
    const { weekNumber = 1, mealType = 'Comida' } = req.query;
    const clinicId = req.clinicId;
    
    if (!dayOfWeek) {
      return res.status(400).json({ message: 'Se requiere el día de la semana' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    // 1. Obtener todos los pacientes con sus colores de pan asignados
    // Convertir el tipo de comida a inglés para la consulta
    const mealTypeInEnglish = mealType === 'Comida' ? 'lunch' : 'dinner';
    
    const [patients] = await connection.query(
      `SELECT DISTINCT p.id, p.name, bcc.id as color_id, bcc.color_name, bcc.color_code
       FROM patients p
       INNER JOIN patient_meal_bread pmb ON p.id = pmb.patient_id
       INNER JOIN bread_color_codes bcc ON pmb.bread_color_id = bcc.id
       WHERE p.clinic_id = ? AND pmb.meal_type = ? AND bcc.color_name IS NOT NULL
       ORDER BY p.name`,
      [clinicId, mealTypeInEnglish]
    );
    
    // 2. Obtener las porciones de comida para el día y tipo de comida seleccionados
    const [portions] = await connection.query(
      `SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
       FROM food_portions fp
       JOIN bread_color_codes bcc ON fp.color_id = bcc.id
       WHERE fp.clinic_id = ? AND fp.day_of_week = ? AND fp.week_number = ? AND fp.meal_type = ?`,
      [clinicId, dayOfWeek, weekNumber, mealType]
    );
    
    // 2.1 Si no hay porciones configuradas, obtener los colores disponibles para esta clínica
    const [availableColors] = await connection.query(
      `SELECT DISTINCT bcc.id, bcc.color_name, bcc.color_code
       FROM bread_color_codes bcc
       WHERE bcc.clinic_id = ?`,
      [clinicId]
    );
    
    // 3. Obtener los nombres de los platos del menú para este día y tipo de comida
    // Convertir el día de la semana a número (Lunes=1, Martes=2, etc.)
    const dayOfWeekNumber = {
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sábado': 6,
      'Domingo': 7
    }[dayOfWeek];
    
    // Convertir el tipo de comida a formato de base de datos
    const mealTypeDb = mealType === 'Comida' ? 'comida' : 'cena';
    
    const [menuItems] = await connection.query(
      `SELECT md.day_of_week, m.service_type as meal_type, d.category, d.name as dish_name, d.description, d.measurement_unit
       FROM menu_dishes md
       JOIN menus m ON md.menu_id = m.id
       JOIN dishes d ON md.dish_id = d.id
       WHERE m.clinic_id = ? AND md.day_of_week = ? AND md.week_number = ? AND m.service_type = ? AND m.is_active = 1
       ORDER BY d.category`,
      [clinicId, dayOfWeekNumber, weekNumber, mealTypeDb]
    );
    
    // Función para determinar la unidad de medida de un plato
    const getDishUnit = (dish) => {
      // Si el plato tiene una unidad de medida definida en la base de datos, usarla
      if (dish.measurement_unit) {
        return dish.measurement_unit;
      }
      
      // Si no, usar 'gr' como valor predeterminado
      return 'gr';
    };
    
    // Organizar los platos por tipo
    const dishesByType = {};
    const dishUnitTypes = {}; // Para almacenar qué platos se miden por unidades
    
    menuItems.forEach(item => {
      // Convertir el tipo de plato del menú al formato de las porciones
      let portionType;
      switch(item.category.toLowerCase()) {
        case 'primero': portionType = '1ro'; break;
        case 'segundo': portionType = '2ndo'; break;
        case 'guarnicion': 
        case 'guarnición': portionType = 'Acomp'; break;
        case 'postre': portionType = 'Postre'; break;
        default: 
          console.log(`Categoría no reconocida: ${item.category}`);
          portionType = item.category;
      }
      
      // Obtener la unidad de medida del plato
      const dishUnit = getDishUnit(item);
      const isUnitBased = dishUnit === 'u';
      
      if (!dishesByType[portionType]) {
        dishesByType[portionType] = [];
        dishUnitTypes[portionType] = isUnitBased;
      }
      
      dishesByType[portionType].push({
        name: item.dish_name,
        description: item.description,
        isUnitBased: isUnitBased,
        unit: dishUnit
      });
    });
    
    // 3. Organizar las porciones por tipo y color
    const portionsByTypeAndColor = {
      '1ro': {},
      '2ndo': {},
      'Acomp': {},
      'Postre': {}
    };
    
    // Valores predeterminados por tipo de plato y color
    const defaultPortions = {
      '1ro': {
        'Rojo': { quantity: 200, unit: 'gr' },
        'Amarillo': { quantity: 250, unit: 'gr' },
        'Azul': { quantity: 300, unit: 'gr' },
        'Extra Rojo': { quantity: 150, unit: 'gr' }
      },
      '2ndo': {
        'Rojo': { quantity: 200, unit: 'gr' },
        'Amarillo': { quantity: 250, unit: 'gr' },
        'Azul': { quantity: 300, unit: 'gr' },
        'Extra Rojo': { quantity: 150, unit: 'gr' }
      },
      'Acomp': {
        'Rojo': { quantity: 50, unit: 'gr' },
        'Amarillo': { quantity: 100, unit: 'gr' },
        'Azul': { quantity: 150, unit: 'gr' },
        'Extra Rojo': { quantity: 50, unit: 'gr' }
      },
      'Postre': {
        'Rojo': { quantity: 0, unit: 'gr' },
        'Amarillo': { quantity: 0, unit: 'gr' },
        'Azul': { quantity: 0, unit: 'gr' },
        'Extra Rojo': { quantity: 0, unit: 'gr' }
      }
    };
    
    // Valores predeterminados para platos que se miden por unidades
    const defaultUnitPortions = {
      '2ndo': {
        'Rojo': { quantity: 1, unit: 'u' },
        'Amarillo': { quantity: 1, unit: 'u' },
        'Azul': { quantity: 2, unit: 'u' },
        'Extra Rojo': { quantity: 1, unit: 'u' }
      },
      'Acomp': {
        'Rojo': { quantity: 1, unit: 'u' },
        'Amarillo': { quantity: 1, unit: 'u' },
        'Azul': { quantity: 2, unit: 'u' },
        'Extra Rojo': { quantity: 1, unit: 'u' }
      },
      'Postre': {
        'Rojo': { quantity: 0, unit: 'u' },
        'Amarillo': { quantity: 0, unit: 'u' },
        'Azul': { quantity: 0, unit: 'u' },
        'Extra Rojo': { quantity: 0, unit: 'u' }
      }
    };

    // Si hay porciones configuradas, usarlas, pero mantener los valores predeterminados para los tipos de platos sin porciones configuradas
    if (portions.length > 0) {
      // Primero, inicializar todos los tipos de platos con valores predeterminados
      for (const portionType in portionsByTypeAndColor) {
        const isUnitBased = dishUnitTypes[portionType] || false;
        const defaultValues = isUnitBased ? defaultUnitPortions[portionType] : defaultPortions[portionType];
        
        if (defaultValues) {
          availableColors.forEach(color => {
            if (!portionsByTypeAndColor[portionType][color.color_name] && defaultValues[color.color_name]) {
              portionsByTypeAndColor[portionType][color.color_name] = {
                quantity: defaultValues[color.color_name].quantity,
                unit: defaultValues[color.color_name].unit
              };
            }
          });
        }
      }
      
      // Luego, sobrescribir con las porciones configuradas
      portions.forEach(portion => {
        if (!portionsByTypeAndColor[portion.portion_type]) {
          portionsByTypeAndColor[portion.portion_type] = {};
        }
        // Verificar que colorName no sea null o undefined
        if (portion.colorName) {
          portionsByTypeAndColor[portion.portion_type][portion.colorName] = {
            quantity: portion.quantity,
            unit: portion.unit
          };
        }
      });
    } 
    // Si no hay porciones configuradas, crear valores predeterminados basados en los colores disponibles
    else if (availableColors.length > 0) {
      // Valores predeterminados por tipo de plato y color
      const defaultPortions = {
        '1ro': {
          'Rojo': { quantity: 200, unit: 'gr' },
          'Amarillo': { quantity: 250, unit: 'gr' },
          'Azul': { quantity: 300, unit: 'gr' },
          'Extra Rojo': { quantity: 150, unit: 'gr' }
        },
        '2ndo': {
          'Rojo': { quantity: 200, unit: 'gr' },
          'Amarillo': { quantity: 250, unit: 'gr' },
          'Azul': { quantity: 300, unit: 'gr' },
          'Extra Rojo': { quantity: 150, unit: 'gr' }
        },
        'Acomp': {
          'Rojo': { quantity: 50, unit: 'gr' },
          'Amarillo': { quantity: 100, unit: 'gr' },
          'Azul': { quantity: 150, unit: 'gr' },
          'Extra Rojo': { quantity: 50, unit: 'gr' }
        },
        'Postre': {
          'Rojo': { quantity: 0, unit: 'gr' },
          'Amarillo': { quantity: 0, unit: 'gr' },
          'Azul': { quantity: 0, unit: 'gr' },
          'Extra Rojo': { quantity: 0, unit: 'gr' }
        }
      };
      
      // Valores predeterminados para platos que se miden por unidades
      const defaultUnitPortions = {
        '1ro': {
          'Rojo': { quantity: 1, unit: 'u' },
          'Amarillo': { quantity: 1, unit: 'u' },
          'Azul': { quantity: 2, unit: 'u' },
          'Extra Rojo': { quantity: 1, unit: 'u' }
        },
        '2ndo': {
          'Rojo': { quantity: 1, unit: 'u' },
          'Amarillo': { quantity: 1, unit: 'u' },
          'Azul': { quantity: 2, unit: 'u' },
          'Extra Rojo': { quantity: 1, unit: 'u' }
        },
        'Acomp': {
          'Rojo': { quantity: 1, unit: 'u' },
          'Amarillo': { quantity: 1, unit: 'u' },
          'Azul': { quantity: 2, unit: 'u' },
          'Extra Rojo': { quantity: 1, unit: 'u' }
        },
        'Postre': {
          'Rojo': { quantity: 0, unit: 'u' },
          'Amarillo': { quantity: 0, unit: 'u' },
          'Azul': { quantity: 0, unit: 'u' },
          'Extra Rojo': { quantity: 0, unit: 'u' }
        }
      };
      
      // Asignar valores predeterminados para cada color disponible
      availableColors.forEach(color => {
        for (const portionType in portionsByTypeAndColor) {
          // Determinar si este tipo de plato se mide por unidades
          const isUnitBased = dishUnitTypes[portionType] || false;
          // Obtener la unidad de medida correcta para este tipo de plato
          const dishUnit = isUnitBased ? 'u' : 'gr';
          
          if (isUnitBased && defaultUnitPortions[portionType] && defaultUnitPortions[portionType][color.color_name]) {
            // Usar valores predeterminados para platos por unidades
            portionsByTypeAndColor[portionType][color.color_name] = {
              quantity: defaultUnitPortions[portionType][color.color_name].quantity,
              unit: dishUnit
            };
          } else if (defaultPortions[portionType] && defaultPortions[portionType][color.color_name]) {
            // Usar valores predeterminados para platos por gramos
            portionsByTypeAndColor[portionType][color.color_name] = {
              quantity: defaultPortions[portionType][color.color_name].quantity,
              unit: dishUnit
            };
          }
        }
      });
    }
    
    // 4. Crear el informe detallado por paciente
    const patientMeals = [];
    const totalsByType = {
      '1ro': { quantity: 0, unit: 'gr' },
      '2ndo': { quantity: 0, unit: 'gr' },
      'Acomp': { quantity: 0, unit: 'gr' },
      'Postre': { quantity: 0, unit: 'gr' }
    };
    
    // Inicializar las unidades correctas basadas en las porciones disponibles
    for (const portionType in portionsByTypeAndColor) {
      for (const colorName in portionsByTypeAndColor[portionType]) {
        if (portionsByTypeAndColor[portionType][colorName]) {
          totalsByType[portionType].unit = portionsByTypeAndColor[portionType][colorName].unit;
          break;
        }
      }
    }
    
    // 5. Procesar cada paciente
    patients.forEach(patient => {
      const patientColor = patient.color_name;
      if (!patientColor) return; // Omitir pacientes sin color asignado
      
      const patientMeal = {
        id: patient.id,
        name: patient.name,
        color: patientColor,
        meals: {}
      };
      
      // Asignar las porciones según el color del paciente
      for (const portionType in portionsByTypeAndColor) {
        if (portionsByTypeAndColor[portionType][patientColor]) {
          patientMeal.meals[portionType] = {
            quantity: portionsByTypeAndColor[portionType][patientColor].quantity,
            unit: portionsByTypeAndColor[portionType][patientColor].unit,
            dishName: dishesByType[portionType] && dishesByType[portionType].length > 0 ? 
                     dishesByType[portionType][0].name : ''
          };
          
          // Sumar a los totales
          totalsByType[portionType].quantity += portionsByTypeAndColor[portionType][patientColor].quantity;
        }
      }
      
      patientMeals.push(patientMeal);
    });
    
    // 6. Agregar una muestra testigo de color azul
    const testSample = {
      name: 'MUESTRA TESTIGO',
      color: 'Azul',
      meals: {}
    };
    
    for (const portionType in portionsByTypeAndColor) {
      if (portionsByTypeAndColor[portionType]['Azul']) {
        testSample.meals[portionType] = {
          quantity: portionsByTypeAndColor[portionType]['Azul'].quantity,
          unit: portionsByTypeAndColor[portionType]['Azul'].unit,
          dishName: dishesByType[portionType] && dishesByType[portionType].length > 0 ? 
                   dishesByType[portionType][0].name : ''
        };
        // Sumar a los totales
        totalsByType[portionType].quantity += portionsByTypeAndColor[portionType]['Azul'].quantity;
      }
    }
    
    // 7. Agregar la muestra testigo al final
    patientMeals.push(testSample);
    
    await connection.end();
    
    res.json({
      dayOfWeek,
      weekNumber,
      mealType,
      patients: patientMeals,
      totals: totalsByType,
      dishes: dishesByType,
      dishUnitTypes: dishUnitTypes // Incluir información sobre qué platos se miden por unidades
    });
  } catch (error) {
    console.error('Error al obtener informe de comidas por paciente:', error);
    res.status(500).json({ message: 'Error al obtener informe de comidas por paciente', error: error.message });
  }
});

// Calcular el total de comida necesaria por día, tipo de comida y color
router.get('/totals/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params;
    const { weekNumber = 1, mealType } = req.query;
    const { patientCounts } = req.body; // Ejemplo: { 'Rojo': 5, 'Amarillo': 8, 'Azul': 3 }
    
    if (!dayOfWeek) {
      return res.status(400).json({ message: 'Se requiere el día de la semana' });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    let query = `
      SELECT fp.*, bcc.color_name as colorName, bcc.color_code as colorCode 
      FROM food_portions fp
      JOIN bread_color_codes bcc ON fp.color_id = bcc.id
      WHERE fp.clinic_id = ? AND fp.day_of_week = ? AND fp.week_number = ?
    `;
    
    const queryParams = [req.clinicId, dayOfWeek, weekNumber];
    
    if (mealType) {
      query += ' AND fp.meal_type = ?';
      queryParams.push(mealType);
    }
    
    const [rows] = await connection.query(query, queryParams);
    
    await connection.end();
    
    // Organizar los resultados por tipo de plato y color
    const result = {
      '1ro': { 'Rojo': null, 'Amarillo': null, 'Azul': null, 'Total': 0 },
      '2ndo': { 'Rojo': null, 'Amarillo': null, 'Azul': null, 'Total': 0 },
      'Acomp': { 'Rojo': null, 'Amarillo': null, 'Azul': null, 'Total': 0 },
      'Postre': { 'Rojo': null, 'Amarillo': null, 'Azul': null, 'Total': 0 }
    };
    
    // Asignar las porciones a cada color y tipo de plato
    rows.forEach(row => {
      if (result[row.portion_type] && row.colorName) {
        result[row.portion_type][row.colorName] = {
          quantity: row.quantity,
          unit: row.unit
        };
      }
    });
    
    // Calcular los totales si se proporcionaron los conteos de pacientes
    if (patientCounts) {
      Object.keys(result).forEach(portionType => {
        Object.keys(patientCounts).forEach(colorName => {
          const portion = result[portionType][colorName];
          if (portion && portion.quantity) {
            const count = patientCounts[colorName] || 0;
            result[portionType].Total += portion.quantity * count;
          }
        });
      });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error al calcular totales de comida:', error);
    res.status(500).json({ message: 'Error al calcular totales de comida' });
  }
});

export default router;
