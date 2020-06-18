const connection = require ('../database/connection');

module.exports = {

    async indexList(request, response){
        const { page = 1} = request.query;

        const [count] = await connection ('product').count();

        console.log(count);

        const product = await connection('product').join('store', 'store_id', '=', 'product.store_id').limit(5).offset((page - 1)* 5)
        .select(['product.*', 'store.name', 'store.email', 'store.whatsapp', 'store.city', 'store.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(product);
    },

    
    async create(request, response){
        const{ title, description, value} = request.body;
        const store_id = request.headers.authorization;

        const [id] = await connection('product').insert({
            title,
            description,
            value,
            store_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const store_id = request.headers.authorization;
        
        const product = await connection ('product').where('id', id).select('store_id').first();

        if(product.store_id != store_id){
            return response.status(401).json({ error: 'Operation not permitted. '});
        }

        await connection ('product').where('id', id).delete();

        return response.status(204).send();

    }

};