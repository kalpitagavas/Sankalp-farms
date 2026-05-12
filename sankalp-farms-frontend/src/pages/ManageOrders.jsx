import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ManageOrders = () => {
  // Mock data for Sankalp orders
  const [orders, setOrders] = useState([
    { id: '#SKL-9021', customer: 'Santosh', product: 'A2 Cow Ghee', amount: '₹1,200', status: 'Pending', date: '2026-05-04' },
    { id: '#SKL-8944', customer: 'Kalpita', product: 'Malvani Cashews', amount: '₹850', status: 'Shipped', date: '2026-05-03' },
    { id: '#SKL-8812', customer: 'Amit', product: 'Kokum Syrup', amount: '₹450', status: 'Delivered', date: '2026-05-01' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">Admin Panel</h2>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Manage Orders<span className="text-emerald-600">.</span></h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
            <p className="text-xl font-black text-slate-800">₹45,200</p>
          </div>
        </header>

        {/* Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Item</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-slate-900 text-xs">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 uppercase">{order.customer}</span>
                        <span className="text-[9px] text-slate-400 font-medium">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{order.product}</td>
                    <td className="px-6 py-5 text-xs font-black text-slate-900">{order.amount}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[10px] font-black uppercase text-slate-400 hover:text-emerald-600 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State / Footer */}
        <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          End of order list • Showing {orders.length} transactions
        </p>
      </div>
    </div>
  );
};

export default ManageOrders;