import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL


export const axiosInstance = axios.create({
    baseURL: BASE_URL
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        const auth = token ? `Bearer ${token}` : '';

        config.headers['Authorization'] = auth
        return Promise.resolve(config)
    },
    (error) => Promise.reject(error)
)

