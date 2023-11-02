import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import usersRouter from "./routes/users.router.js"
import productRouter from "./routes/products.router.js"
import './db/configDB.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/views')
app.set('view engine', 'handlebars') //motor de plantilla

app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)
app.use('/', viewsRouter)

app.listen(8080, ()=>{
    console.log('Listenning 8080');
})