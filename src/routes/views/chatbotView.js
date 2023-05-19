import { Router } from "express";

const chatbot_view_router = Router()

chatbot_view_router.get('/', async(req,res,next) =>{
    try {
       return res.render('chatbot',
       {
        title: "Chatbot",
        script: './public/chatbot.js'
       }
       ) 
    } catch (error) {
        next(error)
    }

})

export default chatbot_view_router
