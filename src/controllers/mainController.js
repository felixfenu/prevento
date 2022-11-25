const path = require('path');
const fs = require('fs');

// requerimiento del modelo de base de datos
const db = require('../database/models');

// aca exportamos a hashing, esta linea solo va en el donde usamos contraseñas encriptadas
const bcrypt = require('bcryptjs');
// importamos express validator
const { validationResult } = require('express-validator');


// JSON USUARIOS, GUARDO EN UNA VARIABLE EL JSON DE USUARIOS PARA SUBIR USUARIOS
const pathUsertDb = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(pathUsertDb, 'utf-8'));

// JSON USUARIOS, GUARDO EN UNA VARIABLE EL JSON DE PRODUCTOS PARA MOSTRAR LOS PRODUCTOS
const pathProductDb = path.join(__dirname, '../data/eventos.json');



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
    idNuevo=0;

    for (let s of usuarios){
        if (idNuevo<s.id){
            idNuevo=s.id;
        }
    }

    idNuevo++;

    // aca lo que hace el req.file.filename es traerme el nombre de la imagen
    // y guardarl oen una variable, cuando guardamos el producto es el nombre que guarda
    let nombreImagen = req.file.filename;

    let usuarioNuevo =  {
        id: idNuevo,
        nombre: req.body.name ,
        apellido: req.body.surname,
        email: req.body.email, 
        direccion: req.body.adress,
        pais: req.body.country,
        // guardo la contraseña con hash
        contrasena:bcrypt.hashSync(req.body.password,10),
        // aca guarda la variable asignada arriba
        imagen: nombreImagen
    };

    usuarios.push(usuarioNuevo);

    fs.writeFileSync(pathUsertDb, JSON.stringify(usuarios,null,' '));

    res.redirect('/');
},

// NO NECESITA DB
login: (req, res) => {
    res.render('accounts/login');
},

// falta conectar con db
loginValidator: (req, res) => {

    // cuardo el array de validaciones
    let errors = validationResult(req);
    console.log("errors ", errors)
    let emailLogin=req.body.emailLogin
    let passwordLogin=req.body.passwordLogin
    console.log("email y pass del login")
    console.log(emailLogin)
    console.log(passwordLogin)

    // si el array de validaciones esta vacio es que todos los campos estan ok
    if ( errors.isEmpty() ) {
        for(let i=0;i<usuarios.length;i++){
            if(usuarios[i].email==emailLogin){
                if(bcrypt.compareSync(passwordLogin, usuarios[i].contrasena)){
                    let usuarioEncontrado=usuarios[i];
                    res.render('accounts/perfil',{usuarioPerfil: usuarioEncontrado});
                                break;
                }
                // renderiga el login de nuevo en caso de
                else{res.render('accounts/login' )}
            }
        }
        }
        // aca le pasa el array de errores a la vista de login
        else{res.render('accounts/login', {errors: errors.array() } )}
},
}
module.exports = controller;