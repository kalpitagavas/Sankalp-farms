import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/product'
import { motion, AnimatePresence } from 'framer-motion' // Add AnimatePresence
import { useCart } from '../context/CartContext'

const Product = () => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null) // State for Modal
 const {addToCart}=useCart()
  const categories = ["All", "Spices", "Dry Fruits", "Fruits", "Oils"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header section remains the same */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
          Direct from <span className="text-orange-600">Konkan</span> & <span className="text-yellow-600">Gujarat</span>
        </h2>
        
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <input 
              type="search" 
              placeholder='Search products...' 
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-600/20 transition-all font-medium text-gray-900"
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
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The Grid - Added onClick to cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} onClick={() => setSelectedProduct(item)} className="cursor-pointer">
              <ProductCard product={item} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No products match</p>
          </div>
        )}
      </div>

      {/* --- QUICK VIEW MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 bg-stone-100 h-64 md:h-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 font-bold text-xl"
                >✕</button>
                
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-4 block">
                  {selectedProduct.category}
                </span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
                  {selectedProduct.name}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 italic">
                  "{selectedProduct.description}"
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-black text-slate-900">₹{selectedProduct.price}</span>
                  <span className="text-slate-300 font-bold text-sm">/ {selectedProduct.unit}</span>
                </div>

                <button 
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-colors"
                  onClick={() => {
                  addToCart(selectedProduct)
                    setSelectedProduct(null);
                  }}
                >
                  Add To Basket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Product;