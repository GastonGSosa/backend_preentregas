import {Router} from 'express';
import ProductManager from '../products/productManager.js';

const router = Router();

const tejaManager = new ProductManager('./src/products/products.json');

//endpoint para leer productos
//http://localhost:8080/products/
router.get('/', async (req,res)=>{
    const products = await tejaManager.getProducts()
    res.json(products)
})
//endpoint para leer un producto a partir de su ID
router.get('/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    const productRequested = await tejaManager.getProductByID(id)
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
router.put('/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const update = req.body
    const updatedProduct = tejaManager.updateProduct(id,update)
    if (updatedProduct){
        res.json({message: `El producto con ID ${id} ha sido actualizado exitosamente`})
    } else {
        res.status(405).json({message: "Actualizacion no exitosa"})
        
    }
    
})
//endpoint para eliminar/borrar/dar de baja un producto a partir de su ID
router.delete('/:id', (req,res)=>{
    const id= parseInt(req.params.id);
    const deletedProduct = tejaManager.deleteProduct(id)
    if (deletedProduct) {
        res.status(202).json({message: `El producto con ID ${id} fue eliminado.`})
    } else {
        res.status(406).json({message: `No se ha podido eliminar el producto.`})
    }
    
})



export default router;