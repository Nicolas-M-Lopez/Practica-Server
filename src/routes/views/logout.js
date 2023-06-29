import { Router } from "express";

const logout_view_router = Router()

logout_view_router.get('/', async (req,res,next) => {
    try {
        return res.render('logout', {
            email: req.session.email
        })
    } catch (error) {
        next(error)
    }
})

export default logout_view_router