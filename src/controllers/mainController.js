const path = require("path");
const fs = require("fs");

// requerimiento del modelo de base de datos
const db = require("../database/models");
const { set } = require("../../app");

// aca exportamos a hashing, esta linea solo va en el donde usamos contraseñas encriptadas
const bcrypt = require("bcryptjs");

// importamos express validator
const { validationResult } = require("express-validator");

// JSON USUARIOS, GUARDO EN UNA VARIABLE EL JSON DE USUARIOS PARA SUBIR USUARIOS
// const pathUsertDb = path.join(__dirname, '../data/usuarios.json');
// const usuarios = JSON.parse(fs.readFileSync(pathUsertDb, 'utf-8'));

const controller = {


  // Root - Show all products|
  // FUNCIONA CON DB
  index: (req, res) => {
    db.evento.findAll().then((evento) => {
      console.log(evento);

      let listaEventos = [];

      for (eventos of evento) {
        listaEventos.push(eventos);
      }

      console.log(listaEventos);
      res.render("products/home", {
        evento: listaEventos,
        session: req.session.usuario,
      });
    });
  },

  perfil: (req, res) => {
    res.render("accounts/perfil", {
      usuario: usuarios,
      session: req.session.usuario,
    });
  },

  // NO NECESITA DB
  vistaCrearUsuario: (req, res) => {
    res.render("accounts/registrarse", { session: req.session.usuario });
  },

  // falta conectar con db
  accionGuardar: (req, res) => {
    let nombreImagen = req.file.filename;
    db.usuario
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((resultado) => {
        if (resultado) {
          res.render("accounts/registrarse", {
            errors: [
              {
                value: "",
                msg: "Usuario existente",
                param: "emailLogin",
                location: "body",
              },
            ],
            session: req.session.usuario,
          });
        }
      });
    db.usuario
      .create({
        id: req.body.title,
        nombre: req.body.name,
        apellido: req.body.surname,
        // guarda contraseña encriptada
        clave: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        direccion: req.body.adress,
        imagen: nombreImagen,
      })
      .then((resultados) => {
        res.render("accounts/registroExitoso", {
          session: req.session.usuario,
        });
      });
  },

  // NO NECESITA DB
  login: (req, res) => {
    res.render("accounts/login", { session: req.session.usuario });
  },

  loginValidator: (req, res) => {
    // cuardo el array de validaciones
    let errors = validationResult(req);
    console.log("errors ", errors);
    let emailLogin = req.body.emailLogin;
    let passwordLogin = req.body.passwordLogin;
    db.usuario
      .findOne({
        where: {
          email: emailLogin,
        },
      })
      .then((usuario) => {
        if (errors.isEmpty()) {
          let checkPassword = bcrypt.compareSync(passwordLogin, usuario.clave);
          console.log(usuario.clave);
          if (checkPassword) {
            req.session.usuario = usuario;
            if (usuario.admin == 1) {
              //si el usuario es administrador
              res.redirect("/admin");
            } else {
              //si es un usuario normal
              res.redirect("/");
            }
          } else {
            res.render("accounts/login", {
              errors: [
                {
                  value: "",
                  msg: "Usuario y/o contraseña incorrectos",
                  param: "emailLogin",
                  location: "body",
                },
              ],
              session: req.session.usuario,
            });
          }
        } else {
          console.log(errors.array());
          res.render("accounts/login", {
            errors: errors.array(),
            session: req.session.usuario,
          });
        }
      });
  },
  vistaAdministrador: (req, res) => {
    db.evento.findAll({
      where: {
        aprobado: null,
      },
      include:[{association: 'usuario'}],
    })
    .then(resultado => {
      console.log(resultado)
      res.render("admin", { session: req.session.usuario, eventos: resultado });
    })
    
  },
};
module.exports = controller;
