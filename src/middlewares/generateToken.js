import jwt from 'jsonwebtoken'

export default (req,res,next) => {
    let token = jwt.sign(
        { email:req.body.email },
        process.env.SECRET,
        { expiresIn:60*60*24 }
    )
    
    req.token = token
    return next()
}