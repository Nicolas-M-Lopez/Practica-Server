import { Router } from "express";
import authorization from "../../middlewares/authorization.js";

const form_product_router = Router()

form_product_router.get('/',authorization,async (req,res,next) => {
    try {
        return res.render('formProduct', {
            title: "Formulario Products"
        })
    } catch (error) {
        next(error)
    }
})

export default form_product_router