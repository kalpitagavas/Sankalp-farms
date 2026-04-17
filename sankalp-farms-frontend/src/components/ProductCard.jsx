import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  // Check availability based on your procurement model
  const isAvailable = product.inStock;
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={isAvailable ? { y: -10 } : {}}
      className={`bg-white rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col h-full group transition-all duration-500 
        ${!isAvailable ? 'opacity-60 grayscale-[0.3]' : 'hover:shadow-[0_20px_50px_rgba(234,88,12,0.1)]'}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-stone-100 mb-5">
        <motion.img 
          whileHover={isAvailable ? { scale: 1.1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 overflow-hidden">
          <motion.span 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="block bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-orange-700 uppercase tracking-[0.2em] shadow-sm border border-white/50"
          >
            {product.category}
          </motion.span>
        </div>

        {/* Status Overlay for Out of Season items */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
             <span className="bg-white/90 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
               Out of Season
             </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 px-2">
        <div className="flex justify-between items-start mb-2 gap-2 ">
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">
            {product.name}
          </h3>
          {isAvailable && (
            <div className="bg-green-50 px-2 py-1 rounded-md shrink-0">
               <p className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                 Save ₹{product.price - product.bulkPrice}
               </p>
            </div>
          )}
        </div>
        
        <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-2 italic">
          "{product.description}"
        </p>
        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2">
          MRP: ₹{product.MRP}
        </p>
      </div>

      {/* Footer / Pricing & Action */}
      <div className="mt-8 flex items-end justify-between px-1 pb-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Price / {product.unit}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">₹{product.price}</span>
            <span className="text-sm font-bold text-slate-300">/ {product.unit}</span>
          </div>
          <span className="text-[11px] font-bold text-green-600 uppercase tracking-tighter bg-green-50 w-fit px-2 rounded-sm mt-1">
             Bulk: ₹{product.bulkPrice}
          </span>
        </div>
        
        <motion.button 
          disabled={!isAvailable}
          onClick={() => isAvailable && addToCart(product)} 
          whileHover={isAvailable ? { scale: 1.1, backgroundColor: "#000" } : {}}
          whileTap={isAvailable ? { scale: 0.9 } : {}}
          className={`p-4 rounded-2xl shadow-xl transition-all duration-300 ${
            isAvailable 
            ? 'bg-orange-600 text-white shadow-orange-200 cursor-pointer' 
            : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;