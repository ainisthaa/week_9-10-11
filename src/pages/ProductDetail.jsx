import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../models/productModel.js'

function ProductDetail() {
  // useParams อ่านค่าจาก URL เช่น /products/3 จะได้ id = "3" (เป็น string)
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-xl font-bold text-gray-700">Product not found</p>
        <p className="text-gray-500 mt-2">ไม่พบสินค้าหมายเลข {id}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          กลับไปหน้า Products
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
      <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-7xl">
        {product.icon}
      </div>
      <p className="text-xs text-gray-400 uppercase mt-4">{product.category}</p>
      <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
      <p className="text-2xl font-bold text-blue-600 mt-2">฿{product.price.toLocaleString()}</p>
      <p className="text-gray-600 mt-4">{product.description}</p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
        {/* ปุ่ม Continue Shopping ตามโจทย์ Assignment Week 9 */}
        <Link
          to="/products"
          className="flex-1 text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default ProductDetail
