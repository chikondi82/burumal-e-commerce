import apiClient from './client';
import { Product, Category } from '../../types/product';

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  verified?: boolean;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsApi = {
  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products', { params: filters });
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/products/categories');
    return response.data;
  },

  searchProducts: async (query: string, filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products/search', {
      params: { ...filters, q: query },
    });
    return response.data;
  },

  getProductsBySeller: async (sellerId: string, filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(`/products/seller/${sellerId}`, { params: filters });
    return response.data;
  },

  getProductsByCategory: async (categoryId: string, filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(`/products/category/${categoryId}`, { params: filters });
    return response.data;
  },
};
