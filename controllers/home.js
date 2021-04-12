const path = require('path');
const Usuario = require('../models/usuario');
// DB
const connection = require('../util/database');

exports.getIndex = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','index.html'));
};

exports.getForm = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','form.html'));
};

exports.getLogin = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','login.html'));
};

exports.getRelogin = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','relogin.html'));
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
    res.redirect("/");
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


