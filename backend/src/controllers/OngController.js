const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {

    //Método que lista todos os dados da tabela ongs
    async index (request, response){
        const ongs = await connection('ongs').select();
        return response.json(ongs)
    },
    //Metódo usado no post para criação de uma nova ONG
    async create(request,response){
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
}