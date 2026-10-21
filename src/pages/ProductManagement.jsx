import { useEffect, useState } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productApi.js'

const emptyForm = { name: '', price: '', category: 'Computer', icon: '📦', description: '' }
const categoryOptions = ['Computer', 'Audio', 'Fashion', 'Gadget']

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลสินค้าได้ ตรวจสอบว่า Mock API (npm run api) เปิดอยู่หรือไม่')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function openAddModal() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setIsModalOpen(true)
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category || 'Computer',
      icon: product.icon || '📦',
      description: product.description || '',
    })
    setFormError('')
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const name = form.name.trim()
    const price = Number(form.price)

    if (!name) {
      setFormError('กรุณากรอกชื่อสินค้า')
      return
    }
    if (!price || price <= 0) {
      setFormError('ราคาต้องมากกว่า 0')
      return
    }

    const payload = {
      name,
      price,
      category: form.category,
      icon: form.icon || '📦',
      description: form.description,
    }

    setSaving(true)
    setFormError('')
    try {
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }
      closeModal()
      await loadProducts()
    } catch (err) {
      setFormError('บันทึกข้อมูลไม่สำเร็จ ลองใหม่อีกครั้ง')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('ต้องการลบสินค้านี้ใช่หรือไม่?')
    if (!confirmed) return

    try {
      await deleteProduct(id)
      await loadProducts()
    } catch (err) {
      setError('ลบสินค้าไม่สำเร็จ ลองใหม่อีกครั้ง')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={openAddModal}>
          + Add Product
        </button>
      </div>

      {loading && <p className="text-center text-gray-500 py-10">Loading...</p>}

      {!loading && error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button className="underline" onClick={loadProducts}>Retry</button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 py-10">ยังไม่มีสินค้าในระบบ</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.icon || '📦'} {product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">฿{Number(product.price).toLocaleString('en-US')}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(product)} className="bg-sky-600 text-white px-3 py-1 rounded text-sm">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Product' : 'Add Product'}</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-3 rounded-lg w-full"
                required
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              >
                {categoryOptions.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="📦"
                className="border p-3 rounded-lg w-full"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Product description"
                className="border p-3 rounded-lg w-full"
                rows={3}
              />

              {formError && <p className="text-red-600 text-sm">{formError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg border">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
