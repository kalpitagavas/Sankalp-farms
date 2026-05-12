import React, { useState } from 'react';
import { 
  Package, MapPin, Plus, Loader2, Image as ImageIcon, 
  Layers, ArrowLeft, CheckCircle2, AlertCircle 
} from 'lucide-react';
import API from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    MRP: '',
    unit: '',
    category: 'Fruits',
    origin: 'Konkan',
    countInStock: '',
    isSeasonal: false,
    harvestMonth: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

 // Inside handleFormSubmit in AddProduct.jsx
const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const data = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      // Append the image
      if (image) data.append('image', image);
      
      // CRITICAL: Append the admin ID required by your schema
      if (userInfo && userInfo._id) {
          data.append('adminId', userInfo._id);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      // Ensure this matches your server.js: app.use('/api/product', productRoutes)
      await API.post('/product/createProduct', data, config);
      navigate('/admin');
    } catch (err) {
      console.error("Upload Failed", err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
};
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-900 font-sans selection:bg-[#ff9900]/20">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#fcfaf7]/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all"
          >
            <ArrowLeft size={16} /> Back to Hub
          </button>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-[#ff9900] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">New Entry Mode</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
            Onboard<span className="text-[#ff9900]">.</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mt-4">
            Expanding the Sankalp Digital Catalog
          </p>
        </header>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: CONTENT & IDENTITY (8 COLS) */}
          <div className="lg:col-span-7 space-y-10">
            <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9900] mb-8 flex items-center gap-2">
                <CheckCircle2 size={14} /> Product Identity
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Official Name</label>
                  <input 
                    name="name" 
                    onChange={handleInputChange} 
                    placeholder="e.g. Ratnagiri Alphonso Mango (A-Grade)" 
                    className="w-full mt-2 p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#ff9900] outline-none text-base font-bold transition-all" 
                    required 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">The Village Story (Description)</label>
                  <textarea 
                    name="description" 
                    rows="6" 
                    onChange={handleInputChange} 
                    className="w-full mt-2 p-6 bg-slate-50 border-none rounded-[2rem] text-sm font-bold outline-none resize-none leading-relaxed" 
                    placeholder="Describe the origin, taste, and the farmers behind this product..." 
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                    <select name="category" onChange={handleInputChange} className="w-full mt-2 p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none appearance-none cursor-pointer">
                      <option>Fruits</option>
                      <option>Snacks</option>
                      <option>Spices</option>
                      <option>Grains</option>
                      <option>Dairy</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Origin Region</label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-5 top-5 text-slate-300" size={18} />
                      <input name="origin" onChange={handleInputChange} placeholder="Konkan / Gujarat" className="w-full pl-14 pr-5 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: LOGISTICS & ACTION (5 COLS) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* PRICING & STOCK CARD */}
            <section className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                <Layers size={14} /> Commercials & Inventory
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Offer Price (₹)</label>
                    <input name="price" type="number" onChange={handleInputChange} className="w-full mt-2 p-4 bg-white/5 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#ff9900] outline-none" required />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">MRP (₹)</label>
                    <input name="MRP" type="number" onChange={handleInputChange} className="w-full mt-2 p-4 bg-white/5 border-none rounded-xl text-sm font-bold outline-none text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Qty</label>
                    <input name="countInStock" type="number" onChange={handleInputChange} className="w-full mt-2 p-4 bg-white/5 border-none rounded-xl text-sm font-bold outline-none" required />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sale Unit</label>
                    <input name="unit" onChange={handleInputChange} placeholder="1kg / Dozen" className="w-full mt-2 p-4 bg-white/5 border-none rounded-xl text-sm font-bold outline-none" />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest">Seasonal Availability</span>
                  <input type="checkbox" name="isSeasonal" onChange={handleInputChange} className="w-6 h-6 rounded-lg accent-[#ff9900] cursor-pointer" />
                </div>

                {formData.isSeasonal && (
                  <div className="animate-in fade-in zoom-in-95 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Harvest Month</label>
                    <input name="harvestMonth" onChange={handleInputChange} placeholder="April - June" className="w-full mt-2 p-4 bg-white/5 border-none rounded-xl text-sm font-bold outline-none" />
                  </div>
                )}
              </div>
            </section>

            {/* MEDIA CARD */}
            <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 relative group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-4 block">Product Hero Image</label>
              <div className="relative h-64 w-full rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#ff9900]">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-slate-200 mb-2" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-tighter text-slate-300 px-6">Upload High-Res Visual</p>
                  </div>
                )}
                <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
              </div>
            </section>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-[#ff9900] text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-orange-200 hover:bg-slate-900 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <> <Loader2 className="animate-spin" size={20} /> SYNCING DATA... </>
              ) : (
                <> <Plus size={20} strokeWidth={3} /> PUSH TO INVENTORY </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;