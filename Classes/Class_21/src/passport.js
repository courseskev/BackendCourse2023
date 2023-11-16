import passport from "passport";
import {usersManager} from "./dao/managers/usersManager.js"
import { Strategy as localStrategy } from "passport-local";
import {hashData, compareData} from './utils.js'

passport.use("signup", new localStrategy({passReqToCallback:true, usernameField: "email"},async(req, email, password, done)=>{
    const { first_name, last_name, password2 } = req.body
    if (!first_name || !last_name || !email || !password || !password2)
        return done(null, false)
    if (password !== password2)
        return done(null, false)
    try {
        const passwordHashed = await hashData(password)
        const result = await usersManager.createOne({...req.body, password : passwordHashed})
        done(null, result)
    } catch (err) {
        done(err)
    }
}))

passport.use("login", new localStrategy({usernameField: "email"}, async (email, password, done) => {
    
    if (!email || !password)
        return done(null, false)
    try {
        const result = await usersManager.findByEmail(email)
        if (!result)
            return done(null, false)


        const isPasswordvalid = await compareData(password, result.password)
        console.log("isPasswordValid: ", isPasswordvalid);
        if (!isPasswordvalid) {
            return done(null, false)
        }
        
        done(null, result)
        

    } catch (err) {
        done(err)
    }
}))




passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await usersManager.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})