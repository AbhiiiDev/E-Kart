const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const jwt=require("jsonwebtoken");
const User=require('../models/userModel')

exports.isAutheticatedUser=catchAsyncErrors(async(req,res,next)=>{

const {token}=req.cookies;

if(!token){
    return next(new ErrorHandler("Please login first to access resources",401));

}

const decodedData=jwt.verify(token,process.env.JWT_SECRET);



   req.user=await User.findById(decodedData.id);
   //req.user so that we can access this user all time until logout during session

   next();

})