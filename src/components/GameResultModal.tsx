"use client";

import { FaXmark } from "react-icons/fa6";

type GameResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    prizeAmount: number;
};

export default function GameResultModal({
    isOpen,
    onClose,
    prizeAmount,
}: GameResultModalProps) {
    return (
        <div
            className={`absolute inset-0 bg-black/40 z-50 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`bg-white rounded-3xl w-85 pt-8 pb-6 px-6 relative text-center shadow-2xl transition-transform duration-300 border border-gray-100 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaXmark className="text-xl" />
                </button>

                <h2 className="text-[22px] font-bold text-gray-800 mt-2 mb-4">
                    ได้รับ
                </h2>
                <p className="text-gray-600 text-[13px] mb-8">
                    <span className="font-normal text-lg text-brand-red mr-1">
                        {prizeAmount.toLocaleString()}
                    </span>
                    คะแนน
                </p>

                <button
                    onClick={onClose}
                    className="bg-brand-yellow hover:bg-brand-yellow-hover text-white font-bold text-[15px] py-2 w-35 rounded-full shadow-sm transition-colors mx-auto block active:scale-95"
                >
                    ปิด
                </button>
            </div>
        </div>
    );
}
