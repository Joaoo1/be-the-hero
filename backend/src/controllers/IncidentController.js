const connection = require('../database/connection')

module.exports = {

    //Método que lista todos os casos cadastrados
    async index(request, response){
        //Variavel usada para paginação da lista de incidents
        const { page = 1 } = request.query;

        //Retorna o total de itens da tabela incidents
        const [count] = await connection('incidents').count();

        //Retorna pelo header da requisição o numero total de casos para o front-end
        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5) //Começa a consulta a partir do indice especificado aqui
        .select(['incidents.*', 
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city', 
            'ongs.uf'
        ]);

        return response.json(incidents);
    },
    
    //Método que cadastra um novo caso
    async create(request,response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    //Método que deleta um único caso
    async delete(request, response){
        const{ id } = request.params; //ID do caso será passada pela url da requisição
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id',id)
        .select('ong_id')
        .first();

        //Verificando se a ONG está autenticada para deletar um caso
        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: "Operation not permitted"});
        }
        
        await connection('incidents').where('id',id).delete();
        return response.status(200).json({msg: "Operation success"})
    },
}