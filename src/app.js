const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


//conectar a base de datos
mongoose.connect('mongodb://localhost/crud-mongo')
.then(db => console.log("Conectado DB"))
.catch(err => console.log(err));

//import rutas
const indexRoutes = require('./routes/index');


//opciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(flash());

//VARIABLES GLOBALES
app.use((req, res, next) =>{
    res.locals.mensaje = req.flash('mensaje');
    next();
});

app.use((req, res, next) =>{
    res.locals.mensajeNo = req.flash('mensajeNo');
    next();
});

//rutas
app.use('/', indexRoutes);

//inicia el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});