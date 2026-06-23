"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, ShoppingBag, Plus, MoreVertical, Trash2 } from "lucide-react";
import { MOCK_CUSTOMERS } from "../page";
import CustomSelect from "../../../components/CustomSelect";

// Mock Orders
const MOCK_ORDERS = [
  { id: "ORD-001", customerId: "1", date: "2026-06-20", items: 2, total: 250.00, status: "delivered" },
  { id: "ORD-002", customerId: "1", date: "2026-06-22", items: 1, total: 200.00, status: "processing" },
];

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 border border-[#ddd5c8] shadow-sm">
        <div className="flex items-start gap-4">
          <Link href="/customers" className="p-2 -ml-2 text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">{customer.name}</h1>
            <p className="text-[#1a2e28]/70 mt-1 flex items-center gap-4">
              <span>{customer.phone}</span>
              {customer.email && <span>• {customer.email}</span>}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <a 
            href={`tel:${customer.phone}`}
            className="flex items-center gap-2 rounded-none bg-[#faf7f2] border border-[#ddd5c8] px-4 py-2.5 text-sm font-semibold text-[#1a2e28] hover:bg-[#ebe4d8] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0F4A3A]" />
            Call
          </a>
          <a 
            href={`https://wa.me/${customer.phone.replace(/[^0-9+]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-none bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebd5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white border border-[#ddd5c8] shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-[#ddd5c8] bg-[#faf7f2]">
          <h2 className="text-xl font-bold text-[#1a2e28] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B89A5A]" />
            Order History
          </h2>
          <Link
            href={`/orders/add?customerId=${id}`}
            className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-4 py-2 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Order
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#ddd5c8]">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#ddd5c8]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf7f2] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#1a2e28]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
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
                  <td colSpan={6} className="px-6 py-12 text-center text-[#1a2e28]/50">
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
