function authMiddleware(req,res,next){
    if(!req.session.usuario){
        res.render('noAutorizado',{session: req.session.usuario})
    }else{
        next()
    }
    
}
module.exports = authMiddleware;