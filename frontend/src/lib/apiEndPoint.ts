import axios from 'axios';
import { getAuthToken } from './utils';

export const PAYMENT_API = "http://localhost:3001/api/";


const apiClient = axios.create({
  baseURL: 'http://localhost:3002/api', // Update with your backend URL
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

