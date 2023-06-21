import { Router } from "express";


const products_view_router = Router()

products_view_router.get('/', async(req,res,next) => {

    try{
        const searchQuery = req.query.title || '';
        const pageQuery = req.query.page || 1;
        console.log(searchQuery)
        const response = await fetch(`http://localhost:8080/api/products?title=${searchQuery}&page=${pageQuery}`)
        const data = await response.json()
        if (data.status === 404) {
            res.render('products', {
                error: 'Producto no encontrado',
                title: 'productos',
                searchQuery:searchQuery
            })} else{
        return res.render(
            'products',
            {
                products: data.products,
                title: "productos",
                searchQuery:searchQuery
            }
            )}
    } catch(error){
        next(error)
    }
})

export default products_view_router