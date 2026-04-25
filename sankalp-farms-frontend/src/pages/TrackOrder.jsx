import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, CheckCircle, Truck, Star, MapPin, ChevronLeft, Loader2 } from 'lucide-react';
import API from '../api/axiosConfig';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package, desc: 'We have received your order.' },
    { id: 'processing', label: 'Processing', icon: CheckCircle, desc: 'Sankalp Farms is packing your items.' },
    { id: 'shipped', label: 'Out for Delivery', icon: Truck, desc: 'Your order is on the way.' },
    { id: 'delivered', label: 'Delivered', icon: Star, desc: 'Enjoy your fresh village produce!' },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.get(`/orders/${id}`, config);
        setOrder(data);
      } catch (err) {
        console.error("Tracking fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  if (!order) return <div className="text-center py-20 font-bold">Order not found.</div>;

  // Use the status from the database, default to 'placed'
  const currentStatus = order.status || 'placed';
  const currentStepIndex = steps.findIndex(s => s.id === currentStatus);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-emerald-600 transition-colors">
        <ChevronLeft size={16} /> Back to Orders
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl p-10 border border-gray-50">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900">Track Order</h1>
            <p className="text-gray-400 font-bold text-[10px] mt-1 uppercase tracking-widest">ID: #{order._id}</p>
            <div className="flex items-center gap-2 mt-4 text-emerald-600 bg-emerald-50 w-fit px-4 py-2 rounded-2xl">
              <MapPin size={14} />
              <span className="text-xs font-black uppercase">Mumbai Delivery</span>
            </div>
          </div>
          <span className="bg-emerald-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100">
            {currentStatus}
          </span>
        </div>

        {/* Stepper Logic */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-50 md:left-0 md:top-6 md:w-full md:h-1" />
          <div 
            className="absolute left-6 top-0 w-1 bg-emerald-600 transition-all duration-1000 md:left-0 md:top-6 md:h-1" 
            style={{ 
              height: window.innerWidth < 768 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '4px',
              width: window.innerWidth >= 768 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '4px'
            }}
          />

          <div className="space-y-12 md:space-y-0 md:flex md:justify-between relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isPast = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex items-start gap-6 md:flex-col md:items-center md:gap-4 md:flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${
                    isPast ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-100 text-gray-200'
                  } ${isCurrent ? 'scale-125 ring-8 ring-emerald-50' : ''}`}>
                    <Icon size={20} />
                  </div>
                  <div className="md:text-center">
                    <h3 className={`text-sm font-black uppercase tracking-tight ${isPast ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 max-w-[120px] leading-tight">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Preview */}
        <div className="mt-16 p-8 bg-gray-50 rounded-[2.5rem] flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
            <p className="text-2xl font-black italic text-gray-900">₹{order.totalAmount}</p>
          </div>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;