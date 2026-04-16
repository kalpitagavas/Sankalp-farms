import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-100 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Logo & Info */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="Sankalp Farms" className="h-12 w-auto" />
              <h2 className="text-xl font-black tracking-tighter">
                SANKALP<span className="text-green-600">.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Pure, unfiltered staples from Konkan & Gujarat. Procured on order, delivered with care to Mumbai.
            </p>
          </div>

          {/* Quick Contact - Simple & Clean */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Us</h4>
            <p className="text-xs font-bold text-slate-700">📍 Malad West, Mumbai</p>
            <p className="text-xs font-bold text-slate-700">📞 +91 9XXXX XXXXX</p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Follow</h4>
            <div className="flex gap-4">
               {['Instagram', 'YouTube'].map((link) => (
                 <span key={link} className="text-xs font-bold text-slate-600 hover:text-green-600 cursor-pointer underline decoration-green-200 underline-offset-4">
                   {link}
                 </span>
               ))}
            </div>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            © 2026 SANKALP FARMS
          </p>
          <div className="px-3 py-1 bg-green-100 rounded-full">
            <span className="text-[8px] font-black text-green-700 uppercase tracking-tighter">
              Village Fresh • Unfiltered
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;