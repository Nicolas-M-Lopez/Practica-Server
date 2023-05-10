import express from "express";
import product_router from "./routes/productRoute.js";
import cart_router from "./routes/cartRoute.js";
import error_handler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";


const server = express()

const PORT = 8080
const ready = () => console.log('Server ready')

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.use('/api/products', product_router)
server.use('/api/carts', cart_router)
server.use(error_handler)
server.use(not_found_handler)

