import { Router } from "express";

const home_view_router = Router()

home_view_router.get('/', async(req,res,next) => {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/${1}`)
        const data = await response.json()
        return res.render('home', {
            cart: data.carrito.productos.length,
        })
    } catch (error) {
      next(error)  
    }
})

export default home_view_router