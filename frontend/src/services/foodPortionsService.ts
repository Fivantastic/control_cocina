import api from '../services/api';

export interface FoodPortion {
  id: number;
  color_id: number;
  colorName: string;
  colorCode: string;
  portion_type: '1ro' | '2ndo' | 'Acomp' | 'Postre';
  quantity: number;
  unit: string;
  day_of_week: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  meal_type: 'Comida' | 'Cena';
  week_number: number;
  clinic_id: number;
}

export interface FoodPortionsByType {
  '1ro': FoodPortion[];
  '2ndo': FoodPortion[];
  'Acomp': FoodPortion[];
  'Postre': FoodPortion[];
}

export interface FoodPortionsByDay {
  'Lunes': FoodPortionsByType;
  'Martes': FoodPortionsByType;
  'Miércoles': FoodPortionsByType;
  'Jueves': FoodPortionsByType;
  'Viernes': FoodPortionsByType;
  'Sábado': FoodPortionsByType;
  'Domingo': FoodPortionsByType;
}

// Obtener todas las porciones de comida según colores y tipo de plato
export const getFoodPortions = async (weekNumber: number = 1, mealType?: 'Comida' | 'Cena'): Promise<FoodPortionsByType> => {
  const params = new URLSearchParams();
  params.append('weekNumber', weekNumber.toString());
  if (mealType) {
    params.append('mealType', mealType);
  }
  
  const response = await api.get(`/food-portions?${params.toString()}`);
  return response.data;
};

// Obtener porciones de comida por día de la semana
export const getFoodPortionsByDay = async (
  dayOfWeek: string,
  weekNumber: number = 1,
  mealType?: 'Comida' | 'Cena'
): Promise<FoodPortionsByType> => {
  const params = new URLSearchParams();
  params.append('weekNumber', weekNumber.toString());
  if (mealType) {
    params.append('mealType', mealType);
  }
  
  const response = await api.get(`/food-portions/day/${dayOfWeek}?${params.toString()}`);
  return response.data;
};

// Obtener porciones de comida por semana
export const getFoodPortionsByWeek = async (
  weekNumber: number = 1,
  mealType?: 'Comida' | 'Cena'
): Promise<FoodPortionsByDay> => {
  const params = new URLSearchParams();
  if (mealType) {
    params.append('mealType', mealType);
  }
  
  const response = await api.get(`/food-portions/week/${weekNumber}?${params.toString()}`);
  return response.data;
};

// Obtener una porción de comida específica por ID
export const getFoodPortion = async (id: number): Promise<FoodPortion> => {
  const response = await api.get(`/food-portions/id/${id}`);
  return response.data;
};

// Crear una nueva porción de comida
export const createFoodPortion = async (
  colorId: number,
  portionType: '1ro' | '2ndo' | 'Acomp' | 'Postre',
  quantity: number,
  unit: string = 'gr',
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  mealType: 'Comida' | 'Cena',
  weekNumber: number = 1
): Promise<FoodPortion> => {
  const response = await api.post('/food-portions', {
    colorId,
    portionType,
    quantity,
    unit,
    dayOfWeek,
    mealType,
    weekNumber
  });
  return response.data;
};

// Actualizar una porción de comida existente
export const updateFoodPortion = async (
  id: number,
  colorId: number,
  portionType: '1ro' | '2ndo' | 'Acomp' | 'Postre',
  quantity: number,
  unit: string = 'gr',
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  mealType: 'Comida' | 'Cena',
  weekNumber: number = 1
): Promise<FoodPortion> => {
  const response = await api.put(`/food-portions/${id}`, {
    colorId,
    portionType,
    quantity,
    unit,
    dayOfWeek,
    mealType,
    weekNumber
  });
  return response.data;
};

// Eliminar una porción de comida
export const deleteFoodPortion = async (id: number): Promise<void> => {
  await api.delete(`/food-portions/${id}`);
};

// Eliminar todas las porciones de comida de una semana
export const deleteFoodPortionsByWeek = async (weekNumber: number): Promise<void> => {
  await api.delete(`/food-portions/week/${weekNumber}`);
};

// Obtener la cantidad de comida en gramos según el color y tipo de plato
export const getQuantityByColorAndType = async (
  colorName: string,
  portionType: '1ro' | '2ndo' | 'Acomp' | 'Postre',
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  mealType: 'Comida' | 'Cena' = 'Comida',
  weekNumber: number = 1
): Promise<number | null> => {
  try {
    const portions = await getFoodPortionsByDay(dayOfWeek, weekNumber, mealType);
    const portionsForType = portions[portionType];
    
    if (!portionsForType || portionsForType.length === 0) {
      return null;
    }
    
    const portion = portionsForType.find(p => p.colorName.toLowerCase() === colorName.toLowerCase());
    return portion ? portion.quantity : null;
  } catch (error) {
    console.error('Error al obtener cantidad por color y tipo:', error);
    return null;
  }
};

// Obtener el color correspondiente a una cantidad de comida y tipo de plato
export const getColorByQuantityAndType = async (
  quantity: number,
  portionType: '1ro' | '2ndo' | 'Acomp' | 'Postre',
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  mealType: 'Comida' | 'Cena' = 'Comida',
  weekNumber: number = 1
): Promise<string | null> => {
  try {
    const portions = await getFoodPortionsByDay(dayOfWeek, weekNumber, mealType);
    const portionsForType = portions[portionType];
    
    if (!portionsForType || portionsForType.length === 0) {
      return null;
    }
    
    // Encontrar el color más cercano a la cantidad especificada
    let closestPortion = portionsForType[0];
    let minDiff = Math.abs(closestPortion.quantity - quantity);
    
    for (const portion of portionsForType) {
      const diff = Math.abs(portion.quantity - quantity);
      if (diff < minDiff) {
        minDiff = diff;
        closestPortion = portion;
      }
    }
    
    return closestPortion.colorName;
  } catch (error) {
    console.error('Error al obtener color por cantidad y tipo:', error);
    return null;
  }
};

// Interfaz para el conteo de pacientes por color
export interface PatientCountsByColor {
  'Rojo': number;
  'Amarillo': number;
  'Azul': number;
  [key: string]: number;
}

// Interfaz para la cantidad de comida por color
export interface FoodQuantityByColor {
  'Rojo': { quantity: number; unit: string } | null;
  'Amarillo': { quantity: number; unit: string } | null;
  'Azul': { quantity: number; unit: string } | null;
  'Total': number;
}

// Interfaz para los totales de comida por tipo de plato
export interface FoodTotalsByType {
  '1ro': FoodQuantityByColor;
  '2ndo': FoodQuantityByColor;
  'Acomp': FoodQuantityByColor;
  'Postre': FoodQuantityByColor;
}

// Interfaces para el informe detallado de comidas por paciente
export interface PatientMeal {
  id?: number;
  name: string;
  color: string;
  meals: {
    [key: string]: {
      quantity: number;
      unit: string;
      dishName?: string;
    }
  };
}

export interface MealTotal {
  quantity: number;
  unit: string;
}

export interface PatientMealsReport {
  dayOfWeek: string;
  weekNumber: number;
  mealType: string;
  patients: PatientMeal[];
  totals: {
    '1ro': MealTotal;
    '2ndo': MealTotal;
    'Acomp': MealTotal;
    'Postre': MealTotal;
    [key: string]: MealTotal;
  };
  dishes?: {
    [key: string]: {
      name: string;
      description: string;
      isUnitBased?: boolean;
    }[];
  };
  dishUnitTypes?: {
    [key: string]: boolean;
  };
}

// Obtener un informe detallado de comidas por paciente
export const getPatientMealsReport = async (
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  weekNumber: number = 1,
  mealType: 'Comida' | 'Cena' = 'Comida'
): Promise<PatientMealsReport> => {
  try {
    const params = new URLSearchParams();
    params.append('weekNumber', weekNumber.toString());
    params.append('mealType', mealType);
    
    const response = await api.get(`/food-portions/patient-meals/${dayOfWeek}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener informe de comidas por paciente:', error);
    throw error;
  }
};

// Obtener los totales de comida necesaria por día, tipo de comida y color
export const getFoodTotals = async (
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo',
  patientCounts: PatientCountsByColor,
  weekNumber: number = 1,
  mealType?: 'Comida' | 'Cena'
): Promise<FoodTotalsByType> => {
  try {
    const params = new URLSearchParams();
    params.append('weekNumber', weekNumber.toString());
    if (mealType) {
      params.append('mealType', mealType);
    }
    
    const response = await api.post(
      `/food-portions/totals/${dayOfWeek}?${params.toString()}`,
      { patientCounts }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener totales de comida:', error);
    throw error;
  }
};
