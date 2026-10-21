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
    <section className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Admin</li>
          <li>Products</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          + Add Product
        </button>
      </div>

      {loading && (
        <div className="flex justify-center p-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {!loading && error && (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm" onClick={loadProducts}>Retry</button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="alert">
          <span>ยังไม่มีสินค้าในระบบ ลองกด + Add Product เพื่อเพิ่มสินค้าแรก</span>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="overflow-x-auto rounded-box bg-base-100 shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.icon || '📦'} {product.name}</td>
                  <td>
                    <span className="badge badge-outline">{product.category}</span>
                  </td>
                  <td>฿{Number(product.price).toLocaleString('en-US')}</td>
                  <td>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(product)} className="btn btn-info btn-sm">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-error btn-sm">
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

      {/* Modal สำหรับเพิ่ม/แก้ไขสินค้า */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
          <h3 className="font-bold text-lg">
            {editingId ? 'Edit Product' : 'Add Product'}
          </h3>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="label">
                <span className="label-text">Product name</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                {categoryOptions.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Icon (emoji)</span>
              </label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="📦"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Product description"
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>

            {formError && (
              <div role="alert" className="alert alert-error">
                <span>{formError}</span>
              </div>
            )}

            <div className="modal-action">
              <button type="button" onClick={closeModal} className="btn">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
        {/* กดพื้นหลังเพื่อปิด Modal */}
        <button type="button" className="modal-backdrop" onClick={closeModal} aria-label="close">
          close
        </button>
      </div>
    </section>
  )
}
