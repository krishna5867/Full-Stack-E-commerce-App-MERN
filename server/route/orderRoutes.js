const express = require("express");
const {auth,customizeRole } = require('../middleware/auth');

const {
    placeOrder,
    getOneOrder,
    getLoggedInOrder,
    adminGetAllOrders,
    adminUpdateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/placeOrder",auth, placeOrder);
router.get("/getOneOrder/:id",auth, getOneOrder);
router.get("/myOrder/:id", getLoggedInOrder);

//admin
router.get("/admin/orders",auth, customizeRole('admin'), adminGetAllOrders);
router.put("/admin/updateorder/:orderId",auth, customizeRole('admin'), adminUpdateOrder);


module.exports = router;
