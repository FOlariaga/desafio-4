import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import config from "./config.js";
import viewsRouters from "./routes/viewsRouters.js";
import productsRouters from "./routes/productsRouters.js";
import cartsRouters from "./routes/cartsRouters.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${config.DIRNAME}/views`)
app.set('view engine', 'handlebars')

app.use("/", viewsRouters)
app.use("/api/products", productsRouters)
app.use("/api/carts", cartsRouters)

app.use('/static', express.static(`${config.DIRNAME}/public`));

const httpServer = app.listen(config.PORT, () => {
    console.log(`app iniciada en el puerto ${config.PORT}`)
})

const socketServer = new Server(httpServer)
app.set("socketServer", socketServer)