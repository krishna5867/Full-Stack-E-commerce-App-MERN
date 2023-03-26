const mongoose = require("mongoose");


const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                },
            },
        ],
        shippingAddress: {
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            district: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
                required: true,
            },
        },
        total: Number,
        shippingcharge: Number,
        orderStatus: {
            type: String,
            default: 'Not Process',
            enum : ["Not Process","Processing", "Shipped", "Delivered", "Cancel"]
        },
        isDelivered: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);

