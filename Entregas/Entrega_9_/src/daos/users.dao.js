import { usersModel } from "../models/users.model.js";
import cartService from "../services/cart.service.js";

class UsersDao {

    async findAll() {
        const response = await usersModel.find()
        return response;
    }

    async findById(id) {
        const response = await usersModel.findById(id).populate("cart")
        return response;
    }

    async findByEmail(email) {
        const response = await usersModel.findOne({email})
        return response;
    }

    async createOne(obj) {
        const cart = await cartService.createCart();
        const user = {...obj, cart}
        const response = await usersModel.create(user);
        return response;
    }

    async updateOne(id, obj) {
        const response = await usersModel.findByIdAndUpdate(id, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await usersModel.findByIdAndDelete(id);
        return response;
    }
}

const usersDao = new UsersDao();
export default usersDao;