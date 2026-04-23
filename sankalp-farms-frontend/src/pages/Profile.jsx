// pages/Profile.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Clock, Star } from 'lucide-react';

const Profile = () => {
  // 1. Local State to simulate "Fetched" data
  const [activeTab, setActiveTab] = useState('Orders');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Simulated User Data (Frontend only)
  const user = {
    name: "Kalpita",
    email: "kalpita.developer@email.com",
    joined: "January 2024",
    location: "Malad, Mumbai",
    stats: {
      orders: 12,
      deliveries: 1,
      points: 450
    }
  };

  // Simulated Order Data
  const orders = [
    { id: "SK-9021", date: "Apr 12, 2026", status: "Delivered", total: "₹1,250", items: "Authentic Alphonso Mangoes (5kg)" },
    { id: "SK-8842", date: "Mar 28, 2026", status: "In Transit", total: "₹850", items: "Gujarati Khakra & Pure Peanut Oil" },
    { id: "SK-7710", date: "Feb 15, 2026", status: "Delivered", total: "₹2,100", items: "Konkan Spice Box + Kokum Syrup" }
  ];

  const handleLogout = () => {
    // Just a frontend simulation of logging out
    setIsLoggedIn(false);
    console.log("User logged out (Frontend only)");
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#fcfaf7]">
        <h2 className="text-2xl font-black text-slate-900 mb-4 text-center">You have been logged out.</h2>
        <button 
          onClick={() => setIsLoggedIn(true)} 
          className="bg-[#062d24] text-white px-8 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px]"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-orange-100 to-yellow-50 rounded-full flex items-center justify-center text-orange-600 mb-4 border-4 border-white shadow-inner">
              <User size={48} />
            </div>
            <h2 className="font-black text-slate-900 text-xl">{user.name}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{user.location}</p>
          </motion.div>

          <nav className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden p-2">
            {[
              { icon: <Package size={18}/>, label: "Orders" },
              { icon: <MapPin size={18}/>, label: "Addresses" },
              { icon: <Settings size={18}/>, label: "Settings" },
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeTab === item.label ? 'bg-[#062d24] text-white shadow-lg' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest">
                  {item.icon} {item.label}
                </div>
                <ChevronRight size={14} className={activeTab === item.label ? 'text-white/40' : 'text-slate-300'} />
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 mt-2 hover:bg-red-50 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-red-500 group-hover:translate-x-1 transition-transform">
                <LogOut size={18}/> Logout
              </div>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 space-y-8">
          <header>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Dashboard</h1>
            <p className="text-slate-400 text-sm font-medium mt-2">Member since {user.joined} • Village Artisan Network</p>
          </header>

          {/* Stats Bar */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#062d24] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#062d24]/10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Total Orders</p>
              <h3 className="text-4xl font-black mt-2">{user.stats.orders}</h3>
            </div>
            <div className="bg-orange-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-500/10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Active Deliveries</p>
              <h3 className="text-4xl font-black mt-2">{user.stats.deliveries}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sankalp Points</p>
              <div className="flex items-center gap-2 mt-2">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                <h3 className="text-4xl font-black text-slate-900">{user.stats.points}</h3>
              </div>
            </div>
          </section>

          {/* Tab Content: Orders (Dynamic Switch) */}
          <AnimatePresence mode="wait">
            {activeTab === 'Orders' ? (
              <motion.section 
                key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden"
              >
                <div className="p-10 border-b border-stone-50 flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-lg flex items-center gap-3">
                    <Clock size={24} className="text-orange-500" /> Recent Activity
                  </h3>
                </div>
                
                <div className="divide-y divide-stone-50">
                  {orders.map((order) => (
                    <div key={order.id} className="p-8 flex flex-col lg:flex-row items-center justify-between hover:bg-slate-50 transition-all">
                      <div className="flex items-center gap-6 mb-4 lg:mb-0">
                        <div className="h-16 w-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 border border-slate-100">
                          <Package size={28} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Order {order.id}</h4>
                          <p className="text-slate-500 text-xs font-medium mt-1">{order.items}</p>
                          <p className="text-slate-300 text-[10px] font-bold mt-1">{order.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-12">
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Status</p>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total</p>
                          <span className="font-black text-slate-900 text-lg">{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ) : (
              <motion.div 
                key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-64 flex items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-stone-100"
              >
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{activeTab} section coming soon</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Profile;