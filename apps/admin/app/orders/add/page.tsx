"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { MOCK_CUSTOMERS } from "../../customers/page";
import CustomSelect from "../../../components/CustomSelect";

const MOCK_PRODUCTS = [
  { id: "P1", name: "Elegant Evening Gown", price: 1500, sizes: ["S", "M", "L"] },
  { id: "P2", name: "Diamond Ring", price: 5000, sizes: ["6", "7", "8"] },
  { id: "P3", name: "Summer Dress", price: 800, sizes: ["XS", "S", "M", "L", "XL"] },
];

function AddOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCustomerId = searchParams.get("customerId");

  const [customerId, setCustomerId] = useState(initialCustomerId || "");
  const [items, setItems] = useState([{ id: Date.now(), productId: "", size: "", quantity: 1 }]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), productId: "", size: "", quantity: 1 }]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) return alert("Please select a customer.");
    if (items.some(i => !i.productId || !i.size || i.quantity < 1)) return alert("Please fill all item details.");
    
    // In a real app, you would send this to the backend
    console.log({ customerId, items, total: calculateTotal() });
    alert("Order drafted successfully!");
    router.push("/orders");
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-[#1a2e28]/50 hover:bg-[#ebe4d8] hover:text-[#0F4A3A] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2e28]">Draft New Order</h1>
          <p className="text-[#1a2e28]/70 mt-1">Create a manual order for a customer.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Section */}
        <div className="bg-white border border-[#ddd5c8] shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#1a2e28] border-b border-[#ddd5c8] pb-2">Customer Details</h2>
          <div>
            <label className="block text-sm font-medium text-[#1a2e28] mb-1">Select Customer *</label>
            <CustomSelect 
              value={customerId} 
              onChange={setCustomerId}
              options={MOCK_CUSTOMERS.map(c => ({ value: c.id, label: `${c.name} (${c.phone})` }))}
              placeholder="Choose a customer..."
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white border border-[#ddd5c8] shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#ddd5c8] pb-2">
            <h2 className="text-lg font-semibold text-[#1a2e28]">Order Items</h2>
            <button 
              type="button" 
              onClick={handleAddItem}
              className="text-[#0F4A3A] text-sm font-medium hover:text-[#B89A5A] flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const selectedProduct = MOCK_PRODUCTS.find(p => p.id === item.productId);
              return (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#faf7f2] p-4 border border-[#ddd5c8]">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-[#1a2e28]/70 mb-1">Product</label>
                    <CustomSelect 
                      value={item.productId} 
                      onChange={(val) => {
                        updateItem(item.id, "productId", val);
                        updateItem(item.id, "size", ""); // reset size on product change
                      }}
                      options={MOCK_PRODUCTS.map(p => ({ value: p.id, label: `${p.name} - ₹${p.price}` }))}
                      placeholder="Select product..."
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="block text-xs font-medium text-[#1a2e28]/70 mb-1">Size</label>
                    <CustomSelect 
                      value={item.size} 
                      onChange={(val) => updateItem(item.id, "size", val)}
                      options={selectedProduct ? selectedProduct.sizes.map(s => ({ value: s, label: s })) : []}
                      placeholder="Size"
                      disabled={!selectedProduct}
                    />
                  </div>
                  <div className="w-full sm:w-24">
                    <label className="block text-xs font-medium text-[#1a2e28]/70 mb-1">Qty</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                      required
                      className="block w-full rounded-none border-0 bg-white py-1.5 px-2 text-sm text-[#1a2e28] shadow-sm ring-1 ring-inset ring-[#ddd5c8] focus:ring-2 focus:ring-[#B89A5A]/50"
                    />
                  </div>
                  <div className="w-full sm:w-24 text-right">
                    <label className="block text-xs font-medium text-[#1a2e28]/70 mb-1">Subtotal</label>
                    <div className="py-1.5 font-medium text-[#1a2e28]">
                      ₹{selectedProduct ? (selectedProduct.price * item.quantity).toFixed(2) : "0.00"}
                    </div>
                  </div>
                  <div className="pt-5">
                    <button 
                      type="button" 
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#ddd5c8]">
            <div className="text-right">
              <span className="text-sm text-[#1a2e28]/70 mr-4">Grand Total</span>
              <span className="text-2xl font-bold text-[#0F4A3A]">₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-sm font-semibold text-[#1a2e28]/70 hover:text-[#1a2e28]">Cancel</button>
          <button type="submit" className="flex items-center gap-2 rounded-none bg-[#0F4A3A] px-8 py-2.5 text-sm font-semibold text-[#F5F0E8] shadow-sm hover:bg-[#145242] transition-colors">
            <Save className="w-4 h-4" />
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#1a2e28]/50">Loading form...</div>}>
      <AddOrderForm />
    </Suspense>
  );
}
