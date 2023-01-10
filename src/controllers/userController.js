const db = require("../database/models");

const controller = {
  vistaLogin: (req, res) => {
    res.render("accounts/login", { session: req.session.usuario });
  },
  vistaRegister: (req, res) => {
    res.render("accounts/registrarse", { session: req.session.usuario });
  },
  vistaProfile: (req, res) => {
    let usuario = req.session.usuario
    db.usuario.findByPk(usuario.id).then(result=>{
    res.render("accounts/perfil", { session: req.session.usuario });

    })
    res.render("accounts/perfil", { session: req.session.usuario });
  },
};
module.exports = controller;
