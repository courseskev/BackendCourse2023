import express from "express";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import usersRouter from './routes/users.router.js';
import messagesRouter from './routes/messages.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from "express-handlebars"
import { __dirname } from "./utils.js";
//db connection
import './dao/db/configDB.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter)

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
})

//sockerServer
const sockerServer = new Server(httpServer);
const messages = [];

sockerServer.on('connetion', (socket) => {
    console.log(`Customer connected: ${socket.id}`);

    socket.on('newUser', (user) => {
        socket.broadcast.emit("userConnected", user);
        socket.emit('connected');
    })
    socket.on('message', info => {
        messages.push(info);
        sockerServer.emit('chat', messages)
    })
})
