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
          <h1 className="text-brand-h1 font-bold tracking-tight text-brand-text flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-brand-primary" />
            Orders
          </h1>
          <p className="text-brand-text/70 mt-2">Manage all orders across your store.</p>
        </div>
        <Link
          href="/orders/add"
          className="flex items-center gap-2 rounded-global bg-brand-primary px-6 py-2.5 text-brand-body font-semibold text-brand-secondary shadow-sm hover:bg-brand-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Order
        </Link>
      </div>

      <div className="bg-white border-global border-brand-border-global shadow-sm">
        <div className="p-4 border-b border-brand-border-global bg-brand-surface">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/40" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-global border-0 bg-white py-2 pl-10 pr-3 text-brand-text shadow-sm ring-1 ring-inset ring-brand-border-global focus:ring-2 focus:ring-brand-accent/50 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border-global">
            <thead className="bg-[#f0ece1]">
              <tr>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-brand-small font-semibold text-brand-text uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-border-global">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-surface transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-text">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-body text-brand-text/70">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/customers/${order.customerId}`} className="text-brand-primary hover:underline font-medium">
                      {order.customerName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-body text-brand-text/70">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-body text-brand-text/70">
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-brand-body font-medium">
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
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-text/50">
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
