import express from 'express';
import productsRouter from './routers/productsRouter.js'


const app= express();

//Middlewares
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON

//endpoints 
//http://localhost:8080/
app.get('/', (req,res)=> res.send('ok'));
app.get('/health', (req,res)=> res.json({message: 'The server is running on port 8080'}));

app.use('/products',productsRouter)



//-------* SERVER CONFIGURATION *------//
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on: http>//localhost:${server.address().port}/`);
});
server.on('error', (error)=> console.log(`Server error: ${error}`));
