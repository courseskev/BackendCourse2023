import express from 'express'
import pm from './ProductManager.js'

const app = express()

app.get('/api/products', async(request, response)=>{
    const products = await pm.getProducts(request.query)
    response.json({
        message: "Products found", products
    })
})

app.get('/api/products/:id',async(request, response)=>{
    const {id} = request.params
    const product = await pm.getProductById(+id)
    response.json({
        message: "Product found", product
    })
})

app.listen(8080, ()=>{
    console.log('port 8080h');
})