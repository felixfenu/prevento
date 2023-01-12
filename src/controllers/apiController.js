const db = require("../database/models");
const sequelize = require("sequelize");
const controller = {
  usuarios: (req, res) => {
    db.usuario
      .findAll({
        attributes: ["id", "nombre", "apellido", "email", "admin"],
      })
      .then((result) => {
        let json = {};
        json.total = result.length;
        json.detalle = result;
        res.status(200).json(json);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde");
      });
  },
  usuarioPorId: (req, res) => {
    db.usuario
      .findOne({
        attributes: ["id", "nombre", "apellido", "email", "admin"],
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde");
      });
  },
  lastCreatedUser: (req, res) => {
    db.usuario
      .findOne({
        attributes: ["id", "nombre", "apellido", "email", "admin"],
        order: [["id", "DESC"]],
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde");
      });
  },
  productos: (req, res) => {
    db.evento
      .findAll({
        include: [{ association: "tipo_evento" }, { association: "entrada" }],
      })
      .then((result) => {
        let json = {};
        json.total = result.length;
        json.detalle = result;
        res.status(200).json(json);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde");
      });
  },
  productosrPorId: (req, res) => {
    db.evento
      .findOne({
        include: [{ association: "tipo_evento" }, { association: "entrada" }],
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde");
      });
  },
  productosPorCategoria: (req, res) => {
    db.tipo_evento
      .findAll({
        attributes: ["id", "nombre", [sequelize.fn('COUNT', sequelize.col('evento.id')), 'cantidadEventos'],],
        group: "id",
        include: [{ association: "evento" }]
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.send("Ha ocurrido un error intentelo de nuevo mas tarde"+error);
      });
  },
  lastCreatedProduct: (req, res) => {},
};
module.exports = controller;
