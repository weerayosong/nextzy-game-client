// ข้อมูลผู้เล่น user
export type User = {
    id: string;
    nickname: string;
    totalPoints: number;
};

// ประเภทของแท็บในหน้า history
export type TabType = "GLOBAL" | "PERSONAL" | "REWARD";

// รูปแบบข้อมูลที่ตอบกลับมาจาก api history
export type HistoryResponseItem = {
    id: string;
    checkpoint?: number;
    pointsReceived?: number;
    createdAt: string;
    user?: { nickname: string };
};
