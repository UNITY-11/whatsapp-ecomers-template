"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, ShoppingBag, Plus, Trash2 } from "lucide-react";
import { MOCK_CUSTOMERS } from "../data/mock";
import CustomSelect from "@/shared/components/CustomSelect";

// Mock Orders
const MOCK_ORDERS = [
  { id: "ORD-001", customerId: "1", date: "2026-06-20", items: 2, total: 250.00, status: "delivered" },
  { id: "ORD-002", customerId: "1", date: "2026-06-22", items: 1, total: 200.00, status: "processing" },
];

export default function CustomerDetail({ id }: { id: string }) {
  const [customer] = useState(() => MOCK_CUSTOMERS.find(c => c.id === id) || { id, name: "Unknown Customer", phone: "", email: "", orders: 0, totalSpent: 0 });
  const [orders, setOrders] = useState(() => MOCK_ORDERS.filter(o => o.customerId === id));

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full pb-24">
      {/* Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 border border-brand-border shadow-sm">
        <div className="flex items-start gap-4">
          <Link href="/customers" className="p-2 -ml-2 text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-brand-text">{customer.name}</h1>
            <p className="text-brand-text/70 mt-1 flex items-center gap-4">
              <span>{customer.phone}</span>
              {customer.email && <span>• {customer.email}</span>}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <a 
            href={`tel:${customer.phone}`}
            className="flex items-center gap-2 rounded-global bg-brand-surface border border-brand-border px-4 py-2.5 text-sm font-semibold text-brand-text hover:bg-brand-secondary-hover transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-primary" />
            Call
          </a>
          <a 
            href={`https://wa.me/${customer.phone.replace(/[^0-9+]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-global bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebd5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white border border-brand-border shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-surface">
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-accent" />
            Order History
          </h2>
          <Link
            href={`/orders/add?customerId=${id}`}
            className="flex items-center gap-2 rounded-global bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Order
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-surface transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-text">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text/70">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text/70">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text/70">
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
                        { value: "cancelled", label: "Cancelled" }
                      ]}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brand-text/50">
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
