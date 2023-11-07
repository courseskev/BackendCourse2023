import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productManager } from "../dao/managers/productManager.js";
import { cartManager } from "../dao/managers/cartManager.js";

const routerViews = Router();

routerViews.get("/login", (req, res) => {
    if(req.session.user)
        return res.redirect("/views/products")
    res.render("login");
});

routerViews.get("/signup", (req, res) => {
    if(req.session.user){
        req.session.destroy(() => {
            res.redirect("/views/signup")
        })
    }
        
    res.render("signup");
});

routerViews.get("/chat", (req, res) => {
    if(!req.session.user)
        return res.redirect("/views/login")
    res.render("chat");
})


routerViews.get("/products", async(req, res)=>{
    if(!req.session.user)
        return res.redirect("/views/login")
    const result = await productManager.findAll(req.query);
    const tmp = JSON.parse(JSON.stringify(result));    
    const sessionUser =  req.session.user  
    res.render("products", {products: tmp, user: sessionUser});
})

routerViews.get("/carts/:cid", async(req, res)=>{
    if(!req.session.user)
        return res.redirect("/views/login")
    const { cid } = req.params;
    const carts = await cartManager.findCartById(cid);        
    const cleanData = JSON.parse(JSON.stringify(carts));    
    res.render("cart", cleanData);
})


export default routerViews