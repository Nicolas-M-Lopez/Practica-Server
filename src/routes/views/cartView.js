import { Router } from "express";

const cart_view_router = Router()

cart_view_router.get('/:cid', async (req,res,next) => {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/${Number(req.params.cid)}`)
        const data = await response.json()
        console.log(data.carrito.productos)
        return res.render(
            'cart',
            {
                productos: data.carrito.productos,
                title: "carrito",
                cart: data.carrito.productos.length
            }
            )
    } catch (error) {
        next(error)
    }
})


export default cart_view_router