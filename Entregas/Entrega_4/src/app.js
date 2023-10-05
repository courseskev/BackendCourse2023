import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js'
import {__dirname} from './utils.js'
import { engine } from 'express-handlebars'
import {Server} from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

/*ROUTES*/
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)


const httpserver = app.listen(8080, ()=>{
    console.log("Starting server: Listenning 8080 port");
})

const socketServer = new Server(httpserver)

socketServer.on("connection", (socket)=>{    
    console.log(`Cliente conectado:  ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`Cliente desconectado: ${socket.id}`);
    })
})