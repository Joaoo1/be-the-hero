const routes = require('express').Router();
/* 
 * Celebrate engloba toda a biblioteca de validação JOI
 * Usado pois é um middleware do express, ou seja, faz a integração do Express com o JOI
*/
const { celebrate, Segments, Joi } = require('celebrate')

//É uma boa prática separar a lógica dos metodos HTTP(POST,GET,PUT,DELETE) em controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


routes.post('/sessions', SessionController.create)

routes.post('/ongs', celebrate({
    /*
     * Validação dos dados que vem no corpo da requisição HTTP (response.body)
     * Metódos de validação com nomes auto explicativos
     * Para melhores informações consultar a documentação do JOI
     */
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);
routes.get('/ongs', OngController.index);

routes.get('/profile', celebrate({
    //Validação dos dados que vem pelo header da requisição HTTP(response.header)
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
        
    }).unknown(), //Metódo usado para dizer pro celebrate não fazer validação do restante dos dados
}),ProfileController.index)

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
    //Validação dos dados que vem pela url da requisição HTTP(response.params)
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete)


module.exports = routes;