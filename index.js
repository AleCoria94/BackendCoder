class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("Por favor, ingrese los datos correctamente");
            return;
        }

        if (this.isCodeDuplicate(product.code)) {
            console.error("El codigo ya existe. Por favor ingrese uno nuevo.");
            return;
        }

        const newProduct = {
            ...product,
            id: this.nextProductId
        };

        this.products.push(newProduct);
        this.nextProductId++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Product not found");
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

    isCodeDuplicate(code) {
        return this.products.some(product => product.code === code);
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

productManager.addProduct({
    title: "Lavarropas Semi",
    description: "Lavarropas Semi Automatico 6kg Carga frontal",
    price: 109999,
    thumbnail: "ruta1",
    code: "LAVA6CF",
    stock: 10
});

productManager.addProduct({
    title: "Auriculares Desi",
    description: "Auriculares Cable 3 metros Design",
    price: 59999,
    thumbnail: "ruta2",
    code: "AURIDESI3M",
    stock: 5
});

productManager.addProduct({
    title: "Heladera XXL",
    description: "Heladera Combi XXl 440 litros",
    price: 319999,
    thumbnail: "ruta3",
    code: "HELAXXL440",
    stock: 1
});
/* Se agrega un ejemplo donde se repita el code pero que los demas atributos  */
productManager.addProduct({
    title: "Heladera",
    description: "Heladera negra",
    price: 319999,
    thumbnail: "ruta3",
    code: "HELAXXL440",
    stock: 1
});

console.log("----------------------------")
console.log(productManager.getProducts());


console.log("-----------prodById---------------")
const productById = productManager.getProductById(3);
console.log(productById);
console.log("----------------------------")
const productByIdNotFound = productManager.getProductById(5);
console.log("----------------------------")