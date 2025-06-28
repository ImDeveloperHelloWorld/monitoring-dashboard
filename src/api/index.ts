import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data: { email: string; password: string }) => api.post('/auth/login', data);
export const registerUser = (data: { email: string; password: string }) => api.post('/auth/register', data);
export const fetchMetrics = () => api.get('/metrics/latest');
