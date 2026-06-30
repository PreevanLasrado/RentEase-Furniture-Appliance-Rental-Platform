import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Match the backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add JWT token if it exists
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling global errors (optional but good practice)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If we receive a 401 Unauthorized, we could potentially dispatch a logout action here
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;
