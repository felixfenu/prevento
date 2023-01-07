const path = require("path");
const fs = require("fs");

// requerimiento del modelo de base de datos
const db = require("../database/models");
const { set } = require("../../app");

const controller = {
  // FUNCIONA CON DB
  vistaListadoProd: (req, res) => {
    // las llamadas de las tablas se hacen por el alias
    db.evento
      .findAll()
      .then((evento) => {
        let listaEventos = [];

        for (eventosbd of evento) {
          listaEventos.push(eventosbd);
        }

        // console.log(listaEventos)
        res.render("products/home", {
          evento: listaEventos,
          session: req.session.usuario,
        });
      })
      .catch((error) => {
        console.log("Ha ocurrido un error" + error);
      });
  },
  // no
  vistaCrearProd: (req, res) => {
    res.render("products/crear", { session: req.session.usuario });
  },

  // FUNCIONA CON DB
  // aca le pasamos un evento a la vista descripcion producto
  vistaDetalleProd: (req, res) => {
    let idURL = req.params.id;
    let productoEncontrado;
    db.evento
      .findOne({
        where: {
          id: idURL,
        },
      })
      .then((evento) => {
        console.log(evento);
        if (evento) {
          let productoEncontrado = evento;

          db.entrada
            .findAll({
              where: {
                evento_id: productoEncontrado.id,
              },
              include: [{ association: "sector" }],
            })
            .then((entrada) => {
              res.render("products/descripcionproducto", {
                productoDetalle: productoEncontrado,
                entrada: entrada,
                session: req.session.usuario,
              });
            });
        } else {
          res.render("notfound", { session: req.session.usuario });
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error" + error);
      });
  },
  // FUNCIONA CON DB
  vistaEditarProd: (req, res) => {
    let idURL = req.params.id;
    let productoEncontrado;
    db.evento
      .findOne({
        where: {
          id: idURL,
        },
        include: [{ association: entrada }],
      })
      .then((resultados) => {
        console.log(resultados);
        if (resultados) {
          let productoEncontrado = resultados;

          res.render("products/editar", {
            ProductoaEditar: productoEncontrado,
            session: req.session.usuario,
          });
        } else {
          res.render("notfound", { session: req.session.usuario });
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error" + error);
      });
  },

  // FUNCIONA CON DB
  // accion guardar objeto nuevo en array
  accionGuardar: (req, res) => {
    let nombreImagen = req.file.filename;
    const fecha = new Date(req.body.date);
    db.evento
      .create({
        id: req.body.title,
        nombre: req.body.name,
        fecha_evento: fecha,
        length: req.body.length,
        tipo_evento_id: req.body.category,
        descripcion: req.body.description,
        imagen: nombreImagen,
        admin_id: req.session.usuario.id,
      })
      .then((resultados) => {
        console.log(resultados.id);
        return resultados;
      })
      .then((resultado) => {
        console.log(resultado.id);
        res.redirect("/products/descripcion/" + resultado.id);
      })
      .catch((error) => {
        console.log("Ha ocurrido un error" + error);
      });
  },

  // FUNCIONA CON DB
  accionEditar: (req, res) => {
    let idWeb = req.params.id;
    // let nombreImagen = req.file.filename;
    db.evento
      .update(
        {
          nombre: req.body.name,
          fecha_evento: req.body.date,
          descripcion: req.body.description,
          // tipo_evento_id:req.body.category,
          // imagen:nombreImagen
        },
        {
          where: { id: idWeb },
        }
      )
      .then((resultados) => {
        console.log(resultados);
      });
    res.redirect("/").catch((error) => {
      console.log("Ha ocurrido un error" + error);
    });
  },

  // FUNCIONA CON DB
  // elimina un evento de la base de datos
  accionEliminar: (req, res) => {
    let idURL = req.params.id;

    // desactivo las claves foraneas la tabla evento para poder eliminar
    db.evento.FOREIGN_KEY_CHECKS = 0;

    db.evento.destroy({
      where: { id: idURL },
    });

    // lactivo de nuevo las claves foraneas en la tabla evento
    db.evento.FOREIGN_KEY_CHECKS = 1;

    res.redirect("/");
  },
};
module.exports = controller;
