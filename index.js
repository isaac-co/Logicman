const express = require('express')
var session = require('express-session');
const path = require('path')
const bodyParser = require('body-parser')
var mysql = require('mysql');

// DB Login
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

// Crear el servidor
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// ==================== Logged in ==================== //
app.get('/admin', function(req, res) {
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'views','admin.html'));
	} else {
		res.send('Please login to view this page!');
	}
});

app.get('/tablero', function(req, res) {
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'views','tablero.html'));
	} else {
		res.send('Please login to view this page!');
	}
});

// ==================== MIDDLEWARES ==================== //
// Establecer un middleware para configurar la ubicación de nuestros elementos públicos
app.use(express.static(path.join(__dirname,'public')));
// Establecer un middleware para configurar la definición de un JSON
app.use(bodyParser.json());
// Interpretar el dato que te manda el form como un JSON
app.use(bodyParser.urlencoded({extended:true}));

// ======================= RUTAS ======================= //
// Respuesta al método GET con un archivo HTML
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/form', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','form.html'));
});

app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
});

app.get('/relogin', (req,res)=>{
    res.sendFile(path.join(__dirname,'views','relogin.html'));
});

// ======================= AUTHENTICATION ======================= //
app.post('/auth', function(req, res) {
	var username = req.body.loginUser;
	var password = req.body.loginPass;
	connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/admin');
			} else {
				req.session.loggedin = false;
				res.redirect('/relogin');
			}			
			res.end();
		});
});


let port = 8080;
app.listen(port, ()=>console.log("Servidor en línea en el puerto 8080."));