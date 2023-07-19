const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncErrors")


//create Product: Admin route
exports.createProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.create(req.body);

   res.status(201).json({
        success:true,
        product
    })
})

//controller for get all products
exports.getAllProducts=catchAsyncError(async(req,res)=>{

    const products=await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

//controller to get single product 
exports.getSingleProduct=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)
    
    if(!product){
        return next(new ErrorHandler("Product is not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
})



//controller for update products  Admin-Route
exports.updateProduct=catchAsyncError(async(req,res)=>{
    let product= await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product is not found",404))
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
useFindAndModify:false})

res.status(200).json({
    success:true,
    product
})

}
)
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product is not found",404))
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})