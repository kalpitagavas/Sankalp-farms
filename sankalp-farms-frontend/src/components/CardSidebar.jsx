import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, X, ShoppingBag } from 'lucide-react';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckoutNavigation = () => {
    setIsCartOpen(false); 
    navigate('/cart'); 
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[111] flex flex-col"
          >
            {/* HEADER */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tighter text-slate-900 italic">Your Basket<span className="text-green-600">.</span></h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {cart.length === 0 ? 'Empty' : `${cart.length} items collected`}
                </p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-slate-50 rounded-full transition-all group">
                <X size={20} className="text-slate-300 group-hover:text-slate-900 group-hover:rotate-90 transition-all" />
              </button>
            </div>

            {/* ITEM LIST */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4 text-slate-200" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Nothing here yet</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item._id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-5 group"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full rounded-2xl object-cover bg-slate-50 border border-slate-100" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-slate-900 text-sm leading-tight truncate pr-4">{item.name}</h4>
                          <button onClick={() => removeFromCart(item._id)} className="text-slate-200 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter mb-4">₹{item.price}</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                            {/* DECREASE BUTTON */}
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm active:scale-90 disabled:opacity-30"
                            >
                              <Minus size={12} className="text-slate-400" />
                            </button>
                            
                            <span className="text-xs font-black w-8 text-center tabular-nums">{item.quantity}</span>
                            
                            {/* INCREASE BUTTON */}
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all shadow-sm active:scale-90"
                            >
                              <Plus size={12} className="text-slate-400" />
                            </button>
                          </div>
                          <p className="ml-auto font-black text-slate-900 text-sm tabular-nums">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-10 bg-slate-900 text-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 block">Total Amount</span>
                  <span className="text-4xl font-black tracking-tighter italic tabular-nums">₹{totalPrice}</span>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Direct From Sawantwadi<br />Fresh To Mumbai</p>
                </div>
              </div>
              <button 
                onClick={handleCheckoutNavigation}
                disabled={cart.length === 0}
                className="group relative w-full py-6 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-green-600 hover:text-white transition-all disabled:bg-slate-800 shadow-2xl active:scale-[0.98]"
              >
                Review & Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;