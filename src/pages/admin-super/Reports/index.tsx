import Button from '../../../components/common/Button';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminReports() {
  const reportTypes = [
    { id: 1, name: 'Sales Report', description: 'Daily, weekly, and monthly sales data', lastGenerated: '2024-08-15' },
    { id: 2, name: 'User Activity Report', description: 'User registration and activity metrics', lastGenerated: '2024-08-14' },
    { id: 3, name: 'Seller Performance Report', description: 'Seller revenue and performance analysis', lastGenerated: '2024-08-14' },
    { id: 4, name: 'Product Performance Report', description: 'Best-selling and low-stock products', lastGenerated: '2024-08-13' },
    { id: 5, name: 'Payment Reconciliation Report', description: 'Transaction and payout reconciliation', lastGenerated: '2024-08-13' },
    { id: 6, name: 'Delivery Performance Report', description: 'Courier and delivery zone metrics', lastGenerated: '2024-08-12' },
  ];

  const handleGenerateReport = (reportId: number) => {
    alert(`Generate report ${reportId}`);
  };

  const handleDownloadReport = (reportId: number) => {
    alert(`Download report ${reportId}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Reports</h1>
          <p className="text-gray-600">Generate and download platform reports</p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="card">
              <h3 className="font-semibold mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <p className="text-xs text-gray-500 mb-4">Last generated: {report.lastGenerated}</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleGenerateReport(report.id)}>Generate</Button>
                <Button variant="secondary" size="sm" onClick={() => handleDownloadReport(report.id)}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
