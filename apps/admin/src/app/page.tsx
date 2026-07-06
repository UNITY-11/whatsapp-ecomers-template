import dynamic from "next/dynamic";
import { IndianRupee, Package, ShoppingCart, Users } from "lucide-react";

import { getDashboardStats } from "@/shared/services/dashboard.service";
import { MetricCard } from "@/features/dashboard/components/MetricCard";
import { RecentOrdersTable } from "@/features/dashboard/components/RecentOrdersTable";

const SalesChart = dynamic(
  () => import("@/features/dashboard/components/SalesChart").then((mod) => mod.SalesChart),
  {
    loading: () => <div className="h-[400px] w-full animate-pulse rounded-2xl bg-[#0F4A3A]/5" />,
  }
);

const OrderStatusChart = dynamic(
  () =>
    import("@/features/dashboard/components/OrderStatusChart").then((mod) => mod.OrderStatusChart),
  {
    loading: () => <div className="h-[400px] w-full animate-pulse rounded-2xl bg-[#0F4A3A]/5" />,
  }
);

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="max-w-brand mx-auto flex flex-col gap-8 p-8">
      <div>
        <h1 className="bg-gradient-to-r from-[#1a2e28] to-[#0F4A3A] bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-brand-text/70 text-brand-h3 mt-2">
          Analytics and performance metrics for your store.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<IndianRupee className="text-brand-text h-12 w-12" />}
          trend={{ value: 12.5, label: "from last month" }}
        />
        <MetricCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="text-brand-text h-12 w-12" />}
          trend={{ value: 8.2, label: "from last month" }}
        />
        <MetricCard
          title="Active Customers"
          value={stats.activeCustomers}
          icon={<Users className="text-brand-text h-12 w-12" />}
          trend={{ value: -2.4, label: "from last month" }}
        />
        <MetricCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="text-brand-text h-12 w-12" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart data={stats.salesData} />
        </div>
        <div className="lg:col-span-1">
          <OrderStatusChart data={stats.orderStatusData} />
        </div>
      </div>

      <div>
        <RecentOrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
