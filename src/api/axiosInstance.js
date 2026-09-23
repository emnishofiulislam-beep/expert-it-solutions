import axios from 'axios';

// API Axios Instance configured for future MERN (Express + MongoDB) backend
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: automatically attaches JWT Bearer token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('expert_it_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: handles common API errors (401 Unauthorized, 403 Forbidden, 500 Server Error)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.warn('Session expired or unauthorized. Clearing credentials.');
      localStorage.removeItem('expert_it_token');
      localStorage.removeItem('expert_it_user');
      // Dispatch custom event for UI reactivity if needed
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
