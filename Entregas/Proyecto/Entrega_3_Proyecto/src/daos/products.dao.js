import { productModel } from "../models/product.model.js";

class ProductDao {
    async usingAgregation(order){
        const res = await productModel.agregation([
            {$sort: {price: order}}
        ])
        return res;
    }
    async findAll(obj) {
        //.lean() para obtener un resultado como obj plano JS
        //const response = await productModel.find().lean();
        
        const {limit=10, page=1, sort, category, status} = obj
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

    async findProductById(id) {
        const response = await productModel.findById(id);
        return response;
    }

    async createProduct(obj) {
        console.log("previo a bd", obj);
        const response = await productModel.create(obj);
        return response;
    }

    async updateProduct(id, obj) {
        const response = await productModel.findByIdAndUpdate(id, obj);
        return response;
    }

    async deleteProduct(id) {
        const response = await productModel.findByIdAndDelete(id)
        return response;
    }

    async findByCode(code) {
        const response = await productModel.findOne({code})
        return response;
    }
}

export const productDao = new ProductDao();