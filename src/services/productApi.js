// รวม fetch() ที่เรียก Mock REST API (JSON Server) ไว้ในไฟล์เดียว
// ไม่ให้ Component แต่ละหน้าต้องเขียน fetch() เองซ้ำๆ

const BASE_URL = 'http://localhost:3001/products'

// GET - อ่านสินค้าทั้งหมด
export async function getProducts() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error('โหลดข้อมูลสินค้าไม่สำเร็จ')
  }
  return response.json()
}

// GET - อ่านสินค้าชิ้นเดียวตาม id
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error('ไม่พบสินค้า')
  }
  return response.json()
}

// POST - เพิ่มสินค้าใหม่
export async function createProduct(product) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('เพิ่มสินค้าไม่สำเร็จ')
  }
  return response.json()
}

// PUT - แทนที่ข้อมูลสินค้าเดิมทั้งรายการ
export async function updateProduct(id, product) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('แก้ไขสินค้าไม่สำเร็จ')
  }
  return response.json()
}

// DELETE - ลบสินค้า
export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('ลบสินค้าไม่สำเร็จ')
  }
}
