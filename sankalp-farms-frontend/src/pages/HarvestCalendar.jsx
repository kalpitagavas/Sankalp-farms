import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const harvestData = [
  {
    id: 1,
    month: "March - May",
    title: "The Golden Era",
    product: "Ratnagiri Alphonso",
    region: "Konkan Coast",
    description: "The 'King of Mangoes' arrives. Hand-picked when the skin turns a specific shade of amber. Naturally ripened in hay.",
    status: "In Season",
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    month: "June - August",
    title: "Monsoon Magic",
    product: "Wild Jamun & Karvanda",
    region: "Konkan / Western Ghats",
    description: "Deep purple, antioxidant-rich berries that thrive in heavy rains. Collected by local tribes in the Sahyadri ranges.",
    status: "Upcoming",
    color: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1628514197022-772921074da8?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    month: "September - November",
    title: "Spice Harvest",
    product: "Resham Patti Chillies",
    region: "Gujarat Heartland",
    description: "After the rains, the Gujarat sun dries these vibrant red chillies to perfection. Known for their medium heat and rich color.",
    status: "Planning",
    color: "bg-red-600",
    image: "https://images.unsplash.com/photo-1599940824399-b87987cb9723?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    month: "December - February",
    title: "Winter Staples",
    product: "Organic Peanuts & Sesame",
    region: "Saurashtra, Gujarat",
    description: "High-oil content seeds harvested in the cool winter air. Perfect for traditional winter snacks and cold-pressed oils.",
    status: "Available Year-Round",
    color: "bg-yellow-700",
    image: "https://images.unsplash.com/photo-1526462317567-567cc644a389?auto=format&fit=crop&q=80"
  }
];

const HarvestCalendar = () => {
  const [activeTab, setActiveTab] = useState(harvestData[0]);

  return (
    <div className="min-h-screen bg-white text-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-black uppercase tracking-[0.3em] text-xs"
          >
            Nature's Timetable
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mt-4">
            The Harvest <br /> <span className="text-slate-200">Calendar.</span>
          </h1>
          <p className="mt-8 text-slate-500 max-w-lg text-lg font-medium">
            We don't force growth. We follow the rhythm of the soil in Konkan and Gujarat to bring you produce at its peak nutrition.
          </p>
        </div>

        {/* Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Navigation Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {harvestData.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setActiveTab(item)}
                className={`cursor-pointer p-8 rounded-3xl transition-all duration-300 border-2 ${
                  activeTab.id === item.id 
                  ? 'border-slate-900 bg-slate-900 text-white shadow-2xl scale-105' 
                  : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${activeTab.id === item.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                    {item.month}
                  </span>
                  {activeTab.id === item.id && (
                    <motion.div layoutId="circle" className="w-2 h-2 bg-green-400 rounded-full" />
                  )}
                </div>
                <h3 className="text-2xl font-black mt-4 tracking-tight">{item.product}</h3>
                <p className={`text-sm mt-1 font-bold ${activeTab.id === item.id ? 'text-slate-400' : 'text-slate-400'}`}>
                  {item.region}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Visual Display */}
          <div className="lg:col-span-7 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src={activeTab.image} 
                  alt={activeTab.product} 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-white text-5xl font-black tracking-tighter mb-4 italic">
                      "{activeTab.title}"
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                      {activeTab.description}
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full animate-pulse ${activeTab.color}`} />
                      <span className="text-white font-black uppercase text-xs tracking-widest">
                        Status: {activeTab.status}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Ticker */}
        <div className="mt-32 border-t border-slate-100 pt-10">
           <p className="text-center text-slate-400 font-bold text-sm tracking-widest uppercase">
             • Fresh Procurement • Direct from Farmers • Sankalp Quality Guarantee •
           </p>
        </div>

      </div>
    </div>
  );
};

export default HarvestCalendar;