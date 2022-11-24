const path = require('path');
const fs = require('fs');

// requerimiento del modelo de base de datos 
const db = require('../database/models');

const pathProductDb = path.join(__dirname, '../data/eventos.json');
const eventos = JSON.parse(fs.readFileSync(pathProductDb, 'utf-8'));


const controller = {
	// FUNCIONA CON DB
	vistaListadoProd: (req, res) => {
		// const eventos = JSON.parse(fs.readFileSync(pathProductDb, 'utf-8'));
		// res.render('products/home',{evento: eventos})

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

	// falta conectar a la db
	accionEliminar: (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = eventos.filter(function(e){
			return id!=e.id;
		})

		for (let producto of eventos){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		// en el metodo delte usamos una nueva linea para borrar que es la siguiente
		// fs.unlinkSync(path.join(__dirname, '../../public/images/products/', ProductoEncontrado.image));
		// aca le pasamos la direccion de la imagen que deseamos borrar
		// borra el archivo
		fs.unlinkSync(path.join(__dirname, '../../public/images/uploads/', ProductoEncontrado.imagen));

		fs.writeFileSync(pathProductDb, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	},
}
module.exports = controller;