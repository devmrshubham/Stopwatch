const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,

        },
        shipping: {
            type: Boolean

        },
    },
    { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product