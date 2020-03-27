const knex = require('knex');
const configuration = require('../../knexfile');

//Testa a variavel ambiente que indica se é um teste, para saber se deve usar o BD de testes
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

module.exports = knex(config);