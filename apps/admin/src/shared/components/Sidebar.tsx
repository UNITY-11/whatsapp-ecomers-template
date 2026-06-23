"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";

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
    <div className="rounded-global bg-brand-surface border-global border-brand-border-global shadow-brand-card flex h-full w-64 flex-col">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-brand-h2 text-brand-text font-bold tracking-wider">
          CALIRA<span className="text-brand-accent drop-shadow-brand">.</span>
        </h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group rounded-global text-brand-body flex items-center px-3 py-2.5 font-medium transition-all hover:translate-x-1 ${
                  isActive
                    ? "bg-brand-primary text-brand-secondary shadow-brand-active"
                    : "text-brand-text/70 hover:bg-brand-secondary-hover hover:text-brand-text"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-brand-secondary"
                      : "text-brand-text/50 group-hover:text-brand-text"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-brand-border-global border-t p-4">
        <button className="group rounded-global text-brand-body text-brand-text/70 hover:text-brand-danger flex w-full items-center px-3 py-2.5 font-medium transition-all hover:translate-x-1 hover:bg-red-50">
          <LogOut className="text-brand-text/50 group-hover:text-brand-danger mr-3 h-5 w-5 shrink-0 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  );
}
