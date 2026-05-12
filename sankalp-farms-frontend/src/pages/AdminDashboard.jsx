import React, { useEffect, useState, useCallback } from 'react';
import { 
  TrendingUp, Users, Package, AlertTriangle, 
  ArrowUpRight, ShoppingBag, BarChart3, Loader2, Truck, Plus 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

// --- SUB-COMPONENT: STAT CARD ---
const DashboardStat = ({ title, value, icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-slate-700`}>
        {icon}
      </div>
      <span className="flex items-center text-emerald-500 text-[10px] font-black italic">
        LIVE SYNC <ArrowUpRight size={12} className="ml-1" />
      </span>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{title}</p>
      <p className="text-[10px] text-slate-400 mt-3 font-medium">{subtext}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // Added to make Inventory dynamic
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthHeader = useCallback(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo?.token ? { headers: { Authorization: `Bearer ${userInfo.token}` } } : {};
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching both for a truly dynamic UI
        const [orderRes, productRes] = await Promise.all([
          API.get('/orders', getAuthHeader()),
          API.get('/products', getAuthHeader())
        ]);
        setOrders(Array.isArray(orderRes.data) ? orderRes.data : []);
        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
      } catch (err) {
        console.error("Dashboard Sync Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [getAuthHeader]);

  // --- DYNAMIC CALCULATIONS ---
  const totalRevenue = orders
    .filter(o => o.status === 'Delivered')
    .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const transitCount = orders.filter(o => o.status === 'Shipped').length;
  const totalVolume = orders.length;

  // --- LOGIC: STOCK STATUS CALCULATOR ---
  const getStockStatus = (count) => {
    if (count <= 5) return { label: 'Critical', color: 'bg-red-500', width: 'w-[15%]' };
    if (count <= 20) return { label: 'Low', color: 'bg-orange-500', width: 'w-[45%]' };
    return { label: 'High', color: 'bg-emerald-500', width: 'w-[90%]' };
  };

  const getChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dataMap = days.map(day => ({ name: day, sales: 0 }));
    orders.forEach(order => {
      const dayName = days[new Date(order.createdAt).getDay()];
      const dayObj = dataMap.find(d => d.name === dayName);
      if (dayObj) dayObj.sales += Number(order.totalAmount) || 0;
    });
    return dataMap;
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#fcfaf7]">
      <Loader2 className="animate-spin text-[#ff9900]" size={40} />
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Sankalp Intelligence...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] p-6 lg:p-10 pb-24 font-sans text-slate-900">
      
      {/* 1. CORRECTED HEADER UI */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
            Intelligence<span className="text-[#ff9900]">.</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
            Real-time Logistics Monitoring Dashboard
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => navigate('/admin/add-product')}
            className="group bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-[#ff9900] transition-all flex items-center gap-3"
          >
            <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            Onboard New Product
          </button>
          
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-2xl flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase">Gateway Active</span>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardStat 
          title="Net Revenue" 
          value={`₹${totalRevenue.toLocaleString('en-IN')}`} 
          icon={<TrendingUp size={22}/>} 
          color="bg-emerald-500"
          subtext="Settled Earnings"
        />
        <DashboardStat 
          title="New Requests" 
          value={pendingCount} 
          icon={<AlertTriangle size={22}/>} 
          color="bg-orange-500"
          subtext="Pending Fulfillment"
        />
        <DashboardStat 
          title="In Transit" 
          value={transitCount} 
          icon={<Truck size={22}/>} 
          color="bg-blue-500"
          subtext="Logistics Movement"
        />
        <DashboardStat 
          title="Total Volume" 
          value={totalVolume} 
          icon={<Package size={22}/>} 
          color="bg-slate-900"
          subtext="Platform Orders"
        />
      </div>

      {/* 3. DYNAMIC ANALYTICS & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE VELOCITY CHART */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
              <BarChart3 size={18} className="text-[#ff9900]"/> Revenue Velocity (Weekly)
            </h4>
            <span className="text-[10px] font-black text-slate-300 uppercase">Live Updates</span>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} fontWeight={800} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  labelStyle={{fontWeight: '900', color: '#1e293b'}}
                />
                <Bar dataKey="sales" radius={[12, 12, 12, 12]} barSize={45}>
                  {getChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sales > 0 ? '#ff9900' : '#f1f5f9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LOGISTICS & INVENTORY */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] text-white p-8 rounded-[2.5rem] shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Dynamic Stock Health</h4>
            <div className="space-y-6">
              {products.length > 0 ? products.slice(0, 3).map((item) => {
                const status = getStockStatus(item.countInStock);
                return (
                  <InventoryBar 
                    key={item._id}
                    label={item.name} 
                    stock={status.label} 
                    progress={status.width} 
                    color={status.color} 
                  />
                );
              }) : (
                <p className="text-xs text-slate-500 italic">No products found...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Latest Settlement</h4>
             {orders.length > 0 ? (
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#ff9900]/10 flex items-center justify-center text-[#ff9900]">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 truncate max-w-[120px]">{orders[0].customer?.fullName || 'Guest User'}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Order #{orders[0]._id.slice(-6).toUpperCase()}</p>
                    </div>
                 </div>
                 <p className="text-sm font-black text-[#062d24]">₹{orders[0].totalAmount}</p>
               </div>
             ) : <p className="text-xs text-slate-400">Awaiting transactions...</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- HELPER: INVENTORY BAR ---
const InventoryBar = ({ label, stock, progress, color }) => (
  <div>
    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
      <span className="truncate max-w-[150px]">{label}</span>
      <span className={`${stock === 'Critical' ? 'text-red-400' : 'text-slate-400'}`}>{stock}</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${progress} ${color} rounded-full transition-all duration-1000`} />
    </div>
  </div>
);

export default AdminDashboard;