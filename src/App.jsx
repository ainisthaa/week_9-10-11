import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Route ทุกตัวอยู่ภายใต้ Layout เดียวกัน จึงใช้ Navbar และ Footer ร่วมกันได้ */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* URL ที่ไม่ตรงกับ Route ไหนเลย */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
