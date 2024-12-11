import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Cambia esto según tu backend
    timeout: 5000,
});

// Interceptor para añadir el token a las cabeceras
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtener el token almacenado
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;