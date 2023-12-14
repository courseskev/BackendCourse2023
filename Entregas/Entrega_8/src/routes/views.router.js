import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productManager } from "../dao/managers/productManager.js";
import { cartManager } from "../dao/managers/cartManager.js";


const routerViews = Router();

routerViews.get("/login", (req, res) => {    
    if(req.session.passport)
        return res.redirect("/views/products")
    res.render("login");
});

routerViews.get("/signup", (req, res) => {
    if(req.session.passport){
        req.session.destroy(() => {
            res.redirect("/views/signup")
        })
    }
        
    res.render("signup");
});

routerViews.get("/forgotPassword", (req, res) => {
    if(req.session.passport)
        return res.redirect("/views/products")
    res.render("forgotPassword");
});

routerViews.get("/chat", (req, res) => {
    if(!req.session.passport)
        return res.redirect("/views/login")
    res.render("chat");
})

routerViews.get("/products", async(req, res)=>{     
    if(!req.session.passport)
        return res.redirect("/views/login")

    const result = await productManager.findAll(req.query);
    const tmp = JSON.parse(JSON.stringify(result));        
    const sessionUser =  JSON.parse(JSON.stringify(req.user));  
    sessionUser.isAdmin = sessionUser.role === 'ADMIN';    
    const idCart = sessionUser.cart[0];            
    tmp.docs.cart = idCart;
    console.log(tmp);
    res.render("products", {products: tmp, user: sessionUser, idCart: idCart});
    
})

routerViews.get("/carts/:cid", async(req, res)=>{
    if(!req.isAuthenticated)
        return res.redirect("/views/login")
    const { cid } = req.params;
    const carts = await cartManager.findCartById(cid);        
    const cleanData = JSON.parse(JSON.stringify(carts));    
    res.render("cart", cleanData);
})


export default routerViews