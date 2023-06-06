import fs from "fs";

class ProductManager {
    #products
    #idCounter
    #path


    constructor(path){
        this.#path=path
        this.#products=[]
        this.#idCounter=1

    };

    makeUniqueCode = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

    addProduct(item) {
        if (!item.title || !item.description || !item.price || !item.thumbnail || !item.stock) {
            console.error("Producto inválido, por favor chequear que contenga: Title, description, price, thumbnail, code y stock.")
        } else if (this.#products.find((product)=>product.id === item.id)){
            console.error("El producto ya existe.")
        } else {
            item.id=this.#idCounter
            item.code=this.makeUniqueCode(8)
            this.#products.push(item)
            this.saveProducts()
            this.#idCounter++
        }
    };

    getProducts = async () => {
      try {
        const productsData = await fs.promises.readFile(this.#path, 'utf-8');
        console.log(productsData);
        const parsedProducts = JSON.parse(productsData);
        this.#products=parsedProducts;

        return this.#products
      } catch (err) {
        console.error('Error loading products: ', err);
      }
    };

    getProductByID = (idToFind) => {
      const productFound = this.#products.find((product) => product.id===idToFind )
      return productFound
    }

    saveProducts = async () => {
        try {
          const productsData = JSON.stringify(this.#products, null, "\t");
          await fs.promises.writeFile(this.#path, productsData, 'utf-8');
          console.log('Products saved successfully.');
        } catch (err) {
          console.error('Error saving products:', err);
        }
      };

    updateProduct(id,update){
        const productIndex =  this.#products.findIndex(product => product.id === id); //busco el indice del producto, si no lo encuentra, devuelve -1

        if (productIndex === -1) {
            console.error('El producto con el id proporcionado no existe.')
            return;
        }

        for (const key in update) {
            if (this.#products[productIndex].hasOwnProperty(key)) {
                this.#products[productIndex][key] = update[key]
            } else {
                console.error(`La propiedad ${key} no se encuentra dentro del producto con id ${id}`)
            }
        }
        this.saveProducts();
    };

    deleteProduct(id) {
        const productToDelete = this.#products.find((product) => product.id === id);
      
        if (!productToDelete) {
          console.error(`No existe un producto con el id: ${id}`);
        } else {
          this.#products = this.#products.filter((item) => item.id !== id);
          console.log(`El producto con el id: ${id} fue eliminado.`);
          this.saveProducts();
        }
      }

    
};

export default ProductManager;