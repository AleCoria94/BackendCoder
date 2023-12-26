const fs= require('fs')
const { stringify } = require('querystring')

class ProductManager {
    constructor() {
        this.products = [];
        this.newId = 1;
        this.path = './products.json'
    }

    async addProduct(product) {
        try{
            if(!this.isProductValid(product)){
                console.log("Por favor, complete todos los datos")
            return
            }
            if(this.isCodeDuplicated(product.code)){
                console.log("Error. Ya está duplicado el codigo", product.code, ". Por favor, ingrese otro codigo")
            return
            }
            const products = await this.getProducts();

            const newProduct = {id:this.newId,...product}
            products.push(newProduct);
            this.newId++
            await fs.promises.writeFile(this.path,JSON.stringify(products))
        }catch(error){
            console.log('Este es el error',error)
        }
    }
    async getProducts() {
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
    

        async getProductById(id){
            try{
                const products = await this.getProducts();
                const product = products.find(p=>p.id===id)
                    if(product){
                    return product
                            } else{
                            
                                console.log("Producto no encontrado")
                                }   
                            }
            catch(error){
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

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        );
    }

    isCodeDuplicated(code) {
        return this.products.some(product => product.code === code);
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

const test =async()=>{
    await productManager.addProduct({title:'heladera',description:'Esto es una heladera',price:1999999,thumbnail:'ruta',code:'0001',stock:15})
    console.log('Lista de productos. Primer intento',await productManager.getProducts());
    await productManager.addProduct({title:'lavarropas',description:'Esto es un lavarropas',price:2888888,thumbnail:'ruta1',code:'0002',stock:3})
    console.log('Lista de productos. Segundo intento',await productManager.getProducts());
    console.log('Esto es un consulta por Id 1',await productManager.getProductById(1));
    console.log('Prueba de codigo repetido:', await productManager.addProduct({title:'producto prueba',description:'Este es un producto prueba',price:200,thumbnail:'Sin imagen',code:'abc123',stock:25}));
    console.log('Esto es la eliminacion del id: 1 ',await productManager.deleteById(1));
    console.log('Lista de productos. Tercer intento',await productManager.getProducts());
    }
    test();