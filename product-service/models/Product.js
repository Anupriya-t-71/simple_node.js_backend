const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'], 
        trim: true 
    },
    description: {
        type: String,
        required: false 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: 0 
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;