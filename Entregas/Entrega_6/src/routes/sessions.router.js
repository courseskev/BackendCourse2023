import { Router } from 'express'
import { usersManager } from '../dao/managers/usersManager.js'

const sessionRouter = Router()

sessionRouter.post("/signup", async (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body
    if (!first_name || !last_name || !email || !password || !password2)
        return res.status(400).json({ message: "All fields are mandatory" })
    if (password !== password2)
        return res.status(400).json({ message: "Password doesn't match" })
    try {
        const result = await usersManager.createOne(req.body)
        //res.status(201).json({message: "user created", user: result})
        console.log("User created:", result);
        return res.redirect("/views/login")
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
})

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: "All fields are mandatory" })
    try {
        const result = await usersManager.findByEmail(email)
        if (!result)
            return res.redirect("/views/signup")


        const isPasswordvalid = password === result.password
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

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/views/login")
    })
})

export default sessionRouter