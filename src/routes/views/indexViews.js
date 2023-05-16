import { Router } from "express";
import products_view_router from "./productsView.js";
import product_view_router from "./productView.js";
import cart_view_router from "./cartView.js";
import home_view_router from "./homeView.js";
import form_product_router from "./formProductView.js";
import chatbot_view_router from "./chatbotView.js";


const index_views_router = Router()

index_views_router.use('/products', products_view_router)
index_views_router.use('/products', product_view_router)
index_views_router.use('/carts', cart_view_router)
index_views_router.use('/new_product', form_product_router)
index_views_router.use('/', home_view_router)
index_views_router.use('/chatbot', chatbot_view_router)

export default index_views_router