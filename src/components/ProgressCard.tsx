"use client";

import { useGame } from "@/contexts/GameContext";

import { FaCheck, FaCrown } from "react-icons/fa6";

export default function ProgressCard() {
    const { user } = useGame();
    const points = user?.totalPoints || 0;

    // คำนวณความกว้างหลอดตามตำแหน่ง Visual (15%, 40%, 100%)
    let visualPercent = 0;
    if (points <= 500) {
        visualPercent = (points / 500) * 15;
    } else if (points <= 1000) {
        visualPercent = 15 + ((points - 500) / 500) * 25;
    } else if (points <= 10000) {
        visualPercent = 40 + ((points - 1000) / 9000) * 60;
    } else {
        visualPercent = 100;
    }

    return (
        <div className="bg-brand-gray-light pt-4 pb-4 px-4 shrink-0">
            <div className="bg-white rounded-3xl border border-gray-300 pt-0.5 px-4 pb-5 relative shadow-sm">
                {/* ชื่อ-นามสกุล */}
                <div className="w-full text-center text-[#d1d5db] text-xs font-light tracking-wide mb-1 mt-1">
                    {user?.nickname || "กำลังโหลด..."}
                </div>

                {/* ปุ่มแชร์คะแนน */}
                <div className="absolute left-0 top-5 bg-red-800 text-white text-[10px] px-3 py-1 rounded-r-full flex items-center shadow-md z-10 font-medium cursor-pointer">
                    แชร์คะแนน
                </div>

                {/* คะแนนสะสม */}
                <div className="flex flex-col items-end w-full mt-1">
                    <div className="font-bold text-gray-800 text-[18px] leading-tight">
                        สะสมคะแนน
                    </div>
                    <div className="text-gray-800 text-[11px] font-medium mt-0.5 text-right">
                        คะแนนครบ 10,000 รับของขวัญ 1 รายการ
                    </div>
                    <div className="font-bold text-[32px] text-brand-red tracking-tight mt-1 mb-2">
                        {points.toLocaleString()}
                        <span className="text-xl">/10,000</span>
                    </div>
                </div>

                {/* หลอด Progress Bar */}
                <div className="mt-10 mb-10 w-[82%] mx-auto relative h-1.5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-full z-0"></div>

                    <div
                        className="absolute top-0 left-0 h-full  bg-brand-orange rounded-full z-0 transition-all duration-1000"
                        style={{ width: `${visualPercent}%` }}
                    ></div>

                    <div
                        className="absolute top-1/2 w-4.5 h-4.5 bg-brand-red border-[3px] border-white rounded-full z-10 shadow-[0_0_6px_rgba(225,36,42,0.6)] transition-all duration-1000"
                        style={{
                            left: `${visualPercent}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>

                    {/* Checkpoint 500 */}
                    <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                        <span className="absolute bottom-5.5 text-[10px] text-gray-400 whitespace-nowrap">
                            ครบ 500
                        </span>
                        <div
                            className={`w-6.5 h-6.5 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-colors ${points >= 500 ? "bg-brand-green text-white" : "bg-brand-gray text-white"}`}
                        >
                            <FaCheck className="text-[10px]" />
                        </div>
                        <button
                            className={`absolute top-6.5 text-[9px] font-medium py-1.5 px-1.5 whitespace-nowrap rounded-full transition-colors ${points >= 500 ? "bg-brand-red-light text-white" : "bg-gray-200 text-gray-400"}`}
                        >
                            {points >= 500 ? "รับรางวัล 1 แล้ว" : "รับรางวัล 1"}
                        </button>
                    </div>

                    {/* Checkpoint 1000 */}
                    <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                        <span className="absolute bottom-5.5 text-[10px] text-gray-400 whitespace-nowrap">
                            ครบ 1,000
                        </span>
                        <div
                            className={`w-6.5 h-6.5 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-colors ${points >= 1000 ? "bg-brand-green text-white" : "bg-brand-gray text-white"}`}
                        >
                            <FaCheck className="text-[10px]" />
                        </div>
                        <button
                            className={`absolute top-6.5 text-[9px] font-medium py-1.5 px-1.5 whitespace-nowrap rounded-full transition-colors ${points >= 1000 ? "bg-brand-red text-white" : "bg-gray-200 text-gray-400"}`}
                        >
                            รับรางวัล 2
                        </button>
                    </div>

                    {/* Checkpoint 10000 */}
                    <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                        <span className="absolute bottom-5.5 text-[10px] text-gray-400 whitespace-nowrap">
                            ครบ 10,000
                        </span>
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm transition-colors ${points >= 10000 ? "bg-brand-yellow-light" : "bg-gray-200"}`}
                        >
                            <div
                                className={`w-4.5 h-4.5 rounded-full flex items-center justify-center ${points >= 10000 ? "bg-brand-yellow-dark" : "bg-gray-300"}`}
                            >
                                <FaCrown className="text-white text-[9px]" />
                            </div>
                        </div>
                        <button
                            className={`absolute top-6.5 text-[9px] font-medium py-1.5 px-1.5 whitespace-nowrap rounded-full transition-colors ${points >= 10000 ? "bg-brand-red text-white" : "bg-[#e5e7eb] text-gray-400"}`}
                        >
                            รับรางวัล 3
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
