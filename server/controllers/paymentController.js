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
            receipt: crypto.randomBytes(10).toString("hex")
        };

        instance.orders.create(options, function (err, order){
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Something went wrong."
                })
            }
            return res.status(200).json({ data: order })
            // console.log(order);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.verify = async (req, res) => {
    try {
        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
            .update(body.toString())
            .digest('hex');
    
        if (expectedSignature === req.body.response.razorpay_signature) {
            res.send({ code: 200, message: 'Sign Valid' });
        } else {
    
            res.send({ code: 500, message: 'Sign Invalid' });
        }
    } catch (error) {
        console.log(error);
    }
}


