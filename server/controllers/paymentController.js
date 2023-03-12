const Razorpay = require("razorpay");
const crypto = require("crypto")

exports.order = async (req, res) => {
    try {
        const amount = req.body.amount;
        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        var options = {
            amount: amount * 100,
            currency: "INR",
            // receipt: "order_rcptid_11"
            receipt: crypto.randomBytes(10).toString("hex")
        };

        instance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: "Something went wrong."
                })
            }
            res.status(200).json({ data: order })
            // console.log(order);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.verify = async (req, res) => {
    try {
        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({
                message: "Payment Verifyied Successfulluy"
            })
        } else {
            return res.status(400).json({
                message: "Invalid Payment Signture sent"
            })
        }
    } catch (error) {
        console.log(error);
    }
}