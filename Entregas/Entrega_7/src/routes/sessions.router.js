import { Router } from 'express'
import { usersManager } from '../dao/managers/usersManager.js'
import {hashData, compareData} from '../utils.js'
import passport from 'passport'

const sessionRouter = Router()


// sessionRouter.post("/signup", async (req, res) => {
//     const { first_name, last_name, email, password, password2 } = req.body
//     if (!first_name || !last_name || !email || !password || !password2)
//         return res.status(400).json({ message: "All fields are mandatory" })
//     if (password !== password2)
//         return res.status(400).json({ message: "Password doesn't match" })
//     try {
//         const passwordHashed = await hashData(password)
//         const result = await usersManager.createOne({...req.body, password : passwordHashed})
//         //res.status(201).json({message: "user created", user: result})
//         console.log("User created:", result);
//         return res.redirect("/views/login")
//     } catch (err) {
//         res.status(500).json({ Error: err.message })
//     }
// })

// sessionRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password)
//         return res.status(400).json({ message: "All fields are mandatory" })
//     try {
//         const result = await usersManager.findByEmail(email)
//         if (!result)
//             return res.redirect("/views/signup")


//         const isPasswordvalid = await compareData(password, result.password)
//         if (!isPasswordvalid) {
//             res.render('login', { error: 'Password is incorrect' });
//         }
//         else {
//             const sessionInfo =
//                 email === "adminCoder@coder.com" && password === "adminCod3r123"
//                     ? { email, name: result.first_name+result.last_name, isAdmin: true }
//                     : { email, name: result.first_name+result.last_name, isAdmin: false };
//             req.session.user = sessionInfo            
//             res.redirect("/views/products")
//         }

//     } catch (err) {
//         res.status(500).json({ Error: err.message })
//     }
// })

sessionRouter.post("/forgotPassword", async (req, res) => {
    const {email, password, password2 } = req.body
    if (!email || !password || !password2)
        return res.status(400).json({ message: "All fields are mandatory" })
    if (password !== password2)
        return res.status(400).json({ message: "Password doesn't match" })
    try {
        const passwordHashed = await hashData(password)
        const user = await usersManager.findByEmail(email)
        let result = "";
        if(user){
            result = await usersManager.updateOne(user._id, {password : passwordHashed})
            console.log("User updated:", result);
            return res.redirect("/views/login")
        }
        else{
            result = "Not user found"
            console.log("Result: ", result);
        }        
        return res.redirect("/views/signup")
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/views/login")
    })
})



/*PASSPORT-LOCAL STARTS*/ 
sessionRouter.post("/signup", passport.authenticate("signup"), (req,res)=>{
    res.redirect("/views/login")
})

sessionRouter.post("/login", passport.authenticate("login"), (req,res)=>{    
    res.redirect("/views/products")
})
/*PASSPORT-LOCAL ENDS*/ 


export default sessionRouter