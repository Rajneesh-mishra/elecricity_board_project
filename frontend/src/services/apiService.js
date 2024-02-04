import axios from 'axios';
import apiConfig from '../config/apiConfig';

const api = axios.create({
  baseURL: apiConfig.apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) => {
      // Modify request config
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
  
  api.interceptors.response.use(
    (response) => {
      // Modify response data
      return response.data;
    },
    (error) => {
      // Handle response errors
      return Promise.reject(error);
    }
  );
  

export default api;
