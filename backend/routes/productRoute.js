const express=require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router=express.Router();


//creating route : api.method(function of controller)

//route to get all products
router.route("/products").get(getAllProducts);
//route to create new product
router.route("/product/new").post(createProduct);
//route to update product
router.route("/product/:id").put(updateProduct);
//route to delete product
router.route("/product/:id").delete(deleteProduct);

module.exports=router