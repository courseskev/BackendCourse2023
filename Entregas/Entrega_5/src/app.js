import express from "express";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import { messagesManager } from './dao/managers/messagesManager.js'
import { engine } from "express-handlebars"
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
//db connection
import './dao/db/configDB.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter)

const PORT = 8080
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
        const result = await messagesManager.createOne(info);
    })
})
