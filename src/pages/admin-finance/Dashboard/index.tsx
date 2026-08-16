import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function FinanceAdminDashboard() {
  const mockStats = {
    totalRevenue: 85000000,
    platformCommission: 8500000,
    pendingPayouts: 12500000,
    completedPayouts: 45000000,
    totalTransactions: 3420,
    averageTransaction: 24854,
  };

  const pendingPayouts = [
    { id: 1, seller: 'Maison XYZ', amount: 2500000, orders: 45, requested: '2024-01-15' },
    { id: 2, seller: 'Tech Hub', amount: 1800000, orders: 32, requested: '2024-01-14' },
    { id: 3, seller: 'Fashion House', amount: 3200000, orders: 58, requested: '2024-01-13' },
  ];

  const recentTransactions = [
    { id: 1, type: 'sale', seller: 'Maison XYZ', amount: 85000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'payout', seller: 'Tech Hub', amount: 500000, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'sale', seller: 'Fashion House', amount: 65000, date: '2024-01-13', status: 'pending' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600';
      case 'payout': return 'text-blue-600';
      case 'refund': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Finance Dashboard</h1>
              <p className="text-gray-600">Revenue, payouts, and transactions</p>
            </div>
            <Button>Export Financial Report</Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">{(mockStats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Commission</p>
              <p className="text-2xl font-bold text-green-600">{(mockStats.platformCommission / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Pending Payouts</p>
              <p className="text-2xl font-bold text-yellow-600">{(mockStats.pendingPayouts / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Completed Payouts</p>
              <p className="text-2xl font-bold text-blue-600">{(mockStats.completedPayouts / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Transactions</p>
              <p className="text-2xl font-bold">{mockStats.totalTransactions}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Avg Transaction</p>
              <p className="text-2xl font-bold">{mockStats.averageTransaction.toLocaleString()}</p>
            </div>
          </div>

          {/* Pending Payouts */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Pending Payouts</h2>
              <Link to="/admin-finance/payouts" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {pendingPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{payout.seller}</p>
                    <p className="text-sm text-gray-600">{payout.orders} orders • Requested {payout.requested}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{payout.amount.toLocaleString()} BIF</p>
                    <Button size="sm" className="mt-1">
                      Process
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Electronics</span>
                  <span className="font-bold">29.75M BIF (35%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '35%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Fashion</span>
                  <span className="font-bold">23.8M BIF (28%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '28%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Beauty</span>
                  <span className="font-bold">15.3M BIF (18%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Commission Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Commission (10%)</span>
                  <span className="font-bold text-green-600">8.5M BIF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold">2.5M BIF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-bold">1.8M BIF</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Growth</span>
                    <span className="font-bold text-green-600">+38.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Link to="/admin-finance/transactions" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-gray-600">{transaction.seller} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'sale' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} BIF
                    </p>
                    <span className="text-xs text-gray-600 capitalize">{transaction.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
