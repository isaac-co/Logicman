const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Usuario = sequelize.models.usuario;

exports.getDashboard = function(req, res) {
	if (req.session.loggedin) {
		sequelize.query("CALL getGeneros();")
        .then(registros=>{
            var lol = [];
            lol.push(registros[0].Mujeres);
            lol.push(registros[0].Hombres);
            console.log(lol);
			var data = JSON.stringify(registros);
			res.render('adminDashboard.html', {
				equisde:lol
			});
        })
	} else {
		res.send('Please login to view this page!');
	}
};

exports.getTablero = function(req, res) {
	if (req.session.loggedin) {
		Usuario.findAll()
		.then(registros=>{
			var data = [];
			registros.forEach(registro=>{
				data.push(registro.dataValues);
			});
			// console.log(data);
			res.render('adminTablero.html', {
			personas:data,
			sesion:"Autorizado",
		});
		})
	} else {
		res.send('Please login to view this page!');
	}
};

