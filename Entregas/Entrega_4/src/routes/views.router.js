import { Router } from "express";
import pm from '../ProductManager.js'
const viewsRouter = Router()

viewsRouter.get('/home', async(request, response)=>{
    const products = await pm.getProducts()
    response.render('home', {products})
})

viewsRouter.get('/', (request, response)=>{
    response.render('realTime')
})

export default viewsRouter