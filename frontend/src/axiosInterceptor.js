import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4000'
});

axiosInstance.interceptors.request.use((config) => {
    const userToken = sessionStorage.getItem('userToken');
    const adminToken = sessionStorage.getItem('adminToken');

    if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
    } else if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
        console.log('Token sent:', config.headers['Authorization']);

    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;



