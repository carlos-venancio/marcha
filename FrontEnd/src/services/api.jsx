import axios from "axios";
    // o Axios faz a funçao de requisição da API, para isso é necessario ter uma url base
    const api = axios.create({
        baseURL: 'https://marcha-api.onrender.com/'
    })

export default api ;