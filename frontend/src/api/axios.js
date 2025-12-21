import axios from 'axios';


const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
   //baseURL:'http://localhost:2000/api',
    withCredentials: true
})

export default api;
