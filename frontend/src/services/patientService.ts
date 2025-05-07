import api from '../services/api';

export interface Patient {
  id: number;
  name: string;
  clinic_id: number;
  notes: string;
  created_at: string;
  updated_at: string;
  restrictions?: DietaryRestriction[];
  categories?: DietaryCategory[];
  breadAssignments?: {
    [key: string]: {
      colorName: string;
      colorCode: string;
      description: string;
      isExtra: boolean;
    };
  };
}

export interface DietaryRestriction {
  id: number;
  patient_id: number;
  restriction_type: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DietaryCategory {
  id: number;
  name: string;
  description: string;
  clinic_id: number;
  created_at: string;
  updated_at: string;
}

export interface BreadAssignment {
  id: number;
  patient_id: number;
  meal_type: 'breakfast' | 'morning_snack' | 'lunch' | 'afternoon_snack' | 'dinner';
  bread_color_id: number;
  is_extra: boolean;
  notes: string;
  color_name?: string;
  color_code?: string;
  bread_description?: string;
  created_at: string;
  updated_at: string;
}

export interface BreadColorCode {
  id: number;
  color_name: string;
  color_code: string;
  description: string;
  clinic_id: number;
  created_at: string;
  updated_at: string;
}

export interface PatientWithBreadAssignments extends Patient {
  breadAssignments: {
    [key: string]: {
      colorName: string;
      colorCode: string;
      description: string;
      isExtra: boolean;
    };
  };
  restrictions: DietaryRestriction[];
}

// Obtener todos los pacientes de una clínica
export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get('/patients');
  return response.data;
};

// Obtener un paciente específico con sus restricciones dietéticas
export const getPatient = async (id: number): Promise<Patient> => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

// Obtener todos los códigos de colores para el pan de una clínica
export const getBreadColorCodes = async (): Promise<BreadColorCode[]> => {
  const response = await api.get('/patients/bread-codes/all');
  return response.data;
};

// Obtener todas las categorías dietéticas de una clínica
export const getDietaryCategories = async (): Promise<DietaryCategory[]> => {
  const response = await api.get('/patients/dietary-categories/all');
  return response.data;
};

// Obtener la tabla completa de asignaciones de pan para todos los pacientes
export const getPatientBreadAssignmentsTable = async (): Promise<PatientWithBreadAssignments[]> => {
  const response = await api.get('/patients/bread-assignments/table');
  return response.data;
};

// Traducir el tipo de comida de inglés a español
export const translateMealType = (mealType: string): string => {
  const translations: { [key: string]: string } = {
    'breakfast': 'Desayuno',
    'morning_snack': 'Tentempié',
    'lunch': 'Comida',
    'afternoon_snack': 'Merienda',
    'dinner': 'Cena'
  };
  return translations[mealType] || mealType;
};

// Traducir el tipo de restricción de inglés a español
export const translateRestrictionType = (restrictionType: string): string => {
  const translations: { [key: string]: string } = {
    'ALERGIAS': 'Alergias',
    'INTOLERANCIAS': 'Intolerancias',
    'PREFERENCIAS': 'Preferencias'
  };
  return translations[restrictionType] || restrictionType;
};

// Crear un nuevo paciente
export const createPatient = async (name: string, notes?: string): Promise<Patient> => {
  const response = await api.post('/patients', { name, notes });
  return response.data;
};

// Actualizar un paciente existente
export const updatePatient = async (id: number, name: string, notes?: string): Promise<Patient> => {
  const response = await api.put(`/patients/${id}`, { name, notes });
  return response.data;
};

// Eliminar un paciente
export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

// Asignar color de pan a un paciente para una comida específica
export const assignBreadColor = async (
  patientId: number, 
  mealType: string, 
  breadColorId: number, 
  isExtra: boolean = false,
  notes?: string
): Promise<any> => {
  const response = await api.post(`/patients/${patientId}/bread-assignment`, {
    mealType,
    breadColorId,
    isExtra,
    notes
  });
  return response.data;
};

// Eliminar asignación de pan para un paciente y comida específica
export const deleteBreadAssignment = async (patientId: number, mealType: string): Promise<void> => {
  await api.delete(`/patients/${patientId}/bread-assignment/${mealType}`);
};

// Añadir una restricción dietética a un paciente
export const addDietaryRestriction = async (
  patientId: number, 
  restrictionType: string, 
  description: string
): Promise<DietaryRestriction> => {
  const response = await api.post(`/patients/${patientId}/restriction`, {
    restrictionType,
    description
  });
  return response.data;
};

// Actualizar una restricción dietética
export const updateDietaryRestriction = async (
  restrictionId: number, 
  restrictionType: string, 
  description: string
): Promise<DietaryRestriction> => {
  const response = await api.put(`/patients/restriction/${restrictionId}`, {
    restrictionType,
    description
  });
  return response.data;
};

// Eliminar una restricción dietética
export const deleteDietaryRestriction = async (restrictionId: number): Promise<void> => {
  await api.delete(`/patients/restriction/${restrictionId}`);
};
