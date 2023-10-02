import fs from 'fs'
import path from 'path'
import pm from './ProductManager.js'

const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Classes\\Class_08\\carritos.json"

// const archivo = path.basename(ruta)

class CartManager{
    
    constructor(rutaParametro = ""){
        if(rutaParametro!=="")
            this.archivo = rutaParametro            
        else
            this.archivo = path.basename(ruta)
    }

    async getCarts(){
        try {            
            if(fs.existsSync(this.archivo)){
                const carts = await fs.promises.readFile(this.archivo, "utf-8")
                const data = JSON.parse(carts)
                return data
            }
            else
                return []

        } catch (error) {
            throw new Error(error)
        }
    }

    async addCart(){
        try {            
            const carts = await this.getCarts()
            let id
            if(carts.length > 0){                
                id = carts[carts.length-1].id + 1
            }else{
                id = 1
            }
            const result = {id, products: [] } 
            carts.push(result)
            await fs.promises.writeFile(this.archivo, JSON.stringify(carts))
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartById(id){
        try {
            const carts = await this.getCarts()
            console.log(carts);
            if(carts){
                const cart = carts.find(c => c.id === id)                
                return cart
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const carts = await this.getCarts()
            const cart = await this.getCartById(idCart)
            const product = await pm.getProductById(idProduct)
            
            if(!cart)
                throw new Error("Cart doesn't exist")
            if(!product)
                throw new Error("Product doesn't exist")
            const cartIndex = carts.findIndex(c=>c.id === idCart)
            const productIndex = cart.products.findIndex(p=>p.product ===idProduct)
            if(productIndex === -1){
                const newProduct = {product:idProduct, quantity:1}
                cart.products.push(newProduct)                
            }else{
                cart.products[productIndex].quantity++                
            }
            carts[cartIndex] = { ...carts[cartIndex], ...cart, idCart }
            
            await fs.promises.writeFile(this.archivo, JSON.stringify(carts))
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    

}


let tmpFile = "D:\\carritos.json" 
export default new CartManager(tmpFile)