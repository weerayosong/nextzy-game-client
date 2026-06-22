"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RouteGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // avoid cascade render
        const timer = setTimeout(() => {
            // ดึงข้อมูลจาก localStorage
            const storedUser = localStorage.getItem("nextzy_user");

            // 1. ถ้า "ไม่มี" ข้อมูลล็อกอิน และไม่ได้อยู่หน้าแรก (/)
            if (!storedUser && pathname !== "/") {
                router.push("/"); // เตะกลับไปหน้า Login
            }
            // 2. ถ้า "มี" ข้อมูลล็อกอินแล้ว แต่เผลอกดมาหน้าแรก (/)
            else if (storedUser && pathname === "/") {
                router.push("/home"); // พาเข้าไปหน้า Dashboard เลย จะได้ไม่ต้องล็อกอินซ้ำ
            }
            // 3. ปล่อยผ่าน
            else {
                setIsChecking(false);
            }
        }, 0);
        // cleanup function
        return () => clearTimeout(timer);
    }, [pathname, router]);

    // ระหว่างที่ยามกำลังตรวจบัตร ป้องกันหน้าเว็บกระพริบให้เห็นแวยๆ
    if (isChecking) {
        return (
            <div className="min-h-screen bg-[#FDF2F2] flex items-center justify-center text-gray-400">
                กำลังตรวจสอบสิทธิ์...
            </div>
        );
    }

    // ตรวจผ่านแล้ว แสดงผลหน้าเว็บปกติได้เลย
    return <>{children}</>;
}
