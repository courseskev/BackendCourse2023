import productService from "../services/product.service.js";
import cartService from "../services/cart.service.js";

class ViewsController{
    async login(req,res){        
        if(req.session.passport)
            return res.redirect("/views/products")
        res.render("login");
    }

    async signup(req,res){
        if(req.session.passport){
            req.session.destroy(() => {
                res.redirect("/views/signup")
            })
        }
            
        res.render("signup");
    }

    async forgotPassword(req,res){
        if(req.session.passport)
            return res.redirect("/views/products")
        res.render("forgotPassword");
    }

    async chat(req,res){
        if(!req.session.passport)
            return res.redirect("/views/login")
        res.render("chat");
    }

    async products(req,res){
        if(!req.session.passport)
            return res.redirect("/views/login")

        const result = await productService.findAllProducts(req.query);
        const tmp = JSON.parse(JSON.stringify(result));        
        const sessionUser =  JSON.parse(JSON.stringify(req.user));  
        //console.log("SessonUser:",sessionUser);
        sessionUser.isAdmin = sessionUser.role === 'ADMIN';    
        
        if(!sessionUser.isAdmin){
            const idCart = sessionUser.cart[0]._id;            
            tmp.docs.cart = idCart;
            res.render("products", {products: tmp, user: sessionUser, idCart: idCart});
        }else{
            const query = req.query;
            //console.log("query", query);
            if(query==true)
                res.render("admin", {user: sessionUser,products: tmp, added: query, layout: 'main2'});
            else
                res.render("admin", {user: sessionUser,products: tmp, layout: 'main2'});
        }
        
    }

    async carts(req,res){
        if(!req.isAuthenticated)
            return res.redirect("/views/login")
        const { cid } = req.params;
        const cart = await cartService.findCartById(cid);        
        const dataTransformed = JSON.parse(JSON.stringify(cart));    
        res.render("cart", dataTransformed);
    }
}

const viewsController = new ViewsController();

export default viewsController;