import { Router } from "express";

const register_view_router = Router()

register_view_router.get('/', async (req,res,next) => {
    try {
        return res.render('register', {
            title: "Registro de usuarios"
        })
    } catch (error) {
        next(error)
    }
})

export default register_view_router