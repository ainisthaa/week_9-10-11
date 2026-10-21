import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

// Outlet คือตำแหน่งที่ React Router เอาหน้าลูกมาแสดง
// เวลาเปลี่ยน URL มีแค่ส่วนนี้ที่เปลี่ยน ส่วน Navbar กับ Footer อยู่เหมือนเดิม
function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © 2026 MiniShop. สร้างเพื่อการเรียน React.
      </footer>
    </div>
  )
}

export default Layout
