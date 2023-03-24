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
        });
    } catch (error) {
        console.log(error);
    }
}


exports.verify = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.KEY_SECRET)
            .update(body)
            .digest('hex');
    
        if (expectedSignature === razorpay_signature) {
            res.status(200).json({
                message: 'Sign Validation Success',
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
        } else {
            res.status(500).json({message: 'Sign Invalid' });
        }
    } catch (error) {
        console.log(error);
    }
};



