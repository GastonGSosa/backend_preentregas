import fs from 'fs';

class CartManager{
    #cartId
    #path
    #carts

    constructor(path) {
        this.#cartId = 1
        this.#carts = []
        this.#path = path
        this.checkJson()
        console.log(this.#carts)

    };

    getCarts = () => {
        return this.#carts
    }


    checkJson = () => {
        fs.access(this.#path, fs.constants.F_OK, (err) => {
            if (err) {
              if (err.code === 'ENOENT') {
                // Error code ENOENT indicates that the file or directory does not exist (errno -2)
                console.log('File does not exist, an empty one is being created.');
              } else {
                // Handle other errors
                console.error('Error occurred:', err);
              }
            } else {
              console.log('File exists');
              this.loadCarts()
            }
          });
    }

    loadCarts = async () => {
        try {
            const cartData = await fs.promises.readFile(this.#path, 'utf-8');
            const parsedCarts = JSON.parse(cartData);
            this.#carts = parsedCarts;
        } catch (err) {
            if (err.code=='ENOENT'){
                console.log('No file existing, proceding to create a new one.')
                return
            } else {
                console.error('Error loading carts: ', err);
            }

        }
    };

    saveCarts = async () => {
        try {
            const cartData = JSON.stringify(this.#carts, null, "\t");
            await fs.promises.writeFile(this.#path, cartData, 'utf-8');
            console.log('Carts saved succesfully.')
        }catch (err) {
            console.error('Error saving carts: ',err)
        }
    };

    getCartById = (cid) => {
        const cartFound = this.#carts.find((cart)=> cart.id===cid);
        if (!cartFound){
            return false
        } else {
            return cartFound
        }
    }

    addCart = () => {
            const newCart = {
                id: this.#cartId,
                products: []
            }

            this.#carts.push(newCart);
            this.#cartId++
            this.saveCarts()

    };

    getCartProducts = async (cid) => {
        const cartFound = this.#carts.find((cart) => cart.id===cid)
        return cartFound[cid].products;
    }

    addProductToCart = (cid,pid) => {
        //busco el carrito dado el cart id
        const cartUpdate = this.#carts.find(cart => cart.id===cid);

        if (!cartUpdate){
            return false

        } else if(cartUpdate) {
            //busco si existe el producto dentro de tal carrito
            const existingProduct = cartUpdate.products.find(product => product.id ===pid);

            if (existingProduct) {
                //incremento quantity si el producto existe
                existingProduct.quantity++;
            } else {
                //si no, pusheo
                cartUpdate.products.push({id: pid, quantity: 1})
            }
            this.saveCarts()
            return true
        }
    }

}

export default CartManager;