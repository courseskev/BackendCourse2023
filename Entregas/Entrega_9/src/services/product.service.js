
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

    async createProduct() {
        const product = await productDao.createProduct();
        return product;
    }

    async deleteProduct(idProduct) {
        const product = await productDao.deleteProduct(idProduct);
        return product;
    }


}

const productService = new ProductService();
export default productService;