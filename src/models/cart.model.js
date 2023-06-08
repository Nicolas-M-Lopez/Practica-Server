import mongoose from 'mongoose';
const {Schema, model} = mongoose

let collection = 'carts'
let schema = new Schema({
    productos: [{
        productId: {type: mongoose.Schema.Types.ObjectId},
        quantity: {type: Number}
    }]
       
})


let Cart = model(collection,schema)
export default Cart