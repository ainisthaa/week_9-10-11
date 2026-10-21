# MiniShop React

โปรเจกต์ MiniShop ทำต่อเนื่องจาก Week 6-8 (React + Tailwind + Fake Store API) มาเพิ่ม Routing, REST API CRUD และ Admin UI ในสัปดาห์ 9-11

## การรัน

ต้องเปิด 2 Terminal พร้อมกัน

```
npm install

# Terminal 1 - Mock API (JSON Server)
npm run api

# Terminal 2 - React (Vite)
npm run dev
```

เปิดเว็บที่ http://localhost:5173
ตรวจ Mock API ได้ที่ http://localhost:3001/products

> สำรอง db.json ไว้ก่อนทดลอง CRUD เพราะ JSON Server จะเขียนทับไฟล์นี้จริง

## หน้าเว็บ

### หน้าร้าน (ใช้ข้อมูลจาก `src/models/productModel.js`)
- `/` Home - สินค้าแนะนำ
- `/about` About - ข้อมูลร้าน
- `/products` Products - สินค้าทั้งหมด
- `/products/:id` Product Detail - รายละเอียดสินค้าตาม ID ใน URL พร้อมปุ่ม Continue Shopping
- `/profile` Profile

### หลังร้าน / Admin (ใช้ข้อมูลจาก Mock REST API ผ่าน `src/services/productApi.js`)
- `/admin/dashboard` Dashboard - สรุปจำนวนสินค้า มูลค่ารวม จำนวนหมวดหมู่
- `/admin/products` Product Management - CRUD สินค้า (เพิ่ม/แก้ไข/ลบ) ผ่าน Modal Form มี Loading / Error / Validation

หน้าที่ URL ไม่ตรงกับ Route ไหนเลย จะเด้งไปหน้า Not Found

## โครงสร้างโปรเจกต์

```
minishop-dashboard/
├── db.json                     # ข้อมูลจำลองสำหรับ JSON Server
├── src/
│   ├── main.jsx                # ครอบ App ด้วย BrowserRouter
│   ├── App.jsx                 # กำหนด Routes ทั้งหมด
│   ├── models/
│   │   └── productModel.js     # ข้อมูลสินค้าของหน้าร้าน (static)
│   ├── services/
│   │   └── productApi.js       # fetch() เรียก Mock REST API (GET/POST/PUT/DELETE)
│   ├── components/
│   │   ├── Navbar.jsx / Layout.jsx          # Layout ฝั่งหน้าร้าน
│   │   ├── AdminLayout.jsx / ThemeToggle.jsx # Layout ฝั่ง Admin + Dark mode
│   └── pages/
│       ├── Home.jsx, About.jsx, Products.jsx, ProductDetail.jsx, Profile.jsx, NotFound.jsx
│       └── Dashboard.jsx, ProductManagement.jsx   # หน้า Admin
```

## Link, useNavigate, useParams ต่างกันอย่างไร

- **Link / NavLink**: ใช้สร้างลิงก์ให้ผู้ใช้คลิกเปลี่ยนหน้าเอง เช่นปุ่มเมนูใน Navbar หรือปุ่ม Continue Shopping (NavLink ต่างจาก Link ตรงที่รู้ด้วยว่าหน้าไหนกำลังเปิดอยู่ ใช้ทำสีลิงก์ Active)
- **useNavigate()**: ใช้สั่งเปลี่ยนหน้าจาก JavaScript โดยไม่ต้องให้ผู้ใช้กดลิงก์ เช่นหลังกดปุ่มแล้วเจอว่าไม่พบสินค้า ให้พาไปหน้า Products อัตโนมัติ
- **useParams()**: ใช้อ่านค่าที่อยู่ใน URL เอง เช่น `/products/3` จะอ่านได้ `id = "3"` (เป็น string เสมอ ต้องแปลงเป็นตัวเลขก่อนเทียบกับ id ในข้อมูล)

## REST API ที่ใช้ (Mock ด้วย JSON Server)

| Method | Endpoint | ใช้ทำอะไร |
|---|---|---|
| GET | /products | อ่านสินค้าทั้งหมด |
| GET | /products/:id | อ่านสินค้าชิ้นเดียว |
| POST | /products | เพิ่มสินค้าใหม่ |
| PUT | /products/:id | แก้ไขสินค้า (แทนที่ทั้งรายการ) |
| DELETE | /products/:id | ลบสินค้า |

ตัวอย่าง Request/Response ตอนเพิ่มสินค้า (POST /products):

Request body:
```json
{ "name": "Mouse", "price": 450, "category": "Computer", "icon": "🖱️", "description": "..." }
```

Response (201):
```json
{ "id": 5, "name": "Mouse", "price": 450, "category": "Computer", "icon": "🖱️", "description": "..." }
```

## Dark Mode

กดปุ่มมุมขวาบนของหน้า Admin เพื่อสลับ Light/Dark โดยค่าที่เลือกจะถูกจำไว้ใน `localStorage` ของเบราว์เซอร์ (key: `minishop-theme`) ต่อให้ Refresh หน้าก็ยังเป็น Theme เดิม
