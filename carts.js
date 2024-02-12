import fs from 'fs'
import { stringify } from 'querystring'

class CartManager {
    constructor() {
        this.carts = [];
        this.newId = 1;
        this.path = './carts.json'
    }

    async addProduct(product) {
        try{
            const carts = await this.getCarts();
            console.log("get carts,", carts)
            const newCart = {cartId:this.newId,productsCart:product,}
            this.newId++
            console.log("newcart,", newCart)
            carts.push(newCart);
            
            await fs.promises.writeFile(this.path,JSON.stringify(carts))
        }catch(error){
            console.log('Este es el error',error)
        }
    }
    async getCarts() {
        try{
            if(fs.existsSync(this.path)){
                const infoJSON = await fs.promises.readFile(this.path,'utf-8');
                const infoJS = JSON.parse(infoJSON);
                return infoJS;
            }else return []
        }catch(error){
            console.log(error)
        }
    }
    

        async getCartById(id){
            try{
                const carts = await this.getCarts();
                const cart = carts.find(p=>p.id===id)
                    cart ? cart : console.log("Cart not found")
                }catch(error){
                    console.log(error)
                }
        }

        async updatedId(id, updatedproduct){
            try{
                const products = await this.getProducts();
            const indice = products.findIndex(p=>p.id===id)
            if (indice === -1) {
                console.log('Producto no encontrado con id', id);
                return;
              } 
    
            }catch(error){
                console.log(error)
            }
        }
        async deleteById(id){
            try{
            const products = await this.getProducts();
            const newProducts = products.filter(p=>p.id!==id)
            await fs.promises.writeFile(this.path,JSON.stringify(newProducts))
            }catch(error){
                console.log(error);
            }
        }

}

export default new CartManager();