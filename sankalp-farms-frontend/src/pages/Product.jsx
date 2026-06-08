import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, ShoppingBasket, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import API from '../api/axiosConfig';

const Product = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Spices',
    'Konkan Roots',
    'Fruits',
    'Oils',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/product/');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    setIsCartOpen(true);
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || item.category === category;

    return matchesSearch && matchesCategory;
  });

 return (
  <div className="min-h-screen bg-[#f6f7fb]">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 pt-14">

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Fresh Market
          </h1>

          <p className="text-gray-500 mt-2">
            Organic products from {t('regions.konkan')} & {t('regions.gujarat')}
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-96">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('productPage.searchPlaceholder')}
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-2xl
              bg-white
              border border-gray-200
              shadow-sm
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
              transition
            "
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all
              ${
                category === cat
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
              }
            `}
          >
            {t(`categories.${cat.toLowerCase().replace(' ', '')}`)}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-white rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigate(`/product/${item._id}`)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                  {/* IMAGE AREA (ProductCard stays) */}
                  <div className="relative">
                    <ProductCard product={item} />

                    {/* QUICK ADD */}
                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className="
                        absolute top-4 right-4
                        w-10 h-10
                        bg-white
                        rounded-full
                        shadow-md
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        hover:bg-black hover:text-white
                        transition-all
                      "
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* FOOTER */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">

                      <span className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </span>

                      <span className="text-xs text-green-600 font-bold">
                        Fresh
                      </span>

                    </div>

                    <div className="flex items-center justify-between mt-2">

                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <ShoppingBasket size={12} />
                        View
                      </span>

                      <span className="text-xs font-semibold text-gray-900">
                        ₹{item.price}
                      </span>

                    </div>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold">No Products Found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Product;