import { cartModel } from "../db/models/cart.model.js";
import { productManager } from "./productManager.js";

class CartManager {

    //Buscar un carrito por id
    async findById(idCart) {
        const response = await cartModel.findById(idCart);
        return response;
    }

    //Crear un carrito
    async createCart() {
        const newCart = { products: [] }
        const response = await cartModel.create(newCart);
        return response;
    }

    //Agregar un producto al carrito
    async addProductToCart(idCart, idProduct) {
        try {
            //Validar que el carrito exista
            const cart = await this.findById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
            }
            //Validar que el producto exista
            const product = await productManager.findById(idProduct);
            if (!product) {
                throw new Error('There is no product with this id');
            }

            const productIndex = cart.products.findIndex( (p) => p.product.equals(idProduct));

            if (productIndex === -1) {
                cart.products.push({ product: idProduct, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }

            await cart.save();

        } catch (error) {
            throw new Error('Cant add products to the cart');
        }
    }
}

export const cartManager = new CartManager();