import { Router } from "express";

const home_view_router = Router()

home_view_router.get('/', async(req,res,next) => {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/6480e25e369065f0073640e0`)
        const data = await response.json()
        return res.render('home', {})
    } catch (error) {
      next(error)  
    }
})

export default home_view_router