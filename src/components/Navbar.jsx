import { NavLink } from 'react-router-dom'

// NavLink เหมือน Link แต่รู้ด้วยว่า URL ปัจจุบันตรงกับลิงก์ไหน
// ใช้ isActive เปลี่ยนสีลิงก์ของหน้าที่กำลังเปิดอยู่
function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          MiniShop
        </NavLink>
        <nav className="flex gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
