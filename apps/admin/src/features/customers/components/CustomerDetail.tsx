"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, Plus, ShoppingBag, Trash2 } from "lucide-react";

import CustomSelect from "@/shared/components/CustomSelect";

import { MOCK_CUSTOMERS } from "../data/mock";

// Mock Orders
const MOCK_ORDERS = [
  {
    id: "ORD-001",
    customerId: "1",
    date: "2026-06-20",
    items: 2,
    total: 250.0,
    status: "delivered",
  },
  {
    id: "ORD-002",
    customerId: "1",
    date: "2026-06-22",
    items: 1,
    total: 200.0,
    status: "processing",
  },
];

export default function CustomerDetail({ id }: { id: string }) {
  const [customer] = useState(
    () =>
      MOCK_CUSTOMERS.find((c) => c.id === id) || {
        id,
        name: "Unknown Customer",
        phone: "",
        email: "",
        orders: 0,
        totalSpent: 0,
      }
  );
  const [orders, setOrders] = useState(() => MOCK_ORDERS.filter((o) => o.customerId === id));

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  return (
    <div className="max-w-brand mx-auto flex w-full flex-col gap-8 p-8 pb-24">
      {/* Header & Quick Actions */}
      <div className="border-global border-brand-border-global flex flex-col justify-between gap-6 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <Link
            href="/customers"
            className="text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary -ml-2 p-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">
              {customer.name}
            </h1>
            <p className="text-brand-text/70 mt-1 flex items-center gap-4">
              <span>{customer.phone}</span>
              {customer.email && <span>• {customer.email}</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${customer.phone}`}
            className="rounded-global bg-brand-surface border-global border-brand-border-global text-brand-body text-brand-text hover:bg-brand-secondary-hover flex items-center gap-2 px-4 py-2.5 font-semibold transition-colors"
          >
            <Phone className="text-brand-primary h-4 w-4" />
            Call
          </a>
          <a
            href={`https://wa.me/${customer.phone.replace(/[^0-9+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-global text-brand-body flex items-center gap-2 bg-[#25D366] px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebd5a]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Orders Section */}
      <div className="border-global border-brand-border-global bg-white shadow-sm">
        <div className="border-brand-border-global bg-brand-surface flex items-center justify-between border-b p-6">
          <h2 className="text-brand-h2 text-brand-text flex items-center gap-2 font-bold">
            <ShoppingBag className="text-brand-accent h-5 w-5" />
            Order History
          </h2>
          <Link
            href={`/orders/add?customerId=${id}`}
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover flex items-center gap-2 px-4 py-2 font-semibold shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Order
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="divide-brand-border-global min-w-full divide-y">
            <thead className="bg-white">
              <tr>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Order ID
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Date
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-surface transition-colors">
                  <td className="text-brand-text px-6 py-4 font-medium whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    {order.date}
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
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-brand-text/50 px-6 py-12 text-center">
                    This customer hasn't placed any orders yet.
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
