const path = require('path');
const fs = require('fs');

// requerimiento del modelo de base de datos 
const db = require('../database/models');
const { set } = require('../../app');

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
		const fecha = new Date(req.body.date);
		db.evento.create(
			{ 
				id: req.body.title,
				nombre: req.body.name ,
				fecha_evento: fecha, 
				length: req.body.length,
				tipo_evento_id: req.body.category,
				descripcion: req.body.description,
				imagen: nombreImagen,
				
			}
			)
			.then((resultados)  => { 
				res.redirect('/');
			 });

	},

	// FUNCIONA CON DB
	accionEditar: (req, res) => {

		let idWeb = req.params.id
		// let nombreImagen = req.file.filename;

		db.evento.update(
			{ 
				nombre:req.body.name,
				fecha_evento:req.body.date,
				descripcion:req.body.description,
				// tipo_evento_id:req.body.category,
				// imagen:nombreImagen
				
			}, 
			{
			where: {id:idWeb} 
			} 
			).then((resultados)  => { console.log(resultados) });
			res.redirect('/')

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