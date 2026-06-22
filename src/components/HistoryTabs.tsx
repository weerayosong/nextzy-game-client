"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { TabType, HistoryResponseItem } from "@/types";
import { historyService } from "@/services/historyService";
import { rewardService } from "@/services/rewardService";

type HistoryItem = {
    id: string;
    description: string; // เช่น "Test 24xxxxx", "คุณได้รับรางวัล 1"
    subtext: string; // เช่น "รางวัล: 1,000 | เล่นเมื่อ 15/02/25 20:00 น."
};

export default function HistoryTabs() {
    const { user } = useGame();

    // States สำหรับ UI และ Pagination
    const [activeTab, setActiveTab] = useState<TabType>("GLOBAL");
    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    // ฟังก์ชันดึงข้อมูลตาม Tab และ Page ปัจจุบัน
    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                let result;

                // ใช้service ตามแท็บที่เลือก
                if (activeTab === "GLOBAL") {
                    result = await historyService.getGlobalHistory(
                        currentPage,
                        itemsPerPage,
                    );
                } else if (activeTab === "PERSONAL") {
                    if (!user) return;
                    result = await historyService.getPersonalHistory(
                        user.id,
                        currentPage,
                        itemsPerPage,
                    );
                } else if (activeTab === "REWARD") {
                    if (!user) return;
                    result = await rewardService.getRewardHistory(
                        user.id,
                        currentPage,
                        itemsPerPage,
                    );
                }

                if (result && result.data) {
                    // สมมติว่า API ตอบกลับมาในรูปแบบ { data: [...], meta: { totalPages: X } }
                    // *** ตรงนี้อาจจะต้องปรับการ map ข้อมูลให้ตรงกับ Schema ของ NestJS ***

                    const formattedData = result.data.map(
                        (item: HistoryResponseItem) => {
                            // ✅ ดึงวันที่จากฟิลด์ที่มีค่า (ถ้าเป็นรางวัลจะเป็น claimedAt, ถ้าหมุนวงล้อจะเป็น createdAt)
                            const dateString =
                                item.createdAt || item.claimedAt || "";
                            const dateDisplay = dateString
                                ? new Date(dateString).toLocaleString("th-TH")
                                : "ไม่ทราบวันที่";

                            return {
                                id: item.id,
                                description:
                                    activeTab === "REWARD"
                                        ? `รับรางวัล Checkpoint ${item.checkpoint}`
                                        : activeTab === "PERSONAL"
                                          ? user?.nickname ||
                                            "ผู้เล่นไม่ทราบชื่อ"
                                          : item.user?.nickname ||
                                            "ผู้เล่นไม่ทราบชื่อ",
                                subtext:
                                    activeTab === "REWARD"
                                        ? `รับเมื่อ ${dateDisplay}`
                                        : `รางวัล: ${item.pointsReceived?.toLocaleString() || 0} | เล่นเมื่อ ${dateDisplay}`,
                            };
                        },
                    );

                    setHistoryData(formattedData);
                    setTotalPages(result.meta?.totalPages || 1);
                } else {
                    setHistoryData([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Failed to fetch history:", error);
                setHistoryData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [activeTab, currentPage, user]);

    // เมื่อเปลี่ยน Tab ให้รีเซ็ตกลับไปหน้า 1 เสมอ
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    return (
        <div className="w-full bg-white mt-4">
            {/* เมนู Tabs */}
            <div className="flex justify-around items-center border-b border-gray-200 px-4 pt-4 pb-2">
                <button
                    onClick={() => handleTabChange("GLOBAL")}
                    className={`text-[13px] font-medium px-4 py-2 rounded-full transition-all border ${
                        activeTab === "GLOBAL"
                            ? "border-brand-red text-brand-red"
                            : "border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                    ประวัติทั่วโลก
                </button>
                <button
                    onClick={() => handleTabChange("PERSONAL")}
                    className={`text-[13px] font-medium px-4 py-2 rounded-full transition-all border ${
                        activeTab === "PERSONAL"
                            ? "border-brand-red text-brand-red"
                            : "border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                    ประวัติของฉัน
                </button>
                <button
                    onClick={() => handleTabChange("REWARD")}
                    className={`text-[13px] font-medium px-4 py-2 rounded-full transition-all border ${
                        activeTab === "REWARD"
                            ? "border-brand-red text-brand-red"
                            : "border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                    ประวัติรางวัลของฉัน
                </button>
            </div>

            {/* รายการข้อมูล */}
            <div className="min-h-75">
                {isLoading ? (
                    <div className="flex justify-center items-center h-50 text-gray-400 text-sm">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : historyData.length === 0 ? (
                    <div className="flex justify-center items-center h-50 text-gray-400 text-sm">
                        ไม่มีข้อมูลประวัติ
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {historyData.map((item) => (
                            <div
                                key={item.id}
                                className="py-4 px-6 text-center"
                            >
                                <div className="font-bold text-gray-800 text-[15px] mb-1">
                                    {item.description}
                                </div>
                                <div className="text-gray-400 text-[12px] font-light">
                                    {item.subtext}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-6 border-t border-gray-100">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ก่อนหน้า
                    </button>

                    <span className="text-sm text-gray-500">
                        หน้า {currentPage} จาก {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages),
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ถัดไป
                    </button>
                </div>
            )}
        </div>
    );
}
