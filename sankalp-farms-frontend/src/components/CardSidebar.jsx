import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity ,removeFromCart} = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutNavigation = () => {
    setIsCartOpen(false); // Close drawer
    navigate('/cart');    // Go to full review
  };
  const handleDeleteItem = (id) => {
    removeFromCart(id); 
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900">Your Basket</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cart.length} Items</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-900 text-xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-slate-400 py-20 font-medium">Your basket is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 text-sm leading-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">₹{item.price}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border rounded-full text-xs">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border rounded-full text-xs">+</button>
                        <button onClick={() => handleDeleteItem(item.id)} className="w-6 h-6 text-xs">🗑️</button>
                      </div>

                      
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100">
              <div className="flex justify-between items-end mb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{subtotal}</span>
              </div>
              <button 
                onClick={handleCheckoutNavigation}
                disabled={cart.length === 0}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all disabled:bg-slate-200 shadow-xl"
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