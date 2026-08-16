import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import MobileNav from '../../../components/layout/MobileNav';
import Button from '../../../components/common/Button';

export default function MarketingManagerDashboard() {
  const mockStats = {
    activeCampaigns: 8,
    totalImpressions: 1250000,
    clickThroughRate: 3.2,
    conversionRate: 1.8,
    marketingSpend: 15000000,
    revenueGenerated: 45000000,
  };

  const activeCampaigns = [
    { id: 1, name: 'Summer Sale 2024', type: 'promotion', status: 'active', impressions: 450000, clicks: 14400, conversions: 259, roi: 2.8 },
    { id: 2, name: 'New Product Launch', type: 'product', status: 'active', impressions: 320000, clicks: 10240, conversions: 184, roi: 3.2 },
    { id: 3, name: 'Flash Sale - Electronics', type: 'flash', status: 'scheduled', impressions: 0, clicks: 0, conversions: 0, roi: 0 },
  ];

  const topPerformers = [
    { name: 'Summer Sale 2024', roi: 2.8, revenue: 12500000 },
    { name: 'New Product Launch', roi: 3.2, revenue: 15000000 },
    { name: 'Email Campaign Q1', roi: 4.1, revenue: 8500000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Marketing Dashboard</h1>
              <p className="text-gray-600">Campaigns, analytics, and promotions</p>
            </div>
            <Button>+ Create Campaign</Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold">{mockStats.activeCampaigns}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Impressions</p>
              <p className="text-2xl font-bold">{(mockStats.totalImpressions / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">CTR</p>
              <p className="text-2xl font-bold text-blue-600">{mockStats.clickThroughRate}%</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Conversion</p>
              <p className="text-2xl font-bold text-green-600">{mockStats.conversionRate}%</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Spend</p>
              <p className="text-2xl font-bold">{(mockStats.marketingSpend / 1000000).toFixed(1)}M</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-green-600">{(mockStats.revenueGenerated / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Campaigns</h2>
              <Link to="/admin-marketing/campaigns" className="text-primary-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                      <p className="font-medium">{campaign.name}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {campaign.type.toUpperCase()} • {campaign.impressions.toLocaleString()} impressions • {campaign.clicks.toLocaleString()} clicks
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">ROI: {campaign.roi}x</p>
                    <p className="text-sm text-gray-600">{campaign.conversions} conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Top Performing Campaigns</h2>
              <div className="space-y-4">
                {topPerformers.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-gray-600">{(campaign.revenue / 1000000).toFixed(1)}M BIF revenue</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">{campaign.roi}x ROI</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Marketing ROI</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total ROI</span>
                  <span className="font-bold text-green-600">3.0x</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold">3.2x</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-bold">2.8x</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Growth</span>
                    <span className="font-bold text-green-600">+14.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promotion Calendar */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Promotions</h2>
              <Link to="/admin-marketing/promotions" className="text-primary-600 hover:underline text-sm">
                Manage Calendar
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">Flash Sale - Electronics</p>
                  <p className="text-sm text-gray-600">Jan 20-22, 2024</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Scheduled
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">Valentine's Day Special</p>
                  <p className="text-sm text-gray-600">Feb 10-15, 2024</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Easter Sale</p>
                  <p className="text-sm text-gray-600">Mar 25-30, 2024</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Planning
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
