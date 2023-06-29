import { compareSync } from "bcrypt";
import User from "../models/user.model.js";

export default async function(req,res,next){
    /* let user = await User.findOne({email: req.body.email}) */
        let verified = compareSync(
        req.body.password,  //Lo que envia el cliente
        req.user.password //Lo que esta guardado en mongo
        )
        if(verified){
            return next()
         } 
       return res.status(401).Json({
            success: false,
            message:'auth error'
        })
    }  
