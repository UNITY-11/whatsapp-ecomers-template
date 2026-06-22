"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, FolderTree, Settings, LogOut, Star } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Categories", href: "/categories", icon: FolderTree },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col rounded-none bg-[#faf7f2] border border-[#ddd5c8] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-[#1a2e28] tracking-wider">LUXESTORE<span className="text-[#B89A5A] drop-shadow-[0_0_8px_rgba(184,154,90,0.3)]">.</span></h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-none px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:translate-x-1 ${
                  isActive
                    ? "bg-[#0F4A3A] text-[#F5F0E8] shadow-[0_4px_10px_rgba(15,74,58,0.2)]"
                    : "text-[#1a2e28]/70 hover:bg-[#ebe4d8] hover:text-[#1a2e28]"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 transition-colors duration-300 ${
                    isActive ? "text-[#F5F0E8]" : "text-[#1a2e28]/50 group-hover:text-[#1a2e28]"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-[#ddd5c8]">
        <button className="group flex w-full items-center rounded-none px-3 py-2.5 text-sm font-medium text-[#1a2e28]/70 hover:bg-red-50 hover:text-[#b54545] transition-all duration-300 ease-out hover:translate-x-1">
          <LogOut className="mr-3 h-5 w-5 shrink-0 text-[#1a2e28]/50 group-hover:text-[#b54545] transition-colors duration-300" />
          Logout
        </button>
      </div>
    </div>
  );
}
