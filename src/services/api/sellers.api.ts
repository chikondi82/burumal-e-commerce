import apiClient from './client';
import { Seller, SellerStats } from '../../types/seller';

export interface SellerRegistrationData {
  businessName: string;
  email: string;
  phone: string;
  description?: string;
  logo?: string;
}

export const sellersApi = {
  getSeller: async (id: string): Promise<Seller> => {
    const response = await apiClient.get<Seller>(`/sellers/${id}`);
    return response.data;
  },

  getSellerStats: async (id: string): Promise<SellerStats> => {
    const response = await apiClient.get<SellerStats>(`/sellers/${id}/stats`);
    return response.data;
  },

  registerSeller: async (data: SellerRegistrationData): Promise<Seller> => {
    const response = await apiClient.post<Seller>('/sellers/register', data);
    return response.data;
  },

  verifySeller: async (id: string): Promise<Seller> => {
    const response = await apiClient.post<Seller>(`/sellers/${id}/verify`);
    return response.data;
  },

  getSellers: async (filters: { verified?: boolean; page?: number; limit?: number } = {}): Promise<{ sellers: Seller[]; total: number }> => {
    const response = await apiClient.get<{ sellers: Seller[]; total: number }>('/sellers', { params: filters });
    return response.data;
  },

  updateSellerProfile: async (id: string, data: Partial<SellerRegistrationData>): Promise<Seller> => {
    const response = await apiClient.patch<Seller>(`/sellers/${id}`, data);
    return response.data;
  },
};
