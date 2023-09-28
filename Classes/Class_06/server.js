import express from 'express'
import {manager} from  './UserManager.js'

//There are three properties that will be used: params, query, body
const app = express()
app.use(express.json())


app.get('/api/users', async (req,res) => {
    try {             
        const users = await manager.getUsers(req.query)    
        res.status(200).json({message:'Successfully: ', users})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get('/api/users/:id', async(req, res) => {
    try {
        const {id} = req.params
        const user = await manager.getUserById(+id)
        if(!user)
            res.status(404).json({message:'User not found'})        
        else
            res.status(200).json({message:'Successfully: ', user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

app.post('/api/users', async(req, res)=>{
    try {
        const {first_name, last_name, course} = req.body
        if(!first_name || !last_name || !course)
            return res.status(400).json({message: 'One or more mandatory attributes are missing'})
        const result = await manager.createUser(req.body)
        return res.status(200).json({message:'Sucessfully', user: result})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api/courses/:id', async(req, res)=>{
    try {
        const {id} = req.params
        await manager.delete(id)
        return res.status(200).json({message: 'Course deleted'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})