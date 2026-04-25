import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShoppingBag, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API from '../api/axiosConfig';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Destructure setIsCartOpen to trigger the sidebar
  const { addToCart, setIsCartOpen } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Using the MongoDB _id from params
        const res = await API.get(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Unified handler for adding and opening the drawer
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsCartOpen(true); // Forces the sidebar to slide open
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
        <div className="font-black uppercase tracking-[0.3em] text-slate-400 text-[10px]">
          Harvesting Details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <div className="font-black uppercase tracking-widest text-slate-400">Product Not Found</div>
        <button 
          onClick={() => navigate('/product')}
          className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-10 py-5 rounded-2xl"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto px-6 py-24 min-h-screen"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        {t('common.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Image with organic shadow */}
        <div className="lg:sticky lg:top-32">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="aspect-[4/5] rounded-[4rem] overflow-hidden bg-stone-100 shadow-2xl shadow-stone-200 border border-white"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Right: Product Meta & Description */}
        <div className="flex flex-col py-2">
          <header className="mb-10">
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-4 block">
               {t(`categories.${product.category?.toLowerCase().replace(" ", "") || 'general'}`)}
            </span>
            
            <h1 className="text-6xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tighter italic">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{product.price}</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">/ {product.unit}</span>
            </div>
          </header>

          <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium max-w-xl">
            {product.description || t('productPage.defaultDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-slate-900 text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-green-700 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group"
            >
              <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" /> 
              {t('productPage.addToCart')}
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{t('productPage.fastShipping')}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter italic">{t('productPage.mumbaiLocal')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-[1.5rem] flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{t('productPage.authentic')}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter italic">{t('productPage.directFromVillage')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;