import usersModel from '../db/models/users.model.js'

class UsersManager {
    async findAll(){
        const result = await usersModel.find()
        return result
    }

    async findById(id){
        const result = await usersModel.findById(id)
        return result
    }

    async createOne(obj){
        const result = await usersModel.create(obj)
        return result
    }

    async updateOne(obj){
        const result = await usersModel.updateOne({_id:id}, obj)
        return result
    }

    async deleteOne(id){
        const result = await usersModel.deleteOne({_id:id},id)
        return result
    }

}

const usersManager = new UsersManager()

export default usersManager