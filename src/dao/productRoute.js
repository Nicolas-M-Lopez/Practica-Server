import { Router } from "express";
//import product from "../../managers/ProductManager.js";

const product_router = Router ()

product_router.get('/', async(req,res,next)=>{
    try{ 
        console.log("entre al route product get")
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
        console.log("entre al route product get id")
        let parametros = req.params
        let id = Number(parametros.pid)
        let one = product.getProductById(id)
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
    let response = await product.addProduct(req.body)
    if (response===201) {
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
        console.log("entre al route product delete")
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