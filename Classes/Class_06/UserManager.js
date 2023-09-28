//const fs = require('fs')
import fs from 'fs'
const path = 'Users.json'

class UsersManager {

    async getUsers(objectQuery) {
        try {
            let limit
            if(objectQuery)
                limit = objectQuery.limit         
            if(fs.existsSync(path))
            {   
                const usersFile = await fs.promises.readFile(path, 'utf-8')
                const result = JSON.parse(usersFile)                
                return limit ? result.slice(0,limit) : result
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async createUser(user) {
        try {
            //1. Leer el archivo -- arreglo js
            const users = await this.getUsers()
            //generar el id
            let id
            (!users.length) ? id = 1 : id = users[users.length-1].id + 1
            //2. Agregar al arreglo retornado el nuevo usuario que entre como parámetro
            //agrega el id más todo lo que venga en el objeto user
            const newUser = {id, ...user}
            users.push(newUser)
            //3. Sobreescribir la información de users en el archivo
            await fs.promises.writeFile(path, JSON.stringify(users))
            return newUser
        } catch (error) {
            return error
        }
    }

    async getUserById(id) {
        try {
            const users = await this.getUsers()
            const user = users.find(u => u.id === id)            
            return user            
        } catch (error) {
            return error
        }
    }

    async deleteUser(id) {
        try {
            //Obtiene todos los usuarios
            const users = await this.getUsers()
            //con filter() se crea un nuevo arreglo con todos los usuarios 
            //menos el que coincida con el id
            const newArrayUsers = users.filter(u => u.id !== id) 
            //sobreescribir el nuevo arreglo 
            await fs.promises.writeFile(path, JSON.stringify(newArrayUsers))
        } catch (error) {
            return error
        }
    }

}

//Prueba

const user1 = {
    first_name: 'Juan',
    last_name: 'Hoyos',
    age: 40,
    course: 'JAVASCRIPT'
}

const user2 = {
    first_name: 'Luis',
    last_name: 'Abello',
    age: 35,
    course: 'BACKEND'
}

const user3 = {
    first_name: 'Leidy',
    last_name: 'Llanos',
    age: 30,
    course: 'BACKEND'
}

const user4 = {
    first_name: 'Johana',
    last_name: 'Llanos',
    age: 25,
    course: 'BACKEND'
}

const user5 = {
    first_name: 'Angie',
    last_name: 'Serrano',
    age: 28,
    course: 'BACKEND'
}
/*
async function test() {
    const manager1 = new UsersManager()
    await manager1.createUser(user1)
    await manager1.createUser(user3)
    await manager1.createUser(user4)
    await manager1.createUser(user5)
    const users = await manager1.getUsers()
    console.log(users);
    await manager1.deleteUser(1)
}*/

//test()
export const manager = new UsersManager()