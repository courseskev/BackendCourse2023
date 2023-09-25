const fs = require('fs')
const path = require('path')

const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Class_04\\usuarios.json"
const archivo = path.basename(ruta)

class UsersManager{
    async getUsers(){
        try {
            if(fs.existsSync(archivo)){
                const users = await fs.promises.readFile(archivo, "utf-8")
                return JSON.parse(users)
            }
            else
                return []
        } catch (error) {
            return error
        }
    }

    async createUser(user){
        try {
            const users = await this.getUsers()
            let id
            if(!users.length)
                id = 1
            else
                id = users[users.length-1].id + 1
            users.push({id, ...user})
            await fs.promises.writeFile(archivo, JSON.stringify(users))
        } catch (error) {
            return error
        }
    }

    async deleteUser(id){
        try {
            const users = await this.getUsers()
            const tmpUsers = users.filter(user => user.id !== id)
            await fs.promises.writeFile(archivo, JSON.stringify(tmpUsers))
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const users = await this.getUsers()
            const user = users.find(user => user.id === id)
            if(user)
                return user
            else
                return "User not found"
        } catch (error) {
            return error
        }
    }
}

const user1= {
    nombre: "Pepito",
    apellido: "Suarez",
    edad: 40,
    curso: "JS for Dummies"
}
const user2= {
    nombre: "Juanito",
    apellido: "El paspi",
    edad: 30,
    curso: "NodeJS for Dummies"
}

async function run(){
    const manager = new UsersManager()
    //await manager.createUser(user2)
    //await manager.createUser(user1)
    //await manager.deleteUser(1)
    console.log(await manager.findById(3));
    // const result = await manager.getUsers()
    // console.log(result);
    
}

run()