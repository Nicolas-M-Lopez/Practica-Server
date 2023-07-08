function validator (req,res,next) {
    const {name,password, email} = req.body
    console.log(name,password,email)
    if(!name || !password || !email){
        return res.status(400).json({
            success: false,
            message: 'name,password,email are required'
        })
    } else{
        return next()
    }
}

export default validator