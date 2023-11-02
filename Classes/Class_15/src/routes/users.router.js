import {Router} from 'express'
import usersManager from '../managers/usersManager.js'

const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
    try {
        const result = await usersManager.findAll()
        response.status(200).json({ message: "Users", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

usersRouter.get('/:idUser', async (request, response) => {
    try {
        const {idUser} = request.params
        const result = await usersManager.findById(idUser)
        response.status(200).json({ message: "User found", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

usersRouter.post('/', async (request, response) => {
    const {first_name, last_name, email, password} = request.body
    if(!first_name || !last_name || !email || !password)
        return response.status(400).json({message: "Some user property is missing"})
    try {
        const result = await usersManager.createOne(request.body)
        response.status(201).json({ message: "User created", result })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

usersRouter.delete('/:idUser', async (request, response) => {
    try {
        const {idProduct} = request.params
        await usersManager.deleteOne(idProduct)
        response.status(200).json({ message: "User deleted" })
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
})

export default usersRouter