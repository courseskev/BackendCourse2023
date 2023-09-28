import fs from 'fs'
import path from 'path'
import pm from './ProductManager.js'

const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Entregas\\Entrega_3\\carritos.json"

// const archivo = path.basename(ruta)

class CartManager{
    
    constructor(rutaParametro = ""){
        if(rutaParametro!==""){
            this.ruta = rutaParametro
            this.archivo = path.basename(this.ruta)
        }else{
            this.archivo = path.basename(ruta)
        }
        
    }

    async getCarts(){
        try {            
            if(fs.existsSync(this.archivo)){
                const Carts = await fs.promises.readFile(this.archivo, "utf-8")
                const data = JSON.parse(Carts)
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
            const Carts = await this.getCarts()
            let id
            if(Carts.length > 0){                
                id = Carts[Carts.length-1].id + 1
            }else{
                id = 1
            }
            const result = {id, products: [] } 
            Carts.push(result)
            await fs.promises.writeFile(this.archivo, JSON.stringify(Carts))
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartById(id){
        try {
            const Carts = await this.getCarts()
            console.log(Carts);
            if(Carts){
                const Cart = Carts.find(p => p.id === id)                
                return Cart
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const cart = await this.getCartById(idCart)
            const product = await pm.getProductById(idProduct)
            
            if(!cart)
                throw new Error("Cart doesn't exist")
            if(!product)
                throw new Error("Product doesn't exist")
            
            const productIndex = cart.products.findIndex(p=>p.id ===idProduct)
            if(productIndex === -1){
                const newProduct = {product:idProduct, quantity:1}
                cart.products.push(newProduct)                
            }else{
                cart.products[productIndex].quantity++
            }
            await fs.promises.writeFile(this.archivo, JSON.stringify(cart))
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

}


let tmpFile = "carritos.json" 
export default new CartManager(tmpFile)