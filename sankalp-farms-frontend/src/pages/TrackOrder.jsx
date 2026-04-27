import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, CheckCircle, Truck, Star, 
  MapPin, ShoppingBag, Loader2, ChevronLeft 
} from 'lucide-react';
import API from '../api/axiosConfig';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use your local backend URL
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

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="text-emerald-600 animate-spin" size={40} />
    </div>
  );

  // If order is still null after loading, show a clear message
  if (!order) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-slate-500 font-bold">Order not found.</p>
      <button onClick={() => navigate(-1)} className="text-emerald-600 underline">Go Back</button>
    </div>
  );

  // Data normalization
  const orderStatus = order.status || 'Pending';
  const items = order.orderItems || order.items || [];
  const grandTotal = order.totalPrice || order.totalAmount || 0;

  const steps = [
    { id: 'Pending', label: 'Order Placed', icon: Package },
    { id: 'Confirmed', label: 'Processing', icon: CheckCircle },
    { id: 'Shipped', label: 'Out for Delivery', icon: Truck },
    { id: 'Delivered', label: 'Delivered', icon: Star },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === orderStatus);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 overflow-hidden relative">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase">
              Track Order<span className="text-emerald-600">.</span>
            </h1>
            <p className="text-slate-400 font-bold text-[10px] tracking-widest uppercase mt-2">
              Order ID: #{id?.slice(-8).toUpperCase()}
            </p>
          </div>
          <span className="bg-slate-900 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
            {orderStatus}
          </span>
        </div>

        {/* Tracking Progress */}
        <div className="relative mb-20 px-4">
          <div className="absolute top-7 left-4 right-4 h-2 bg-slate-100 rounded-full" />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            className="absolute top-7 left-4 h-2 bg-emerald-500 rounded-full z-10"
          />
          <div className="relative flex justify-between z-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isPast = index <= currentStepIndex;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 transition-colors ${
                    isPast ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white border-slate-50 text-slate-200'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <p className={`mt-5 text-[10px] font-black uppercase ${isPast ? 'text-slate-900' : 'text-slate-300'}`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Items */}
        <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-8 border border-slate-100">
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8">Items</h2>
          <div className="space-y-4">
            {items.length > 0 ? items.map((item, idx) => (
              <div key={item._id || idx} className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={item.image 
                        ? `${BACKEND_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}` 
                        : 'https://placehold.jp/150x150.png'} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.jp/150x150.png'; }}
                    />
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-lg shadow-md">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">₹{item.price}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-slate-900 italic">₹{item.price * item.quantity}</p>
              </div>
            )) : <p className="text-slate-400 text-xs">No items found in this order.</p>}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
            <span className="text-3xl font-black text-slate-900 italic">₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;