import fs from 'fs'
import path from 'path'

const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Entregas\\Entrega_3\\products.json"

// const archivo = path.basename(ruta)

class ProductManager{
    
    constructor(rutaParametro = ""){
        if(rutaParametro!==""){
            this.ruta = rutaParametro
            this.archivo = path.basename(this.ruta)
        }else{
            this.archivo = path.basename(ruta)
        }
        
    }

    async getProducts(queryObject = {}){
        try {
            let limit
            if(queryObject){
                limit= queryObject.limit
            }
            if(fs.existsSync(this.archivo)){
                const products = await fs.promises.readFile(this.archivo, "utf-8")
                const data = JSON.parse(products)
                return limit ? data.slice(0,limit) : data
            }
            else
                return []

        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(product){
        try {            
            const products = await this.getProducts()
            let id
            if(products.length > 0){
                if(products.find(product => product.code === code))
                    return -1;
                id = products[products.length-1].id + 1
            }else{
                id = 1
            }
            const result = {id,...product} 
            products.push(result)
            await fs.promises.writeFile(this.archivo, JSON.stringify(products))            
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            if(products){
                const productToDelete = await this.getProductById(id)
                if(productToDelete){
                    const tmpProducts = products.filter(p => p.id !== id)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(tmpProducts))
                    return productToDelete
                }
                return -1
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts()
            if(products){
                const product = products.find(p => p.id === id)                
                return product
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, product){
        try {
            const products = await this.getProducts()
            if(products){
                const productIndex = products.findIndex(p => p.id === id);
                if(productIndex !== -1){
                    if(typeof product === 'object' && !Array.isArray(product)){                        
                        products[productIndex] = { ...products[productIndex], ...product, id };
                    } else {                        
                        products[productIndex][product.field] = product.value;
                    }    
                    await fs.promises.writeFile(this.archivo, JSON.stringify(products))
                    return products[productIndex]
                } else {
                    return -1
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

}

const p1 = {
    title: "iPhone X",
    description: "Best iPhone 2016",
    price: 2500000, 
    thumbnail: "Sin Imagen",  
    code: "abc123",
    stock: "25"
}

const p2 = {
    title: "iPad Pro 12 inch",
    description: "Best iPad 2020",
    price: 6500000,
    thumbnail: "Sin Imagen",
    code: "xyz789",
    stock: "10"
}

const p3 = {
    title: 'Nuevo Producto',
    description: 'Descripción del nuevo producto',
    price: 50,
    thumbnail: 'imagen_nueva.jpg',
    code: 'ABC123',
    stock: 10
};

async function test(){
    const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Entregas\\Entrega_2\\products.json"
    /*Test 1: Instanciamiento con parametro de ubicación de archivo*/
    const manager = new ProductManager(ruta) 
    
    /*Test 2: Obtener productos*/
    //console.log(await manager.getProducts());

    /*Test 3: Añadir productos*/
    // await manager.addProduct(p1)
    // await manager.addProduct(p2)
    // console.log(await manager.getProducts());

    /*Test 4: Buscar producto por Id*/    
    //console.log(await manager.getProductById(1));

    /*Test 5: Eliminar producto por Id*/
    //await manager.deleteProduct(2)   
    // console.log(await manager.getProducts());

    /*Test 6: Actualizar producto por Id y valor*/
    // await manager.updateProduct(3, {stock:0})
    // console.log(await manager.getProducts());

    /*Test 7: Actualizar producto por Id y objeto*/
    // await manager.updateProduct(4, p3)
    // console.log(await manager.getProducts());
}

// test()
let tmpFile = "D:\\products2.json" 
export default new ProductManager()