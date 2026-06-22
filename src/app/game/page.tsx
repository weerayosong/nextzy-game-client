"use client";

import { useGame } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaCrown } from "react-icons/fa6";

import GameResultModal from "@/components/GameResultModal";

// จำลองข้อมูลรางวัล
const PRIZES = [
    { value: 300, angle: 0 },
    { value: 3000, angle: 90 },
    { value: 500, angle: 180 },
    { value: 1000, angle: 270 },
];

export default function GamePage() {
    const { user, updatePoints } = useGame();
    const router = useRouter();

    // State สำหรับควบคุม UI
    const [spinState, setSpinState] = useState<"IDLE" | "SPINNING" | "STOPPED">(
        "IDLE",
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingPrize, setPendingPrize] = useState(0);

    // Refs สำหรับทำ Animation โดยไม่กระทบ React Render Cycle
    const wheelRef = useRef<HTMLDivElement>(null);
    const reqIdRef = useRef<number | null>(null);
    const currentAngleRef = useRef(0);
    const scoreContainerRef = useRef<HTMLDivElement>(null);

    // ตรวจสอบล็อกอิน
    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    // ฟังก์ชันลูปหมุนวงล้อ
    const spinLoop = () => {
        currentAngleRef.current += 15;
        if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${currentAngleRef.current}deg)`;
        }
        reqIdRef.current = requestAnimationFrame(spinLoop);
    };

    // จัดการการคลิกปุ่มหมุน/หยุด
    const handleSpinClick = async () => {
        if (spinState === "IDLE") {
            // 1. สถานะ: เริ่มหมุน
            setSpinState("SPINNING");
            if (wheelRef.current) wheelRef.current.style.transition = "none";
            reqIdRef.current = requestAnimationFrame(spinLoop);
        } else if (spinState === "SPINNING") {
            // 2. สถานะ: กดหยุด
            setSpinState("STOPPED");

            // สุ่มรางวัล (เปลี่ยนเป็น ยิง api ไปหา NestJS)
            try {
                // ยิง API ไปสุ่มคะแนนจากหลังบ้าน (ต้องแนบ userId ไปด้วย)
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/game/spin`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user?.id }),
                    },
                );

                if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการสุ่มรางวัล");

                const data = await res.json();
                // data.rewardPoints คือคะแนนที่ได้จากหลังบ้านจริงๆ (300, 500, 1000, 3000)
                const wonPoints = data.rewardPoints;
                setPendingPrize(wonPoints);

                // api ตอบกลับมาแล้ว! ถึงเวลาสั่งหยุดลูปหมุนรอบ
                if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);

                // หาว่าคะแนนที่ได้ ตรงกับ Index องศาไหนบนวงล้อ
                const prizeConfig =
                    PRIZES.find((p) => p.value === wonPoints) || PRIZES[0];

                const randomOffset = Math.floor(Math.random() * 60) - 30;
                const baseTarget =
                    Math.ceil(currentAngleRef.current / 360) * 360;
                const extraSpins = 3 * 360;

                // คำนวณองศาจุดจบ
                const finalAngle =
                    baseTarget + extraSpins + prizeConfig.angle + randomOffset;

                if (wheelRef.current) {
                    wheelRef.current.style.transition =
                        "transform 3.5s cubic-bezier(0.15, 0.85, 0.3, 1)";
                    wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
                }
                currentAngleRef.current = finalAngle;

                // รอ 3.6 วิ ให้วงล้อหยุดสนิท แล้วแสดง Modal
                setTimeout(() => {
                    setIsModalOpen(true);
                }, 3600);
            } catch (error) {
                console.error(error);
                alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
                setSpinState("IDLE"); // ย้อนกลับไปให้กดใหม่
            }
        }
    };

    // จัดการการปิด Modal และอัปเดตคะแนน
    const handleCloseModal = () => {
        setIsModalOpen(false);

        // อัปเดตคะแนนผ่าน Global Context
        if (user) {
            updatePoints(user.totalPoints + pendingPrize);
        }
        setPendingPrize(0);

        // ทำ Effect กระพริบให้ตัวหนังสือคะแนน
        if (scoreContainerRef.current) {
            scoreContainerRef.current.classList.add("scale-110");
            setTimeout(() => {
                if (scoreContainerRef.current)
                    scoreContainerRef.current.classList.remove("scale-110");
            }, 200);
        }

        // รีเซ็ตสถานะปุ่มกลับไปเริ่มใหม่
        setSpinState("IDLE");
    };

    if (!user) return null;

    return (
        <main className="flex flex-col flex-1 relative bg-linear-to-b from-[#fefcfa] to-[#fcecd7] overflow-hidden items-center">
            {/* คะแนนสะสม */}
            <div
                ref={scoreContainerRef}
                className="mt-14 font-bold text-gray-800 text-[15px] tracking-wide z-10 transition-all duration-300"
            >
                คะแนนสะสม{" "}
                <span className="text-brand-red">
                    {user.totalPoints.toLocaleString()}
                </span>
                /10,000
            </div>

            {/* โซนวงล้อ */}
            <div className="relative mt-20 flex justify-center w-full">
                {/* ลูกศรชี้ */}
                <div className="absolute -top-10 z-30 flex flex-col items-center drop-shadow-md">
                    <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center relative shadow-sm">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="absolute -bottom-3 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-t-16 border-t-brand-red"></div>
                    </div>
                </div>

                {/* ตัววงล้อ */}
                <div
                    ref={wheelRef}
                    className="w-70 h-70 rounded-full bg-[#6c0101] relative overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.15)] border-2 border-[#3a0000]"
                >
                    {/* เส้นแบ่ง */}
                    <div className="absolute top-1/2 left-0 w-full h-0.75 bg-[#1a0000] rotate-45 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.75 bg-[#1a0000] -rotate-45 -translate-y-1/2"></div>

                    {/* ตัวเลขรางวัล (จัดวางตามองศา) */}
                    <div className="absolute inset-0 flex justify-center pt-8 text-white font-semibold text-[32px] tracking-widest z-10 rotate-0">
                        <span>300</span>
                    </div>
                    <div className="absolute inset-0 flex justify-center pt-8 text-white font-semibold text-[32px] tracking-widest z-10 rotate-90">
                        <span>1,000</span>
                    </div>
                    <div className="absolute inset-0 flex justify-center pt-8 text-white font-semibold text-[32px] tracking-widest z-10 rotate-180">
                        <span>500</span>
                    </div>
                    <div className="absolute inset-0 flex justify-center pt-8 text-white font-semibold text-[32px] tracking-widest z-10 rotate-270">
                        <span>3,000</span>
                    </div>
                </div>

                {/* แกนกลางวงล้อ */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-13 h-13 bg-brand-yellow rounded-full border-[3px] border-[#d89700] flex items-center justify-center z-20 shadow-md">
                    <div className="w-9.5 h-9.5 bg-[#fca100] rounded-full flex items-center justify-center">
                        <FaCrown className="text-white text-[18px] mb-0.5" />
                    </div>
                </div>
            </div>

            {/* ปุ่มกดเริ่ม/หยุด */}
            <button
                onClick={handleSpinClick}
                disabled={spinState === "STOPPED"}
                className={`mt-12 text-white font-bold text-[16px] py-2 px-10 rounded-full transition-all active:scale-95 z-10 disabled:cursor-not-allowed
          ${spinState === "IDLE" ? "bg-[#ef4444] hover:bg-[#dc2626] shadow-[0_4px_10px_rgba(239,68,68,0.4)]" : ""}
          ${spinState === "SPINNING" ? "bg-[#f59e0b] hover:bg-[#d97706] shadow-[0_4px_10px_rgba(245,158,11,0.4)]" : ""}
          ${spinState === "STOPPED" ? "bg-gray-400 shadow-none text-gray-200" : ""}
        `}
            >
                {spinState === "IDLE" && "เริ่มหมุน"}
                {spinState === "SPINNING" && "หยุด"}
                {spinState === "STOPPED" && "รอสักครู่..."}
            </button>

            {/* แถบเมนูด้านล่าง (ปุ่มกลับหน้าหลัก) */}
            <div className="absolute bottom-0 w-full bg-white rounded-t-[20px] p-4 pb-6 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-10">
                <button
                    onClick={() => router.push("/home")}
                    disabled={spinState !== "IDLE"}
                    className="w-full bg-brand-yellow hover:bg-brand-yellow-hover disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold text-[18px] py-3.5 rounded-xl shadow-sm transition-colors disabled:cursor-not-allowed"
                >
                    กลับหน้าหลัก
                </button>
            </div>

            {/* Result Modal */}
            <GameResultModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                prizeAmount={pendingPrize}
            />
        </main>
    );
}
