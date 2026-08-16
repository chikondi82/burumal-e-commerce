export interface Payment {
  id: string;
  orderId: string;
  method: 'mobile_money' | 'bank' | 'burundi_pay' | 'cash_on_delivery';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
  provider?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MobileMoneyPayment {
  phoneNumber: string;
  provider: 'mtn' | 'airtel' | 'eco_cash';
  transactionId?: string;
}

export interface BankPayment {
  bankName: string;
  accountNumber: string;
  accountName: string;
  transactionId?: string;
}
