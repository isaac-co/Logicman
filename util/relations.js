//Función que recibe el objeto de conexión
function applyRelations(sequelize){
    console.log(sequelize.models);
    const Usuario = sequelize.models.usuario;
    const Jugador = sequelize.models.jugador;
    const Sesion = sequelize.models.sesion;

    //Un usuario puede tener muchas sesiones
    Usuario.hasMany(Sesion);
    //Una Jugador solo puede ser asignada a un Usuario
    Jugador.belongsTo(Usuario, {foreignKey: 'idUsuario'});
}

module.exports = {applyRelations};