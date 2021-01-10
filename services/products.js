const { mockEcommerce } = require('../utils/mocks/ecommerces');
//const { mockProds } = require('../utils/mocks/products');
const MongoLib  = require('../lib/mongo');


class ProductsService {
    constructor(){
        this.collection = 'cars';
        this.mongoDB = new MongoLib();
    }


    /**
     * Obtiene nuevos productos del store solicitado
     */
    async getProducts(name="BMW"){
        const nameStore = [name]; 
        const query = name && { name: { $in: nameStore }};
        const prods =  this.mongoDB.getAll(this.collection, query);
        return prods || [];
    }

    /**
     * Obtiene el  producto solicitado por ID
     */
    async getProduct({id}){
        const prod = await this.mongoDB.get(this.collection, id);
        return prod || [];
    }

    /**
     * crea un nuevo producto en BD
     */
    async createProduct(product){
        //const prod = {};
        const createdProdId = await this.mongoDB.create(this.collection, product);
        return createdProdId;
    }

    /**
     * Actualizar cualquier dato
     */
    async updateProduct({ ID, data } = {}){
        delete data._id;
        const updatedDataId = await this.mongoDB.update(this.collection, ID, data);
        return updatedDataId;
    }

    /** 
     * Elimina elemento de la coleccion 
     * */
    async deleteDataById({ ID }) {
        const deletedDataId = awaitthis.mongoDB.delete(this.collection, ID);
        return deletedDataId;
    }


}

module.exports = ProductsService;