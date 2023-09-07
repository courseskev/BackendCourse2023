class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(producto) {
        const { title, description, price, thumbnail, code, stock } = producto
        if (!title || !description || !price || !thumbnail || !code || !stock)
            console.log("Falta una propiedad");
        else {
            if(!(this.products.some((p) => p.code === code))){
                let id
                if(this.products.length===0)
                    id = 1
                else
                    id = this.products[this.products.length-1].id+1
                this.products.push({id,...producto})
            }else{
                console.log("El codigo de producto ya existe, ingrese otro.");                
            }

        }
    }
    
    getProductById(id){
        const result = this.products.find(p=>p.id === id)
        if(result)
            console.log(result);
        else
            console.log("Not found");
    }
    
    getProducts(){
        console.log(this.products);
    }
}

const manager1 = new ProductManager()
const producto = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc123', stock:25}
const producto2 = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc123'}
const producto3 = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc1234', stock:25}

/*
manager1.getProducts();
manager1.addProduct(producto)
manager1.getProducts();
manager1.addProduct(producto)
manager1.addProduct(producto2)
manager1.getProductById(2)
manager1.addProduct(producto3)
manager1.getProducts();
manager1.getProductById(2)
*/