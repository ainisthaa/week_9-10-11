// Model: เก็บข้อมูลสินค้าของหน้าร้าน (หน้า Home / Products / Product Detail)
// ในขั้นนี้ยังไม่ได้ต่อกับฐานข้อมูลจริง แค่เก็บไว้ในไฟล์เพื่อฝึกแยก Model ออกจาก View

const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 12900,
    icon: '💻',
    category: 'Computer',
    description: 'โน้ตบุ๊กสำหรับทำงานและเรียนออนไลน์ หน้าจอคมชัด แบตอึด',
  },
  {
    id: 2,
    name: 'Headphones',
    price: 1290,
    icon: '🎧',
    category: 'Audio',
    description: 'หูฟังไร้สาย เสียงดี ตัดเสียงรบกวนได้',
  },
  {
    id: 3,
    name: 'Backpack',
    price: 890,
    icon: '🎒',
    category: 'Fashion',
    description: 'กระเป๋าเป้ใส่โน้ตบุ๊กได้ ช่องเยอะ ใช้งานได้ทุกวัน',
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 2990,
    icon: '⌚',
    category: 'Gadget',
    description: 'นาฬิกาอัจฉริยะ วัดชีพจร แจ้งเตือนจากมือถือ',
  },
]

export function getProducts() {
  return products
}

// id ที่มาจาก URL จะเป็น string เสมอ เลยต้องแปลงเป็นตัวเลขก่อนเทียบ
export function getProductById(id) {
  const numericId = Number(id)
  return products.find((product) => product.id === numericId)
}
