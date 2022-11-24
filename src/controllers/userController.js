const controller = {
    vistaLogin: (req, res) => {
        res.render('accounts/login')
    },
    vistaRegister: (req, res) => {
        res.render('accounts/registrarse')
    },
    vistaProfile: (req, res) => {
        res.render('accounts/perfil')
    },
}
module.exports = controller;