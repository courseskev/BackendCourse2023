import {Router} from 'express'

const viewsRouter = Router()

viewsRouter.get('/signup', (request, response)=>{
    response.render('signup')
} )

export default viewsRouter