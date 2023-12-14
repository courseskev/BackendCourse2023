import { Router } from 'express'
import { usersManager } from '../dao/managers/usersManager.js'
import { hashData, compareData } from '../utils.js'
import passport from 'passport'
import { generateToken } from '../utils.js'

const sessionRouter = Router()


sessionRouter.post("/signup2", async (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body
    if (!first_name || !last_name || !email || !password || !password2)
        return res.status(400).json({ message: "All fields are mandatory" })
    if (password !== password2)
        return res.status(400).json({ message: "Password doesn't match" })
    try {
        const passwordHashed = await hashData(password)
        const result = await usersManager.createOne({...req.body, password : passwordHashed})
        //res.status(201).json({message: "user created", user: result})
        console.log("User created:", result);
        return res.redirect("/views/login")
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
})

sessionRouter.post("/login2", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: "All fields are mandatory" })
    try {
        const result = await usersManager.findByEmail(email)
        if (!result)
            return res.redirect("/views/signup")


        const isPasswordvalid = await compareData(password, result.password)
        if (!isPasswordvalid) {
            res.render('login', { error: 'Password is incorrect' });
        }
        else {
            const sessionInfo =
                email === "adminCoder@coder.com" && password === "adminCod3r123"
                    ? { email, name: result.first_name+result.last_name, isAdmin: true }
                    : { email, name: result.first_name+result.last_name, isAdmin: false };
            req.session.user = sessionInfo            
            res.redirect("/views/products")
        }

    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
})

sessionRouter.post("/forgotPassword", async (req, res) => {
    const { email, password, password2 } = req.body
    if (!email || !password || !password2)
        return res.status(400).json({ message: "All fields are mandatory" })
    if (password !== password2)
        return res.status(400).json({ message: "Password doesn't match" })
    try {
        const passwordHashed = await hashData(password)
        const user = await usersManager.findByEmail(email)
        let result = "";
        if (user) {
            result = await usersManager.updateOne(user._id, { password: passwordHashed })
            console.log("User updated:", result);
            return res.redirect("/views/login")
        }
        else {
            result = "Not user found"
            console.log("Result: ", result);
        }
        return res.redirect("/views/signup")
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
})

sessionRouter.get("/logout", async (req, res) => {
    const githubUser =  await usersManager.findByEmail("temporalGithub@mail.com") 
    const googleUser =  await usersManager.findByEmail("temporalGoogle@mail.com") 
    if (githubUser) await usersManager.deleteOne(githubUser.id)
    if (googleUser) await usersManager.deleteOne(googleUser.id)
    req.session.destroy(() => {        
        res.redirect("/views/login")
    })
})

sessionRouter.get("/current", async(req, res)=>{
    if(req.session.passport){
        res.send(req.user)
        console.log("REQUEST:", req);
        //console.log(req.session);
    }
    console.log("No sessoin found");
})

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