require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            app.emit('pronto');
        }).catch(e => console.log(e));

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, crsfMiddleware } = require('./src/middlewares/middleware');
app.use(helmet());
const { connect } = require('http2');
//const meuMiddleware = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = session({
    secret: 'texto q ninguem vai saber',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //tempo q vai durar o cookie (7dias)
        httpOnly: true
    },
    //store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
});

app.use(sessionOptions);
app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//app.use(meuMiddleware);

app.use(middlewareGlobal);
app.use(checkCsrfError)
app.use(crsfMiddleware);
app.use(routes);



app.on('pronto', () => {
    app.listen(3001, () => {
        console.log('Acessar http://localhost:3001');
        console.log('Servidor executando na porta 3001');
    });
});