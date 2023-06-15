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
        let all = await Cart.aggregate([
            { $unwind: "$productos" }, 
            { $lookup: { from: 'products', localField: 'productos.productId', foreignField: '_id', as: 'productos.product' } },
            { $sort: { "productos.product.title": 1 } } 
        ])
    
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
        let one = await Cart.findById(id).populate('productos.productId', 'title price _id')
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
        const cart = await Cart.findById(cid);

        if (cart.productos.some((p) => p.productId.toString() === dataProduct)) {
          await Cart.updateOne(
            { _id: cid, 'productos.productId': dataProduct },
            { $inc: { 'productos.$.quantity': dataUnits } }
          );
        } else {
          await Cart.updateOne(
            { _id: cid },
            { $push: { productos: { productId: dataProduct, quantity: dataUnits } } }
          );
        }
        await Product.updateOne(
            { _id: dataProduct },
            { $inc: { stock: -dataUnits } }
          );
        const updatedCart = await Cart.findById(cid);
        return res.status(200).json({
            success: true,
            response: updatedCart,
        });
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
    product.quantity -= dataUnits;
    await Product.updateOne(
        { _id: dataProduct },
        { $inc: { stock: dataUnits } }
    )
    if (product.quantity <= 0) {y
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

cart_router.get('/bills/:cid', async(req,res,next)=>{
    try {
        const cid = req.params.cid
        const cart = await Cart.findById(cid).populate('productos.productId')
        let total = 0
        for(const product of cart.productos){
            const totalUnit = product.productId.price * product.quantity

            total = total + totalUnit
        }
        return res.status(200).json({
            success:true,
            response:total
        })
    } catch (error) {
        next(error)
    }
})

export default cart_router