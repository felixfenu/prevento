const path = require('path');
const fs = require('fs');

// requerimiento del modelo de base de datos 
const db = require('../database/models');
const { set } = require('../../app');

const pathProductDb = path.join(__dirname, '../data/eventos.json');
const eventos = JSON.parse(fs.readFileSync(pathProductDb, 'utf-8'));


const controller = {
	// FUNCIONA CON DB
	vistaListadoProd: (req, res) => {

		// las llamadas de las tablas se hacen por el alias
		db.evento.findAll().then((evento) =>{

			let listaEventos=[];

			for (eventosbd of evento){
				listaEventos.push(eventosbd);
			}

            // console.log(listaEventos)
            res.render('products/home',{evento: listaEventos})

		});
	},
	// no 
	vistaCrearProd: (req, res) => {
		res.render('products/crear')
	},
	// FUNCIONA CON DB
	// aca le pasamos un evento a la vista descripcion producto
	vistaDetalleProd: (req, res) => {
		let idURL = req.params.id;
		let productoEncontrado;

		db.evento.findAll().then((evento) =>{

			let listaEventos=[];

			for (eventosbd of evento){
				listaEventos.push(eventosbd);
			}
			for(let i=0;i<listaEventos.length;i++){
				if(listaEventos[i].tipo_evento_id==idURL){
					productoEncontrado=listaEventos[i]

				}
			}

			res.render('products/descripcionproducto',{productoDetalle: productoEncontrado});

		});

	
	},
	// FUNCIONA CON DB 
	vistaEditarProd: (req, res) => {
		let id = req.params.id;
		let productoEncontrado;

		db.evento.findAll().then((evento) =>{

			let listaEventos=[];

			for (eventosbd of evento){
				listaEventos.push(eventosbd);
			}
			for(let i=0;i<listaEventos.length;i++){
				if(listaEventos[i].tipo_evento_id==id){
					productoEncontrado=listaEventos[i]

				}
			}

			res.render('products/editar',{ProductoaEditar: productoEncontrado});

		});

		
	},

	// FUNCIONA CON DB
	// accion guardar objeto nuevo en array
	accionGuardar: (req, res) => {

		let nombreImagen = req.file.filename;
		db.evento.create(
			{ 
				id: req.body.title,
				nombre: req.body.name ,
				fecha: req.body.date, 
				length: req.body.length,
				categoria: req.body.category,
				descipcion: req.body.description,
				imagen: nombreImagen
			}
			)
			.then((resultados)  => { 
				res.redirect('/');
			 });

	},

	// falta conectar a la db
	accionEditar: (req, res) => {
		let id = req.params.id;
		if (req.file == null) {
			for (let s of eventos){
				if (id==s.id){
					s.nombre= req.body.name;
					s.precio= req.body.price;
					s.fecha= req.body.date;
					s.categoria= req.body.category;
					s.descripcion= req.body.description;
					s.imagen = s.imagen;
					break;
				}
			}
		}
		else {
		console.log(req.file);
		let nombreImagen = req.file.filename;
		for (let s of eventos){
			if (id==s.id){
				s.nombre= req.body.name;
				s.precio= req.body.price;
				s.fecha= req.body.date;
				s.categoria= req.body.category;
				s.descripcion= req.body.description;
				s.imagen = nombreImagen;
				break;
			}
		}
	}
		fs.writeFileSync(pathProductDb, JSON.stringify(eventos,null,' '));

		res.redirect('/');

	},

	// FUNCIONA CON DB
	// elimina un evento de la base de datos
	accionEliminar: (req, res) => {

		let idURL = req.params.id;

		// desactivo las claves foraneas la tabla evento para poder eliminar
		db.evento.FOREIGN_KEY_CHECKS=0;

	
		db.evento.destroy({
			where :{id:idURL}
		})

		// lactivo de nuevo las claves foraneas en la tabla evento
		db.evento.FOREIGN_KEY_CHECKS=1;

		res.redirect('/');
	},
}
module.exports = controller;