import { Router } from "express";
import cart from "../CartManager.js";

const cart_router = Router()

cart_router.get('/', async (req,res,next)=>{
    try{
        let limit = req.query.limit ?? cart.getCarts().length
        let carts = cart.getCarts().slice(0,limit)
        if(carts.length > 0){
            return res.json({ status:200,carts })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error){
        next(error)
    }
})

cart_router.get('/:cid', async (req,res,next)=>{
    try{
        let parametros = req.params
        let id = Number(parametros.cid)
        let one = cart.getCartById(id)
        if(one){
        return res.json({ status:200, one })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error){
        next(error)
    }
})

cart_router.post('/', async (req,res,next) => {
    try{
        let response = await cart.addCart(req.body)
        if (response===201) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error){
        next(error)
    }
})

cart_router.put('/:cid/products/:pid/:units', async(req,res,next) =>{
    try{
        let cartId = Number(req.params.cid)
        let pId = Number(req.params.pid)
        let unit = Number(req.params.units)
        let response = await cart.updateCart(cartId,pId,unit)
        if (response===200) {
            return res.json({ status:200,message:'product added'})
        }
        return res.json({ status:404,message:'product no added'})
    }catch(error){
        next(error)
    }
})


cart_router.delete('/:cid/products/:pid/:units', async(req,res,next)=>{
    try{
        let cartId = Number(req.params.cid)
        let pId = Number(req.params.pid)
        let unit = Number(req.params.units)
        let response = await cart.deleteCart(cartId,pId,unit) 
        if (response===200) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'product not deleted'})
    }catch(error){
        next(error)
    }   
})

export default cart_router
