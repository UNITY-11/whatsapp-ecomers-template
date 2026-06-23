import { Suspense } from "react";

import AddOrderForm from "@/features/orders/components/AddOrderForm";

export default function AddOrderPage() {
  return (
    <Suspense fallback={<div className="text-brand-text/50 p-8 text-center">Loading form...</div>}>
      <AddOrderForm />
    </Suspense>
  );
}
