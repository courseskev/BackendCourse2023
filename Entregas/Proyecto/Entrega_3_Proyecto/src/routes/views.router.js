import { Router } from "express";
import viewsController from "../controllers/views.controller.js";


const routerViews = Router();

routerViews.get("/login", viewsController.login);

routerViews.get("/signup", viewsController.signup);

routerViews.get("/forgotPassword", viewsController.forgotPassword);

routerViews.get("/chat", viewsController.chat)

routerViews.get("/products", viewsController.products)

routerViews.get("/carts/:cid", viewsController.carts)


export default routerViews