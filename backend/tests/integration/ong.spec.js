const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        //Sempre zerar o banco de dados antes de fazer os testes para evitar problemas
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        //Após todos os testes desse arquivo forem realizados, destrui conexão com BD
        await connection.destroy()
    })


    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG 03",
	            email: "contato@email.com",
	            whatsapp: "48909090000",
	            city: "Palhoça",
	            uf: "SC"
        });

        /*
         * Validando se o retorno do post possui o ID da ONG com 8 caracteres
         * Necessário pois a resposta de sucesso do post sempre será o ID da ong criada
        */
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});