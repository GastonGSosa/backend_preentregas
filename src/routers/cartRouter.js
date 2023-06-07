import {Router} from 'express';
import CartManager from '../carts/cartManager.js';

const router = Router();
const carritoManager = new CartManager('./src/carts/carts.json');

//endpoint para leer carts
//http://localhost:8080/api/carts/
router.get('/', async (req,res) =>{
    

});

//endpoint para crear un carrito
router.post('/', async (req, res)=> {
    carritoManager.addCart();
    res.send(202).json({message: 'Carrito nuevo creado!'})
})





export default router;