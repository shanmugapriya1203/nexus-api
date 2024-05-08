import User from "../models/User.js"
import { errorHandler } from './../utils/error.js';



export const getUserById= async(req,res,next)=>{
try {
    const {id}= req.params
    const user= await User.findById(id)
    if(!user){
     return next(errorHandler(404,'User not found'))
    }
    //collect the remaining property excluding password and asign them to rest variable .. It create a new object except password
    const {password,...rest}= user._doc
    res.status(200).json(rest)
} catch (error) {
    next(error)
}
}