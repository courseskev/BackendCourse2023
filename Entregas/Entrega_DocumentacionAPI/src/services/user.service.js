import usersDao from "../daos/users.dao.js";
import userDtoResponse from "../dtos/user.dtoResponse.js";

class UserService{
    async findAllUsers(){
        const users = await usersDao.findAll();        
        const usersDTO = users.map(user=>{
            return new userDtoResponse(user);
        })
        
        return usersDTO;
    }

    async findUserById(id){
        const user = await usersDao.findById(id);
        const usersDTO = new userDtoResponse(user);      
        return usersDTO;
    }

    async createUser(obj){
        const user = await usersDao.createOne(obj);
        const usersDTO = new userDtoResponse(user);      
        return usersDTO;
    }

    async deleteUser(id){
        const user = await usersDao.deleteOne(id);
        const usersDTO = new userDtoResponse(user);      
        return usersDTO;
    }

    async updateUser(id, obj) {
        const response = await usersDao.updateOne(id, obj);
        return response;
    }

    async findByEmail(email) {
        const response = await usersDao.findByEmail(email)
        return response;
    }
}

const userService = new UserService();
export default userService;