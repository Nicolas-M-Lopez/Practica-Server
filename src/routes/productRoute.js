import { Router } from "express";
import product from "../ProductManager.js";

const product_router = Router ()

product_router.get('/', async(req,res,next)=>{
    try{
        let limit = req.query.limit ?? product.getProducts().length
        let products = product.getProducts().slice(0,limit)
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
        let parametros = req.params
        let id = Number(parametros.pid)
        let one = product.getProductById(id)
        if(one){
            return res.json({ status:200,one })
        } else {
            let message = 'not found'
            return res.json({ status:404,message })
            }
        } catch(error){
            next(error)
        }
    })

product_router.post('/', async (req,res,next)=>{
    try{
    let response = await product.addProduct(req.body)
    if (response===201) {
        return res.json({ status:201,message:'product created'})
    }
    return res.json({ status:400,message:'not created'})
 } catch(error){
    next(error)
 }
})

product_router.put('/:pid', async(req,res,next) => {
    try{
        let idParam = req.params
        let id = Number(idParam.pid)
        let response = await product.updateProduct(id, req.body)
        console.log(response)
        if (response===200) {
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
        let id = Number(idParam.pid)
        let response = await product.deleteProduct(id)
        if (response===200) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error){
        next(error)
    }
})

export default product_router