import { Router } from "express";
import Product from "../../models/product.model.js";


const product_router = Router ()

product_router.get('/', async(req,res,next)=>{
    try{ 
        let products = await Product.find()
        if(products.length > 0){
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
        console.log("entre al route product get id")
        let parametros = req.params
        let id = parametros.pid
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
        console.log("entre al route product post")
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
        console.log("entre al route product put")
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
        console.log("entre al route product delete")
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