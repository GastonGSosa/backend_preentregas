import {Router} from 'express';
import ProductManager from '../products/productManager.js';

const router = Router();

const tejaManager = new ProductManager('./src/products/products.json');

//endpoint para leer productos
//http://localhost:8080/api/products/
router.get('/', async (req,res)=>{
    const products = await tejaManager.getProducts()
    res.json(products)
})
//endpoint para leer un producto a partir de su ID
router.get('/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid);
    const productRequested = await tejaManager.getProductByID(pid)
    res.json({productRequested})
})
//endpoint para crear/registrar/dar de alta un nuevo producto
router.post('/', (req,res)=>{
    const {title, description, price, thumbnail, stock} = req.body
    if (!title || !description || !price || !thumbnail || !stock) {
        return res.status(400).json({message: "Missing required fields."})
    } else if ( isNaN(price) || isNaN(stock)){
        return res.status(405).json({message:"Stock or Price invalid"})
    }
    const productCreated = { title, description, price, thumbnail, stock}
    tejaManager.addProduct(productCreated)
    res.json({message: 'Producto registrado con exito'})
})
//endpoint para actualizar un producto a partir de su ID
router.put('/:pid', (req,res)=>{
    const id = parseInt(req.params.pid)
    const update = req.body
    const updatedProduct = tejaManager.updateProduct(pid,update)
    if (updatedProduct){
        res.json({message: `El producto con ID ${pid} ha sido actualizado exitosamente`})
    } else {
        res.status(405).json({message: "Actualizacion no exitosa"})
        
    }
    
})
//endpoint para eliminar/borrar/dar de baja un producto a partir de su ID
router.delete('/:pid', (req,res)=>{
    const id= parseInt(req.params.id);
    const deletedProduct = tejaManager.deleteProduct(pid)
    if (deletedProduct) {
        res.status(202).json({message: `El producto con ID ${pid} fue eliminado.`})
    } else {
        res.status(406).json({message: `No se ha podido eliminar el producto.`})
    }
    
})



export default router;