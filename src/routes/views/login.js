import { Router } from "express";

const login_view_router = Router()

login_view_router.get('/', async (req,res,next) => {
    try {
        return res.render('login', {
            title: "Login"
        })
    } catch (error) {
        next(error)
    }
})

export default login_view_router