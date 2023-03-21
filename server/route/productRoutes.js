const express = require("express");
const{ auth, customizeRole } = require('../middleware/auth');

const {
    home,
    getProducts,
    getProduct,
    adminAddProduct,
    adminEditProduct,
    adminDeleteProduct,
    searchProduct,
    filterProducts
} = require("../controllers/productController");

const router = express.Router();

router.get("/", home);
router.get("/getProducts", getProducts);
router.get("/getproduct/:id", getProduct);
router.get("/search", searchProduct);
router.get("/filter", filterProducts);


//admin routes
router.post("/admin/addproduct",auth, customizeRole('admin'), adminAddProduct);
router.put("/admin/editproduct/:id", auth, customizeRole('admin'), adminEditProduct);
router.delete("/admin/deleteproduct/:id", auth, customizeRole('admin'), adminDeleteProduct);


module.exports = router;