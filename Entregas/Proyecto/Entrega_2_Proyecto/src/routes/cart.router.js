import { Router } from "express";
import { cartManager } from "../dao/managers/cartManager.js";

const router = Router();

//Obtener un carrito
router.get("/:idCart", async (req, res) => {
    const { idCart } = req.params;
    try {
        const cart = await cartManager.findById(idCart);
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
        const createCart = await cartManager.createCart(req.body);
        res.json({ createCart });
        res.status(200).json({ message: "Cart created", cart:createCart })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Agregar un producto al carrito
router.post("/:idCart/product/:idProduct", async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
        const response = await cartManager.addProductToCart(idCart, idProduct);
        res.status(200).json({ message: "Product added", product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;

