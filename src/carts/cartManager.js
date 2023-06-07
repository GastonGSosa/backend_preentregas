import fs from 'fs';

class CartManager{
    #cartId
    #path
    #carts

    constructor(path) {
        this.#cartId = 1
        this.#carts = []
        this.#path = path
        this.loadCarts()

    };

    loadCarts = async () => {
        try {
            const cartData = await fs.promises.readFile(this.#path, 'utf-8');
            const parsedCarts = JSON.parse(cartData);
            this.#carts = parsedCarts;
        } catch (err) {
            if (err.errno===-2){
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




export default CartManager