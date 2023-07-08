import { hashSync, genSaltSync } from "bcrypt";

export default function(req,res,next){
    const {password} = req.body // Desestructurando las password del body
    const hashPassword = hashSync(
        password, //Que quiero hashear
        genSaltSync() //Nivel de proteccion (por default esta en 10)
    )
    req.body.password = hashPassword
    return next()
}