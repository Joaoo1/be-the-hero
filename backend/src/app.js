const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

//Express é um Framework usado para lidar com as requisições HTTP
const app = express();

/*
 * CORS = Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes)
 * Basicamente é um mecanismo que permite a solicitação de um recurso que tenha origem diferente
 * Usado para permitir comunicação com o front-end
*/
app.use(cors());

//Middleware responsável por converter as requisições HTTP em objetos JSON
app.use(express.json());

//Sistema de rotas do back-end
app.use(routes);

//Middleware que irá lidar com o erros de validação vindo do celebrate
app.use(errors())

module.exports = app;
