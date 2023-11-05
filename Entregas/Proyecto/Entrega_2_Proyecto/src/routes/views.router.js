import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productManager } from "../dao/managers/productManager.js";

const routerViews = Router();

routerViews.get("/signup", (req, res) => {
    res.render("signup");
});

routerViews.get("/chat", (req, res) => {
    res.render("chat");
})

routerViews.get("/home/:idUser", async (req, res) => {
    const { idUser } = req.params;
    const user = await usersManager.findById(idUser);
    const products = await productManager.findAll();
    const { first_name, last_name } = user;
    res.render("home", { first_name, last_name, products });
})

routerViews.get("/products", async(req, res)=>{
    const products = await productManager.findAll(req.query);
    const cleanData = JSON.parse(JSON.stringify(products));    
    res.render("products", cleanData);
})


export default routerViews