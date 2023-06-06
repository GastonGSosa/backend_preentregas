import express from 'express';
import productsRouter from './routers/productsRouter.js'


const app= express();

//endpoints 
//http://localhost:8080/
app.get('/', (req,res)=> res.send('ok'));
app.get('/health', (req,res)=> res.json({message: 'The server is running on port 8080'}));

app.use('/products',productsRouter)











app.listen(8080, ()=> console.log('server up!'));