function tipoEventoData(sequelize, Datatypes) {
  // nombre de la tabla, igual al nombre de la tabla en la base de datos
  let a = "tipo_evento";

  // todos las columnas que va a tener esa tabla, debemos indicar el tipo de dato de cada tabla que
  // debe tener, debemos ver que tipo de de dato de sequalize corresponde con el tipo de dato de lbd, ver la doc de
  // sequalize
  let c = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Datatypes.STRING(30) },
  };
  // esto lo dejamos asi por defecto, son congif de sequalize
  let cg = {
    camelCase: false,
    timestamps: true,
    tableName: "Tipo_evento",
    freezeTableName: true,
    paranoid: true,
    createdAt: false
  };

  // aca declaro una variable, con el metodo sequalize.define le paso las 3 variables y el resultdo lo guardo
  // en la variable peliculas
  const tipoEvento = sequelize.define(a, c, cg);

  // relaciones de la tabla
  tipoEvento.associate = function (modelos) {
    // RELACION EVENTO
    // aca va alias de tabla que conecta
    tipoEvento.hasMany(modelos.evento, {
      // alias que yo quiera, le pegue el mismo nombre que la tavle
      as: "evento",
      // clave foranea como esta en el modelo
      foreignKey: "tipo_evento_id",
    });
  };

  // retorno la variable peliculas
  return tipoEvento;
}

// aca exportamos todo
module.exports = tipoEventoData;
