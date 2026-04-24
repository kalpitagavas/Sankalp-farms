import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, isBulk }) => { // <--- Added isBulk prop
  const { addToCart } = useCart();
  const isAvailable = product.inStock;

  const isKonkan = product.category?.toLowerCase().includes('konkan') || product.name.toLowerCase().includes('cashew');
  const region = isKonkan ? "Konkan" : "Gujarat";

  return (
    <motion.div 
      layout // This handles the height changes smoothly
      className="relative flex flex-col h-[520px] w-full bg-white rounded-[3rem] p-4 border border-stone-100 group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
    >
      {/* 1. Image Section */}
      <div className="relative h-[320px] w-full rounded-[2.5rem] overflow-hidden bg-stone-50">
          <img 
      src={product.image} 
      alt={product.name} 
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg
          ${isKonkan ? 'bg-emerald-600' : 'bg-orange-600'}`}>
          {region}
        </div>

        {isAvailable && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation(); // ADD ONLY, NO MODAL
              addToCart({ ...product, price: isBulk ? product.bulkPrice : product.price }); 
            }}
            className="absolute bottom-4 right-4 h-14 w-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-600 transition-colors z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.button>
        )}
      </div>

      {/* 2. Text Details */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-6">
        <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-2">
          {product.category}
        </span>
        
        <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4 truncate w-full">
          {product.name}
        </h3>

        {/* 3. Price Animation - Switching between Retail and Bulk */}
        <div className="mt-auto overflow-hidden h-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isBulk ? 'bulk' : 'retail'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black transition-colors ${isBulk ? 'text-green-600' : 'text-slate-900'}`}>
                  ₹{isBulk ? product.bulkPrice : product.price}
                </span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">/ {product.unit}</span>
              </div>
              {isBulk && (
                <span className="text-[8px] font-black text-green-500 uppercase tracking-widest mt-1">Village Wholesale Rate</span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;