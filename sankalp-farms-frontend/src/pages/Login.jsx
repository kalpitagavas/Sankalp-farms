import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

 
  // Fix: By selecting .auth here, we don't need to type t.auth.something later
   const { t } = useTranslation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 flex items-start justify-center bg-[#fcfaf7] overflow-hidden p-4 pt-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full h-[min(550px,85vh)] bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#062d24] to-[#0a4d3c] p-10 text-white flex-col justify-between relative">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none text-orange-500">
             <Leaf size={300} />
          </div>
          
          <div className="z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-7 w-7 bg-orange-600 rounded-lg flex items-center justify-center">
                <Leaf size={14} className="text-white" />
              </div>
              <span className="font-bold tracking-tighter text-sm uppercase">Sankalp</span>
            </div>
            {/* Fix: Changed t.auth.welcomeBack to t.welcomeBack */}
            <h2 className="text-3xl font-bold leading-tight mb-4">{t('auth.welcomeBack')}</h2>
          </div>

          <div className="z-10">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-widest font-black text-orange-400 mb-1">{t('auth.didYouKnow')}</p>
              <p className="text-[11px] italic text-stone-200">"{t('auth.factText')}"</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t('auth.loginTitle')}</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t('auth.loginSubtitle')}</p>
          </div>

          <form className="space-y-4 max-w-sm w-full">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('auth.emailLabel')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  name="email" type="email" required placeholder={t('auth.emailPlaceholder')}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none text-xs font-medium transition-all"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">{t('auth.passwordLabel')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  name="password" type={showPass ? "text" : "password"} required placeholder={t('auth.passwordPlaceholder')}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-orange-500 outline-none text-xs font-medium transition-all"
                  onChange={handleInputChange}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-orange-600">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-orange-600 transition-colors">
                {t('auth.forgotPassword')}
              </button>
            </div>

            <button className="w-full bg-[#062d24] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-200">
              {t('auth.loginButton')} <ArrowRight size={14} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 font-bold text-[9px] uppercase tracking-widest">
            {t('auth.newToSankalp')} <Link to="/register" className="text-orange-800 font-black">{t('auth.joinUsLink')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;