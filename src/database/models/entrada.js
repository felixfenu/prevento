function entradaData(sequelize, Datatypes) {
  // nombre de la tabla, igual al nombre de la tabla en la base de datos
  let a = "entrada";

  // todos las columnas que va a tener esa tabla, debemos indicar el tipo de dato de cada tabla que
  // debe tener, debemos ver que tipo de de dato de sequalize corresponde con el tipo de dato de lbd, ver la doc de
  // sequalize
  let c = {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    evento_id: { type: Datatypes.INTEGER },
    sector_id: { type: Datatypes.INTEGER },
    precio: { type: Datatypes.FLOAT },
  };
  // esto lo dejamos asi por defecto, son congif de sequalize
  let cg = {
    camelCase: false,
    timestamps: true,
    paranoid: true,
    tableName: "Entrada",
    freezeTableName: true,
    createdAt: false
  };

  // aca declaro una variable, con el metodo sequalize.define le paso las 3 variables y el resultdo lo guardo
  // en la variable peliculas
  const entrada = sequelize.define(a, c, cg);

  // relaciones de la tabla
  entrada.associate = function (modelos) {
    // RELACION SECTOR
    // aca va alias de tabla que conecta
    entrada.belongsTo(modelos.sector, {
      // alias que yo quiera, le pegue el mismo nombre que la tavle
      as: "sector",
      // clave foranea como esta en el modelo
      foreignKey: "sector_id",
    });

    // RELACION EVENTO
    // aca va alias de tabla que conecta
    entrada.belongsTo(modelos.evento, {
      // alias que yo quiera, le pegue el mismo nombre que la tavle
      as: "evento",
      // clave foranea como esta en el modelo
      foreignKey: "evento_id",
    });

    // RELACION VENTA
    // aca va alias de tabla que conecta
    entrada.hasMany(modelos.venta, {
      // alias que yo quiera, le pegue el mismo nombre que la tavle
      as: "venta",
      // clave foranea que los une
      foreignKey: "entrada_id",
    });
  };

  // retorno la variable peliculas
  return entrada;
}

// aca exportamos todo
module.exports = entradaData;
