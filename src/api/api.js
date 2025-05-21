// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, // solo si usas cookies, JWT no lo requiere
});

// Interceptor: agrega Authorization: Bearer <token> si existe
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // o localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
