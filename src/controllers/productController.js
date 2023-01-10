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
    let evento;
    db.evento
      .findOne({
        where: {
          id: idURL,
        },
        include: [{ association: "tipo_evento" }],
      })
      .then((evento) => {
        if (evento) {
          db.entrada
            .findAll({
              where: {
                evento_id: evento.id,
              },
              include: [{ association: "sector" }],
            })
            .then((entrada) => {
              res.render("products/editar", {
                evento: evento,
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
    console.log(req.body);
    let id = req.params.id;
    let nombre = req.body.name;
    let fecha = req.body.date;
    let direccion = req.body.direccion;
    let categoria = req.body.category;
    let descripcion = req.body.descripcion;
    let entradas = req.body.entrada;

    db.evento
      .update(
        {
          nombre: nombre,
          fecha_creacion: fecha,
          direccion: direccion,
          tipo_evento_id: categoria,
          descripcion: descripcion,
        },
        {
          where: { id: id },
        }
      )
      .then((result) => {
      })
      .catch((error) => {
        console.log("Ha ocurrido un error" + error);
      });
      async function updateEmployee (entradaPrecio,entradaid){
   
        await db.entrada.update({precio: entradaPrecio},{where: {id: entradaid}})
     }
     async () => {
        for (const entrada of entradas) {
          const p =  await updateEmployee(entrada.precio,entrada.id).then(() => res.json({ message: 'Employee created.' }));
        }
     }
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
