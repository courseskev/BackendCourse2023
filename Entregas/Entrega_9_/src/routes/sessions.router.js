import { Router } from 'express'
import passport from 'passport'
import sessionController from '../controllers/session.controller.js'

const sessionRouter = Router()


sessionRouter.post("/forgotPassword", sessionController.forgotPassword)

sessionRouter.get("/logout", sessionController.logout)

sessionRouter.get("/current", sessionController.request)

/*PASSPORT-LOCAL STARTS*/
sessionRouter.post("/signup", passport.authenticate("signup"), (req, res) => {
    res.redirect("/views/login")
})

sessionRouter.post("/login", passport.authenticate("login"), (req, res) => {
    //const token = generateToken(req.user)
    //res.cookie("token", token, {maxAge: 60000, httpOnly: true})
    res.redirect("/views/products")
})
/*PASSPORT-LOCAL ENDS*/


/*PASSPORT-GITHUB STARTS*/

sessionRouter.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get("/callback", passport.authenticate("github"), (req, res) => {
    res.redirect("/views/products")
});

/*PASSPORT-GITHUB ENDS*/


/*PASSPORT-GOOGLE STARTS*/

sessionRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile","email"] })
);

sessionRouter.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/views/products")
});

/*PASSPORT-GOOGLE ENDS*/


export default sessionRouter