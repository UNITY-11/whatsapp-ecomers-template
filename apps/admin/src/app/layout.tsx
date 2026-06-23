import "./globals.css";
import { Inter } from "next/font/google";

import { Sidebar } from "@/shared/components/Sidebar";
import { Header } from "@/shared/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LuxeStore Admin Panel",
  description: "Manage your store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full text-[#1a2e28]">
      <body className={`h-full bg-[#F5F0E8] ${inter.className}`} suppressHydrationWarning>
        <div className="flex h-screen overflow-hidden p-4 gap-4">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden gap-4">
            <Header />
            <main className="flex-1 overflow-y-auto rounded-none bg-[#faf7f2] border border-[#ddd5c8] shadow-sm relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#0F4A3A]/5 blur-[100px] pointer-events-none" />
              <div className="relative z-10 h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
