import express from "express";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { messagesDao } from './daos/messages.dao.js'
import { engine } from "express-handlebars"
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import './passport.js'
import passport from 'passport'
import configVar from './config/config.js'
import program from './config/commander.js'

//db connection
import './config/db.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(
    session({
        store: new MongoStore({
            mongoUrl: configVar.mongoUri
        }),
        secret: configVar.secretSession,
        cookie: {maxAge: 2000000}
    })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter)
app.use("/views", viewsRouter)


const PORT = Number(program.opts().port)


const httpServer = app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
})


//socketServer
const socketServer = new Server(httpServer);
const messages = [];

socketServer.on('connection', (socket) => {
    console.log(`Customer connected: ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`Customer disconnected: ${socket.id}`);
    })
    socket.on('newUser', (user) => {
        socket.broadcast.emit("userConnected", user);
        socket.emit('connected');
    })
    socket.on('message', async (info) => {
        messages.push(info);
        socketServer.emit('chat', messages);
        const result = await messagesDao.createOne(info);
    })
})
