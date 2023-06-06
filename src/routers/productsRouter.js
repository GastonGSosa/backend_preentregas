import {Router} from 'express';
import ProductManager from '../products/productManager.js';

const router = Router();

const tejaManager = new ProductManager('./src/products/products.json');

//endpoint para leer productos
//http://localhost:8080/products/
router.get('/', (req,res)=>{
    const products = tejaManager.getProducts()
    console.log(tejaManager.getProducts())
    res.json(products)
})
//endpoint para leer un producto a partir de su ID
router.get('/:id', (req,res)=>{
    const id = req.params.id;
    const productFound = tejaManager.getProductByID(id)
    console.log(productFound)
    res.json({productFound})
})
//endpoint para crear/registrar/dar de alta un nuevo producto
router.post('/', (req,res)=>{
    res.json({message: 'Producto registrado con exito'})
})
//endpoint para actualizar un producto a partir de su ID
router.put('/:id', (req,res)=>{
    const id = req.params.id
    res.json({message: `actualizacion exitosa de producto con id ${id}`})
})
//endpoint para eliminar/borrar/dar de baja un producto a partir de su ID
router.delete('/:id', (req,res)=>{
    const id= req.params.id;
    res.json({message: `Se elimino exitosamente el producto con id ${id}`})
})



export default router;