const express = require('express')
var session = require('express-session');
const path = require('path')
const bodyParser = require('body-parser')
const sql = require('mssql')

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

    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Password1234$',
        server: 'localhost', 
        database: 'nodelogin' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
        request.query(`select * from accounts where username = '${username}' AND password = '${password}'`, function (err, result) {
            if (result.recordset[0]) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/admin');
			} else {
                res.redirect('/relogin');
			}
            res.end();
        });
    });
});



let port = 8080;
app.listen(port, ()=>console.log("Servidor en línea en el puerto 8080."));