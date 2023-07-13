import { Router } from "express";
import User from "../../models/user.model.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import login_validator from "../../middlewares/login_validator.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_password from "../../middlewares/is_valid_password.js";
import jwt from 'jsonwebtoken'
import passport from "passport";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";


const auth_router = Router()

auth_router.post('/register', validator, pass_is_8, create_hash, passport.authenticate(
    'register',
    { failureRedirect: '/api/auth/fail-register' } //objeto de configuracion de la ruta de redireccionamiento en caso de error
    ), 
    (req,res) => res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
    })  
)

auth_router.get('/fail-register', (req,res)=> res.status(400).json({
    success: false,
    message: 'Error al registrar el usuario'
}))


auth_router.get('/github', passport.authenticate('github', {scope: ['user:email']}), (req,res) => {})

auth_router.get('/github/callback',passport.authenticate('github', {failureRedirect: '/api/auth/fail-register-github'}), (req,res)=> {
    req.session.email = req.user
    return res.redirect('/')
})

auth_router.get('/fail-register-github', (req,res) => res.status(403).json({
    success: false,
    message: 'No Auth'
}))

auth_router.post('/signin', login_validator, pass_is_8, passport.authenticate('signin', {failureRedirect: '/api/auth/fail-signin'}), is_valid_password,
    (req,res)=> {
        let user = {
            email: req.body.email,
            role: 'user'
        }
        let token = jwt.sign(user, process.env.SECRET, { expiresIn:60*60*24 })
        console.log(token)
        res.send({token})
})                 

auth_router.get('/fail-signin', (req,res)=> res.status(400).json({
    success: false,
    message: 'error sign in'
}))

auth_router.post('/signout', passport_call('jwt', {session:false}),(req,res)=>{
                return res.status(200).clearCookie('token').json({
                success: true,
                message: 'user signed out!'
            })

        })
          
 auth_router.get('/current',passport_call('jwt'),authorizationJwt('user'), (req, res) => {
    res.json({ message: 'Correcto' });
 });
          

export default auth_router