import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/product'
import { motion } from 'framer-motion' 
import { useTranslation } from 'react-i18next' // 1. Import the hook

const Product = () => {
  const { t } = useTranslation(); // 2. Initialize translation function
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const navigate = useNavigate();

  // 3. Categories should also be translated in your JSON files
  const categories = ["All", "Spices", "Konkan Roots", "Fruits", "Oils"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left pt-20">
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
          {/* 4. Use t() for the heading */}
          {t('productPage.titleFirst')} <span className="text-orange-600">{t('regions.konkan')}</span> & <span className="text-yellow-600">{t('regions.gujarat')}</span>
        </h2>
        
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <input 
              type="search" 
              // 5. Translate the placeholder
              placeholder={t('productPage.searchPlaceholder')} 
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all font-medium text-gray-900"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border
                  ${category === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
              >
                {/* 6. Translate category names */}
                {t(`categories.${cat.toLowerCase().replace(" ", "")}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate(`/product/${item.id}`)} 
              className="cursor-pointer group"
            >
              <div className="transition-transform duration-500 group-hover:-translate-y-2">
                <ProductCard product={item} />
                
                <div className="mt-4 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                     {t('productPage.viewDetails')} →
                   </span>
                   <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                     {t('productPage.farmFresh')}
                   </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
               {t('productPage.noResults')}
             </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product;