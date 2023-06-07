import {Router} from 'express';
import CartManager from '../carts/cartManager.js';

const router = Router();
const carritoManager = new CartManager('./src/carts/carts.json');

//endpoint para leer carts
//http://localhost:8080/api/carts/
router.get('/:cid', async (req,res) =>{
    const cid = parseInt(req.params.cid);
    const cartRequested = await carritoManager.getCartById(cid)
    if (!cartRequested){
        res.status(404).json({message: 'No Cart with that ID'})
    } else {
        res.status(202).json(cartRequested)
    }



    

});

//endpoint para crear un carrito
router.post('/', async (req, res)=> {
    try {
        carritoManager.addCart();
        res.send(202).json({message: 'Carrito nuevo creado!'})
    } catch (err) {
        res.status(405).json({message:'error posting cart: ',err})
    }

})





export default router;