function pass_is_8 (req,res,next) {
    const {password} = req.body
    if(password.length >= 8){
        next()
    } else{
        return res.status(400).json({
            success: false,
            message: 'password must be 8 characters or more'
        })
    }
}

export default pass_is_8