const express = require("express");

const { order, verify } = require('../controllers/paymentController');


const router = express.Router();

router.get("/order", order);
router.get("/verify", verify);


module.exports = router;