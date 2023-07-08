import { Router } from "express";
import products_view_router from "./productsView.js";
import product_view_router from "./productView.js";
import cart_view_router from "./cartView.js";
import home_view_router from "./homeView.js";
import form_product_router from "./formProductView.js";
import chatbot_view_router from "./chatbotView.js";
import register_view_router from "./register.js";
import login_view_router from "./login.js";
import logout_view_router from "./logout.js";


const index_views_router = Router()

index_views_router.use('/products', products_view_router)
index_views_router.use('/products', product_view_router)
index_views_router.use('/carts', cart_view_router)
index_views_router.use('/new_product', form_product_router)
index_views_router.use('/chatbot', chatbot_view_router)
index_views_router.use('/register', register_view_router)
index_views_router.use('/signin', login_view_router)

index_views_router.use('/', home_view_router)
index_views_router.use('/logout', logout_view_router)

export default index_views_router