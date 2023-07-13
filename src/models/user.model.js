import { Schema, model } from "mongoose";

const collection = 'users'
const schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String},
    email: { type: String, required: true, index: true, unique: true },
    age: { type: Number },
    role: {type: String, default: 'user'},
    password: { type: String, required:true },
    cart: {type: String}
})

const User = model(collection,schema)
export default User