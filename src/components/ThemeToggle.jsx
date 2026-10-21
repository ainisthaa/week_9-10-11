import { useEffect, useState } from 'react'

// ปุ่มสลับ Light Mode / Dark Mode ของฝั่ง Admin
// เก็บค่าที่เลือกไว้ใน localStorage เพื่อให้ยังจำได้ตอน Refresh หน้า
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('minishop-theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('minishop-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <button type="button" className="btn btn-outline btn-sm" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}
