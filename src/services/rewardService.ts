const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const rewardService = {
    // ยิง api กดรับ รางวัล
    claimReward: async (userId: string, checkpoint: number) => {
        const res = await fetch(`${API_URL}/reward/claim`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, checkpoint }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                errorData.message || "เกิดข้อผิดพลาดในการรับรางวัล",
            );
        }
        return res.json();
    },

    // ยิง api ดึง ประวัติการรับรางวัล
    getRewardHistory: async (
        userId: string,
        page: number = 1,
        limit: number = 5,
    ) => {
        const res = await fetch(
            `${API_URL}/reward/history/${userId}?page=${page}&limit=${limit}`,
        );
        if (!res.ok) throw new Error("Failed to fetch reward history");
        return res.json();
    },
};
