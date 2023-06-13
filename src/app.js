import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/productsRouter.js'
import cartsRouter from './routers/cartRouter.js'


const app = express();

//configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.static('./public')); // Middleware para acceder a la carpeta public

//endpoints 
//http://localhost:8080/
app.get('/', (req,res)=> res.send('ok'));
app.get('/health', (req,res)=> res.json({message: 'The server is running on port 8080'}));

app.use('/api/products',productsRouter)
app.use('/api/carts', cartsRouter)
app.get('/motor', (req,res)=>{
    res.render('ejemplo', {mi_nombre: 'Culini'})
})



//-------* SERVER CONFIGURATION *------//
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on: http>//localhost:${server.address().port}/`);
});
server.on('error', (error)=> console.log(`Server error: ${error}`));
