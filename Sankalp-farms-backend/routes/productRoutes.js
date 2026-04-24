const express = require('express');
const router = express.Router();
const { getProduct, createProduct,getProductById } = require('../controllers/productController');

router.get('/', getProduct); 
router.post('/createProduct', createProduct); 
router.get('/:id', getProductById);
module.exports = router;