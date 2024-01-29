import { cartDao } from "../daos/cart.dao.js";
import { productDao } from "../daos/products.dao.js";

class CartService {

    async findCartById(id) {
        const cart = await cartDao.findCartById(id);
        return cart;
    }

    async createCart() {
        const cart = await cartDao.createCart();
        return cart;
    }

    async addProductToCart(idCart, idProduct, obj) {
        const {quantity} = obj

        //Validar que el producto exista
        const product = await productDao.findById(idProduct);
        if (!product) {
            throw new Error('There is no product with this id');
        }

        const response = await cartDao.addProductToCart(idCart, idProduct, quantity);
        return response;
    }

    //Eliminar un producto al carrito
    async deleteProductFromCart(idCart, idProduct) {
        const cart = await cartDao.deleteProductToCart(idCart, idProduct);
        return cart;
    }

    //Eliminar todos los productos  del carrito
    async deleteAllProductsFromCart(idCart) {
        const cart = await cartDao.deleteAllProductsFromCart(idCart);
        return cart;
    }

    //Eliminar todo el carrito
    async deleteCart(idCart) {
        const cart = await cartDao.deleteCart(idCart);
        return cart;
    }
}

const cartService = new CartService();
export default cartService;