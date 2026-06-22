"use client";

import { FaXmark } from "react-icons/fa6";

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
            className={`fixed inset-0 bg-black/40 z-50 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`bg-white rounded-xl w-[320px] sm:w-85 pt-8 pb-6 px-6 relative text-center shadow-2xl transition-transform duration-300 border border-gray-100 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
            >
                {/* ปุ่มกากบาทปิด Modal */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaXmark className="text-xl" />
                </button>

                {/* ข้อความแจ้งเตือน */}
                <h2 className="text-[22px] font-bold text-gray-800 mt-2 mb-3">
                    ยินดีด้วย!
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                    คุณได้รับ{" "}
                    <span className="font-bold text-brand-red text-base ml-1">
                        {rewardName}
                    </span>
                </p>

                {/* ปุ่มตกลง */}
                <button
                    onClick={onClose}
                    className="bg-brand-yellow hover:bg-brand-yellow-hover text-white font-bold text-[15px] py-2.5 w-35rounded-full shadow-sm transition-colors mx-auto block active:scale-95"
                >
                    ตกลง
                </button>
            </div>
        </div>
    );
}
