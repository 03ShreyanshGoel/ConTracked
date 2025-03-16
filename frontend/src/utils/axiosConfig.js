// axiosConfig.js
import axios from "axios";

// Axios Interceptor for automatically adding tokens
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // ✅ Ensure token is correctly stored
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // ✅ Correct Bearer Token format
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
