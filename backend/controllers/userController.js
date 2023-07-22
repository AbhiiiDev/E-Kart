const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser=catchAsyncError(async(req,res,next)=>{

    const {name,email, password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
           public_id:"this is sample id ",
           url:"this is sample url" 
        }
    })
    sendToken(user,200,res);
})

//login user

exports.loginUser=catchAsyncError(async(req,res,next)=>{
const {email,password}=req.body;

//checking if entered both email or password

if(!email || !password){
    return next(new ErrorHandler("please enter email and password",400));
}

const user=await User.findOne({email}).select("+password");

if(!user){
    return next(new ErrorHandler("Invalid email or password",400))

}
const isPasswordMatch=user.comparePassword(password);

if(!isPasswordMatch){
    return next(new ErrorHandler("Invalid email or password",401))
}
sendToken(user,200,res);

})
