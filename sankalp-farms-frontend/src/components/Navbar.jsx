import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO SECTION - Wrapped in Link to go Home */}
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="h-16 w-16 flex items-center justify-center">
              <img 
                src={logoImg} 
                alt="Sankalp Farms Logo" 
                className="h-full w-full object-contain" 
              />
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-slate-200 mx-1"></div>
            
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                SANKALP<span className="text-green-600">.</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                Farms • Village Fresh
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Right Side - Links & Cart */}
        <div className="flex items-center gap-8">
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/story" 
              className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-green-600 transition-colors"
            >
              Our Story
            </Link>
            
            <Link 
              to="/product" 
              className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-green-600 transition-colors"
            >
              Our Products
            </Link>
          </div>
          
          {/* Cart Icon */}
          <Link to="/cart">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer p-2 bg-slate-50 rounded-full hover:bg-green-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="absolute top-0 right-0 bg-green-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                0
              </span>
            </motion.div>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;