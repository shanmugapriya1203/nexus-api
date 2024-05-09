import User from "../models/User.js"
import { errorHandler } from './../utils/error.js';
import  bcrypt  from 'bcryptjs';



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

export const updateUser= async(req,res,next)=>{
if(req.user.id !== req.params.userId){
    return res.status(401).json({message:'You are not authorized to update this user'})
}
if(req.body.password){
    if(req.body.password.length <6){
        return res.status(400).json({message:'Password must be at least 6 characters long'})
    }
    req.body.password= bcrypt.hashSync(req.body.password,10)
}
if(req.body.username){
    if(req. body.username.length < 7 || req.body.username.length > 20){
        return res.status(400).json({message:'Username must be between 7 and 20 characters long'})
    }
    if(req.body.username.includes(' ')){
        return res.status(400).json({message:'Username must not contain spaces'})
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return res.status(400).json({message:'Username must only contain alphanumeric characters'})
    }
}
let updateFields;
let updateUser;
try {
    const { role,profession,experience,city,age,...updatedFields}= req.body;
    updateFields=updatedFields
    const updateUser= await User.findByIdAndUpdate(req.params.userId,{
        $set:updateFields
    },{new:true})
    const {password,...rest}= updateUser.doc;
    res.status(200).json(rest)
} catch (error) {
    next(error)
    console.log(error)
}
}