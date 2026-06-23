"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, FolderTree, Settings, LogOut, Star, Users, ClipboardList } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Categories", href: "/categories", icon: FolderTree },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col rounded-global bg-brand-surface border-global border-brand-border-global shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-brand-h2 font-bold text-brand-text tracking-wider">LUXESTORE<span className="text-brand-accent drop-shadow-[0_0_8px_rgba(184,154,90,0.3)]">.</span></h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-global px-3 py-2.5 text-brand-body font-medium transition-all duration-300 ease-out hover:translate-x-1 ${
                  isActive
                    ? "bg-brand-primary text-brand-secondary shadow-[0_4px_10px_rgba(15,74,58,0.2)]"
                    : "text-brand-text/70 hover:bg-brand-secondary-hover hover:text-brand-text"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 transition-colors duration-300 ${
                    isActive ? "text-brand-secondary" : "text-brand-text/50 group-hover:text-brand-text"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-brand-border-global">
        <button className="group flex w-full items-center rounded-global px-3 py-2.5 text-brand-body font-medium text-brand-text/70 hover:bg-red-50 hover:text-brand-danger transition-all duration-300 ease-out hover:translate-x-1">
          <LogOut className="mr-3 h-5 w-5 shrink-0 text-brand-text/50 group-hover:text-brand-danger transition-colors duration-300" />
          Logout
        </button>
      </div>
    </div>
  );
}
