import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // api's base URL should be here
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(

    config => {
        // const cookies = new Cookies();
        const token = localStorage.getItem('token')
        // const { passwordToken } = cookies.getAll();
        // if (config.url == 'authentication/forget-password') {
        //     config.headers.Authorization = `Bearer ${passwordToken}`
        //     return config;
        // }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            return config;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;