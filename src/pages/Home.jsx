import { Link } from 'react-router-dom'
import { getProducts } from '../models/productModel.js'

function Home() {
  // เอามาแสดงแค่ 3 ชิ้นแรกเป็นสินค้าแนะนำ
  const featured = getProducts().slice(0, 3)

  return (
    <div>
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-600">MiniShop</h1>
        <p className="mt-3 text-gray-600">ร้านค้าออนไลน์เล็กๆ ของเรา ของดีราคาถูก</p>
        <Link to="/products" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          ดูสินค้าทั้งหมด
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow p-5 text-center">
              <div className="text-5xl">{product.icon}</div>
              <h3 className="font-bold mt-3">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">฿{product.price.toLocaleString()}</p>
              <Link
                to={`/products/${product.id}`}
                className="inline-block mt-3 text-sm border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                ดูรายละเอียด
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
