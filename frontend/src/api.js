import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1',
});

// Intercept requests to include JWT token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
