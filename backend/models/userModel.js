const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[4,"Name should be greater than 4 characters"],
        maxLength:[30,"Name should not be greater than 30 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[7,"password should be greater than 7 characters"],
    select:false //so that do not appear on user.find()
},
avatar:{
    public_id:{
        type:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            requird:true,
        },
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordTokens:String,
    resetPasswordExpire:Date,
}
});

module.exports=mongoose.model("User",userSchema);