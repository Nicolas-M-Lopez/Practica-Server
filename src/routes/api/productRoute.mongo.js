import { Router } from "express";
import Product from "../../models/product.model.js";


const product_router = Router ()

product_router.get('/', async(req,res,next)=>{
    try{ 
        const titleRegex = new RegExp(req.query.title, 'i');
        let page = 1
        let limit = 6
        if (req.query.page > 0) { page = req.query.page }
        if (req.query.limit > 0) { limit = req.query.limit }
        let products = await Product.paginate({title: titleRegex}, {limit, page})
        if(products.totalDocs > 0){
            return res.json({ status:200,products })
        } else {
            let message = 'not found'
            return res.json({ status:404,message })
        }
    } catch(error){
        next(error) 
    }
})

product_router.get('/:pid', async(req,res,next)=>{
    try{
        let parametros = req.params
        let id = parametros.pid
        console.log(id)
        let one = await Product.findById(id)
        if(one){
            return res.json({ status:200,one })
        } 
            let message = 'not found'
            return res.json({ status:404,message })
           
        } catch(error){
            next(error)
        }
    })

product_router.post('/', async (req,res,next)=>{
    try{
    let response = await Product.create(req.body)
    if (response) {
        return res.redirect('http://localhost:8080/products')
    }
    return res.json({ status:400,message:'not created'})
 } catch(error){
    next(error)
 }
})

product_router.put('/:pid', async(req,res,next) => {
    try{
        let idParam = req.params
        let id = idParam.pid
        let response = await Product.findByIdAndUpdate(id, req.body, {new:true})
        console.log(response)
        if (response) {
            return res.json({ status:200,message:'product updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error){
        next(error)
    }
})

product_router.delete('/:pid', async(req,res,next) => {
    try{
        let idParam = req.params
        let id = idParam.pid
        let response = await Product.findByIdAndDelete(id)
        if (response) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error){
        next(error)
    }
})

export default product_router