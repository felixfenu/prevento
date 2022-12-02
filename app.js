// arrancar el proyecto
// 1-npm install arracar proyecto
// 2-npm install multer (MULTER)
// 3 npm install bcryptjs(HASHING, encriptar claves)
// 4 npm install express-validator (express validator)
// 5 npm install sequelize-cli proyecto
// 6 npm install sequelize proyecto
// 7 npm install mysql2 proyecto
// 8 npm install dotenv(alwaysdata)
// ARRANCAR CON npm start

// notas




// puntos a ver 

// 1 ver como elimianr el router de users ya que arme todo la funcionalidad de usuarios en el main router y main
// controller, ver de quitar el userRouter y userController sin que pinche las vistas de usuarios

// 2 ver como hacer para que la vista de perfil de usuario quede mostrando el perfil ingresado correctamente

// 3 METODO LOGIN VALIDATOR, METODO CON DB QUE NO FUNCIONA EL BCRYPT, SIEMPRE RETORNA FALSO, revisar
// mientras se deja el json para ese metodo y se comenta el metodo de base de datos

// 4 en el home cuando por categoria tenes mas de un producto, no se puede ver mas alla del primer producto
// si elegis el segundo o el tercer producto de una categoria se pincha, y si pones el primer producto te aparece
// la info del segundo producto y no del primero





const express = require("express")
const path = require("path")
const app = express()
const methodOverride = require('method-override')

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));

//Pongo publica la carpeta public
app.use(express.static(path.join(__dirname, "/public")))

//Trabajar con POST
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Trabajar con PUT y DELETE
app.use(methodOverride('_method'))

//Poner en servidor localhost:3000
app.listen(process.env.PORT || 3000,function(){
    console.log("Servidor subido a la escaloneta")
})

//RUTAS
const productRouter = require('./src/routes/productRouter'); // Rutas /products
const mainRouter = require('./src/routes/mainRouter')
const userRouter = require('./src/routes/userRouter')
const cartRouter = require('./src/routes/cartRouter');

app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter)
app.use('/user',userRouter)

app.use((req,res,next)=>{
    res.status(404).render('notfound')
})


module.exports = app;
