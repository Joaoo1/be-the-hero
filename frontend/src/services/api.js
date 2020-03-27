import axios from 'axios';

//Cria conexão com o servidor
const api = axios.create({
    baseURL:'http://localhost:3333'
});

export default api;
