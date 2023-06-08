import { Router } from "express";
import cart_router from "./cartRoute.mongo.js";
import product_router from "./productRoute.mongo.js";

const index_api_router = Router()

index_api_router.use('/products', product_router)
index_api_router.use('/carts', cart_router)

export default index_api_router 