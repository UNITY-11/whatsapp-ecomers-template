import "./globals.css";

import { Inter } from "next/font/google";

import { Header } from "@/shared/components/Header";
import { Sidebar } from "@/shared/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calira Couture Admin Panel",
  description: "Manage your Calira Couture store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="text-brand-text h-full">
      <body className={`bg-brand-secondary h-full ${inter.className}`} suppressHydrationWarning>
        <div className="flex h-screen gap-4 overflow-hidden p-4">
          <Sidebar />
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <Header />
            <main className="rounded-global bg-brand-surface border-global border-brand-border-global relative flex-1 overflow-y-auto shadow-sm">
              <div className="bg-brand-primary/5 pointer-events-none absolute top-0 left-1/2 h-32 w-3/4 -translate-x-1/2 blur-[100px]" />
              <div className="relative z-10 h-full">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
