export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_unique: boolean;
  category: string;
  created_at?: string;
}

export interface ShippingInfo {
  customer_name: string;
  user_email: string;
  user_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_department: string;
  notes?: string;
}

export interface Order extends ShippingInfo {
  id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  total_amount: number;
  mercadopago_id?: string;
  created_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
}
