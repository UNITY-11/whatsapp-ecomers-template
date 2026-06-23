import CustomerDetail from "@/features/customers/components/CustomerDetail";
import { use } from "react";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CustomerDetail id={id} />;
}
