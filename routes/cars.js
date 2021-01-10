const express = require('express');
const bodyParser = require("body-parser");
const ProductsService = require('../services/products');

/**
 * Funcion que maneja las rutas de la aplicacion
 * @param {*} app 
 */
function ecommerceApi (app) {
    const router = express.Router();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/cars/', router);

    // Inyeccion de servicios
    const productsService = new ProductsService();

    /**
     * Generacion de nuevos carros
     */
    router.post('/generate/', async function(req, res, next){
        try{
            console.log(req.body);
            if(req.body){
                let gene = await productsService.createProduct(req.body);
                res.status(200).json({
                    data: gene,
                    message: 'success'
                });
                
            }else{
                res.status(503).json({
                    data: [],
                    message: 'no data available'
                });
            }
        } catch(err){
            next(err);
        }
    });

    /**
     * CAMBIO DE STATUS DEL CARRO
     */
    router.post('/update/', async function(req, res, next){
        try{
            console.log(req.body);
            if(req.body){
                let gene = await productsService.updateProduct({ID:req.body._id, data:req.body});
                res.status(200).json({
                    data: gene,
                    message: 'success'
                });
                
            }else{
                res.status(503).json({
                    data: [],
                    message: 'no data available'
                });
            }
        } catch(err){
            next(err);
        }
    });

    /**
     * obtencion de carros
     */
    router.get('/', async function(req, res, next){
        try{
            try{
                let stores = await productsService.getProducts();
                res.status(200).json({
                    data: stores,
                    message: 'success'
                });
                
            }catch(error) {
                res.status(500).json({
                    data: [error],
                    message: 'error'
                });
            }
        } catch(err){
            next(err);
        }
    });

    

    


}

module.exports = ecommerceApi;
