import "dotenv/config.js"
import express from "express";
import error_handler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";
import index_router from "./routes/index.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import logger from "morgan"
import { connect } from 'mongoose'




const server = express()



server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/views')

server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(logger("dev"))

server.use('/', index_router)
server.use(error_handler)
server.use(not_found_handler)


 //database (link de la database)
 connect('mongodb+srv://nicolas:nicolas1@clusterpersonal.79mepts.mongodb.net/commerce')
    .then(()=>console.log('database connected'))
    .catch(err => console.log(err))
export default server