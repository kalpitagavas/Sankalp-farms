import React, { useEffect, useState, useCallback } from 'react';
import API from '../api/axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Truck, CheckCircle, Package, Loader2, RefreshCw, 
  MapPin, ExternalLink, Search, Filter, ShoppingBag, 
  Clock, TrendingUp, Users, AlertTriangle 
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevOrderCount, setPrevOrderCount] = useState(0);
  const [updatingId, setUpdatingId] = useState(null);

  const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
  };

  const fetchAllOrders = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const { data } = await API.get('/orders', getAuthHeader());
      const sortedData = Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
      
      // Live Notification Logic
      if (prevOrderCount !== 0 && sortedData.length > prevOrderCount) {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-[#ff9900]`}>
            <div className="flex-1 w-0 p-5">
              <div className="flex items-start">
                <ShoppingBag className="h-10 w-10 text-emerald-600 bg-emerald-50 p-2 rounded-full" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-bold text-gray-900">New Village Order!</p>
                  <p className="mt-1 text-xs text-gray-500 font-medium">Customer: {sortedData[0].customer?.fullName || 'Sankalp User'}</p>
                </div>
              </div>
            </div>
          </div>
        ), { duration: 5000, position: 'top-center' });
      }

      setOrders(sortedData);
      setPrevOrderCount(sortedData.length);
    } catch (err) {
      console.error("Sync Failure");
    } finally {
      setLoading(false);
    }
  }, [prevOrderCount]);

  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(() => fetchAllOrders(true), 30000);
    return () => clearInterval(interval);
  }, [fetchAllOrders]);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const { data } = await API.put(`/orders/${id}/status`, { status: newStatus }, getAuthHeader());
      setOrders(prev => prev.map(o => o._id === id ? data : o));
      toast.success(`Logistics: ${newStatus}`, {
        style: { background: '#065f46', color: '#fff', fontWeight: 'bold' }
      });
    } catch (err) {
      toast.error("Handshake Failed");
    } finally {
      setUpdatingId(null);
    }
  };

  // Calculation Logic for Analytics
  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((acc, curr) => acc + curr.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const transitOrders = orders.filter(o => o.status === 'Shipped').length;

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFDFD]">
      <Loader2 className="animate-spin text-[#ff9900]" size={40} />
      <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">Syncing Node...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-slate-900 font-sans pb-20">
      <Toaster />
      
      {/* 1. TOP NAVIGATION */}
      <nav className="bg-[#131921] text-white p-3 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
            SANKALP <span className="text-[#ff9900] text-sm font-normal bg-white/10 px-2 py-0.5 rounded">SELLER CENTRAL</span>
          </h1>
          <div className="hidden lg:flex gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <span className="text-white border-b-2 border-emerald-500 pb-1 cursor-pointer">Logistics Feed</span>
            <span className="hover:text-white cursor-pointer transition-colors">Inventory</span>
            <span className="hover:text-white cursor-pointer transition-colors">Supplier Map</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <p className="text-[10px] font-bold text-emerald-400 animate-pulse">● LIVE SYNC ACTIVE</p>
           <button onClick={() => fetchAllOrders()} className="text-slate-300 hover:text-white transition-colors">
              <RefreshCw size={18} />
           </button>
        </div>
      </nav>

      <div className="max-w-[1500px] mx-auto p-4 md:p-10">
        
        {/* 2. ANALYTICS BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Confirmed Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={<TrendingUp className="text-emerald-600" />} trend="Delivered Orders" />
          <StatCard title="Action Required" value={pendingOrders} icon={<AlertTriangle className="text-[#ff9900]" />} trend="New Requests" color="border-l-4 border-[#ff9900]" />
          <StatCard title="In Transit" value={transitOrders} icon={<Truck className="text-blue-600" />} trend="Farm-to-Door" />
          <StatCard title="Total Volume" value={orders.length} icon={<Users className="text-purple-600" />} trend="Lifetime Orders" />
        </div>

        {/* 3. TABLE SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* FILTER HEADER */}
          <div className="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
             <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input type="text" placeholder="Search by Order ID or Customer Name..." className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-[#ff9900] outline-none text-sm" />
             </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded font-bold text-xs hover:bg-slate-100 uppercase tracking-wider text-slate-600 transition-all">
                   <Filter size={14} /> Filter
                </button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="p-4 pl-8">Order Summary</th>
                  <th className="p-4">Logistics Details</th>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Settlement</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-50/20 transition-colors text-sm">
                    {/* Date & Badge */}
                    <td className="p-5 pl-8 align-top">
                       <p className="font-black text-slate-900">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                       <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100 mt-1 inline-block">FARM_DIRECT</span>
                    </td>

                    {/* ID & Map */}
                    <td className="p-5 align-top">
                       <p className="text-blue-600 font-bold hover:underline cursor-pointer">#{order._id.slice(-10).toUpperCase()}</p>
                       <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-1"><MapPin size={12} /> {order.customer?.city || 'Mumbai'}</p>
                    </td>

                    {/* Name */}
                    <td className="p-5 align-top">
                       <p className="font-bold text-slate-800">{order.customer?.fullName || 'Anonymous'}</p>
                       <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{order.customer?.email}</p>
                    </td>

                    {/* Status Badge */}
                    <td className="p-5 align-top text-center">
                       <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter border ${
                        order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                        order.status === 'Shipped' ? 'bg-blue-50 border-blue-500 text-blue-700' :
                        'bg-amber-50 border-[#ff9900] text-amber-800'
                       }`}>
                        {order.status}
                       </span>
                    </td>

                    {/* Total */}
                    <td className="p-5 text-right font-black text-slate-900 align-top">
                       ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-5 text-center align-top min-w-[180px]">
                       {updatingId === order._id ? (
                        <Loader2 className="animate-spin text-[#ff9900] mx-auto" />
                       ) : (
                        <div className="flex flex-col gap-2">
                            {order.status === 'Pending' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'Shipped')} className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white py-2 rounded font-black text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2">
                                   <Truck size={14}/> Dispatch Order
                                </button>
                            )}
                            {order.status === 'Shipped' && (
                                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-black text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2">
                                   <CheckCircle size={14}/> Complete Delivery
                                </button>
                            )}
                            {order.status === 'Delivered' && (
                               <div className="text-emerald-600 font-bold text-[10px] py-2 uppercase flex items-center justify-center gap-1">
                                  <Package size={14}/> Manifest Closed
                               </div>
                            )}
                            <button className="text-blue-600 text-[10px] font-bold hover:underline flex items-center justify-center gap-1">
                               View Order <ExternalLink size={10} />
                            </button>
                        </div>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {orders.length === 0 && (
            <div className="p-20 text-center">
              <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">No logistics data found for the current period.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stats
const StatCard = ({ title, value, icon, trend, color = "border-l-4 border-emerald-500" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 ${color} flex justify-between items-start hover:shadow-md transition-all`}>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      <p className="text-[10px] mt-2 text-slate-400 font-bold uppercase tracking-tighter">{trend}</p>
    </div>
    <div className="p-3 bg-slate-50 rounded-lg">
      {icon}
    </div>
  </div>
);

export default AdminOrders;