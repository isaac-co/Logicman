const Sequelize = require('sequelize');
const {applyRelations} = require('./relations');

// Configuración de sequelize
const sequelize = new Sequelize('yfulimcs_logicman','yfulimcs_aec','Aec123',{
    host: 'svr3.educationhost.cloud',
	dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

//cargar los modelos
const modelDefiners = [
    require('../models/jugador'),
    require('../models/usuario'),
    require('../models/sesion'),
];

//Vincular el objeto de conexión con los modelos
for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}
//Construir las relaciones
applyRelations(sequelize);

// Exportando el objeto sequelize
module.exports = sequelize;