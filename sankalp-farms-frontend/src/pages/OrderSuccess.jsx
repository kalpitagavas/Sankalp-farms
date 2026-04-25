import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Home, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams(); // Grabs the order ID from the URL
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-xl text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 animate-bounce">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 mb-2 uppercase">
          Order Confirmed!
        </h1>
        <p className="text-slate-500 text-sm font-medium mb-8">
          Your village-sourced staples are being prepared for delivery.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Order ID</p>
          <p className="text-xs font-mono font-bold text-slate-700 break-all">#{id}</p>
        </div>

        <div className="space-y-4">
          <button 
           onClick={() => navigate(`/track-order/${id}`)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            <Package size={16} /> Track My Order
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Home size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;