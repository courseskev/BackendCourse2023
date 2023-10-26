import { productModel } from "../db/models/product.model.js";

class ProductManager {

    async findAll() {
        //.lean() para obtener un resultado como obj plano JS
        const response = await productModel.find().lean();
        return response;
    }

    async findById(id) {
        const response = await productModel.findById(id);
        return response;
    }

    async createOne(obj) {
        const response = await productModel.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const response = await productModel.updateOne({ _id: id }, obj);
        return response;
    }

    async deleteOne(id) {
        const response = await productModel.deleteOne({ _id: id })
        return response;
    }
}

export const productManager = new ProductManager();