import express from "express";
import product from './index.js'
import cart from './cartManager.js'

const server = express()

const PORT = 8080
const ready = () => console.log('server ready')

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({extended:true}))


let one_route = '/api/products/:pid'
let one_function = (req,res) =>{
    let parametros = req.params
    console.log(parametros)
    let id = Number(parametros.pid)
    let one = product.getProductById(id)

    if(one){
        return res.send({
            success: true,
            product: one
        })
    } else {
        return res.send({
            success: false,
            product: 'Not found'
            }) 
        }
}

server.get(one_route, one_function)

let query_route = '/api/products'
let query_function = (req,res)=>{
    let limit = req.query.limit ?? product.getProducts().length
    let products = product.getProducts().slice(0,limit)
    if(products.length > 0){
    return res.send({
        success: true,
        products
        })
    } else {
        return res.send({
            success: false,
            products: 'Not found'
        })
    }
}

server.get(query_route, query_function)


let cart_route = '/api/carts'
let cart_function = (req,res)=>{
    let limit = req.query.limit ?? cart.getCarts().length
    let carts = cart.getCarts().slice(0,limit)
    if(carts.length > 0){
    return res.send({
        success: true,
        carts
        })
    } else {
        return res.send({
            success: false,
            carts: 'Not found'
        })
    }
}

server.get(cart_route, cart_function)


let cartId_route = '/api/carts/:cid'
let cartId_function = (req,res) =>{
    let parametros = req.params
    console.log(parametros)
    let id = Number(parametros.cid)
    let one = cart.getCartById(id)

    if(one){
        return res.send({
            success: true,
            cart: one
        })
    } else {
        return res.send({
            success: false,
            cart: 'Not found'
        }) 
    }
    
}

server.get(cartId_route, cartId_function)