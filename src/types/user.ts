export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'seller' | 'admin';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer extends User {
  role: 'customer';
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  province: string;
  country: string;
  isDefault: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
