import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.model.js";

export default function(){
    passport.serializeUser(
        (user,done)=> done(null,user._id) //SI existe el usario guarda el id en una sesion
        )
    passport.deserializeUser(
        async(id,done)=>{
            const user = await User.findById(id)
            return done(null,user)
        }
    )
    passport.use(
        'register',
        new Strategy(
            { passReqToCallback: true, usernameField: 'email' }, //objeto de configuracion
            async(req,username,password,done)=>{
                try {
                    let one = await User.findOne({ email:username })
                    if(!one){
                        let user = await User.create(req.body)
                        return done(null,user)      //se complementa con la deserializacion para inyectar el usuario en el requerimiento
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error,false)
                }
            }
        )
    )
}