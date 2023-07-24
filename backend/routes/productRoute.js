const express=require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/productController');
const { isAutheticatedUser, authenticateRoles } = require('../middleware/auth');

const router=express.Router();


//creating route : api.method(function of controller)

//route to get all products
router.route("/products").get(getAllProducts);
//route to get single product information
router.route("/product/:id").get(getSingleProduct);
//route to create new product
router.route("/product/new").post(isAutheticatedUser,authenticateRoles("admin"),createProduct);
//route to update product
router.route("/product/:id").put(isAutheticatedUser,authenticateRoles("admin"),updateProduct);
//route to delete product
router.route("/product/:id").delete(isAutheticatedUser,authenticateRoles("admin"),deleteProduct);

module.exports=router