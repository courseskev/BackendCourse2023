import { cartModel } from "../models/cart.model.js";



class CartDao {

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
    async addProductToCart(idCart, idProduct, quantity) {
        try {
            //Validar que el carrito exista
            const cart = await cartModel.findById(idCart);
            if (!cart) {
                throw new Error('There is no cart with this id');
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
            throw new Error(`Cannot add products to the cart. Error: ${error.message}`);
        }
    }


    // Eliminar un producto al carrito
    async deleteProductToCart(idCart, idProduct) {
        try {
            const cart = await cartModel.findById(idCart);

            if (!cart) {
                throw new Error('Cart not found');
            }

            const productIndex = cart.products.findIndex((p) => p.product.equals(idProduct));

            if (productIndex !== -1) {
                // Verificar si la cantidad es mayor a 1, restar una unidad; de lo contrario, eliminar el producto
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity--;
                } else {
                    // Si la cantidad es 1 o menos, eliminar el producto del carrito
                    cart.products.splice(productIndex, 1);
                }

                const updatedCart = await cart.save();
                return updatedCart.products;
            }

            throw new Error('Product not found in the cart');

        } catch (error) {
            throw new Error(`Cannot delete products from the cart. Error: ${error.message}`);
        }
    }


    //Eliminar todos los productos  del carrito
    async deleteAllProductsFromCart(idCart) {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(idCart, { products: [] }, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error(`Error while deleting all products from cart: ${error.message}`);
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
            throw new Error(`Cannot delete cart. Error: ${error.message}`);
        }
    }

    
}

export const cartDao = new CartDao();