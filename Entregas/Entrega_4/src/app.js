import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewRouter from './routes/views.router.js'
import {__dirname} from './utils.js'
import { engine } from 'express-handlebars'

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
app.use('/api/views', viewRouter)

app.listen(8080, ()=>{
    console.log("Starting server: Listenning 8080 port");
})