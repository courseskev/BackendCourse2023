import { Router } from "express";
import { cartManager } from "../dao/managers/cartManager.js";

const router = Router();

//Obtener un carrito
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.findCartById(cid)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found with id provided"})
        }
        res.status(200).json({ message: "Cart found", cart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const createCart = await cartManager.createCart();        
        res.status(200).json({ message: "Cart created", cart:createCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const response = await cartManager.addProductToCart(cid, pid, req.query);
        res.status(200).json({ message: "Product added", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Eliminar un producto al carrito
router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const response = await cartManager.deleteProductToCart(cid, pid);
        res.status(200).json({ message: "Product deleted", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Eliminar todo el carro
router.delete("/:cid/*", async (req, res) => {
    const { cid } = req.params;
    try {
        const deletedCart = await cartManager.deleteCart(cid);
        res.status(200).json({ message: "Cart deleted", cart: deletedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:idCart", async (req, res) => {
    const { idCart } = req.params;
    try {
        const updatedCart = await cartManager.deleteAllProductsFromCart(idCart);
        res.status(200).json({ message: "Todos los productos eliminados del carrito", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;

