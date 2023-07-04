import express from "express";
import "dotenv/config.js"
import morgan from "morgan"
import error_handler from "./middlewares/error_handler.js";
import not_found_handler from "./middlewares/not_found_handler.js";
import index_router from "./routes/index.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initialazePassport from './config/passport_local.js'


const server = express()


server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/views')

server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 7 * 24 * 60 * 60
    })
}))
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'))
initialazePassport()
server.use(passport.initialize())
server.use(passport.session())


server.use('/', index_router)
server.use(error_handler)
server.use(not_found_handler)

 
export default server