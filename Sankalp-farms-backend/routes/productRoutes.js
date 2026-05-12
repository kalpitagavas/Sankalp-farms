// productRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const { getProduct, createProduct, getProductById } = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// This handles GET /api/product/
router.get('/', getProduct); 

// This handles POST /api/product/  <-- Change this from '/createProduct' to just '/'
router.post('/createProduct', upload.single('image'), createProduct); 

// This handles GET /api/product/:id
router.get('/:id', getProductById);


module.exports = router;