const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

exports.createProduct = async (req, res) => {
    console.log(`User ${req.user.userId} is creating a new product.`); 

    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};