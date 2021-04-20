const Sequelize = require('sequelize');

// Definición del modelo (tabla)
const Sesion = (sequelize)=> {
    sequelize.define('sesion',{
        idSesion: {
            type: Sequelize.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        idUsuario: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
        },
        fechaInicio: {
            type: Sequelize.DATE(),
        },
        fechaSalida: {
            type: Sequelize.DATE(),
        }
    })
}; 

module.exports = Sesion;