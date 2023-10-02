import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import {__dirname} from './utils.js'

const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/public'))
//app.use(express.urlencoded({extended: true}))

/*ROUTES*/
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, ()=>{
    console.log("Starting server: Listenning 8080 port");
})