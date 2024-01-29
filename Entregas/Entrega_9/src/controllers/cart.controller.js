import cartService from "../services/cart.service.js";

class CartController{
    //Obtener un carrito
async findCartById(req, res) {
    const { cid } = req.params;
    try {
        const cart = await cartService.findCartById(cid)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found with id provided"})
        }
        res.status(200).json({ message: "Cart found", cart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Crear un nuevo carrito
async createCart(req, res){
    try {
        const createCart = await cartService.createCart();        
        res.status(200).json({ message: "Cart created", cart:createCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

//Agregar un producto al carrito
async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
        const response = await cartService.addProductToCart(cid, pid, req.query);
        res.status(200).json({ message: "Product added", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Eliminar un producto al carrito
async deleteProductFromCart(req, res){
    const { cid, pid } = req.params;
    try {
        const response = await cartService.deleteProductFromCart(cid, pid);
        res.status(200).json({ message: "Product deleted", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Eliminar todos lo productos del carrito
async cleanCart(req, res){
    const { idCart } = req.params;
    try {
        const updatedCart = await cartService.deleteAllProductsFromCart(idCart);
        res.status(200).json({ message: "Todos los productos eliminados del carrito", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Eliminar todo el carro
async deleteCart(req, res) {
    const { cid } = req.params;
    try {
        const deletedCart = await cartService.deleteCart(cid);
        res.status(200).json({ message: "Cart deleted", cart: deletedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

}

const cartController = new CartController();
export default cartController;