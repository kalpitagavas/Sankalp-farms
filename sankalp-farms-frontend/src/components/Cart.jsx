import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const Cart = () => {
  const { cart, setCart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate(); // Initialize navigation

  const handleWhatsAppOrder = () => {
    const message = cart
      .map((item) => `• *${item.name}* (${item.unit}) x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('%0A'); 
    
    const finalMsg = `Hi Sankalp Farms! I'd like to place an order:%0A%0A${message}%0A%0A*Grand Total: ₹${totalPrice}*%0A%0APlease confirm my delivery for Sunday!`;
    
    window.open(`https://wa.me/918169533371?text=${finalMsg}`, '_blank');
  };

  const handleAdd = (id) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.map(item => (item.id === id && item.quantity > 1) ? { ...item, quantity: item.quantity - 1 } : item));
  };
 
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Empty Harvest.</h2>
        <p className="text-slate-400 mt-4 font-medium">Add some Konkan freshness to get started.</p>
        <Link to="/product" className="mt-8 px-8 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Cart<span className="text-green-600">.</span></h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Ready for Sunday Delivery</p>
      </header>
      
      <div className="space-y-4">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{item.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    ₹{item.price} / {item.unit}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-4 bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-100">
                    <button onClick={() => handleRemove(item.id)} className="text-slate-400 hover:text-slate-900 font-bold px-1 text-lg">-</button>
                    <span className="text-[11px] font-black text-slate-900 min-w-[40px] text-center uppercase tracking-tighter">Qty: {item.quantity}</span>
                    <button onClick={() => handleAdd(item.id)} className="text-slate-400 hover:text-slate-900 font-bold px-1 text-lg">+</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Box */}
      <div className="mt-12 p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-end mb-10 relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Total Amount</p>
            <p className="text-6xl font-black tracking-tighter">₹{totalPrice}</p>
          </div>
          <div className="text-right">
             <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center ml-auto mb-4">
                <span className="text-xl">🚚</span>
             </div>
             <p className="text-[9px] font-black uppercase opacity-50 leading-tight">Free Mumbai Delivery<br/>This Sunday</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 relative z-10">
          {/* Main Checkout Button */}
          <button 
            onClick={() => navigate('/checkout')} // Navigates to checkout page
            className="w-full py-6 bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all shadow-xl"
          >
            Proceed to Checkout
          </button>

          {/* WhatsApp Secondary Option */}
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full py-4 bg-transparent border border-slate-700 text-slate-400 hover:text-green-500 hover:border-green-500/50 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all"
          >
            Quick Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;