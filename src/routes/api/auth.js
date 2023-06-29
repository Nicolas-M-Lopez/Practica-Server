import { Router } from "express";
import User from "../../models/user.model.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import login_validator from "../../middlewares/login_validator.js";

const auth_router = Router()

auth_router.post('/register', validator, pass_is_8, async(req,res,next)=>{
    try {
        await User.create(req.body)
        return res.status(201).redirect('http://localhost:8080/')
    } catch (error) {
        next(error)
    }
})


auth_router.post('/login', login_validator, pass_is_8, async(req,res,next)=>{
    try {
        const {email} = req.body
        const one = await User.findOne({email})
        if(one){
            req.session.email = email
            req.session.role = one.role
            return res.status(200).json({
                success: true,
                message: 'user signed in'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }
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