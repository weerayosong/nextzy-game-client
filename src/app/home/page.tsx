"use client";

import { useGame } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProgressCard from "@/components/ProgressCard";
import HistoryTabs from "@/components/HistoryTabs";

export default function HomePage() {
    const { user } = useGame();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className="flex flex-col flex-1 bg-white relative overflow-hidden">
            {/* โซนที่ 1: การ์ดคะแนนด้านบน */}
            <ProgressCard />

            {/* โซนที่ 2: แท็บประวัติด้านล่าง */}
            <HistoryTabs />

            {/* โซนที่ 3: ปุ่มไปเล่นเกม ลอยตัวทับข้อมูลเสมอ */}
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-white via-white to-transparent pt-8 pb-6 px-5 z-20">
                <button
                    onClick={() => router.push("/game")}
                    className="w-full bg-brand-yellow text-white font-bold text-[20px] py-3 rounded-full shadow-lg hover:bg-brand-yellow-hover transition-colors"
                >
                    ไปเล่นเกม
                </button>
            </div>
        </main>
    );
}
