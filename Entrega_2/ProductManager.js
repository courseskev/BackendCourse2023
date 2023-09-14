const fs = require("fs")

class ProductManager {
    constructor(path) {
        this.path = path,
            this.products = []
    }
    
    getProducts = async () => {
        const productlist = await fs.promises.readFile(this.path, "utf-8")
        const productlistparse = JSON.parse(productlist)
        return productlistparse
    }
    
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Falta una propiedad")
            return
        }
        else {
            const codigorepetido = this.products.find(elemento => elemento.code === code)
            if (codigorepetido) {
                console.log("El codigo de producto ya existe, ingrese otro.");
                return
            }
            else {
                let id
                    (!products.length) ? id = 1: id= products[products.length-1].id+1
                const productnew = {
                    id, title, description, price, thumbnail, code, stock
                }
                this.products.push(productnew)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
        }
    }


    
    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        if (!id || !title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Falta una propiedad")
            return
        }
        else {
            const allproducts = await this.getProducts()
            const codigorepetido = allproducts.find(elemento => elemento.code === code)
            if (codigorepetido) {
                console.log("El codigo de producto ya existe, ingrese otro.");
                return
            }
            else {
                const currentProductsList = await this.getProducts()
                const newProductsList = currentProductsList.map(elemento => {
                    if (elemento.id === id) {
                        const updatedProduct = {
                            ...elemento,
                            title, description, price, thumbnail, code, stock
                        }
                        return updatedProduct
                    }
                    else {
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2))
            }

        }
    }


    deleteProduct = async (id) => {
        const allproducts = await this.getProducts()
        const productswithoutfound = allproducts.filter(elemento => elemento.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(productswithoutfound, null, 2))
    }
    getProductbyId = async (id) => {
        const allproducts = await this.getProducts()
        const found = allproducts.find(element => element.id === id)
        return found
    }


}

async function generator() {

    const productmanager = new ProductManager("products.json");
    //await productmanager.addProduct("product1","description1",1500,"url","abc123",500)
    await productmanager.getProducts()
    // await productmanager.addProduct("product2","description2",1500,"url","abc122",500)
    // await productmanager.addProduct("product3","description2",1500,"url","abc125",500)
    // await productmanager.updateProduct(3,"zzzzz","xxxxxx",1500,"url","abc126",500)
    //await productmanager.deleteProduct(2)
    //const solo=await productmanager.getProductbyId(1)

    //  const listado=await productmanager.getProducts()
    //console.log(solo)
}


const productmanager = new ProductManager("products.json");
//console.log( productmanager.getProducts());
// await productmanager.addProduct("product2","description2",1500,"url","abc122",500)
// await productmanager.addProduct("product3","description2",1500,"url","abc125",500)
// await productmanager.updateProduct(3,"newnew","descp",1500,"url","abc126",500)
// await productmanager.deleteProduct(2)