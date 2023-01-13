const db = require("../database/models");

const controller = {
  vistaLogin: (req, res) => {
    res.render("accounts/login", { session: req.session.usuario });
  },
  vistaRegister: (req, res) => {
    res.render("accounts/registrarse", { session: req.session.usuario });
  },
  vistaProfile: (req, res) => {
    res.render("accounts/perfil", { session: req.session.usuario });
  },
  editarProfile: (req,res) => {
    console.log(req.body.id)
    res.send(req.body)
    //res.send(req.body)
    
  }
};
module.exports = controller;
