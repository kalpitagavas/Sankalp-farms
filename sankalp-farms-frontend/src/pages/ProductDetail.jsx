import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/product';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  
  // Find the product based on URL ID
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Product Not Found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto px-6 py-24"
    >
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12"
      >
        <ChevronLeft size={16} /> {t('common.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Premium Image Display */}
        <div className="sticky top-24">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-stone-100 border border-stone-100 shadow-2xl shadow-stone-200"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col h-full py-4">
          <span className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-4">
             {t(`categories.${product.category.toLowerCase().replace(" ", "")}`)}
          </span>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tighter">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-4xl font-black text-slate-900">₹{product.price}</span>
            <span className="text-lg font-bold text-slate-300 uppercase tracking-widest">/ {product.unit}</span>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium">
            {/* If your data has translated descriptions, use them here */}
            {product.description || t('productPage.defaultDescription')}
          </p>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} /> {t('productPage.addToCart')}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-6 pt-12 border-t border-stone-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">{t('productPage.fastShipping')}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{t('productPage.mumbaiLocal')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">{t('productPage.authentic')}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{t('productPage.directFromVillage')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductDetail;