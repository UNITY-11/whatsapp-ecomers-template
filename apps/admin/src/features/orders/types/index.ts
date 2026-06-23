export interface OrderItem {
  id: number;
  productId: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerId: string;
  date: string;
  items: number;
  total: number;
  status: string;
}
