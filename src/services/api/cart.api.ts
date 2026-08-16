import apiClient from './client';
import { Product } from '../../types/product';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItemWithProduct[];
  subtotal: number;
  total: number;
  currency: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
  total: number;
}

export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<CartResponse>('/cart');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<CartResponse> => {
    const response = await apiClient.post<CartResponse>('/cart', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (productId: string, quantity: number): Promise<CartResponse> => {
    const response = await apiClient.patch<CartResponse>(`/cart/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (productId: string): Promise<CartResponse> => {
    const response = await apiClient.delete<CartResponse>(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/cart');
  },
};
