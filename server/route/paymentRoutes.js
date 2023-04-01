const express = require("express");

const { order, verify } = require('../controllers/paymentController');


const router = express.Router();

router.post("/order", order);
router.post("/verify", verify);


module.exports = router;