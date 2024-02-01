import { Router } from "express";
import productController from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.get('/', productController.findAllProducts);
productRouter.get('/:pid', productController.findProductById);
productRouter.post('/',productController.createProduct);
productRouter.delete('/:pCode',productController.deleteProduct);

export default productRouter;