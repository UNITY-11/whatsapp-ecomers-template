"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Users, ChevronRight } from "lucide-react";

export const MOCK_CUSTOMERS = [
  { id: "1", name: "John Doe", phone: "+1234567890", email: "john@example.com", orders: 3, totalSpent: 450.00 },
  { id: "2", name: "Jane Smith", phone: "+9876543210", email: "jane@example.com", orders: 1, totalSpent: 120.50 },
  { id: "3", name: "Alice Johnson", phone: "+1122334455", email: "alice@example.com", orders: 0, totalSpent: 0 },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full pb-24 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28] flex items-center gap-3">
            <Users className="w-8 h-8 text-[#0F4A3A]" />
            Customers
          </h1>
          <p className="text-[#1a2e28]/70 mt-2">Manage your customers and view their order history.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-6 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#faf7f2] border border-[#ddd5c8] p-6 shadow-sm mb-4">
          <h2 className="text-lg font-semibold text-[#1a2e28] mb-4">Add New Customer</h2>
          <form 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newCustomer = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
                email: "",
                orders: 0,
                totalSpent: 0
              };
              setCustomers([...customers, newCustomer]);
              setIsAdding(false);
            }}
          >
            <div>
              <label className="block text-sm font-medium text-[#1a2e28]">Full Name *</label>
              <input type="text" name="name" required className="mt-1 block w-full rounded-none border-0 bg-white py-2 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-[#ddd5c8] focus:ring-2 focus:ring-[#B89A5A]/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a2e28]">Phone Number *</label>
              <input type="tel" name="phone" required placeholder="+1234567890" className="mt-1 block w-full rounded-none border-0 bg-white py-2 px-3 text-[#1a2e28] shadow-sm ring-1 ring-inset ring-[#ddd5c8] focus:ring-2 focus:ring-[#B89A5A]/50 transition-all" />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-[#1a2e28]/70 hover:text-[#1a2e28]">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[#0F4A3A] text-white text-sm font-semibold hover:bg-[#145242]">Save Customer</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-[#ddd5c8] shadow-sm">
        <div className="p-4 border-b border-[#ddd5c8] bg-[#faf7f2]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2e28]/40" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#1a2e28] uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 relative"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#ddd5c8]">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#faf7f2] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-[#1a2e28]">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    <div>{customer.phone}</div>
                    {customer.email && <div className="text-xs">{customer.email}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1a2e28]/70">
                    ₹{customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/customers/${customer.id}`} className="text-[#0F4A3A] hover:text-[#B89A5A] inline-flex items-center gap-1 transition-colors">
                      View details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#1a2e28]/50">
                    No customers found matching your search.
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
