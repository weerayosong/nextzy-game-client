/* eslint-disable */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useGame } from "@/contexts/GameContext";
import toast from "react-hot-toast";

export default function LandingPage() {
    const [nickname, setNickname] = useState("");
    const [isLoading, setIsLoading] = useState(false); // เพิ่ม state สำหรับปุม loading
    const router = useRouter();
    const { setUser } = useGame(); // เรียกใช้ Context

    const handleLogin = async () => {
        if (!nickname.trim()) {
            toast.error("กรุณากรอกชื่อสำหรับเล่นก่อนครับ");
            return;
        }

        setIsLoading(true);
        try {
            // ยิง API ไปหาหลังบ้าน
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nickname: nickname.trim() }),
                },
            );
            // 'message'from global filter
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
                );
            }

            const userData = await res.json();

            // บันทึกข้อมูลลง Global State
            setUser({
                id: userData.id,
                nickname: userData.nickname,
                totalPoints: userData.totalPoints,
            });

            // ล็อกอินสำเร็จ พาไปหน้า /home
            router.push("/home");
        } catch (error) {
            console.error(error);
            alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // ใช้ flex-1 เพื่อยืดเนื้อหาให้เต็มพื้นที่ของ Layout หลัก
        <main className="flex flex-col flex-1">
            {/* ส่วนเนื้อหา (ให้อยู่ตรงกลางหน้าจอ) */}
            <div className="flex-1 flex flex-col justify-center px-6 -mt-16 sm:-mt-20">
                <h1 className="text-[28px] sm:text-3xl font-medium leading-tight text-black tracking-tight">
                    Nextzy Test (Full Stack)
                </h1>
                <p className="text-brand-gray text-sm sm:text-base mt-1">
                    เกมสะสมคะแนน
                </p>

                <div className="mt-12 sm:mt-16">
                    <label className="block text-brand-gray text-xs sm:text-sm mb-2">
                        ชื่อสำหรับเล่น (Nickname)
                    </label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Test 234"
                        className="w-full h-12 sm:h-13.5 px-4 border border-gray-300 rounded-lg text-black text-base focus:outline-none focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] transition-all"
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>
            </div>

            {/* ส่วนปุ่ม (ดันลงล่างสุดเสมอ) */}
            <div className="px-6 pb-8 sm:pb-12">
                <button
                    onClick={handleLogin}
                    className="w-full h-12 sm:h-13.5 bg-[#FFC107] hover:bg-[#F5B000] active:scale-[0.98] text-white font-bold text-lg rounded-full transition-all flex items-center justify-center"
                >
                    เข้าเล่น
                </button>
            </div>
        </main>
    );
}
