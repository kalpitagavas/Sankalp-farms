import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Loader2, Calendar, Package, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import API from '../api/axiosConfig'; 

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- 1. Fetch Real Data ---
  const fetchSubs = async () => {
    try {
      const { data } = await API.get('/subscriptions/my-subscriptions');
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to sync your village plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  // --- 2. Toggle Status (Active/Paused) ---
  const handleToggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/subscriptions/${id}/toggle`);
      setSubscriptions(prev => prev.map(s => s._id === id ? data : s));
      toast.success(data.status === 'Active' ? "Plan Resumed!" : "Plan Paused.");
    } catch (err) {
      toast.error("Could not update status.");
    }
  };

  // --- 3. Delete/Cancel Subscription ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this village plan?")) return;
    try {
      await API.delete(`/subscriptions/${id}`);
      setSubscriptions(prev => prev.filter(s => s._id !== id));
      toast.success("Subscription cancelled.");
    } catch (err) {
      toast.error("Failed to delete plan.");
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing with Sankalp Farms...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 min-h-screen bg-white">
      <header className="mb-16 flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black text-slate-900 uppercase tracking-tighter"
          >
            My Village Plans<span className="text-emerald-500">.</span>
          </motion.h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">
            Sankalp • Farm-to-Home Recurring Deliveries
          </p>
        </div>
        <button 
          onClick={() => navigate('/collection')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:gap-4 transition-all"
        >
          Add New Plan <ArrowRight size={14}/>
        </button>
      </header>

      {subscriptions.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 p-20 rounded-[3.5rem] text-center border border-dashed border-slate-200"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Package className="text-slate-200" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No active plans found</h2>
          <p className="text-slate-400 text-sm mb-8">Your recurring farm deliveries will appear here.</p>
          <button 
            onClick={() => navigate('/collection')}
            className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
          >
            Browse Farm Products
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {subscriptions.map((sub) => (
              <motion.div 
                key={sub._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col lg:flex-row justify-between items-center gap-8 group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${sub.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-200'}`} />

                {/* Left: Product & Status */}
                <div className="flex items-center gap-8 w-full lg:w-1/3">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300'}`}>
                    <RefreshCw size={24} className={sub.status === 'Active' ? 'animate-spin-slow' : ''} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      {sub.product?.name || "Premium Plan"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${sub.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${sub.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {sub.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Middle: Plan Details */}
                <div className="flex gap-12 text-center lg:border-x border-slate-100 lg:px-12 w-full lg:w-auto justify-center">
                  <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Cycle</p>
                    <p className="text-xs font-bold text-slate-800 uppercase">{sub.cycle}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Next Delivery</p>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <Calendar size={12} className="text-emerald-500" />
                      {sub.nextDelivery ? new Date(sub.nextDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Pending'}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button 
                    onClick={() => handleToggleStatus(sub._id)}
                    className={`flex-1 lg:flex-none px-8 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      sub.status === 'Active' 
                        ? 'bg-slate-50 text-slate-400 hover:bg-slate-100' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200'
                    }`}
                  >
                    {sub.status === 'Active' ? 'Pause Plan' : 'Resume Plan'}
                  </button>
                  <button 
                    onClick={() => handleDelete(sub._id)}
                    className="p-4 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;