import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
// Add authorization token to request headers if available
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization= `Bearer ${token}`;
            // If a token exists, it’s added to the Authorization header in the format Bearer <token>, which is standard for JWT-based authentication.
            // This ensures every request made with the api instance includes the token, allowing your Django backend to authenticate the user.
        }
        return config;
        
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;