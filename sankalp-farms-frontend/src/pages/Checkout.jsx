import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, setCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', landmark: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. Trigger the "Gateway"
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayMock(true);
    }, 1000);
  };

  // 2. Complete the "Payment"
  const finalizePayment = () => {
    setShowRazorpayMock(false);
    setIsProcessing(true);
    
    // Simulate bank verification
    setTimeout(() => {
      const mockId = "pay_" + Math.random().toString(36).substr(2, 14);
      setCart([]); // Clear the cart
      navigate('/order-success', { state: { name: formData.name, id: mockId } });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 relative font-sans">
      
      {/* --- MOCK RAZORPAY MODAL --- */}
      <AnimatePresence>
        {showRazorpayMock && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowRazorpayMock(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-[400px] rounded-xl shadow-2xl overflow-hidden border border-slate-200"
            >
              {/* Razorpay Header */}
              <div className="bg-[#1b263b] p-6 text-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg tracking-tight">Sankalp Farms</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sunday Harvest Order</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Amount</p>
                  <p className="font-black text-xl">₹{totalPrice}</p>
                </div>
              </div>

              {/* Razorpay Body */}
              <div className="p-6 bg-slate-50">
                <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">📱</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">UPI (Google Pay, PhonePe, BHIM)</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Preferred Payment</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Practice Mode Only</p>
                  <button 
                    onClick={finalizePayment}
                    className="w-full py-4 bg-[#3395ff] text-white rounded-lg font-bold text-sm shadow-lg hover:bg-[#207ada] transition-all"
                  >
                    Simulate Success
                  </button>
                  <button 
                    onClick={() => setShowRazorpayMock(false)}
                    className="w-full py-3 bg-white text-red-500 border border-red-100 rounded-lg font-bold text-xs"
                  >
                    Cancel Payment
                  </button>
                </div>
              </div>

              {/* Razorpay Footer */}
              <div className="p-4 text-center border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Secured by Razorpay Mock</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NORMAL PAGE CONTENT --- */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[90] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-green-600 rounded-full animate-spin mb-4" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Processing...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Checkout<span className="text-green-600">.</span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Full Name</label>
                <input required type="text" name="name" onChange={handleInputChange} className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Phone</label>
                <input required type="tel" name="phone" onChange={handleInputChange} className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Address</label>
              <textarea required name="address" rows="3" onChange={handleInputChange} className="w-full px-8 py-6 bg-slate-50 border-none rounded-[2.5rem] font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
            </div>
            <button type="submit" className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-green-600 transition-all">
              Proceed to Payment • ₹{totalPrice}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100 sticky top-10">
            <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Your Order</h2>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between font-bold text-sm">
                  <span className="text-slate-500">{item.name} x {item.quantity}</span>
                  <span className="text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-6 flex justify-between items-center">
              <span className="text-3xl font-black tracking-tighter">Total</span>
              <span className="text-3xl font-black tracking-tighter">₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;