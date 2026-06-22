"use client";

import { FaXmark, FaCrown } from "react-icons/fa6";

type RewardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    rewardName: string;
};

export default function RewardModal({
    isOpen,
    onClose,
    rewardName,
}: RewardModalProps) {
    return (
        <div
            className={`fixed inset-0 bg-black/10 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose} // ปิดเมื่อคลิกที่ Overlay
        >
            <div
                className={`relative w-85 h-80.25 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center pt-9 border border-gray-100 transform transition-transform duration-300 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
                onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้การคลิกข้างใน Modal ไปกระเทือน Overlay
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-[#9ca3af] hover:text-gray-600 transition-colors"
                >
                    <FaXmark className="text-[28px]" />
                </button>

                {/* เหรียญ */}
                <div className="relative w-27.5 h-27.5 flex items-center justify-center rounded-full bg-[#ffc900] shadow-sm mb-3">
                    <div className="w-22.5 h-22.5 rounded-full border-[5px] border-[#ffdf33] bg-[#ffad00] flex items-center justify-center relative shadow-inner">
                        <FaCrown className="text-[46px] text-[#f57c00] mt-1 drop-shadow-sm" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#ffda2a] opacity-50 pointer-events-none"></div>
                </div>

                <h2 className="text-[28px] font-bold text-[#333333] tracking-tight mb-1">
                    ยินดีด้วย
                </h2>
                <p className="text-[17px] text-[#666666] font-medium mb-7">
                    คุณได้รับ{rewardName}
                </p>

                <button
                    onClick={onClose}
                    className="bg-[#ffc120] hover:bg-[#ffb000] text-white font-bold text-[18px] w-52.5 h-12 rounded-full shadow-sm transition-colors active:scale-95"
                >
                    ปิด
                </button>
            </div>
        </div>
    );
}
