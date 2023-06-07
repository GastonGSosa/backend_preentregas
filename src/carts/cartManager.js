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
    
            return this.#carts
        } catch (err) {
            console.error('Error loading carts: ', err);
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

    addCart = async () => {
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

    addProductToCart = async (cid,pid) => {

        let productAddedCheck = false

        const productToAdd = {product: pid, quantity: 1};

        const cartIndex = this.#carts.findIndex(cart => cart.id===cid)

        if (cartIndex===-1) {
            console.error('El cart con el id proporcionado no existe')
            return;
        } else if (this.#carts[cartIndex].products.some((product)=>{
            product.product === pid
        })) {



        }
        
        






    }

}