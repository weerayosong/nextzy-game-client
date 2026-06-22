"use client";

import { useState } from "react";

export default function HistoryTabs() {
    const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">(
        "tab1",
    );

    return (
        <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
            {/* ส่วนหัว (ปุ่มเปลี่ยน Tab) */}
            <div className="grid grid-cols-3 px-6 py-4 gap-2 shrink-0 bg-white border-b border-gray-50">
                <button
                    onClick={() => setActiveTab("tab1")}
                    className={`px-1 py-1.5 rounded-full border text-[10px] font-medium text-center tracking-tighter whitespace-nowrap transition-colors ${activeTab === "tab1" ? "border-brand-red text-brand-red" : "border-gray-400 text-gray-500"}`}
                >
                    ประวัติทั่วโลก
                </button>
                <button
                    onClick={() => setActiveTab("tab2")}
                    className={`px-1 py-1.5 rounded-full border text-[10px] font-medium text-center tracking-tighter whitespace-nowrap transition-colors ${activeTab === "tab2" ? "border-brand-red text-brand-red" : "border-gray-400 text-gray-500"}`}
                >
                    ประวัติของฉัน
                </button>
                <button
                    onClick={() => setActiveTab("tab3")}
                    className={`px-1 py-1.5 rounded-full border text-[10px] font-medium text-center tracking-tighter whitespace-nowrap transition-colors ${activeTab === "tab3" ? "border-brand-red text-brand-red" : "border-gray-400 text-gray-500"}`}
                >
                    ประวัติรางวัลของฉัน
                </button>
            </div>

            {/* ส่วนแสดงข้อมูลด้านล่าง จำลองข้อมูลรอ api */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
                {activeTab === "tab1" && (
                    <div className="flex flex-col">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={`global-${item}`}
                                className="flex items-center px-4 py-3 border-b border-gray-100"
                            >
                                <div className="w-12.5 h-12.5 rounded-full bg-brand-orange-avatar shrink-0 mr-4"></div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800 text-[15px]">
                                        Test 24xxxxx
                                    </span>
                                    <span className="text-[11px] text-gray-400">
                                        รางวัล: 1,000 | เล่นเมื่อ 15/02/25 20:00
                                        น.
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "tab2" && (
                    <div className="flex flex-col">
                        <div className="flex items-center px-4 py-3 border-b border-gray-100">
                            <div className="w-12.5 h-12.5 rounded-full bg-[#ff7b5a] shrink-0 mr-4"></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 text-[15px]">
                                    Test 24xxxxx
                                </span>
                                <span className="text-[11px] text-gray-400">
                                    รางวัล: 1,000 | เล่นเมื่อ 15/02/25 20:00 น.
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "tab3" && (
                    <div className="flex flex-col">
                        <div className="flex items-center px-4 py-3 border-b border-gray-100">
                            <div className="w-12.5 h-12.5 rounded-full bg-brand-orange-avatar shrink-0 mr-4"></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 text-[15px]">
                                    ได้รับรางวัล 1
                                </span>
                                <span className="text-[11px] text-gray-400">
                                    ได้รับเมื่อ 15/02/25 20:00 น.
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
