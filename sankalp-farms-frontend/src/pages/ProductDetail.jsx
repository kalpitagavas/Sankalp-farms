import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, ShoppingBag, Truck, ShieldCheck, 
  Loader2, Calendar, RefreshCw, Leaf 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import API from '../api/axiosConfig';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- NEW: Subscription State ---
  const [purchaseType, setPurchaseType] = useState('once'); // 'once' or 'subscribe'

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
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

  const handleAddToCart = () => {
    if (product) {
      // We pass the purchaseType and the specific price to the cart context
      const cartItem = {
        ...product,
        price: purchaseType === 'subscribe' ? product.subscriptionPrice : product.price,
        isSubscription: purchaseType === 'subscribe',
        plan: purchaseType === 'subscribe' ? (product.subscriptionCycle || 'Monthly') : null
      };
      addToCart(cartItem);
      setIsCartOpen(true);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      <div className="font-black uppercase tracking-[0.3em] text-slate-400 text-[10px]">Harvesting Details...</div>
    </div>
  );

  if (!product) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div className="font-black uppercase tracking-widest text-slate-400">Product Not Found</div>
      <button onClick={() => navigate('/product')} className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-10 py-5 rounded-2xl">Return to Collection</button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('common.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image */}
        <div className="lg:sticky lg:top-32">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="aspect-[4/5] rounded-[4rem] overflow-hidden bg-stone-100 shadow-2xl shadow-stone-200 border border-white relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            {product.isSeasonal && (
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <Leaf size={14} className="text-emerald-600" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Seasonal: {product.harvestMonth}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col py-2">
          <header className="mb-8">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 block">
              {product.origin} • {t(`categories.${product.category?.toLowerCase().replace(" ", "") || 'general'}`)}
            </span>
            <h1 className="text-6xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tighter italic">{product.name}</h1>
          </header>

          {/* --- NEW: Subscription Selector --- */}
          {product.subscriptionAvailable && (
            <div className="flex flex-col gap-3 mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Select Plan</h3>
              
              {/* One Time */}
              <button 
                onClick={() => setPurchaseType('once')}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all flex justify-between items-center ${purchaseType === 'once' ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">One-time Purchase</p>
                  <p className="text-[9px] font-bold opacity-60 uppercase tracking-tighter">Buy fresh for today</p>
                </div>
                <span className="text-xl font-black italic">₹{product.price}</span>
              </button>

              {/* Subscribe */}
              <button 
                onClick={() => setPurchaseType('subscribe')}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all flex justify-between items-center relative overflow-hidden ${purchaseType === 'subscribe' ? 'border-emerald-500 bg-emerald-500 text-white shadow-xl shadow-emerald-100' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                <div className="z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                    <RefreshCw size={12} className={purchaseType === 'subscribe' ? 'animate-spin-slow' : ''} /> Subscribe & Save
                  </p>
                  <p className="text-[9px] font-bold opacity-80 uppercase tracking-tighter italic">Delivered {product.subscriptionCycle || 'Monthly'}</p>
                </div>
                <div className="text-right z-10">
                  <span className="text-xl font-black italic block">₹{product.subscriptionPrice}</span>
                  <span className="text-[8px] font-black uppercase line-through opacity-50">₹{product.price}</span>
                </div>
                {purchaseType === 'subscribe' && <div className="absolute right-[-10%] bottom-[-20%] text-white/10 rotate-12 scale-150"><ShoppingBag size={100} /></div>}
              </button>
            </div>
          )}

          {/* Fallback price display if subscription not available */}
          {!product.subscriptionAvailable && (
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{product.price}</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">/ {product.unit}</span>
            </div>
          )}

          <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium max-w-xl">{product.description}</p>

          <button onClick={handleAddToCart} className="w-full bg-slate-900 text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 group mb-16">
            <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" /> 
            {purchaseType === 'subscribe' ? 'Start Village Subscription' : t('productPage.addToCart')}
          </button>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center"><Truck size={24} /></div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{t('productPage.fastShipping')}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter italic">{t('productPage.mumbaiLocal')}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center"><ShieldCheck size={24} /></div>
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