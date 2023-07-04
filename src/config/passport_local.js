import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from 'passport-github2'
import User from "../models/user.model.js";

const {GH_CLIENT_ID,GH_CLIENT_SECRET} = process.env
const callback = "http://localhost:8080/api/auth/github/callback"

export default function initialazePassport(){
    passport.serializeUser(
        (user,done)=> done(null,user._id) //SI existe el usario guarda el id en una sesion
        )
    passport.deserializeUser(
        async(id,done)=>{
            const user = await User.findById(id)
            return done(null,user)
        }
    )
    passport.use(  // Estrategia para registrar a un usuario
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'email' }, //objeto de configuracion
            async (req,userName,password,done) => {
                try {
                    let one = await User.findOne({ email:userName })
                    if (!one) {
                        let user = await User.create(req.body)
                        return done(null,user)      //se complementa con la deserializacion para inyectar el usuario en el requerimiento
                    }
                    console.log('estoy en passport')
                    return done(null,false) //El done activa el redireccionamiento del endpoint register a fail-register
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GHStrategy(
            {clientID: GH_CLIENT_ID, clientSecret: GH_CLIENT_SECRET, callbackURL: callback},
            async(accessToken,refreshToken,profile,done) => {
                try {
                    let one = await User.findOne({email:profile._json.login})
                    if(one){
                        return done(null,one)
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: 'holas12345',
                        age: 18,
                        photo: profile._json.avatar_url
                    })
                    return done(null,user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (username,password,done) => {
                try {
                    let one = await User.findOne({ email:username })
                    if (one) {
                      return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}