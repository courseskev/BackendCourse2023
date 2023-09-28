import {Router} from 'express'
import cm from '../CartsManager.js'

const router = Router()


router.post('/', async(request,response)=>{
    try {
        const result = await cm.addCart()        
        response.status(201).json({message: "Successfully. Cart created.", result})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

router.post('/:cid/product/:pid', async(request,response)=>{
    try {
        const {cid, pid} = request.params        
        const result = await cm.addProductToCart(+cid, +pid)
        if(result)        
            response.status(201).json({message: "Successfully. Product added to cart.", result})        
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

router.get('/:cid', async(request,response)=>{
    try {
        const {cid} = request.params
        const cart = await cm.getCartById(+cid)
        if(cart)
            response.status(200).json({message: "Successfully. Cart found", cart})
        else
            response.status(404).json({message: "Cart not found"})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})


export default router