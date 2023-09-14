const { log } = require('console')
const fs = require('fs')
const nombreArchivo = "\productos"
const tipoArchivo = '.json'


class ProductManager {
    constructor(path){
        this.path = path
        console.log(path);
    }

    async getProducts() {
        try {
            console.log("entrando a getProducts");
            if(fs.existsSync(this.path))
            {
                //1. Leer el archivo
                const productsFile = await fs.promises.readFile(this.path, 'utf-8')
                //2. retornar el objeto/array js
                console.log(JSON.parse(productsFile));
            } else {
                console.log([])
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    async createProduct(newProduct){
        try {
            const { title, description, price, thumbnail, code, stock } = newProduct
            if (!title || !description || !price || !thumbnail || !code || !stock)
                console.log("Falta una propiedad")
            else{
                const products = this.getProducts()
                if(!(products.some((p) => p.code === code))){
                    let id
                    (!products.length) ? id = 1: id= products[products.length-1].id+1
                    products.push({id, ...newProduct})
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                }else{
                    console.log("El codigo de producto ya existe, ingrese otro.");                
                }
            }
            
        } catch (error) {
            return error
        }
    }

    
    
    // getProductById(id){
    //     const result = this.products.find(p=>p.id === id)
    //     if(result)
    //         console.log(result);
    //     else
    //         console.log("Not found");
    // }
    
    
}


    



// async function test() {
//     const manager1 = new UsersManager()
//     await manager1.createUser(user1)
//     await manager1.createUser(user3)
//     await manager1.createUser(user4)
//     await manager1.createUser(user5)
//     const users = await manager1.getUsers()
//     console.log(users);
//     await manager1.deleteUser(1)
// }

// test()

const producto = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc123', stock:25}
const producto2 = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc123'}
const producto3 = {title: 'producto prueba', description:'Este es un producto prueba',
price: 200, thumbnail:'Sin imagen', code:'abc1234', stock:25}

const manager1 = new ProductManager("products.json")
manager1.getProducts()
manager1.createProduct(producto)
manager1.getProducts()