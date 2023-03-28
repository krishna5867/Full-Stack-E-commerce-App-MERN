const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: String,
    price: Number,
    stock: Number,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    comments:[{
        comment:String,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User"
        }
    }],
    createdAt: {
        type: Date,
        default: Date(),
    },
    updatedAt: {
        type: Date,
        default: Date(),
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);
