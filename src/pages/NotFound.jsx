import { Link } from 'react-router-dom'

// หน้านี้แสดงเมื่อ URL ไม่ตรงกับ Route ไหนเลย (path="*")
function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-gray-300">404</h1>
      <p className="text-xl font-bold text-gray-700 mt-4">ไม่พบหน้านี้</p>
      <p className="text-gray-500 mt-2">URL ที่เปิดไม่ตรงกับหน้าใดในระบบ</p>
      <Link to="/" className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
        กลับหน้าแรก
      </Link>
    </div>
  )
}

export default NotFound
