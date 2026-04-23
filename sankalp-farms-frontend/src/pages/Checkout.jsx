import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, User, Clock, MessageSquare, 
  ShieldCheck, Leaf, ArrowRight, CheckCircle2, Truck 
} from 'lucide-react';

const Checkout = () => {
  const { cart, totalPrice, setCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  
  const [formData, setFormData] = useState({ 
    name: '', phone: '', address: '', landmark: '',
    deliveryNote: '', deliveryBatch: '', whatsappUpdates: true
  });

  useEffect(() => {
    const getNextBatches = () => {
      const dates = [];
      let today = new Date();
      while (dates.length < 2) {
        today.setDate(today.getDate() + 1);
        const day = today.getDay(); 
        if (day === 3 || day === 6) {
          dates.push({
            label: day === 3 ? "Mid-Week Harvest" : "Weekend Fresh",
            dateStr: today.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
            harvestDate: new Date(today.getTime() - 86400000).toLocaleDateString('en-IN', { weekday: 'short' })
          });
        }
      }
      setAvailableDates(dates);
      setFormData(prev => ({ ...prev, deliveryBatch: dates[0].dateStr }));
    };
    getNextBatches();
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayMock(true);
    }, 1000);
  };

  const finalizePayment = () => {
    setShowRazorpayMock(false);
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/order-success', { state: { ...formData, orderId: "SNK-" + Math.random().toString(36).substr(2, 6).toUpperCase(), total: totalPrice } });
      setCart([]); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] px-4 py-20 font-sans text-[#1a1a1a]">
      
      {/* --- PAYMENT MODAL (Matching your Cart style) --- */}
      <AnimatePresence>
        {showRazorpayMock && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#0c0c0c]/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative bg-[#111111] w-full max-w-[400px] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 text-white p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-xl text-[#2e7d32]">Sankalp Pay</h3>
                <ShieldCheck className="text-[#2e7d32]" size={24} />
              </div>
              <div className="mb-10">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Amount Due</p>
                <p className="text-5xl font-black italic">₹{totalPrice}</p>
              </div>
              <button onClick={finalizePayment} className="w-full py-5 bg-[#ffffff] text-[#111111] rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#2e7d32] hover:text-white transition-all">
                Complete Payment
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Checkout<span className="text-[#2e7d32]">.</span></h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-2">Direct from Konkan & Gujarat</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handlePlaceOrder} className="space-y-12">
              
              {/* Personal Info */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-[#2e7d32]">
                  <User size={18} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required name="name" placeholder="YOUR NAME" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#2e7d32] outline-none font-bold placeholder:text-gray-300 transition-all uppercase text-sm tracking-widest" />
                  <input required name="phone" placeholder="PHONE NUMBER" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#2e7d32] outline-none font-bold placeholder:text-gray-300 transition-all uppercase text-sm tracking-widest" />
                </div>
              </section>

              {/* Harvest Date (Batches) */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-[#2e7d32]">
                  <Clock size={18} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Select Harvest Batch</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableDates.map((batch, index) => (
                    <button key={index} type="button" onClick={() => setFormData({...formData, deliveryBatch: batch.dateStr})}
                      className={`p-6 rounded-[1.5rem] text-left transition-all border-2 ${
                        formData.deliveryBatch === batch.dateStr ? 'border-[#2e7d32] bg-white shadow-lg' : 'border-gray-100 bg-white/50'
                      }`}
                    >
                      <p className="text-[9px] font-black uppercase text-[#2e7d32] mb-1 tracking-widest">{batch.label}</p>
                      <p className="font-black text-xl text-[#111111]">{batch.dateStr}</p>
                      <p className="text-[10px] text-gray-400 mt-1 italic leading-tight">Harvested {batch.harvestDate}, reaching Mumbai next morning.</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Delivery Address */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-[#2e7d32]">
                  <MapPin size={18} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Shipping Address</h3>
                </div>
                <textarea required name="address" placeholder="STREET, BUILDING, FLAT NO." rows="2" onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#2e7d32] outline-none font-bold placeholder:text-gray-300 resize-none uppercase text-sm tracking-widest" />
                <input name="landmark" placeholder="LANDMARK (OPTIONAL)" onChange={(e) => setFormData({...formData, landmark: e.target.value})} className="w-full py-4 bg-transparent border-b border-gray-200 focus:border-[#2e7d32] outline-none font-bold placeholder:text-gray-300 uppercase text-[12px] tracking-widest" />
              </section>

              <button type="submit" className="w-full py-6 bg-[#2e7d32] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-[#1b5e20] transition-all shadow-xl flex items-center justify-center gap-4">
                PROCEED TO PAYMENT <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* RIGHT: DARK SUMMARY CARD (Matching your Cart UI) */}
          <div className="lg:col-span-5">
            <div className="bg-[#111111] p-10 rounded-[2.5rem] text-white shadow-2xl sticky top-10 overflow-hidden border border-white/5">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3 text-gray-400">
                <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full" /> Your Order
              </h2>
              
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-sm tracking-tight">{item.name}</p>
                      <p className="text-[9px] text-[#2e7d32] font-black uppercase">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-black italic text-lg text-[#f0f0f0]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  <span>Shipping Fee</span> <span className="text-[#2e7d32]">FREE</span>
                </div>
                <div className="flex flex-col pt-6 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Total Amount</p>
                  <div className="flex justify-between items-end">
                    <span className="text-6xl font-black italic tracking-tighter">₹{totalPrice}</span>
                    <Truck className="text-[#2e7d32] mb-2" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-[1.5rem] border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#f0f7ed] rounded-full flex items-center justify-center text-[#2e7d32]">
                <Leaf size={20} />
              </div>
              <p className="text-[10px] font-bold text-gray-400 leading-tight uppercase tracking-widest">
                Our logistics are managed by village cooperatives to ensure 100% purity.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;