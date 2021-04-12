const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/usuario');
const sequelize = require('./util/database');

// Crear el servidor
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// ==================== MIDDLEWARES ==================== //
// Establecer un middleware para configurar la ubicación de nuestros elementos públicos
app.use(express.static(path.join(__dirname,'public')));
// Establecer un middleware para configurar la definición de un JSON
app.use(bodyParser.json());
// Interpretar el dato que te manda el form como un JSON
app.use(bodyParser.urlencoded({extended:true}));
// Establecer un middleware para configurar plantillas
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

// ======================= RUTAS ======================= //
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/',homeRoutes);


const port = 8080;
sequelize.sync()
    .then(resultado=>{
        console.log('Base de datos en línea.');
        // Lanza el servidor para escuchar peticiones
        app.listen(port, ()=>console.log("Servidor en línea en el puerto 8080."));
    })
    .catch(error=>{
        console.log(error);
    })