import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth-actions";
import { getOrderRequests } from "@/services/content-service";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/utils/format";
import { ORDER_STATUSES } from "@/lib/constants";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const orders = await getOrderRequests();

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-8">Order Requests</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = ORDER_STATUSES.find((s) => s.value === order.status);
            return (
              <div key={order._id} className="border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order._createdAt && formatDate(order._createdAt)}</p>
                  </div>
                  <Badge className={status?.color}>{status?.label || order.status}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-semibold border-t pt-3">
                  <span>Total ({order.totalItems} items)</span>
                  <span>{formatPrice(order.grandTotal)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
