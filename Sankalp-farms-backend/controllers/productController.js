const Product = require('../models/productModel');

// @desc    Create a new product
// @route   POST /api/product
const createProduct = async (req, res) => {
    try {
        // 1. Check if product already exists
        const productExists = await Product.findOne({ name: req.body.name });
        if (productExists) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        // 2. Prepare data (Converting strings from FormData to correct Types)
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            MRP: Number(req.body.MRP),
            unit: req.body.unit || 'kg',
            category: req.body.category,
            origin: req.body.origin,
            countInStock: Number(req.body.countInStock) || 0,
            isSeasonal: req.body.isSeasonal === 'true', 
            harvestMonth: req.body.harvestMonth,
            image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
            // Use req.user._id if using protect middleware, otherwise req.body.adminId
            admin: req.user ? req.user._id : req.body.adminId 
        };

        const newProduct = await Product.create(productData);
        res.status(201).json(newProduct); 
    } catch (err) {
        console.error("Save Error:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all products
// @route   GET /api/product
const getProduct = async (req, res) => {
    try {
        // Fetch products and sort by newest first
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" }); 
    }
};

// @desc    Get single product by ID
// @route   GET /api/product/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        // Handle invalid MongoDB IDs
        res.status(400).json({ message: "Invalid Product ID format" });
    }
};

module.exports = { getProduct, createProduct, getProductById };