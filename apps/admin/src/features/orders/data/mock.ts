import { Order } from "../types";

export const MOCK_ALL_ORDERS: Order[] = [
  { id: "ORD-001", customerName: "John Doe", customerId: "1", date: "2026-06-20", items: 2, total: 250.00, status: "delivered" },
  { id: "ORD-002", customerName: "John Doe", customerId: "1", date: "2026-06-22", items: 1, total: 200.00, status: "processing" },
  { id: "ORD-003", customerName: "Jane Smith", customerId: "2", date: "2026-06-21", items: 3, total: 450.00, status: "pending" },
];
