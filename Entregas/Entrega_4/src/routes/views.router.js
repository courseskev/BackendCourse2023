import { Router } from "express";
import pm from '../ProductManager.js'
const router = Router()

router.get('/view1',(request, response)=>{response.render("view1")})
router.get('/view2',(request, response)=>{response.render("view2")})
router.get('/signup', async(request, response)=>{
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

export default router