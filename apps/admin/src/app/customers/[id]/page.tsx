import { use } from "react";

import CustomerDetail from "@/features/customers/components/CustomerDetail";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CustomerDetail id={id} />;
}
