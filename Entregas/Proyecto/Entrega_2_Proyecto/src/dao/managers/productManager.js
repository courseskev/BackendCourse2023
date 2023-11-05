import { productModel } from "../db/models/product.model.js";

class ProductManager {
    async usingAgregation(order){
        const res = await productModel.agregation([
            {$sort: {price: order}}
        ])
        return res;
    }
    async findAll(obj) {
        //.lean() para obtener un resultado como obj plano JS
        //const response = await productModel.find().lean();
        
        const {limit=2, page=1, sort, category, status} = obj
        let query = {}
        if(category) query = {category}
        if(status) query = {status}
        if(category && status) query = {category, status}
        
        const response = await productModel.paginate(query, { limit, page })

        if (sort) {
            if (sort === 'asc') {
                response.docs.sort((a, b) => a.price - b.price);
            } else if (sort === 'desc') {
                response.docs.sort((a, b) => b.price - a.price);
            }
        }
        
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