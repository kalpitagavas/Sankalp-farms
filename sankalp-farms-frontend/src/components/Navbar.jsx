import React, { useState, useRef, useEffect } from 'react';
import logoImg from '../assets/logo.png'; 
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const { t, i18n } = useTranslation();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const langRef = useRef(null);
  const totalItem = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी', short: 'MR' },
    { code: 'hi', label: 'हिन्दी', short: 'HI' },
    { code: 'gu', label: 'ગુજરાતી', short: 'GU' }
  ];

  const currentLang = languages.find(l => l.code === (i18n.language || 'en')) || languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* --- LEFT: LOGO & MOBILE TOGGLE --- */}
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600 active:scale-90"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <span className={`h-0.5 w-full bg-current rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-current rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          <Link to="/" className="group flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="h-10 w-10 object-contain group-hover:rotate-12 transition-transform" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                SANKALP<span className="text-emerald-600">.</span>
              </h1>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Farms • Village Fresh</p>
            </div>
          </Link>
        </div>

        {/* --- CENTER: MAIN NAV --- */}
        <div className="hidden md:flex gap-10 justify-center">
          <Link to="/product" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors">
            {t('nav.products') || 'Collection'}
          </Link>
          <Link to="/story" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors">
            {t('nav.story') || 'Our Story'}
          </Link>
        </div>

        {/* --- RIGHT: ACTIONS (AUTH, LANG, CART) --- */}
        <div className="flex items-center justify-end gap-3 md:gap-5 flex-1">
          
          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-5 border-r border-slate-100 pr-5">
            <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600">
              {t('nav.login') || 'Sign In'}
            </Link>
            <Link to="/register" className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
              {t('nav.register') || 'Join'}
            </Link>
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Lang</span>
                <span className="text-[10px] font-black text-slate-800 uppercase">{currentLang.short}</span>
              </div>
              <motion.span animate={{ rotate: isLangOpen ? 180 : 0 }} className="text-[10px] text-slate-400">▼</motion.span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl p-2"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${i18n.language === lang.code ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="group relative h-11 w-11 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItem > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] min-w-[20px] h-5 rounded-full flex items-center justify-center font-black border-2 border-white animate-bounce">
                {totalItem}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-white border-t border-slate-50 overflow-hidden">
            <div className="p-6 flex flex-col gap-4">
              <Link to="/product" className="text-sm font-black uppercase tracking-widest text-slate-600 py-2 border-b border-slate-50">{t('nav.products') || 'Collection'}</Link>
              <Link to="/story" className="text-sm font-black uppercase tracking-widest text-slate-600 py-2">{t('nav.story') || 'Our Story'}</Link>
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/login" className="text-sm font-black uppercase tracking-widest text-slate-400">Sign In</Link>
                <Link to="/register" className="w-full bg-slate-900 text-white text-center py-4 rounded-xl text-sm font-black uppercase tracking-widest">Create Account</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;