const Sequelize = require('sequelize');

// Definición del modelo (tabla)
const Jugador = (sequelize)=> {
    sequelize.define('jugador',{
        idUsuario: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING(50),
            primaryKey: true,
        },
        skill1: {
            type: Sequelize.FLOAT(),
        },
        skill2: {
            type: Sequelize.FLOAT(),
        },
        skill3: {
            type: Sequelize.FLOAT(),
        },
        puzzles: {
            type: Sequelize.FLOAT(),
        },
        horasJugadas: {
            type: Sequelize.FLOAT(),
        }
    })
}; 

module.exports = Jugador;