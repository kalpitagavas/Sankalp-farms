import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    const message = cart
      .map((item) => `• *${item.name}* (${item.unit}) x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('%0A'); 
    const finalMsg = `Hi Sankalp Farms! I'd like to order:%0A%0A${message}%0A%0A*Total: ₹${totalPrice}*`;
    window.open(`https://wa.me/918169533371?text=${finalMsg}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Empty Harvest.</h2>
        <Link to="/product" className="mt-8 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl text-[10px]">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Cart<span className="text-green-600">.</span></h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Ready for Sunday Delivery</p>
      </header>
      
      <div className="space-y-4 mb-12">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-6">
                <img src={item.image} alt="" className="w-20 h-20 rounded-[1.5rem] object-cover bg-slate-100" />
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{item.name}</h3>
                  <div className="mt-3 flex items-center gap-4 bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-100">
                    <button onClick={() => updateQuantity(item.id, -1)} className="font-bold px-1 text-lg">-</button>
                    <span className="text-[11px] font-black min-w-[40px] text-center">Qty: {item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="font-bold px-1 text-lg">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">✕</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Total Amount</p>
            <p className="text-6xl font-black tracking-tighter">₹{totalPrice}</p>
          </div>
          <p className="text-[9px] font-black uppercase opacity-50 text-right">Free Mumbai Delivery<br/>This Sunday</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <button onClick={() => navigate('/checkout')} className="w-full py-6 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs rounded-2xl">
            Proceed to Checkout
          </button>
          <button onClick={handleWhatsAppOrder} className="w-full py-4 border border-slate-700 text-slate-400 hover:text-green-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl">
            Quick Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;