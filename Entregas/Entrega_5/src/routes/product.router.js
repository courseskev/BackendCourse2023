import { Router } from "express";
import { productManager } from "../dao/managers/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.findAll();
        res.status(200).json({ message: "Producs", products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}); 

router.post("/", async (req, res) => {
    try {
        const createProduct = await productManager.createOne(req.body);
        res.status(200).json({ message: "Product created", product:createProduct })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:idProduct', async (req, res) => {
    const { idProduct } = req.params;
    try {
        await productManager.deleteOne(idProduct);
        res.status(200).json({ message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

export default router;