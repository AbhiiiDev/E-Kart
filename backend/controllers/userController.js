const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");

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
    res.status(201).json({
        success:true,
        user
    })
})
