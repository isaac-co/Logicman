const path = require('path');
const Usuario = require('../models/usuario');

exports.getDashboard = function(req, res) {
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname,'..','views','adminDashboard.html'));
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
			console.log(data);
			res.render('adminTablero.html', {
			personas:data,
			sesion:"Autorizado",
		});
		})
	} else {
		res.send('Please login to view this page!');
	}
};

