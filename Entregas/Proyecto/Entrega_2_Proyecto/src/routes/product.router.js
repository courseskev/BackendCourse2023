import { Router } from "express";
import { productManager } from "../dao/managers/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await productManager.findAll(req.query);
        const info = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage : result.hasPrevPage,
            hasNextPage : result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}`: null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}`: null
        }
        res.status(200).json({ message: "Products", info })
    } catch (err) {
        const info = {
            status: "error",
            error: err.message,
            totalPages: null,
            prevPage: null,
            nextPage: null,
            hasPrevPage : null,
            hasNextPage : null,
            prevLink: null,
            nextLink: null
        }
        res.status(500).json({ message: "Products Error", info  })
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

router.delete('/:pid', async (req, res) => {
    const { idProduct } = req.params;
    try {
        await productManager.deleteOne(idProduct);
        res.status(200).json({ message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

export default router;