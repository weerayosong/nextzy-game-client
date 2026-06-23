const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const historyService = {
    // ดึง ประวัติทั่วโลก
    getGlobalHistory: async (page: number = 1, limit: number = 5) => {
        const res = await fetch(
            `${API_URL}/history/global?page=${page}&limit=${limit}`,
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                errorData.message || "Failed to fetch global history",
            );
        }
        return res.json();
    },

    // ดึง ประวัติส่วนตัว
    getPersonalHistory: async (
        userId: string,
        page: number = 1,
        limit: number = 5,
    ) => {
        const res = await fetch(
            `${API_URL}/history/personal/${userId}?page=${page}&limit=${limit}`,
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                errorData.message || "Failed to fetch personal history",
            );
        }
        return res.json();
    },
};
