const express = require("express");
const {auth,customizeRole } = require('../middleware/auth');

const {
    placeOrder,
    getOneOrder,
    getLoggedInOrder,
    adminGetAllOrders,
    adminEditOrder,
    adminDeleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/placeOrder",auth, placeOrder);
router.get("/getOneOrder/:id",auth, getOneOrder);
router.get("/myOrder/:id", getLoggedInOrder);

//admin
router.get("/admin/orders",auth, customizeRole('admin'), adminGetAllOrders);
router.put("/admin/edit/order/:id",auth, customizeRole('admin'), adminEditOrder);
router.delete("/admin/delete/order/:id",auth, customizeRole('admin'), adminDeleteOrder);


module.exports = router;
