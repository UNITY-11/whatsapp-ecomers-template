import AddOrderForm from "@/features/orders/components/AddOrderForm";
import { Suspense } from "react";

export default function AddOrderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-brand-text/50">Loading form...</div>}>
      <AddOrderForm />
    </Suspense>
  );
}
