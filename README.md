# [WIP] Nextzy Gamification - Frontend (Client)

ระบบส่วนหน้าบ้าน (Frontend) สำหรับโปรเจกต์ Nextzy Gamification พัฒนาด้วย Next.js และ Tailwind CSS โดยเน้นความเรียบง่ายและประสิทธิภาพสูงสุด

Repository ฝั่ง Backend (NestJS): [Link to Backend Repository](https://github.com/weerayosong/nextzy-game-server)

## การออกแบบระบบและสถาปัตยกรรม (System Design & Software Architecture)

[Link to Documentation](https://incandescent-crumble-d59b5c.netlify.app)

โปรเจกต์นี้ยึดหลัก Clean Architecture และ Minimalist Approach:

- **Separation of Concerns:** แยกส่วนการแสดงผล (UI Components) ออกจากการจัดการสถานะ (State) และการเรียก API อย่างชัดเจน
- **State Management:** หลีกเลี่ยงการใช้ไลบรารีภายนอกที่เกินความจำเป็น โดยเลือกใช้ React Context API สำหรับจัดการ Global State (เช่น ข้อมูลผู้เล่นและคะแนนสะสม)
- **Styling:** ใช้งาน Tailwind CSS v4 แบบ Native เพื่อลดไฟล์ Configuration และรักษาความสะอาดของโค้ด

## ฟีเจอร์หลัก (Core Features)

- **Authentication:** ระบบเข้าสู่ระบบแบบไร้รอยต่อผ่าน Nickname พร้อมโหลดข้อมูลเดิมของผู้เล่นกลับมาอัตโนมัติ
- **Game Interface:** วงล้อสุ่มคะแนนพร้อมแอนิเมชันที่แม่นยำ สามารถกดหมุนต่อเนื่องได้โดยไม่ต้องโหลดหน้าเว็บใหม่
- **Reward System:** แถบแสดงความคืบหน้า (Progress Bar) และระบบตรวจสอบเงื่อนไขการรับรางวัลเมื่อคะแนนถึง Checkpoint (500, 1000, 10000)
- **History Dashboard:** หน้าต่างแสดงประวัติการเล่น 3 มุมมอง (ประวัติส่วนตัว, ประวัติการรับรางวัล, และประวัติรวมของผู้เล่นทั้งหมด)

## เทคโนโลยีที่ใช้ (Tech Stack)

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript (Strict Mode)

## การติดตั้งและใช้งาน (Installation & Getting Started)

1. โคลนโปรเจกต์และเข้าสู่โฟลเดอร์

```bash
git clone https://github.com/weerayosong/nextzy-game-client
cd nextzy-game-client

```

2. ติดตั้ง Dependencies

```bash
npm install

```

3. คัดลอกไฟล์ Environment และตั้งค่าตัวแปร

```bash
cp .env.example .env.local

```

_(กำหนดค่า `NEXT_PUBLIC_API_URL` ให้ชี้ไปยัง Backend URL เช่น `http://localhost:3001`)_

4. รันโปรเจกต์ในโหมด Development

```bash
npm run dev

```

ระบบจะเปิดใช้งานที่ `http://localhost:3000` (หรือพอร์ตที่กำหนดไว้)

## บันทึกจากนักพัฒนา (Developer's Note)

โปรเจกต์นี้เป็นการท้าทายตัวเองในการเรียนรู้และลงมือปฏิบัติจริงกับ Tech Stack ชุดนี้ (Next.js App Router คู่กับ NestJS) เป็นครั้งแรก ผมตั้งใจออกแบบโครงสร้างให้คลีนที่สุดโดยลดการพึ่งพาไลบรารีภายนอก น้อมรับทุกคำแนะนำและข้อติชมเพื่อนำไปพัฒนาตัวเองต่อไปครับ
