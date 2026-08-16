import apiClient from './client';
import { Payment, MobileMoneyPayment, BankPayment } from '../../types/payment';

export interface InitiatePaymentData {
  orderId: string;
  method: 'mobile_money' | 'bank' | 'burundi_pay' | 'cash_on_delivery';
  mobileMoney?: MobileMoneyPayment;
  bank?: BankPayment;
}

export const paymentsApi = {
  initiatePayment: async (data: InitiatePaymentData): Promise<Payment> => {
    const response = await apiClient.post<Payment>('/payments/initiate', data);
    return response.data;
  },

  getPayment: async (id: string): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  confirmPayment: async (id: string, transactionId: string): Promise<Payment> => {
    const response = await apiClient.post<Payment>(`/payments/${id}/confirm`, { transactionId });
    return response.data;
  },

  getPaymentMethods: async (): Promise<Array<{ id: string; name: string; method: string; available: boolean }>> => {
    const response = await apiClient.get('/payments/methods');
    return response.data;
  },
};
