function About() {
  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">เกี่ยวกับ MiniShop</h1>
      <p className="mt-4 text-gray-600">
        MiniShop เป็นร้านค้าออนไลน์ขนาดเล็ก ขายอุปกรณ์ไอทีและของใช้ทั่วไปในราคาที่จับต้องได้
        เว็บไซต์นี้ทำขึ้นเพื่อฝึกเขียน React ตั้งแต่โครงสร้างหน้าเดียวจนมาเป็นเว็บหลายหน้า
      </p>
      <h2 className="text-xl font-bold text-gray-800 mt-6">วัตถุประสงค์ของร้าน</h2>
      <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
        <li>ขายสินค้าคุณภาพดีในราคาที่เข้าถึงได้</li>
        <li>ให้ลูกค้าเลือกดูและสั่งซื้อสินค้าได้ง่าย</li>
        <li>เป็นโปรเจกต์ฝึกฝนการพัฒนาเว็บแอปด้วย React</li>
      </ul>
    </div>
  )
}

export default About
