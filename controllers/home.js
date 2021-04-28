const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Usuario = sequelize.models.usuario;
const Jugador = sequelize.models.jugador;
const Sesion = sequelize.models.sesion;
// DB
const connection = require('../util/database');

exports.getIndex = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','index.html'));
};

exports.getForm = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','form.html'));
};

exports.getConfirmacion = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','confirmacion.html'));
};

exports.getLogin = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','login.html'));
};

exports.getRelogin = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','relogin.html'));
};

exports.getPrueba = (req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','prueba.html'));
};

exports.postAddUser = (req,res)=>{
    let formulario = req.body;
       
    // Crear modelo usuario
    Usuario.create({
        firstName: req.body.fname,
        lastName: req.body.lname,
        username: req.body.user,
        userPassword: req.body.pass,
        birthdate: req.body.birth,
        gender: req.body.gender,
        email: req.body.mail,
        receiveMail: req.body.ifmail
    }).then(resultado=>console.log("Registro exitoso"))
      .catch(error=>console.log(error));
    
    console.log(formulario);
    res.redirect("/confirmacion");
};

exports.postAuth = function(req, res) {
	const formUsername = req.body.loginUser;
	const formPassword = req.body.loginPass;

	Usuario.findOne({where: {username: formUsername, userPassword: formPassword}}).then(user=>{
        if (user != null) {
			req.session.loggedin = true;
			req.session.username = formUsername;
			// console.log(req.session.username);
            if (formUsername == 'admin' && formPassword == 'admin') {
			    res.redirect('/admin/dashboard');
            } else {
                res.redirect('/user/home');
            }
        } else {
            req.session.loggedin = false;
			res.redirect('/relogin');
        }
    });
};

exports.postVer = function(req, res) {
	const formUsername = req.body.nombre;
	const formPassword = req.body.contra;

	Usuario.findOne({where: {email: formUsername, userPassword: formPassword}}).then(user=>{
        if (user != null) {
			res.send("confirmado")
        } else {
			res.send("Intente de nuevo.");
        }
    });
};

exports.postAgregarSesion = function(req,res) {

    let id;
    Usuario.findOne({where: {email: req.body.usuario, userPassword: req.body.contra}})
    .then(sesion=>
    {
        id = sesion.id;
        res.send("confirmado");
        Sesion.create({
        idUsuario: id,
        fechaInicio: req.body.datos1,
        fechaSalida: req.body.datos2
        
    }).then(resultado=>console.log("Registro exitoso"))
      .catch(error=>console.log(error));

    });
}

exports.postActualizarJugador = function(req,res) {

    let id;
    Usuario.findOne({where: {email: req.body.usuario, userPassword: req.body.contra}})
    .then(user=>{
        id = user.id;
        Jugador.findByPk(id)
            .then(jugador=>
            {
                jugador.skill1 = req.body.datos1;
                jugador.skill2 = req.body.datos2;
                jugador.skill3 = req.body.datos3;
                return jugador && jugador.save();
                res.send("confirmado")
            })
                .then(resultado=>
                {
                    console.log("Datos guardadots");
                    console.log(resultado);
                    res.send("confirmado");
                })
    });
}