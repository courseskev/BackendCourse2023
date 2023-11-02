import usersModel from '../models/users.model.js'

class UsersManager{
    async findAll(){
        const result = await usersModel.find()
        return result
    }
    async createOne(obj){
        const result = await usersModel.create(obj)
        return result
    }
}

const usersManager = new UsersManager();
export default usersManager;