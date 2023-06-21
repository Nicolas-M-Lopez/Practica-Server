import { model,Schema,Types } from 'mongoose'
let collection = 'carts'
let schema = new Schema({
    productos: [{
        productId: {type:Types.ObjectId,required:true,ref:'products' },
        quantity: {type: Number, required:true}
    }]
       
})


let Cart = model(collection,schema)
export default Cart