import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axiosConfig'; // Use your custom instance!

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
        // 1. FIX: Use your API instance and remove '/api' if it's already in baseURL
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

  // 2. FIX: Match your Mongoose Schema Enums (Capitalized)
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Shipped': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              My Orders<span className="text-emerald-600">.</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">
              {orders.length} Total Shipments
            </p>
          </div>
          <button 
             onClick={() => navigate('/product')}
             className="text-[10px] font-black uppercase text-emerald-600 hover:underline"
          >
            + New Order
          </button>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-20 text-center shadow-sm">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Your pantry is empty</p>
            <button 
              onClick={() => navigate('/product')}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
            >
              Shop Fresh Produce
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order._id}
                  className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Meta Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-colors ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          #{order._id.slice(-6)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ordered On</p>
                        <p className="text-sm font-bold text-slate-800">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 border-l border-slate-100 md:pl-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Manifest</p>
                      <div className="space-y-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <p className="text-xs font-bold text-slate-600">
                              {item.quantity} × {item.name}
                            </p>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">
                            + {order.items.length - 3} More
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col justify-between items-end gap-6 min-w-[140px]">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                        <p className="text-2xl font-black text-slate-900 leading-none italic">₹{order.totalAmount}</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/track-order/${order._id}`)}
                        className="w-full px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all transform active:scale-95"
                      >
                        Track Status
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