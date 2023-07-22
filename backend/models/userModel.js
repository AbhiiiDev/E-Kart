const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt= require('bcryptjs');
const jwt=require("jsonwebtoken")

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

});
// event to encrypt password before schema saves:pre()
userSchema.pre("save",async function(next){

    //if password not modified:when profile updated except password:
if(!this.isModified("password")){
    next()
}

    this.password= await bcrypt.hash(this.password,10) //10:salt length:to generate
})
//JWT Token

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
}
//compare password

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
      
module.exports=mongoose.model("User",userSchema);