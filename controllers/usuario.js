const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Jugador = sequelize.models.jugador;

exports.getHome = (req,res)=>{
    if (req.session.loggedin) {
        Jugador.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(registros=>{
            var data = [];
            registros.forEach(registro=>{
                data.push(registro.dataValues);
            });
            // console.log(data);
            res.render('userHome.html', {
            personas: data,
            nombre: req.session.username
        });
        })
        .catch(error=>{
            console.log(error);
        })
    } else {
        res.send('Please login to view this page!');
    }
};

exports.getJuego = (req,res)=>{
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'..','views','userJuego.html'));
	} else {
		res.send('Please login to view this page!');
	}
};