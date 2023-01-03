const controller = {
    listado: (req,res)=>{
        res.render('products/carrocompras.ejs',{session: req.session.usuario});
    },
    comprar: (req,res)=>{
        //codigo para comprar entrada.
    }
};

module.exports = controller;

