
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'flowers' | 'plants' | 'orchids' | 'gifts' | 'preserved';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'nequi' | 'daviplata' | 'cash';

export interface DeliveryDetails {
  name: string;
  address: string;
  phone: string;
  notes: string;
  paymentMethod: PaymentMethod;
  cardMessage?: string;
}

export type ViewState = 'shop' | 'admin' | 'checkout';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info';
}
