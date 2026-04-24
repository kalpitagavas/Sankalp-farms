const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  
  // Pricing Logic
  price: { type: Number, required: true },     
  MRP: { type: Number, required: true },      
  unit: { type: String, default: 'kg' },    
  
  // Sankalp Specifics
  category: { 
    type: String, 
    required: true,
    enum: ['Konkan Roots', 'Staples', 'Spices', 'Fruits', 'Oils'] 
  },
  origin: { 
    type: String, 
    required: true, 
    enum: ['Konkan', 'Gujarat'] 
  },
  isSeasonal: { type: Boolean, default: false },
  harvestMonth: { type: String },               // e.g., "April-May"
  
  // Inventory & Media
  image: { type: String, required: true },      // URL
  countInStock: { type: Number, required: true, default: 0 },
  
  // Admin Link
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);