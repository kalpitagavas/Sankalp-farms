import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <span className="text-green-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Direct from our fields
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              Purity <br /> 
              <span className="text-green-600 italic">Redefined.</span>
            </h1>
            <p className="mt-8 text-slate-500 text-lg font-medium max-w-md leading-relaxed">
              Experience the authentic taste of Konkan and Gujarat, hand-picked 
              and delivered fresh to your Mumbai home. 
            </p>
            
            <div className="mt-10 flex gap-4">
              <Link to="/product">
                <button className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-green-600 transition-all shadow-xl">
                  Shop Harvest
                </button>
              </Link>
              <Link to="/story">
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all">
                  Our Story
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Decor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden md:block"
          >
            <div className="aspect-square bg-green-50 rounded-[4rem] relative overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80" 
                 alt="Fresh Produce" 
                 className="w-full h-full object-cover mix-blend-multiply opacity-80"
               />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100">
              <p className="text-slate-900 font-black text-2xl tracking-tighter">100%</p>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Natural Purity</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE COMBO TEASER */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Two Cultures. One <span className="text-green-600">Sankalp.</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Konkan Card */}
          <Link to="/product" className="group">
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
              <img src="https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Konkan" />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 flex flex-col justify-end p-10">
                <h3 className="text-white text-3xl font-black uppercase italic">Konkan</h3>
                <p className="text-orange-100 text-sm font-medium">Shop Coastal Treasures →</p>
              </div>
            </div>
          </Link>

          {/* Gujarat Card */}
          <Link to="/product" className="group">
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
              <img src="https://images.unsplash.com/photo-1599940824399-b87987cb9723?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Gujarat" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 flex flex-col justify-end p-10">
                <h3 className="text-white text-3xl font-black uppercase italic">Gujarat</h3>
                <p className="text-green-100 text-sm font-medium">Shop Heartland Staples →</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FRESHNESS TICKER */}
      <div className="bg-slate-900 py-4 overflow-hidden flex">
        <div className="whitespace-nowrap flex animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-white text-[10px] font-black uppercase tracking-[0.4em] mx-10">
               ✨ Fresh Procurement on Request • Sunday Delivery in Mumbai • No Preservatives ✨
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;