import {Router} from 'express'
import pm from '../ProductManager.js'
import {validatingData} from '../middleware/products.middleware.js'
import socketServer from '../app.js'

const productRouter = Router()

productRouter.get('/', async(request, response)=>{
    try {
        const products = await pm.getProducts(request.query)
        response.status(200).json({ message: "Successfully. Products found.", products})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

productRouter.get('/:pid',async(request, response)=>{
    try {
        const {id} = request.params
        const product = await pm.getProductById(+id)
        if(product)
            response.status(200).json({message: "Successfully. Product found", product})
        else
            response.status(404).json({message: "Product not found"})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

productRouter.post('/', /*validatingData,*/ async(request, response)=>{
    try {
        /*const {title, description, code, price, stock, category} = request.body
        if(!title || !description || !code || !price || !stock || !category)
            return response.status(400).json({message: "Cannot add the product. One or more attributes are missing."});
        */
        const result = await pm.addProduct(request.body)        
        if(result === -1)
            return response.status(400).json({message: "Cannot add the product. The code already exist."})        
        socketServer.emit('updateProductList', result);
        response.redirect('/api/views/home')
        //response.render('home')
        // response.status(201).json({message: "Successfully. Product created.", result})
    } catch (error) {        
        response.status(500).json({message: error.message})
    }
})

productRouter.delete('/:pid',async(request, response)=>{
    try {
        const {id} = request.params
        const product = await pm.deleteProduct(+id)
        if(product !== -1)
            response.status(200).json({message: "Successfully. Product Deleted", product})
        else
            response.status(404).json({message: "Product not found"})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

productRouter.put('/:pid',async(request, response)=>{
    try {
        const {id} = request.params
        if(!request.body || Object.keys(request.body).length === 0)
            response.status(400).json({message: 'Body of request is empty or null, check data'})        
        const product = await pm.updateProduct(+id, request.body)
        if(product !== -1)
            response.status(200).json({message: "Successfully. Product Updated", product})
        else
            response.status(404).json({message: "Product not found"})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

productRouter.post('/signup', async(request, response)=>{
    const {fullname, email} = request.body
    if(!fullname || !email)
        return response.status(400).json({message: 'Mandatory data is missing'})
    try {
        const result = await pm.signup(request.body)
        response.redirect(`/api/views/signup/${result.id}`)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})


export default productRouter 