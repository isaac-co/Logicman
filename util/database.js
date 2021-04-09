// const mysql = require('mysql');

// // DB Login
// const connection = mysql.createConnection({
// 	host     : 'svr3.educationhost.cloud',
// 	user     : 'yfulimcs_aec',
// 	password : 'Aec123',
// 	database : 'yfulimcs_logicman'
// });

// connection.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Database connection successful.");
// });

// module.exports = connection;

// Configuración de sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('yfulimcs_logicman','yfulimcs_aec','Aec123',{
    host: 'svr3.educationhost.cloud',
	dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

// Exportando el objeto sequelize
module.exports = sequelize;