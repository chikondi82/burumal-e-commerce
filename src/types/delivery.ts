export interface Delivery {
  id: string;
  orderId: string;
  method: 'standard' | 'express';
  fee: number;
  currency: string;
  address: DeliveryAddress;
  status: DeliveryStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  instructions?: string;
}

export type DeliveryStatus = 
  | 'pending'
  | 'confirmed'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'cancelled';

export interface DeliveryOption {
  id: string;
  name: string;
  method: 'standard' | 'express';
  fee: number;
  estimatedDays: string;
  description: string;
}
