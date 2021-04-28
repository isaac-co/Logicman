const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Jugador = sequelize.models.jugador;

exports.getHome = (req,res)=>{
    var data = new Array;
    var skills = new Array;

    if (req.session.loggedin) {
        Jugador.findAll({
            where: {
                username: req.session.username
            }
        })
        .then(registros=>{
            registros.forEach(registro=>{
                data.push(registro.dataValues);
            });
            skills = [data[0].skill1,data[0].skill2,data[0].skill3];
        })
        .catch(error=>{
            console.log(error);
        })


        .then(param=>{
            res.render('userHome.html', {
                personas: data,
                nombre: req.session.username,
                skills: skills
            });
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