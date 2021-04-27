const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Usuario = sequelize.models.usuario;

exports.getDashboard = function(req, res) {
	if (req.session.loggedin) {
		var genero = new Array;
		var interesados = new Array;
		var ages = new Array;
		var freq = new Array;

		sequelize.query("CALL getGeneros();")
        .then(registros=>{
            genero.push(registros[0].Mujeres);
            genero.push(registros[0].Hombres);	
        })

		sequelize.query("CALL getInteresados();")
        .then(registros=>{
            interesados.push(registros[0].Mujeres);
            interesados.push(registros[0].Hombres);	
        })

		sequelize.query("CALL getEdades();")
        .then(registros=>{
			console.log();
			for (let i = 0; i < Object.keys(registros).length; i++) {
				ages.push(registros[i].age);
				freq.push(registros[i].Freq);
			}
        })
		
		.then(registros=>{
			res.render('adminDashboard.html', {
				"genero":genero,
				"interesados":interesados,
				"freq":freq,
				"ages":ages,
			})
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

