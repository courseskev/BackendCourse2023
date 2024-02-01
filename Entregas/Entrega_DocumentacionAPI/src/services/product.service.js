
import { productDao } from "../daos/products.dao.js";

class ProductService {

    async findAllProducts(obj) {
        const product = await productDao.findAll(obj);
        return product;
    }

    async findProductById(id) {
        const product = await productDao.findProductById(id);
        return product;
    }

    async createProduct(obj) {
        const product = await productDao.createProduct(obj);
        return product;
    }

    async deleteProduct(idProduct) {
        const product = await productDao.deleteProduct(idProduct);
        return product;
    }

    async findByCode(code) {
        const response = await productDao.findByCode(code)
        return response;
    }


}

const productService = new ProductService();
export default productService;