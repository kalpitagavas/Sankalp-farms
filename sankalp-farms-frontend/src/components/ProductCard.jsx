import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, isBulk }) => {
  const { addToCart } = useCart();
const isAvailable = product.countInStock > 0;
  const price = isBulk ? product.bulkPrice : product.price;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col w-full h-[280px] bg-white rounded-[32px] p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
    >
      {/* IMAGE - Organic shape */}
      <div className="relative w-full h-[160px] rounded-[24px] overflow-hidden bg-stone-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900">Sold</span>
          </div>
        )}
      </div>

      {/* CONTENT - Clean, unboxed typography */}
      <div className="mt-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-[13px] font-bold text-stone-900 leading-snug">{product.name}</h3>
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">{product.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-stone-900">₹{price}</span>
          <button
            onClick={() => isAvailable && addToCart({ ...product, price })}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isAvailable ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-300'
            }`}
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;