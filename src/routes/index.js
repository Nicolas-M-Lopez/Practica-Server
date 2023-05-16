import { Router } from "express";
import index_api_router from "./api/indexApi.js";
import index_views_router from "./views/indexViews.js";


const index_router = Router()

index_router.use('/api', index_api_router)
index_router.use('/', index_views_router)



export default index_router
