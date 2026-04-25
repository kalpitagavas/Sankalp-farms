import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' 
import { useTranslation } from 'react-i18next'
import { Plus, ShoppingBasket } from 'lucide-react' // Added icons
import { useCart } from '../context/CartContext'   // Added Cart Context
import ProductCard from '../components/ProductCard'
import API from '../api/axiosConfig'

const Product = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart(); // Destructure cart functions
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Spices", "Konkan Roots", "Fruits", "Oils"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/product/');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching Sankalp products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handler for direct add to cart
  const handleQuickAdd = (e, item) => {
    e.stopPropagation(); // Prevents navigating to the product detail page
    addToCart(item);
    setIsCartOpen(true); // Automatically slide open the cart sidebar
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 text-center md:text-left pt-20">
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
          {t('productPage.titleFirst')}{' '}
          <span className="text-orange-600">{t('regions.konkan')}</span> &{' '}
          <span className="text-yellow-600">{t('regions.gujarat')}</span>
        </h2>
        
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <input 
              type="search" 
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
                {t(`categories.${cat.toLowerCase().replace(" ", "")}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-80 w-full bg-slate-50 animate-pulse rounded-[2.5rem]" />
          ))
        ) : filteredProducts.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative cursor-pointer group" // Added relative for positioning button
                onClick={() => navigate(`/product/${item._id}`)} 
              >
                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                  <ProductCard product={item} />
                  
                  {/* Floating Add to Cart Button */}
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="absolute top-6 right-6 p-4 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 hover:bg-green-600 hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </button>

                  <div className="mt-4 flex justify-between items-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2">
                      <ShoppingBasket size={12} /> {t('productPage.viewDetails')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                      {t('productPage.farmFresh')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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