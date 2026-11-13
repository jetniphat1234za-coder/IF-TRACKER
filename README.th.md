# ⏱️ IF Tracker

🌐 [English](README.md) | **ภาษาไทย**

เว็บแอปติดตามการทำ **Intermittent Fasting (IF)** น้ำหนัก การออกกำลังกาย และการดื่มน้ำ ในที่เดียว
ดีไซน์โทนสีส้ม รองรับทั้งมือถือและเดสก์ท็อป พร้อมโหมดมืด/สว่าง

ข้อมูลทั้งหมดเก็บไว้ใน **เบราว์เซอร์ของคุณ (localStorage)** ไม่ต้องสมัครสมาชิกและไม่ส่งข้อมูลไปเซิร์ฟเวอร์ใด ๆ

## ✨ ฟีเจอร์หลัก

| หน้า | รายละเอียด |
|------|-----------|
| 🏠 **หน้าหลัก** | ภาพรวมวันนี้: สถานะ IF (ช่วงงดอาหาร/ช่วงทานอาหาร), น้ำหนักล่าสุด, การออกกำลังกายล่าสุด และตัวนับแก้วน้ำประจำวัน |
| ⏲️ **IF Timer** | จับเวลา Fasting แบบวงกลมนับถอยหลัง เลือกโปรโตคอลได้: 16:8, 18:6, 20:4, OMAD (23:1) แจ้งเมื่อถึงเป้าหมาย |
| ⚖️ **น้ำหนัก** | บันทึกน้ำหนักรายวัน ตั้งเป้าหมายน้ำหนัก และดูประวัติ |
| 🏋️ **ออกกำลังกาย** | บันทึกท่า จำนวนเซ็ต/จำนวนครั้ง/น้ำหนักที่ใช้ |
| 📈 **สรุปผล** | กราฟพัฒนาการ สถิติ Fasting ที่สำเร็จ วันออกกำลังกายใน 7 วันล่าสุด และประวัติ Fasting |
| 💾 **สำรองข้อมูล** | ส่งออก/นำเข้าข้อมูลเป็นไฟล์ JSON เพื่อย้ายเครื่องหรือกันข้อมูลหาย |
| 🌗 **ธีม** | สลับโหมดมืด/สว่างได้ |

## 🛠️ เทคโนโลยีที่ใช้

- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) (build tool)
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [React Router 7](https://reactrouter.com/)
- [Recharts](https://recharts.org/) (กราฟ), [date-fns](https://date-fns.org/) (วันที่ภาษาไทย), [Lucide](https://lucide.dev/) (ไอคอน), Motion (แอนิเมชัน), canvas-confetti

## 🚀 วิธีติดตั้งและใช้งาน

ต้องมี [Node.js](https://nodejs.org/) ติดตั้งในเครื่อง

```bash
# 1. โคลนโปรเจกต์
git clone https://github.com/jetniphat1234za-coder/IF-TRACKER.git
cd IF-TRACKER

# 2. ติดตั้งไลบรารี
npm install

# 3. รันโหมดพัฒนา
npm run dev
```

เปิดเบราว์เซอร์ตามที่ Vite แสดง (ปกติคือ <http://localhost:5173>)

สร้างไฟล์สำหรับ deploy:

```bash
npm run build
```

## 📁 โครงสร้างโปรเจกต์

```
IF-TRACKER/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx            # เส้นทางของแต่ละหน้า
│   │   ├── components/           # Layout, FloatingIcons, ui/ (shadcn)
│   │   ├── context/              # TrackerContext (state หลัก), ThemeContext
│   │   ├── hooks/useLocalStorage.ts
│   │   └── pages/                # Dashboard, IFTimer, WeightLog, ExerciseLog, Progress
│   └── styles/
└── package.json
```

## 🔒 เรื่องข้อมูลส่วนตัว

ข้อมูลทั้งหมดอยู่ใน localStorage ของเบราว์เซอร์เครื่องนั้น ๆ การล้างข้อมูลเบราว์เซอร์จะทำให้ข้อมูลหาย
แนะนำให้กด **ส่งออกข้อมูล** ในหน้า "สรุปผล" เป็นระยะ

## 🙏 เครดิต

- ออกแบบต้นแบบด้วย [Figma Make](https://www.figma.com/design/ROMA49arT5dwa8ivECGAgo/Webpage-Summary-for-IF-Tracker)
- คอมโพเนนต์จาก [shadcn/ui](https://ui.shadcn.com/) (MIT License) และรูปภาพจาก [Unsplash](https://unsplash.com) — ดู [ATTRIBUTIONS.md](ATTRIBUTIONS.md)
