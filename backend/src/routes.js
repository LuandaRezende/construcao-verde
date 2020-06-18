const express = require ('express');
const connection = require ('./database/connection');
const StoreController = require ('./controllers/StoreController');
const ProductController = require ('./controllers/ProductController')
const ProfileController = require ('./controllers/ProfileController')
const SessionController = require ('./controllers/SessionController')


const routes = express.Router();

routes.post('/session', SessionController.create)

routes.get('/store', StoreController.indexList);
routes.post('/store', StoreController.create);

routes.get('/profile', ProfileController.index);

routes.get('/product', ProductController.indexList);
routes.post('/product', ProductController.create);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;
