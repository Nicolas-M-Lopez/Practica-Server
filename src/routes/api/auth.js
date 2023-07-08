import { Router } from "express";
import User from "../../models/user.model.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import login_validator from "../../middlewares/login_validator.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_password from "../../middlewares/is_valid_password.js";
import passport from "passport";
import generateToken from "../../middlewares/generateToken.js";

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

auth_router.post('/signin', login_validator, pass_is_8, passport.authenticate('signin', {failureRedirect: '/api/auth/fail-signin'}), is_valid_password, generateToken,
    (req,res)=> {
        req.session.email = req.user.email
        req.session.role = req.user.role
        return res.status(200).json({
            success: true,
            message: 'user signed in!',
            passport: req.session.passport,
            user: req.user,
            token: req.token
        })
})

auth_router.get('/fail-signin', (req,res)=> res.status(400).json({
    success: false,
    message: 'error sign in'
}))

auth_router.post('/signout', async(req,res,next)=>{
    try {
        if (req.session.email) {
            req.session.destroy()
            return res.status(200).json({
                success: true,
                message: 'user signed out!'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'user not found!'
            })
        }
    } catch (error) {
        next(error)
    }
})
export default auth_router