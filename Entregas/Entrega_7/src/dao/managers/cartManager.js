import { cartModel } from "../db/models/cart.model.js";
import { productManager } from "./productManager.js";

class CartManager {

    //Crear un carrito
    async createCart() {
        const newCart = { products: [] }
        const response = await cartModel.create(newCart);
        return response;
    }

    //Buscar un carrito por id
    async findCartById(idCart) {
        const response = await cartModel.findById(idCart).populate("products.product");
        return response;
    }

    //Agregar un producto al carrito
    async addProductToCart(idCart, idProduct, obj) {
        try {
            const {quantity} = obj

            //Validar que el carrito exista
            const cart = await cartModel.findById(idCart);
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
                if(quantity)
                    cart.products[productIndex].quantity = quantity;
                else
                    cart.products[productIndex].quantity++;
            }

            return cart.save();

        } catch (error) {
            throw new Error('Cant add products to the cart');
        }
    }


    //Eliminar un producto al carrito
    async deleteProductToCart(idCart, idProduct) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(
                idCart,
                { $pull: { products: { product: idProduct } } },
                { new: true }
            );

            if (!updatedCart) {
                throw new Error('Cart not found');
            }

            return updatedCart.products;

        } catch (error) {
            throw new Error('Cant add products to the cart');
        }
    }

    //Eliminar todo el carrito
    async deleteCart(cartId) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(cartId);

            if (!deletedCart) {
                throw new Error('Cart not found');
            }

            return deletedCart;
        } catch (error) {
            throw error;
        }
    }

    //Eliminar todos los productos  del carrito
    async deleteAllProductsFromCart(idCart) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(idCart, { products: [] }, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al eliminar todos los productos del carrito: ${error.message}`);
        }
    }
}

export const cartManager = new CartManager();