function authMiddleware(req,res,next){
    if(!req.session.usuario){
        res.render('noAutorizado',{session: req.session.usuario})
    }
    else if(req.url == '/admin' && req.session.admin == false){ //si intentan acceder a /admin pero no tiene el bit en 1 de administrador
        res.render('noAutorizado',{session: req.session.usuario})
    }
    else{
        next()
    }
    
}
module.exports = authMiddleware;