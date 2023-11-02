import { Router } from "express"
import productManager from "../managers/productsManager.js"

const productRouter = Router()

productRouter.get('/', async (request, response) => {
    try {
        const result = await productManager.findAll()
        response.status(200).json({ message: "Products", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

productRouter.get('/:idProduct', async (request, response) => {
    try {
        const {idProduct} = request.params
        const result = await productManager.findById(idProduct)
        response.status(200).json({ message: "Product found", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

productRouter.post('/', async (request, response) => {
    const {name, price} = request.body
    if(!name || !price)
        return response.status(400).json({message: "Some product property is missing"})

    try {
        const result = await productManager.createOne(request.body)
        response.status(201).json({ message: "Product created", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

productRouter.delete('/:idProduct', async (request, response) => {
    try {
        const {idProduct} = request.params
        await productManager.deleteOne(idProduct)
        response.status(200).json({ message: "Product deleted" })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

export default productRouter