const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Register a usera
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
const isPasswordMatch=await user.comparePassword(password);

if(!isPasswordMatch){
    return next(new ErrorHandler("Invalid email or password",401))
}
sendToken(user,200,res);

})


//logOut User
exports.logout=catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

//forgot password
exports.forgotPassword=catchAsyncErrors(async(req,res)=>{
    const user= await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHandler('User not found',404));
    }

    //Get Resetpassword token
    const resetToken=user.getResetToken();

    //saving userResetpassword field of user entered
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message=`Your password reset token is:- \n\n${resetPasswordUrl} \n\nIf you have not requested this email then,ignore it`;

    try {
        
        await sendEmail({
email:user.email,
subject:`E-commerce password Recovery`,
message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })

    } catch (error) {
        user.resetPasswordTokens=undefined;
        user.resetPasswordExpire=undefined;

            await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));

    }


})