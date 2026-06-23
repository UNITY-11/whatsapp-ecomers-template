"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus, Search, Trash2 } from "lucide-react";

import CustomSelect from "@/shared/components/CustomSelect";

import { MOCK_ALL_ORDERS } from "../data/mock";
import { Order } from "../types";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ALL_ORDERS);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  return (
    <div className="max-w-brand mx-auto flex min-h-[calc(100vh-64px)] w-full flex-col gap-8 p-8 pb-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-brand-h1 text-brand-text flex items-center gap-3 font-bold tracking-tight">
            <ClipboardList className="text-brand-primary h-8 w-8" />
            Orders
          </h1>
          <p className="text-brand-text/70 mt-2">Manage all orders across your store.</p>
        </div>
        <Link
          href="/orders/add"
          className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover flex items-center gap-2 px-6 py-2.5 font-semibold shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Order
        </Link>
      </div>

      <div className="border-global border-brand-border-global bg-white shadow-sm">
        <div className="border-brand-border-global bg-brand-surface border-b p-4">
          <div className="relative max-w-md">
            <Search className="text-brand-text/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-global text-brand-text ring-brand-border-global focus:ring-brand-focus-ring block w-full border-0 bg-white py-2 pr-3 pl-10 shadow-sm ring-1 transition-all ring-inset focus:ring-2"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="divide-brand-border-global min-w-full divide-y">
            <thead className="bg-[#f0ece1]">
              <tr>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Order ID
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Date
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Customer
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Items
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Total
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-brand-border-global divide-y bg-white">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-surface transition-colors">
                  <td className="text-brand-text px-6 py-4 font-medium whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/customers/${order.customerId}`}
                      className="text-brand-primary font-medium hover:underline"
                    >
                      {order.customerName}
                    </Link>
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    {order.items}
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CustomSelect
                      value={order.status}
                      onChange={(val) => handleStatusChange(order.id, val)}
                      options={[
                        { value: "pending", label: "Pending" },
                        { value: "confirmed", label: "Confirmed" },
                        { value: "processing", label: "Processing" },
                        { value: "shipped", label: "Shipped" },
                        { value: "delivered", label: "Delivered" },
                        { value: "cancelled", label: "Cancelled" },
                      ]}
                    />
                  </td>
                  <td className="text-brand-body px-6 py-4 text-right font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-1 text-red-500 transition-colors hover:text-red-700"
                      title="Delete Order"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-brand-text/50 px-6 py-12 text-center">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
