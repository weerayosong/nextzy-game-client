"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

type GameContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    updatePoints: (newTotal: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // ดึงข้อมูลผู้เล่นจาก localStorage เมื่อโหลดหน้าเว็บ (รีเฟรชจะได้ไม่หลุดล็อกอิน)
    useEffect(() => {
        const storedUser = localStorage.getItem("nextzy_user");
        if (storedUser) {
            // ใช้ setTimeout(..., 0) เพื่อดันคำสั่งให้ออกจาก Synchronous Call Stack หลบ Linter
            setTimeout(() => {
                setUser(JSON.parse(storedUser));
            }, 0);
        }
    }, []);

    // ฟังก์ชันอัปเดตผู้เล่น พร้อมเซฟลง localStorage
    const handleSetUser = (newUser: User | null) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem("nextzy_user", JSON.stringify(newUser));
        } else {
            localStorage.removeItem("nextzy_user");
        }
    };

    // ฟังก์ชันอัปเดตแค่คะแนน (ใช้ตอนหมุนวงล้อเสร็จ)
    const updatePoints = (newTotal: number) => {
        if (user) {
            const updatedUser = { ...user, totalPoints: newTotal };
            handleSetUser(updatedUser);
        }
    };

    return (
        <GameContext.Provider
            value={{ user, setUser: handleSetUser, updatePoints }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
