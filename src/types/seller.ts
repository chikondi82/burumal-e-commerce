export interface Seller {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  description?: string;
  logo?: string;
  verified: boolean;
  rating: number;
  fulfillmentRate: number;
  totalProducts: number;
  totalSales: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  lowStockProducts: number;
}
