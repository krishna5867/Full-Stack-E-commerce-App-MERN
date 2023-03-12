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
    categories : String,
    image:{
        public_id:{
            type: String
        },
        url:{
            type: String
        }
    },
    
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
