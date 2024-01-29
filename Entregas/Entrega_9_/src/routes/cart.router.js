import { Router } from "express";
import cartController from "../controllers/cart.controller.js";


const cartRouter = Router();

cartRouter.get('/:cid', cartController.findCartById);
cartRouter.post('/',cartController.createCart);

//Agregar un producto al carro
cartRouter.post('/:cid/product/:pid',cartController.addProductToCart);
//Eliminar un producto del carro
cartRouter.delete('/:cid/product/:pid',cartController.deleteProductFromCart);
//Eliminar todos los productos del carro
cartRouter.delete('/:idCart',cartController.cleanCart);
//eliminar todo el carro
cartRouter.delete('/:idCart/*',cartController.deleteCart);

export default cartRouter;