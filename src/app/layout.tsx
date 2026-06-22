import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

import { GameProvider } from "@/contexts/GameContext";
import RouteGuard from "@/components/RouteGuard";
import { Toaster } from "react-hot-toast";

const kanit = Kanit({
    subsets: ["latin", "thai"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Nextzy Gamification",
    description: "เกมสะสมคะแนน Nextzy Test",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            {/* outer bg gray100 */}
            <body
                className={`${kanit.className} bg-gray-100 text-black antialiased`}
            >
                <GameProvider>
                    {/* mainContainer mobile-100%, desktop-center */}
                    <div className="w-full max-w-md mx-auto h-dvh bg-white shadow-2xl relative overflow-hidden flex flex-col">
                        <RouteGuard>{children}</RouteGuard>
                    </div>
                </GameProvider>

                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}
