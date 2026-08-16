import apiClient from './client';
import { Order } from '../../types/order';

export interface CreateOrderData {
  items: Array<{ productId: string; quantity: number }>;
  deliveryAddress: {
    street: string;
    city: string;
    province: string;
    country: string;
    phone: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'mobile_money' | 'bank' | 'burundi_pay' | 'cash_on_delivery';
}

export const ordersApi = {
  createOrder: async (data: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', data);
    return response.data;
  },

  getOrders: async (filters: { status?: string; page?: number; limit?: number } = {}): Promise<{ orders: Order[]; total: number }> => {
    const response = await apiClient.get<{ orders: Order[]; total: number }>('/orders', { params: filters });
    return response.data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.post<Order>(`/orders/${id}/cancel`);
    return response.data;
  },

  trackOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}/track`);
    return response.data;
  },
};
