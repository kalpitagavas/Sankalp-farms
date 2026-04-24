import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Leaf, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axiosConfig';
// import { toast } from 'react-hot-toast'; // Optional: for notifications

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send request to your backend
      const response = await API.post('/users/register', formData);
      
      // 2. Extract token/user if your API returns it on registration
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        // If you're using a Context API or Redux for Auth:
        // dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      }
      // 3. Feedback (Optional: use react-hot-toast)
      console.log("Registration Successful!");

      // 4. Redirect after a short delay
      setTimeout(() => {
        navigate('/login'); // Or '/dashboard' if they are auto-logged in
      }, 500);

    } catch (error) {
      // 5. Catch specific backend errors (e.g., "Email already exists")
      const errorMessage = error.response?.data?.message || "Something went wrong";
      console.error("Registration failed:", errorMessage);
      // alert(errorMessage); // Replace with a nice UI Toast
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-start justify-center bg-[#fcfaf7] overflow-hidden p-4 pt-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full h-[min(580px,85vh)] bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col md:flex-row-reverse"
      >
        {/* Right Side: Visual Branding */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#062d24] to-[#0a4d3c] p-6 text-white flex-col justify-between relative">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={16} className="text-orange-400" />
              <span className="font-bold tracking-tighter text-sm uppercase">Sankalp</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-4">
              Freshness from <br/>
              <span className="text-orange-500 font-extrabold text-3xl">Konkan</span> & <span className="text-yellow-500 font-extrabold text-3xl">Gujarat</span>
            </h2>
            <div className="space-y-2 opacity-90">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Konkan</p>
                <p className="text-xs">Authentic Alphonso & Spices</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Gujarat</p>
                <p className="text-xs">Traditional Snacks & Pure Oils</p>
              </div>
            </div>
          </div>
          <p className="text-[9px] font-medium text-stone-500 uppercase tracking-[0.2em]">Village Artisan Direct</p>
        </div>

        {/* Left Side: Form */}
        <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900">{t('auth.registerTitle')}</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t('auth.registerSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 max-w-sm w-full">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400 ml-1">{t('auth.nameLabel')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  required
                  name="name" 
                  type="text" 
                  placeholder={t('auth.namePlaceholder')} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400 ml-1">{t('auth.emailLabel')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  required
                  name="email" 
                  type="email" 
                  placeholder={t('auth.emailPlaceholder')} 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase text-slate-400 ml-1">{t('auth.passwordLabel')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  required
                  name="password" 
                  type={showPass ? "text" : "password"} 
                  placeholder={t('auth.passwordPlaceholder')} 
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" 
                  onChange={handleInputChange} 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-orange-600">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#062d24] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center justify-center gap-2 hover:bg-orange-700 disabled:opacity-70 disabled:hover:bg-[#062d24] transition-all shadow-lg shadow-stone-200"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <>
                  {t('auth.registerButton')} <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-[9px] font-bold uppercase tracking-widest">
            {t('auth.alreadyMember')} <Link to="/login" className="text-orange-800 font-black">{t('auth.signInLink')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;