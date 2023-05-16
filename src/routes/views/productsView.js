import { Router } from "express";


const products_view_router = Router()

products_view_router.get('/', async(req,res,next) => {

    try{
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()
        const response_cart = await fetch(`http://localhost:8080/api/carts/${1}`)
        const data_cart = await response_cart.json()
        return res.render(
            'products',
            {
                products: data.products,
                title: "productos",
                cart: data_cart.carrito.productos.length
            }
            )
    } catch(error){
        next(error)
    }
})

export default products_view_router