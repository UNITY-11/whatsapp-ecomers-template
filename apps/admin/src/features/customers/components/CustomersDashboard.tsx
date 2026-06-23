"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Search, Users } from "lucide-react";

import { MOCK_CUSTOMERS } from "../data/mock";
import { Customer } from "../types";

export default function CustomersDashboard() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="max-w-brand mx-auto flex min-h-[calc(100vh-64px)] w-full flex-col gap-8 p-8 pb-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-brand-h1 text-brand-text flex items-center gap-3 font-bold tracking-tight">
            <Users className="text-brand-primary h-8 w-8" />
            Customers
          </h1>
          <p className="text-brand-text/70 mt-2">
            Manage your customers and view their order history.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover flex items-center gap-2 px-6 py-2.5 font-semibold shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      {isAdding && (
        <div className="bg-brand-surface border-global border-brand-border-global mb-4 p-6 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text mb-4 font-semibold">Add New Customer</h2>
          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newCustomer = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
                email: "",
                orders: 0,
                totalSpent: 0,
              };
              setCustomers([...customers, newCustomer]);
              setIsAdding(false);
            }}
          >
            <div>
              <label className="text-brand-body text-brand-text block font-medium">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="rounded-global text-brand-text ring-brand-border-global focus:ring-brand-focus-ring mt-1 block w-full border-0 bg-white px-3 py-2 shadow-sm ring-1 transition-all ring-inset focus:ring-2"
              />
            </div>
            <div>
              <label className="text-brand-body text-brand-text block font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+1234567890"
                className="rounded-global text-brand-text ring-brand-border-global focus:ring-brand-focus-ring mt-1 block w-full border-0 bg-white px-3 py-2 shadow-sm ring-1 transition-all ring-inset focus:ring-2"
              />
            </div>
            <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-brand-body text-brand-text/70 hover:text-brand-text px-4 py-2 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-primary text-brand-body hover:bg-brand-primary-hover px-6 py-2 font-semibold text-white"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="border-global border-brand-border-global bg-white shadow-sm">
        <div className="border-brand-border-global bg-brand-surface border-b p-4">
          <div className="relative max-w-md">
            <Search className="text-brand-text/40 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or phone..."
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
                  Name
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Contact
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Orders
                </th>
                <th className="text-brand-small text-brand-text px-6 py-3 text-left font-semibold tracking-wider uppercase">
                  Total Spent
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-brand-border-global divide-y bg-white">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-brand-surface transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-brand-text font-medium">{customer.name}</div>
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    <div>{customer.phone}</div>
                    {customer.email && <div className="text-brand-small">{customer.email}</div>}
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    {customer.orders}
                  </td>
                  <td className="text-brand-body text-brand-text/70 px-6 py-4 whitespace-nowrap">
                    ₹{customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="text-brand-body px-6 py-4 text-right font-medium whitespace-nowrap">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="text-brand-primary hover:text-brand-accent inline-flex items-center gap-1 transition-colors"
                    >
                      View details <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-brand-text/50 px-6 py-12 text-center">
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
