import { usersModel } from "../db/models/users.model.js";
import { cartModel } from "../db/models/cart.model.js";
import { cartManager } from "../managers/cartManager.js";

class UsersManager {

    async findAll() {
        const response = await usersModel.find().populate("cart")
        return response;
    }

    async findById(id) {
        const response = await usersModel.findById(id)
        return response;
    }

    async findByEmail(email) {
        const response = await usersModel.findOne({email})
        return response;
    }

    async createOne(obj) {
        const cart = await cartManager.createCart()
        const user = {...obj, cart}
        const response = await usersModel.create(user);
        return response;
    }

    async updateOne(id, obj) {
        const response = await usersModel.updateOne({ _id: id }, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await usersModel.deleteOne({ _id: id });
        return response;
    }

    //Agregar un carrito al usuario
    async addCarttoUser(idCart, idUser) {
        try {
            

            //Validar que el carrito exista
            const cart = await cartModel.findById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
            }
            //Validar que el producto exista
            const user = await usersManager.findById(idUser);
            if (!user) {
                throw new Error('There is no user with this id');
            }

            user.cart.push({ cart});

            

            return user.save();

        } catch (error) {
            throw new Error('Cant add cart to the user');
        }
    }

}

export const usersManager = new UsersManager();