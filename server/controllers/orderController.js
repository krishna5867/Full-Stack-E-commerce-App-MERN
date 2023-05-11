const Order = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            total,
            grandtotal,
            shippingcharge,
            orderstatus,
        } = req.body;

        if (!(orderItems || shippingAddress || total || shippingcharge || orderstatus)) {
            throw new Error("All field required for placinfg order")
        } else {
            const order = await Order.create({
                orderItems,
                shippingAddress,
                total,
                shippingcharge,
                orderstatus,
                grandtotal,
                user: req.userId
            })
            res.status(201).json({
                success: true,
                message: "Order Placed successfully",
                order,
            })
        }
    } catch (error) {
        console.log(error);
    }
}
//single order
exports.getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user", "name email");
        res.status(200).json({
            success: true,
            message: "Order details",
            order
        })
    } catch (error) {
        console.log(error);
    }
}

//loggedinuser order
exports.getLoggedInOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        const order = await Order.find({ user: userId }).populate("orderItems");
        // console.log(order,57);
        res.status(200).json({
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting the orders",
        });
    }
};

exports.adminGetAllOrders = async (req, res) => {
    try {
        const order = await Order.find().populate("user", "name");
        res.status(200).json({
            order
        })
    } catch (error) {
        console.log(error);
    }
}

//updateOrderStatus
exports.adminUpdateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate({ _id: orderId }, { orderStatus }, { new: true });
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order
        })
    } catch (error) {
        console.log(error.message);
    }
}



