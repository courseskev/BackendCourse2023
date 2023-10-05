import { Router } from "express";

const router = Router()

router.get('/view1',(request, response)=>{response.render("view1")})
router.get('/view2',(request, response)=>{response.render("view2")})

export default router