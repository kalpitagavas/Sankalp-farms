// pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, CheckCircle, Truck, Clock, 
  Search, Filter, ChevronRight, MoreVertical,
  ArrowUpRight, Users, TrendingUp 
} from 'lucide-react';

const AdminDashboard = () => {
  // 1. Simulated "Database" of all customer orders
  const [orders, setOrders] = useState([
    { id: "ORD-7712", customer: "Amit Sharma", items: "5kg Alphonso Mangoes", total: "₹1,250", status: "Pending", date: "2026-04-23" },
    { id: "ORD-7711", customer: "Priya Patel", items: "Gujarati Khakra Mix (4pk)", total: "₹450", status: "Shipped", date: "2026-04-22" },
    { id: "ORD-7710", customer: "Rahul V.", items: "Konkan Kokum Syrup + Spices", total: "₹920", status: "Delivered", date: "2026-04-20" },
    { id: "ORD-7709", customer: "Sneha M.", items: "Pure Peanut Oil (2L)", total: "₹680", status: "Pending", date: "2026-04-19" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // 2. Logic to update status locally
  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-slate-400 text-sm font-medium mt-2">Sankalp Village Network • Order Fulfillment Center</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders or customers..."
                className="pl-12 pr-6 py-3 bg-white border border-stone-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64 shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-stone-100 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pending", value: orders.filter(o => o.status === 'Pending').length, icon: <Clock size={20}/>, color: "bg-orange-500" },
            { label: "Shipped", value: orders.filter(o => o.status === 'Shipped').length, icon: <Truck size={20}/>, color: "bg-blue-500" },
            { label: "Today's Revenue", value: "₹4,250", icon: <TrendingUp size={20}/>, color: "bg-[#062d24]" },
            { label: "Active Users", value: "1,204", icon: <Users size={20}/>, color: "bg-slate-900" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} p-6 rounded-[2.5rem] text-white shadow-xl shadow-slate-200/50`}>
              <div className="flex justify-between items-start opacity-70">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black mt-4">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Orders Table Area */}
        <section className="bg-white rounded-[3rem] shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-8 border-b border-stone-50">
            <h2 className="font-black text-slate-900 text-lg flex items-center gap-3">
              <ShoppingBag size={24} className="text-orange-500" /> Incoming Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Items</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                <AnimatePresence>
                  {filteredOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-6">
                        <span className="font-black text-slate-900 text-xs">{order.id}</span>
                      </td>
                      <td className="p-6">
                        <p className="font-bold text-slate-700 text-sm">{order.customer}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{order.date}</p>
                      </td>
                      <td className="p-6">
                        <p className="text-xs text-slate-500 font-medium">{order.items}</p>
                      </td>
                      <td className="p-6">
                        <span className="font-black text-[#062d24]">{order.total}</span>
                      </td>
                      <td className="p-6">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-offset-2 appearance-none cursor-pointer transition-all ${
                            order.status === 'Pending' ? 'bg-orange-50 text-orange-600 focus:ring-orange-200' : 
                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 focus:ring-blue-200' : 
                            'bg-green-50 text-green-600 focus:ring-green-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-slate-300 hover:text-[#062d24] transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">No orders match your search</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;