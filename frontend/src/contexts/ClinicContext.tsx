import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import clinicService from '../services/clinicService';
import api, { setClinicId } from '../services/api';

export interface Clinic {
  id: number;
  name: string;
  code: string;
  address?: string;
  contact_info?: string;
}

export interface ClinicContextType {
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  loading: boolean;
  error: string | null;
  setSelectedClinic: (clinic: Clinic) => void;
  fetchClinics: () => Promise<void>;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};

interface ClinicProviderProps {
  children: ReactNode;
}

export const ClinicProvider: React.FC<ClinicProviderProps> = ({ children }) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const data = await clinicService.getAllClinics();
      setClinics(data);
      
      // Si no hay clínica seleccionada, seleccionar la primera
      if (!selectedClinic && data.length > 0) {
        const savedClinicId = localStorage.getItem('selectedClinicId');
        
        if (savedClinicId) {
          const clinic = data.find((c: Clinic) => c.id === parseInt(savedClinicId));
          if (clinic) {
            setSelectedClinic(clinic);
          } else {
            setSelectedClinic(data[0]);
          }
        } else {
          setSelectedClinic(data[0]);
        }
      }
      
      setError(null);
    } catch (err) {
      setError('Error al cargar las clínicas');
      console.error('Error fetching clinics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetSelectedClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    localStorage.setItem('selectedClinicId', clinic.id.toString());
    
    // Usar la nueva función setClinicId para configurar el ID de la clínica en todas las solicitudes
    setClinicId(clinic.id.toString());
    
    console.log(`Clínica seleccionada: ${clinic.name} (ID: ${clinic.id})`);
    
    // Forzar una recarga de los datos
    window.location.reload();
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  // Configurar el interceptor para añadir el ID de la clínica a todas las solicitudes
  useEffect(() => {
    if (!selectedClinic) return;

    console.log('Setting up Axios interceptor with clinic ID:', selectedClinic.id);
    
    // Configurar el ID de la clínica para todas las solicitudes
    axios.defaults.headers.common['X-Clinic-ID'] = selectedClinic.id.toString();
    api.defaults.headers.common['X-Clinic-ID'] = selectedClinic.id.toString();
    
    // Configurar parámetros por defecto
    axios.defaults.params = { ...axios.defaults.params, clinicId: selectedClinic.id };
    api.defaults.params = { ...api.defaults.params, clinicId: selectedClinic.id };
    
    const interceptor = axios.interceptors.request.use((config) => {
      if (selectedClinic) {
        // Asegurarse de que el ID de la clínica esté en los headers
        config.headers = config.headers || {};
        config.headers['X-Clinic-ID'] = selectedClinic.id.toString();
        
        // Añadir también como parámetro de consulta para mayor seguridad
        config.params = config.params || {};
        config.params.clinicId = selectedClinic.id;
        
        console.log(`Sending request with clinic ID: ${selectedClinic.id}`, config);
      }
      return config;
    });

    // Hacer lo mismo para la instancia de api
    const apiInterceptor = api.interceptors.request.use((config) => {
      if (selectedClinic) {
        // Asegurarse de que el ID de la clínica esté en los headers
        config.headers = config.headers || {};
        config.headers['X-Clinic-ID'] = selectedClinic.id.toString();
        
        // Añadir también como parámetro de consulta para mayor seguridad
        config.params = config.params || {};
        config.params.clinicId = selectedClinic.id;
        
        console.log(`Sending API request with clinic ID: ${selectedClinic.id}`, config);
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
      api.interceptors.request.eject(apiInterceptor);
    };
  }, [selectedClinic]);

  const value = {
    clinics,
    selectedClinic,
    loading,
    error,
    setSelectedClinic: handleSetSelectedClinic,
    fetchClinics
  };

  return (
    <ClinicContext.Provider value={value}>
      {children}
    </ClinicContext.Provider>
  );
};

export { ClinicProvider as default };