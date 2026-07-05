import { MOCK_CUSTOMERS } from "@/features/customers/data/mock";
import { MOCK_ALL_ORDERS } from "@/features/orders/data/mock";

import { projectId, sanityClient } from "../lib/sanity";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  totalProducts: number;
  salesData: { name: string; total: number }[];
  orderStatusData: { name: string; value: number; fill?: string }[];
  recentOrders: typeof MOCK_ALL_ORDERS;
}

const isSanityConfigured = projectId && projectId !== "placeholder";

// Using tailwind variable equivalents or raw colors for Recharts pie chart
const STATUS_COLORS: Record<string, string> = {
  pending: "#b89a5a", // brand-accent
  processing: "#1a2e28", // brand-text (dark green)
  shipped: "#145242", // brand-primary-hover
  delivered: "#0f4a3a", // brand-primary
  cancelled: "#b54545", // brand-danger
};

export async function getDashboardStats(): Promise<DashboardStats> {
  // If Sanity isn't configured, return aggregated mock data
  if (!isSanityConfigured) {
    let totalRevenue = 0;
    const totalOrders = MOCK_ALL_ORDERS.length;
    const activeCustomers = MOCK_CUSTOMERS.length;
    const totalProducts = 12; // fallback

    const salesMap = new Map<string, number>();
    const statusMap = new Map<string, number>();

    MOCK_ALL_ORDERS.forEach((order) => {
      // 1. Order status
      const currentStatusCount = statusMap.get(order.status) || 0;
      statusMap.set(order.status, currentStatusCount + 1);

      // 2. Revenue and sales map (only non-cancelled)
      if (order.status !== "cancelled") {
        totalRevenue += order.total;

        const currentSales = salesMap.get(order.date) || 0;
        salesMap.set(order.date, currentSales + order.total);
      }
    });

    const salesData = Array.from(salesMap.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    const orderStatusData = Array.from(statusMap.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      fill: STATUS_COLORS[name] || "#6b7280", // gray-500
    }));

    return {
      totalRevenue,
      totalOrders,
      activeCustomers,
      totalProducts,
      salesData,
      orderStatusData,
      recentOrders: MOCK_ALL_ORDERS.slice(0, 5),
    };
  }

  // Fallback if configured but missing queries
  return {
    totalRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    totalProducts: 0,
    salesData: [],
    orderStatusData: [],
    recentOrders: [],
  };
}
