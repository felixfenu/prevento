
function eventoData(sequelize, Datatypes){
    // nombre de la tabla, igual al nombre de la tabla en la base de datos
    let a = 'evento';
  
    // todos las columnas que va a tener esa tabla, debemos indicar el tipo de dato de cada tabla que 
    // debe tener, debemos ver que tipo de de dato de sequalize corresponde con el tipo de dato de lbd, ver la doc de
    // sequalize
    let c = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(30)},
      fecha_creacion: {type: Datatypes.DATE},
      fecha_baja: {type: Datatypes.DATE},
      fecha_evento: {type: Datatypes.DATE},
      imagen: {type: Datatypes.STRING(30)},
      direccion: {type: Datatypes.STRING(30)},
      descripcion:{type: Datatypes.TEXT}, 
      admin_id: { type: Datatypes.INTEGER},
      tipo_evento_id: { type: Datatypes.INTEGER},
      ciudad_id: { type: Datatypes.INTEGER},
    }
    // esto lo dejamos asi por defecto, son congif de sequalize
    let cg = {camelCase: false, timestamps: false, tableName:"Evento",freezeTableName: true}; 
  
    // aca declaro una variable, con el metodo sequalize.define le paso las 3 variables y el resultdo lo guardo
    // en la variable peliculas 
    const evento = sequelize.define(a,c,cg)

  
    evento.associate = function (modelos){
      // RELACION TIPO EVENTO
      // aca va alias de tabla que conecta
      evento.belongsTo(modelos.tipo_evento, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "tipo_evento",
        // clave foranea como esta en el modelo
        foreignKey: "tipo_evento_id"
      });

      // RELACION CIUDAD
      // aca va alias de tabla que conecta
      evento.belongsTo(modelos.ciudad, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "ciudad",
         // clave foranea como esta en el modelo
        foreignKey: "ciudad_id"
      });

      // RELACION USUARIO
      // aca va alias de tabla que conecta
      evento.belongsTo(modelos.usuario, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "usuario",
        // clave foranea como esta en el modelo
        foreignKey: "admin_id"
      });

      // RELACION ENTRADA
       // aca va alias de tabla que conecta
      evento.hasMany(modelos.entrada, {   
        // alias que yo quiera, le pegue el mismo nombre que la tavle
        as: "entrada",
         // clave foranea como esta en el modelo
        foreignKey: "evento_id"
      });

    }
  
    // retorno la variable peliculas
    return evento;
  }
  
  // aca exportamos todo
  module.exports = eventoData;