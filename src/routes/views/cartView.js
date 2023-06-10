import { Router } from "express";

const cart_view_router = Router()

cart_view_router.get('/:cid', async (req,res,next) => {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/6480e25e369065f0073640e0`)
        const data = await response.json()
        console.log(data.response.productos)
        return res.render(
            'cart',
            {
                productos: data.response.productos,
                title: "carrito",
                //cart: data.one.productos.length
            }
            )
    } catch (error) {
        next(error)
    }
})


export default cart_view_router