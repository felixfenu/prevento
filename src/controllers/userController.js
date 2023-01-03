const controller = {
    vistaLogin: (req, res) => {
        res.render('accounts/login',{session: req.session.usuario})
    },
    vistaRegister: (req, res) => {
        res.render('accounts/registrarse',{session: req.session.usuario})
    },
    vistaProfile: (req, res) => {
        res.render('accounts/perfil',{session: req.session.usuario})
    },
}
module.exports = controller;