function validator (req,res,next) {
    const {first_name,password, email} = req.body
    if(!first_name || !password || !email){
        return res.status(400).json({
            success: false,
            message: 'name,password,email are required'
        })
    } else{
        return next()
    }
}

export default validator