import apiClient from './client';
import { Delivery, DeliveryOption } from '../../types/delivery';

export const deliveryApi = {
  getDeliveryOptions: async (): Promise<DeliveryOption[]> => {
    const response = await apiClient.get<DeliveryOption[]>('/delivery/options');
    return response.data;
  },

  getDelivery: async (id: string): Promise<Delivery> => {
    const response = await apiClient.get<Delivery>(`/delivery/${id}`);
    return response.data;
  },

  calculateDeliveryFee: async (address: {
    city: string;
    province: string;
    method: 'standard' | 'express';
  }): Promise<{ fee: number; currency: string; estimatedDays: string }> => {
    const response = await apiClient.post('/delivery/calculate', address);
    return response.data;
  },

  trackDelivery: async (trackingNumber: string): Promise<Delivery> => {
    const response = await apiClient.get<Delivery>(`/delivery/track/${trackingNumber}`);
    return response.data;
  },
};
