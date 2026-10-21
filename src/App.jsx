import { Routes, Route } from 'react-router-dom'

// หน้าร้าน (Week 9)
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

// หน้า Admin (Week 10-11)
import AdminLayout from './components/AdminLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProductManagement from './pages/ProductManagement.jsx'

export default function App() {
  return (
    <Routes>
      {/* หน้าร้าน ทุก Route อยู่ภายใต้ Layout เดียวกัน ใช้ Navbar/Footer ร่วมกัน */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ฝั่งหลังร้าน ใช้ AdminLayout แยกจากหน้าร้าน */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductManagement />} />
      </Route>

      {/* URL ที่ไม่ตรงกับ Route ไหนเลย */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
