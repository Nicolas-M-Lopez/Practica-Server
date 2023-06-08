import { Router } from "express";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
const cart_router = Router()

cart_router.post('/',async(req,res,next)=> {
    try {
        let one = await Cart.create({productos:[]})
        return res.status(201).json({
            succes:true,
            message: 'id= '+one._id
        })
    } catch (error) {
        next(error)
    }
})


cart_router.get('/',async(req,res,next)=> {
    try {
        let all = await Cart.find()
        return res.status(200).json({
            success:true,
            response:all
        })
    } catch (error) {
        next(error)
    }
})
cart_router.get('/:cid',async(req,res,next)=> {
    try {
        const id = req.params.cid
        let one = await Cart.findById(id)
        console.log(one.productos)
        return res.status(200).json({
            success:true,
            response:one
        })
    } catch (error) {
        next(error)
    }
})

cart_router.put('/:cid/products/:pid/:units',async(req,res,next)=> {
    try {
        const cid = req.params.cid
        const dataProduct = req.params.pid
        const dataUnits = req.params.units
        const cart = await Cart.findById(cid)
        cart.productos.push({productId: dataProduct, quantity: dataUnits})
        await cart.save();
        return res.status(200).json({
            success: true,
            response: cart
        })
    } catch (error) {
       next(error)
    }
})
cart_router.delete('/:cid/products/:pid/:units',async(req,res,next)=> {
    try {
        const cid = req.params.cid
        const dataProduct = req.params.pid
        const dataUnits = req.params.units
        const cart = await Cart.findById(cid)
        const product = cart.productos.find((product) => product.productId == dataProduct);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado en el carrito' });
    }

    // Resta la cantidad de unidades al producto
    product.quantity -= dataUnits;

    if (product.quantity <= 0) {
      // Si la cantidad es menor o igual a cero, elimina el producto del array
      cart.productos = cart.productos.filter((p) => p.productId != dataProduct);
    }
        await cart.save();
        return res.status(200).json({
            success: true,
            response: cart
        })
    } catch (error) {
       next(error)
    }
})



export default cart_router