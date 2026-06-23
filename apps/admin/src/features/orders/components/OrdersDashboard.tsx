"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, ClipboardList, Trash2 } from "lucide-react";
import CustomSelect from "@/shared/components/CustomSelect";
import { MOCK_ALL_ORDERS } from "../data/mock";
import { Order } from "../types";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ALL_ORDERS);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full pb-24 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28] flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-[#0F4A3A]" />
            Orders
          </h1>
          <p className="text-[#1a2e28]/70 mt-2">Manage all orders across your store.</p>
        </div>
        <Link
          href="/orders/add"
          className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-6 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Order
        </Link>
      </div>

      <div className="bg-white border border-[#ddd5c8] shadow-sm">
        <div className="p-4 border-b border-[#ddd5c8] bg-[#faf7f2]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2e28]/40" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-none border-0 bg-white py-2 pl-10 pr-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-[#ddd5c8] focus:ring-2 focus:ring-[#B89A5A]/50 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#ddd5c8]">
            <thead className="bg-[#f0ece1]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#ddd5c8]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#faf7f2] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#1a2e28]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/customers/${order.customerId}`} className="text-[#0F4A3A] hover:underline font-medium">
                      {order.customerName}
                    </Link>
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
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#1a2e28]/50">
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
