const path = require('path');
const fs = require('fs');

// requerimiento del modelo de base de datos
const db = require('../database/models');
const { set } = require('../../app');

// aca exportamos a hashing, esta linea solo va en el donde usamos contraseñas encriptadas
const bcrypt = require('bcryptjs');

// importamos express validator
const { validationResult } = require('express-validator');


// JSON USUARIOS, GUARDO EN UNA VARIABLE EL JSON DE USUARIOS PARA SUBIR USUARIOS
// const pathUsertDb = path.join(__dirname, '../data/usuarios.json');
// const usuarios = JSON.parse(fs.readFileSync(pathUsertDb, 'utf-8'));


const controller = {
    // Root - Show all products|
// FUNCIONA CON DB
index: (req, res) => {


		db.evento.findAll().then((evento) =>{

            console.log(evento)

			let listaEventos=[];

			for (eventos of evento){
				listaEventos.push(eventos);
			}

            console.log(listaEventos)
            res.render('products/home',{evento: listaEventos})

		});
},


perfil: (req, res) => {
    res.render('accounts/perfil',{usuario: usuarios})
},

// NO NECESITA DB
vistaCrearUsuario: (req, res) => {
    res.render('accounts/registrarse')
},

// falta conectar con db
accionGuardar: (req, res) => {

		let nombreImagen = req.file.filename;
		db.usuario.create(
			{ 
				id: req.body.title,
				nombre: req.body.name ,
				apellido: req.body.surname, 
                // guarda contraseña encriptada
				clave: bcrypt.hashSync(req.body.password,10),
				email: req.body.email,
				direccion: req.body.adress,
				imagen: nombreImagen
			}
			)
			.then((resultados)  => { 
				res.redirect('/');
			 });

},

// NO NECESITA DB
login: (req, res) => {
    res.render('accounts/login');
},

// falta conectar con db/ ESTA EL METODO HECHO PERO EL BCRYPT DA SIEMPRE FALSE, REVISAR
loginValidator: (req, res) => {

    // cuardo el array de validaciones
    let errors = validationResult(req);
    console.log("errors ", errors)
    let emailLogin=req.body.emailLogin
    let passwordLogin=req.body.passwordLogin
    console.log("email y pass del login")
    console.log(emailLogin)
    console.log(passwordLogin)

     // METODO CON DB QUE NO FUNCIONA EL BCRYPT, SIEMPRE RETORNA FALSO
    db.usuario.findAll().then((usuario) =>{

        let listaUsuario=[];

        for (usuarios of usuario){
            listaUsuario.push(usuarios);
        }
        if ( errors.isEmpty() ) {
            for(let i=0;i<listaUsuario.length;i++){
                if(listaUsuario[i].email==emailLogin){   
                    if(bcrypt.compareSync(passwordLogin,listaUsuario[i].clave)){
                        console.log(req.session)
                        res.render('accounts/loginExitoso');
                    break;
                    }
                    
                    else{res.render('accounts/login' )}
                }
            }
            }
            // aca le pasa el array de errores a la vista de login
            else{res.render('accounts/login', {errors: errors.array() } )}
    });

},
}
module.exports = controller;