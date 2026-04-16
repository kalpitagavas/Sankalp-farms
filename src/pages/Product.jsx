import ProductCard from '../components/ProductCard'
import { products } from '../data/product'

const Product = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
          Direct from <span className="text-orange-600">Konkan</span> & <span className="text-yellow-600">Gujarat</span>
        </h2>
        <p className="text-gray-400 font-medium mt-2 italic">
          "Pure, unfiltered staples curated from our family roots."
        </p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Product