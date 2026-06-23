import { Customer } from "../types";

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", name: "John Doe", phone: "+1234567890", email: "john@example.com", orders: 3, totalSpent: 450.00 },
  { id: "2", name: "Jane Smith", phone: "+9876543210", email: "jane@example.com", orders: 1, totalSpent: 120.50 },
  { id: "3", name: "Alice Johnson", phone: "+1122334455", email: "alice@example.com", orders: 0, totalSpent: 0 },
];
