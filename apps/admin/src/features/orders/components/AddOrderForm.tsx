"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";

import CustomSelect from "@/shared/components/CustomSelect";
import { MOCK_CUSTOMERS } from "@/features/customers/data/mock";

const MOCK_PRODUCTS = [
  { id: "P1", name: "Elegant Evening Gown", price: 1500, sizes: ["S", "M", "L"] },
  { id: "P2", name: "Diamond Ring", price: 5000, sizes: ["6", "7", "8"] },
  { id: "P3", name: "Summer Dress", price: 800, sizes: ["XS", "S", "M", "L", "XL"] },
];

export default function AddOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCustomerId = searchParams.get("customerId");

  const [customerId, setCustomerId] = useState(initialCustomerId || "");
  const [items, setItems] = useState([{ id: "1", productId: "", size: "", quantity: 1 }]);

  const handleAddItem = () => {
    setItems([...items, { id: crypto.randomUUID(), productId: "", size: "", quantity: 1 }]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) return alert("Please select a customer.");
    if (items.some((i) => !i.productId || !i.size || i.quantity < 1))
      return alert("Please fill all item details.");

    // In a real app, you would send this to the backend
    console.log({ customerId, items, total: calculateTotal() });
    alert("Order drafted successfully!");
    router.push("/orders");
  };

  return (
    <div className="max-w-brand mx-auto flex w-full flex-col gap-8 p-8 pb-24">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-brand-text/50 hover:bg-brand-secondary-hover hover:text-brand-primary -ml-2 p-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-brand-h1 text-brand-text font-bold tracking-tight">
            Draft New Order
          </h1>
          <p className="text-brand-text/70 mt-1">Create a manual order for a customer.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Section */}
        <div className="border-global border-brand-border-global space-y-4 bg-white p-6 shadow-sm">
          <h2 className="text-brand-h3 text-brand-text border-brand-border-global border-b pb-2 font-semibold">
            Customer Details
          </h2>
          <div>
            <label className="text-brand-body text-brand-text mb-1 block font-medium">
              Select Customer *
            </label>
            <CustomSelect
              value={customerId}
              onChange={setCustomerId}
              options={MOCK_CUSTOMERS.map((c) => ({
                value: c.id,
                label: `${c.name} (${c.phone})`,
              }))}
              placeholder="Choose a customer..."
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="border-global border-brand-border-global space-y-6 bg-white p-6 shadow-sm">
          <div className="border-brand-border-global flex items-center justify-between border-b pb-2">
            <h2 className="text-brand-h3 text-brand-text font-semibold">Order Items</h2>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-brand-primary text-brand-body hover:text-brand-accent flex items-center gap-1 font-medium"
            >
              <Plus className="h-4 w-4" /> Add Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const selectedProduct = MOCK_PRODUCTS.find((p) => p.id === item.productId);
              return (
                <div
                  key={item.id}
                  className="bg-brand-surface border-global border-brand-border-global flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="w-full flex-1">
                    <label className="text-brand-small text-brand-text/70 mb-1 block font-medium">
                      Product
                    </label>
                    <CustomSelect
                      value={item.productId}
                      onChange={(val) => {
                        updateItem(item.id, "productId", val);
                        updateItem(item.id, "size", ""); // reset size on product change
                      }}
                      options={MOCK_PRODUCTS.map((p) => ({
                        value: p.id,
                        label: `${p.name} - ₹${p.price}`,
                      }))}
                      placeholder="Select product..."
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="text-brand-small text-brand-text/70 mb-1 block font-medium">
                      Size
                    </label>
                    <CustomSelect
                      value={item.size}
                      onChange={(val) => updateItem(item.id, "size", val)}
                      options={
                        selectedProduct
                          ? selectedProduct.sizes.map((s) => ({ value: s, label: s }))
                          : []
                      }
                      placeholder="Size"
                      disabled={!selectedProduct}
                    />
                  </div>
                  <div className="w-full sm:w-24">
                    <label className="text-brand-small text-brand-text/70 mb-1 block font-medium">
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", parseInt(e.target.value) || 1)
                      }
                      required
                      className="rounded-global text-brand-body text-brand-text ring-brand-border-global focus:ring-brand-focus-ring block w-full border-0 bg-white px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2"
                    />
                  </div>
                  <div className="w-full text-right sm:w-24">
                    <label className="text-brand-small text-brand-text/70 mb-1 block font-medium">
                      Subtotal
                    </label>
                    <div className="text-brand-text py-1.5 font-medium">
                      ₹
                      {selectedProduct
                        ? (selectedProduct.price * item.quantity).toFixed(2)
                        : "0.00"}
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-brand-border-global flex justify-end border-t pt-4">
            <div className="text-right">
              <span className="text-brand-body text-brand-text/70 mr-4">Grand Total</span>
              <span className="text-brand-h2 text-brand-primary font-bold">
                ₹{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-brand-body text-brand-text/70 hover:text-brand-text px-6 py-2.5 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-global bg-brand-primary text-brand-body text-brand-secondary hover:bg-brand-primary-hover flex items-center gap-2 px-8 py-2.5 font-semibold shadow-sm transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
}
