import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axiosConfig'; 
import { Package, ChevronRight, Calendar, ShoppingBag } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo?.token) return navigate('/login');

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        
        const { data } = await API.get('/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full mb-4" 
          />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading your pantry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 border-b border-slate-100 pb-10 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
              History<span className="text-emerald-500">.</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
              <ShoppingBag size={12} className="text-emerald-500" />
              {orders.length} Deliveries recorded
            </p>
          </div>
          <button 
             onClick={() => navigate('/product')}
             className="hidden sm:flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
          >
            Order Fresh Produce
          </button>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
            <Package size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">No orders found yet</p>
            <button onClick={() => navigate('/product')} className="text-[10px] font-black uppercase underline decoration-2 underline-offset-4 text-emerald-600">Start Shopping</button>
          </div>
        ) : (
          <div className="grid gap-8">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={order._id}
                  className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Left: Meta (ID & Date) */}
                    <div className="p-8 lg:w-64 bg-slate-50/50 border-r border-slate-100 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Transaction ID</span>
                        <p className="text-[11px] font-bold text-slate-900 mt-1">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="mt-8 lg:mt-0">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Calendar size={12} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Ordered</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Order Items Preview */}
                    <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                         <span className={`px-4 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                            {order.status}
                         </span>
                         <div className="text-right">
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Total Bill</span>
                           <p className="text-xl font-black text-slate-900 italic tracking-tighter">₹{order.totalAmount}</p>
                         </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-center justify-between group/item">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-[10px]">
                                {item.quantity}x
                              </div>
                              <span className="text-xs font-bold text-slate-600 group-hover/item:text-slate-900 transition-colors">{item.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-300 tracking-tighter">Item {i + 1}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter pt-2">
                            + {order.items.length - 2} More village specialties
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="p-8 lg:w-48 flex items-center justify-center bg-slate-50/20">
                      <button 
                        onClick={() => navigate(`/track-order/${order._id}`)}
                        className="group flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                      >
                        Details
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;