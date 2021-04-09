const Sequelize = require('sequelize');
// Objeto sequelize
const sequelize = require('../util/database')

// Definición del modelo (tabla)
const Usuario = sequelize.define('usuario',{
    id: {
        type: Sequelize.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(50),
    },
    lastName: {
        type: Sequelize.STRING(50),
    },
    username: {
        type: Sequelize.STRING(50),
    },
    userPassword: {
        type: Sequelize.STRING(50),
    },
    birthdate: {
        type: Sequelize.DATE(),
    },
    gender: {
        type: Sequelize.STRING(1),
    },
    email: {
        type: Sequelize.STRING(320),
    },
    receiveMail: {
        type: Sequelize.TINYINT(1),
    }
}); 

module.exports = Usuario;