const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginControllers');
const contatoController = require('./src/controllers/contatoControllers');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);


module.exports = route;

/*function meuMiddleware(req, res, next) {
    req.session = {nome: 'Luiz', sobrenome: 'Miranda'};
    console.log();
    console.log('Passei por essa Middleware');
    console.log();
    next();
    
        route.get('/', meuMiddleware, homeControllers.paginaInicial, function(req, res, next) {
        req.session = {nome: 'Luiz', sobrenome: 'Miranda'};
        console.log();
        console.log('Ainda estou aqui');
        console.log(`'Ultimo Middlewares' olha o que tem na req.sessesion.nome ${req.session.nome}`);
    });*/
    
