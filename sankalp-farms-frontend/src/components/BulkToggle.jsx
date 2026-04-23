import React from 'react';
import { motion } from 'framer-motion';

const BulkToggle = ({ isBulk, setIsBulk }) => {
  return (
    <div className="flex flex-col items-center mb-12">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
        Select Pricing Mode
      </p>
      <div 
        onClick={() => setIsBulk(!isBulk)}
        className="relative w-64 h-14 bg-stone-100 rounded-full p-1.5 cursor-pointer flex items-center"
      >
        {/* The Sliding Background */}
        <motion.div 
          animate={{ x: isBulk ? 120 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-32 h-11 bg-white rounded-full shadow-md z-10"
        />
        
        <div className={`relative z-20 w-1/2 text-center text-[11px] font-black uppercase transition-colors duration-300 ${!isBulk ? 'text-slate-900' : 'text-slate-400'}`}>
          Retail
        </div>
        <div className={`relative z-20 w-1/2 text-center text-[11px] font-black uppercase transition-colors duration-300 ${isBulk ? 'text-orange-600' : 'text-slate-400'}`}>
          Village Bulk
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-green-600 italic">
        {isBulk ? "✨ You're getting the direct farm rates!" : "Save more by switching to Bulk mode"}
      </p>
    </div>
  );
};

export default BulkToggle;