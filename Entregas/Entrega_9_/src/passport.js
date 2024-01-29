import passport from "passport";
import usersDao from "./daos/users.dao.js"
import { Strategy as localStrategy } from "passport-local";
import { Strategy as githubStrategy } from "passport-github2";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { hashData, compareData } from './utils.js'
import configVar from './config/config.js'


function generateRandomPassword(length) {
    const charset = configVar.charsetRandomPassword;
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
        if (email === configVar.adminEmail)
            roleAssined = 'ADMIN'
        const result = await usersDao.createOne({ ...req.body, password: passwordHashed, role: roleAssined })
        done(null, result)
    } catch (err) {
        done(err)
    }
}))

passport.use("login", new localStrategy({ usernameField: "email" }, async (email, password, done) => {

    if (!email || !password)
        return done(null, false)
    try {
        const result = await usersDao.findByEmail(email)
        console.log("userLogin:", result);
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
    clientID: configVar.clientIdGithub,
    clientSecret: configVar.clientSecretGithub,
    callbackURL: configVar.callbackGithub,
    scope: ["user:email"],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        
        const userDB = await usersDao.findByEmail(profile.emails[0].value);

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
        const createdUser = await usersDao.createOne(infoUser);
        done(null, createdUser);
    } catch (error) {
        done(error);
    }
}
))
/*GitHub strategy ends*/

/*Google strategy starts*/
passport.use("google", new googleStrategy({
    clientID: configVar.clientIdGoogle,
    clientSecret: configVar.clientSecretGoogle,
    callbackURL: configVar.callbackGoogle,
}, async (accessToken, refreshToken, profile, done) => {
    try {        
        const userDB = await usersDao.findByEmail(profile._json.email);        
        
        // if userDB isn't null then login is the path to follow. Otherwise, go to signup
        if (userDB) {
            if (userDB.auth === 'GOOGLE') {
                return done(null, userDB);
            } else {
                return done(null, false);
            }
        }
        
        // signup: if userDB doesn't exist in DB.
        const randomPassword = generateRandomPassword(10);        
        const infoUser = {
            first_name: profile._json.given_name ? profile._json.given_name : profile._json.name,
            last_name: profile._json.family_name ? profile._json.family_name : " ",
            email: profile._json.email ? profile._json.email : "temporalGoogle@mail.com",
            password: randomPassword,
            auth: 'GOOGLE',
        };
        
        const createdUser = await usersDao.createOne(infoUser);
        done(null, createdUser);
    } catch (error) {
        done(error);
    }
}
))
/*Google strategy ends*/

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersDao.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})