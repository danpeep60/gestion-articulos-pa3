import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Antes de cada petición: agrega el token guardado
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Después de cada respuesta: si el token venció o es inválido, cierra la sesión
http.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esAuth = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !esAuth) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.setItem('sesionExpirada', '1');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Saca el mensaje de error que envía el backend
export const mensajeDeError = (error: unknown, porDefecto: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.mensaje || porDefecto;
  }
  return porDefecto;
};