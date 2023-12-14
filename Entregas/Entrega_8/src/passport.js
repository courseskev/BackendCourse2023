import passport from "passport";
import { usersManager } from "./dao/managers/usersManager.js"
import { Strategy as localStrategy } from "passport-local";
import { Strategy as githubStrategy } from "passport-github2";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { hashData, compareData } from './utils.js'

const SECRETJWT = "jwtSecret"

function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}


/*Local strategy starts*/
passport.use("signup", new localStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
    const { first_name, last_name, password2 } = req.body
    if (!first_name || !last_name || !email || !password || !password2)
        return done(null, false)
    if (password !== password2)
        return done(null, false)
    try {
        const passwordHashed = await hashData(password)
        let roleAssined = 'STANDARD'
        if (email === 'adminCoder@coder.com')
            roleAssined = 'ADMIN'
        const result = await usersManager.createOne({ ...req.body, password: passwordHashed, role: roleAssined })
        console.log("usuarioCreado", result);
        done(null, result)
    } catch (err) {
        done(err)
    }
}))

passport.use("login", new localStrategy({ usernameField: "email" }, async (email, password, done) => {

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
/*Local strategy ends*/

/*GitHub strategy starts*/
passport.use("github", new githubStrategy({
    clientID: "Iv1.c54f3fc15aac900b",
    clientSecret: "077242d67cfa27e95ed2181ef7006a4def26fbad",
    callbackURL: "http://localhost:8080/api/sessions/callback",
    scope: ["user:email"],
}, async (accessToken, refreshToken, profile, done) => {
    try {

        const userDB = await usersManager.findByEmail(profile.emails[0].value);

        // if userDB isn't null then login is the path to follow. Otherwise, go to signup
        if (userDB) {
            if (userDB.auth === 'GITHUB') {
                return done(null, userDB);
            } else {
                return done(null, false);
            }
        }
        // signup: so userDB doesn't exist in DB.
        const randomPassword = generateRandomPassword(10);
        const infoUser = {
            first_name: profile._json.name ? profile._json.name.split(" ")[0] : profile.username,
            last_name: profile._json.name ? profile._json.name.split(" ")[1] : " ",
            email: profile ? profile.emails[0].value : "temporalGithub@mail.com",
            password: randomPassword,
            auth: 'GITHUB',
        };
        console.log(infoUser);
        const createdUser = await usersManager.createOne(infoUser);
        done(null, createdUser);
    } catch (error) {
        done(error);
    }
}
))
/*GitHub strategy ends*/

/*Google strategy starts*/
passport.use("google", new googleStrategy({
    clientID: "599805057598-0hrld41dtjioj116tmp1l96vlktg5itv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/api/sessions/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("PROFILE", profile);
        console.log("PROFILE json", profile._json);
        const userDB = await usersManager.findByEmail(profile._json.email);
        console.log("userDB", userDB);
        // if userDB isn't null then login is the path to follow. Otherwise, go to signup
        if (userDB) {
            if (userDB.auth === 'GOOGLE') {
                return done(null, userDB);
            } else {
                return done(null, false);
            }
        }
        // signup: so userDB doesn't exist in DB.
        const randomPassword = generateRandomPassword(10);
        const infoUser = {
            first_name: profile._json.given_name ? profile._json.given_name : profile._json.name,
            last_name: profile._json.family_name ? profile._json.family_name : " ",
            email: profile._json.email ? profile._json.email : "temporalGoogle@mail.com",
            password: randomPassword,
            auth: 'GOOGLE',
        };

        const createdUser = await usersManager.createOne(infoUser);
        done(null, createdUser);
    } catch (error) {
        done(error);
    }
}
))
/*Google strategy ends*/


/*JWT strategy starts*/
const fromCookies = (req) => {
    return req.cookies.token;
}
passport.use('jwt', new jwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]), secretOrKey: SECRETJWT },
    (jwt_payload, done) => { done(null, jwt_payload) }
    ))

/*JWT strategy ends*/



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})