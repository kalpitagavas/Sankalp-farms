const Product=require('../models/productModel')

//@route: POST '/api/products/createProduct'
const createProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const productExists = await Product.findOne({ name });
        
        if (productExists) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        const newProduct = await Product.create(req.body);
        // Send the object itself, not a string template
        res.status(201).json(newProduct); 
    } catch (err) {
        // Use 'err' (your catch variable), not 'error'
        res.status(400).json({ message: err.message });
    }
};

//@route: GET '/api/products'
const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
};

const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            res.status(400).json({message:"Product not found"})
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}
module.exports = { getProduct, createProduct,getProductById };