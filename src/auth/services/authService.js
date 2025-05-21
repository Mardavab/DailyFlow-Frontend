// src/services/authService.js
import api from '../../api/api';

export const loginUser = async ({ username, password }) => {
  const { data } = await api.post('/login', { username, password });
  // El backend debe devolver { token: "...", user: { ... } }
  const { token, user } = data;
  sessionStorage.setItem('token', token);   // guarda el JWT
  return user;                             // devuelve el usuario para el contexto
};
