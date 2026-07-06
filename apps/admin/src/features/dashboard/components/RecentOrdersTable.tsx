import React from "react";
import Link from "next/link";

import { Order } from "@/features/orders/types";

interface RecentOrdersTableProps {
  orders: Order[];
}

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-500/10 text-green-500",
  processing: "bg-purple-500/10 text-purple-500",
  shipped: "bg-indigo-500/10 text-indigo-500",
  cancelled: "bg-red-500/10 text-red-500",
  pending: "bg-yellow-500/10 text-yellow-500",
};

export const RecentOrdersTable = React.memo(function RecentOrdersTable({
  orders,
}: RecentOrdersTableProps) {
  return (
    <div className="rounded-global border-global border-brand-border-global bg-brand-surface overflow-hidden">
      <div className="border-brand-border-global flex items-center justify-between border-b p-6">
        <h3 className="text-brand-text text-lg font-semibold tracking-tight">Recent Orders</h3>
        <Link href="/orders" className="text-brand-primary text-sm font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-secondary/50 text-brand-text/70">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-brand-border-global divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-brand-text/50 p-6 text-center">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-secondary/30 transition-colors">
                  <td className="text-brand-text px-6 py-4 font-medium">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="text-brand-text px-6 py-4">{order.customerName}</td>
                  <td className="text-brand-text/70 px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        STATUS_STYLES[order.status] || STATUS_STYLES.pending
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-brand-text px-6 py-4 text-right font-medium">
                    ₹{order.total.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
