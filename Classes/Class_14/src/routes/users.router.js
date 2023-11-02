import {Router} from "express"
import usersManager  from "../db/managers/users.manager.js";
const usersRouter = Router()

usersRouter.get('/', async(request, response)=>{
    try {
        const users = await usersManager.findAll();
        response.status(200).json({message: "Users", users})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})

usersRouter.post('/', async(request, response)=>{
    try {
        const createdUser = await usersManager.createOne(request.body);
        response.status(201).json({message: "User created", user: createdUser})
    } catch (error) {
        response.status(500).json({message: error.message})
    }
})
export default  usersRouter;