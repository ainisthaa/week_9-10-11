import { Link } from 'react-router-dom'
import { getProducts } from '../models/productModel.js'

function Products() {
  const products = getProducts()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
              {product.icon}
            </div>
            <p className="text-xs text-gray-400 uppercase mt-3">{product.category}</p>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-blue-600 font-bold mt-1">฿{product.price.toLocaleString()}</p>
            <Link
              to={`/products/${product.id}`}
              className="mt-auto pt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              View Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
