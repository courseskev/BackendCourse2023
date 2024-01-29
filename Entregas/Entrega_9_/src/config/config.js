import dotenv from "dotenv"

dotenv.config();

const obj = {
    mongoUri: process.env.MONGO_URI,
    secretSession: process.env.SECRET_SESSION,
    clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
    clientSecretGoogle: process.env.CLIENT_SECRET_GOOGLE,
    callbackGoogle: process.env.CALLBACK_GOOGLE,
    clientIdGithub: process.env.CLIENT_ID_GITHUB,
    clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
    callbackGithub: process.env.CALLBACK_GITHUB,
    charsetRandomPassword: process.env.CHARTSET_RANDOM_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL
}

export default obj;