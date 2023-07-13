import { Router } from "express";


const form_product_router = Router()

form_product_router.get('/',async (req,res,next) => {
    try {
        return res.render('formProduct', {
            title: "Formulario Products"
        })
    } catch (error) {
        next(error)
    }
})

export default form_product_router