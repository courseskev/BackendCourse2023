import express from 'express'
import {manager} from  './UserManager.js'

const app = express()

//There are three properties that will be used: params, query, body

app.get('/api/character', async (req,res) => {
    console.log(req);
    const users = await manager.getUsers()
    // res.send('Probando')
    res.json({message:'Users found: ', users})
})

app.get('/api/users/:id', async(req, res) => {
    console.log(req.params);
    const {id} = req.params
    const user = await manager.getUserById(+id)
    res.json({message:'User found: ', user})
})

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})