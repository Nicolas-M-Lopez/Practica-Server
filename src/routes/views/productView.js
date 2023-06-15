import { Router } from "express";


const product_view_router = Router()

product_view_router.get('/:pid', async(req,res,next) => {

    try{ 
        let id = req.params.pid
        console.log(id)
        const response = await fetch(`http://localhost:8080/api/products/${id}`)
        const data = await response.json()
        /* const response_cart = await fetch(`http://localhost:8080/api/carts/1`)
        const data_cart = await response_cart.json() */
        return res.render(
            'product',
            {
                one: data.one,
                title: "producto",
                //cart: data_cart.carrito.productos.length
            }
            )
    } catch(error){
        next(error)
    }
})

export default product_view_router