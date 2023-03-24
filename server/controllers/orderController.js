const Order = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            total,
            grandtotal,
            shippingcharge,
            orderstatus
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
                user: req.user.id
            })
            res.status(200).json({
                success: true,
                message: "Order created",
                order,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user","name email");
        res.status(200).json({
            success: true,
            message: "Order details",
            order
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getLoggedInOrder = async (req, res) => {
    try {
        const orderId = req.user_id
        const order = await Order.findById(orderId).populate("user", "name");
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting the order"
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


exports.adminEditOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id);
        console.log(order.quantity);
        order.orderItems = req.body;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated",
            order
        })
    } catch (error) {
        // console.log(error);
        console.log(error.message);
        res.send(error);
    }
}

exports.adminDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            success: true,
            message: "Item Deleted Successfully",
            order
        })
    } catch (error) {
        console.log(error);
    }
}
