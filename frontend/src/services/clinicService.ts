import api from './api';
import { Clinic } from '../contexts/ClinicContext';

export const clinicService = {
  // Obtener todas las clínicas
  getAllClinics: async (): Promise<Clinic[]> => {
    const response = await api.get('/clinics');
    return response.data;
  },

  // Obtener una clínica por ID
  getClinicById: async (id: number): Promise<Clinic> => {
    const response = await api.get(`/clinics/${id}`);
    return response.data;
  },

  // Crear una nueva clínica
  createClinic: async (clinic: Omit<Clinic, 'id' | 'created_at' | 'updated_at'>): Promise<Clinic> => {
    const response = await api.post('/clinics', clinic);
    return response.data;
  },

  // Actualizar una clínica
  updateClinic: async (id: number, clinic: Partial<Clinic>): Promise<Clinic> => {
    const response = await api.put(`/clinics/${id}`, clinic);
    return response.data;
  },

  // Eliminar una clínica
  deleteClinic: async (id: number): Promise<void> => {
    await api.delete(`/clinics/${id}`);
  }
};

export default clinicService;
