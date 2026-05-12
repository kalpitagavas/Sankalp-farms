import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, CheckCircle, Truck, Star, 
  MapPin, ShoppingBag, Loader2, ChevronLeft,
  XCircle, MessageCircle, CreditCard, Leaf
} from 'lucide-react';
import API from '../api/axiosConfig';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`); 
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      await API.put(`/orders/${id}/cancel`);
      setOrder({ ...order, status: 'Cancelled' });
      setShowCancelModal(false);
    } catch (error) {
      alert("Failed to cancel order.");
    }
  };
const openWhatsApp = () => {
  // Replace XXXXXXXXXX with your actual WhatsApp Business number
  const phoneNumber = "8169533371"; 
  const orderIdShort = id?.slice(-8).toUpperCase();
  const message = `Hi Sankalp Team! I have a question about my order #${orderIdShort}. Can you please help?`;
  
  // Encode the message to handle spaces and special characters
  const encodedMessage = encodeURIComponent(message);
  
  // Open in a new tab
  window.open(`https://wa.me/${8169533371}?text=${encodedMessage}`, '_blank');
};
  const steps = [
    { id: 'Pending', label: 'Placed', icon: ShoppingBag, desc: 'Awaiting farm confirmation' },
    { id: 'Confirmed', label: 'Sourcing', icon: Leaf, desc: 'Picking fresh from the village' },
    { id: 'Shipped', label: 'In Transit', icon: Truck, desc: 'Heading to Mumbai' },
    { id: 'Delivered', label: 'Delivered', icon: Star, desc: 'Enjoy your fresh produce!' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === (order?.status || 'Pending'));

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="text-emerald-600 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Top Nav */}
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-black text-[10px] uppercase tracking-[0.2em]">
          <ChevronLeft size={14} /> Return
        </button>
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Order ID</p>
          <p className="text-xs font-bold text-slate-900">#{id?.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        
        {/* Status Header */}
        <div className="p-10 md:p-14 border-b border-slate-50 bg-gradient-to-br from-white to-slate-50/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Tracking Details<span className="text-emerald-500">.</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-4">
                Current Status: <span className="text-emerald-600 underline decoration-2 underline-offset-4">{order.status}</span>
              </p>
            </div>
            {currentStepIndex <= 1 && order.status !== 'Cancelled' && (
              <button onClick={() => setShowCancelModal(true)} className="px-6 py-3 border border-rose-100 text-rose-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                Cancel Shipment
              </button>
            )}
          </div>

          {/* Stepper Logic */}
          <div className="relative flex justify-between">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-0" />
            {/* Active Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              className="absolute top-5 left-0 h-[2px] bg-emerald-500 -z-0" 
            />

            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-2 border-slate-100 text-slate-300'
                  }`}>
                    <Icon size={18} className={isCurrent ? 'animate-pulse' : ''} />
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-[10px] font-black uppercase tracking-tighter ${isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                      {step.label}
                    </p>
                    <p className="hidden md:block text-[8px] font-bold text-slate-400 uppercase mt-1 max-w-[80px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2">
          {/* Items */}
          <div className="p-10 border-r border-slate-50">
             <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-8">Pantry Summary</h3>
             <div className="space-y-4">
               {(order.items || []).map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 text-xs">
                     {item.quantity}x
                   </div>
                   <div>
                     <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.name}</p>
                     <p className="text-[10px] font-bold text-slate-400 italic">₹{item.price}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Delivery Info */}
          <div className="p-10 bg-slate-50/30">
            <div className="space-y-10">
              <div>
                <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                  <MapPin size={12} className="text-emerald-500" /> Ship To
                </h3>
                <p className="text-xs font-black text-slate-800 uppercase">{order.customer?.fullName || 'Kalpita Gavas'}</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-2 uppercase tracking-tighter">
                  {order.customer?.address}, {order.customer?.city} <br />
                  {order.customer?.postalCode}
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-8">
                <div>
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Pay</h3>
                  <p className="text-3xl font-black text-slate-900 italic tracking-tighter">₹{order.totalAmount}</p>
                </div>
               <button 
                onClick={openWhatsApp}
                className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all shadow-sm active:scale-90"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={20} fill="currentColor" fillOpacity={0.1} />
              </button>
                 
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default TrackOrder;