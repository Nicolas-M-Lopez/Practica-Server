import { Router } from "express";
import User from "../../models/user.model.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import login_validator from "../../middlewares/login_validator.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_password from "../../middlewares/is_valid_password.js";
import passport from "passport";

const auth_router = Router()

auth_router.post('/register', validator, pass_is_8, create_hash, passport.authenticate(
    'register',
    { failureRedirect: '/api/auth/fail-register' } //objeto de configuracion de la ruta de redireccionamiento en caso de error
    ), 
    (req,res) => res.status(201).redirect('http://localhost:8080/')  
)

auth_router.get('/fail-register', (req,res)=> res.status(400).json({
    success: false,
    message: 'error auth'
}))

auth_router.post('/login', login_validator, pass_is_8, passport.authenticate('/signin', {failureRedirect: '/api/auth/fail-signin'}), is_valid_password, 
(req,res,next)=>{
    try {
        const {email} = req.body
            req.session.email = email
            req.session.role = req.user.role
            return res.status(200).json({
                success: true,
                message: 'user signed in'
            })
    } catch (error) {
        next(error)
    }
})


auth_router.post('/signout', async(req,res,next)=>{
    try {
        const { email } = req.body
        console.log(email)
        console.log(req.session.email)
        if (!req.session.email || email !== req.session.email) {
          return res.status(401).json({
            success: false,
            message: 'Invalid or mismatched email',
          });
        }
            req.session.destroy((err) => {
              return res.status(200).json({
                success: true,
                message: 'User signed out',
              })
            })
 } catch (error) {
        next(error)
    }
})
export default auth_router