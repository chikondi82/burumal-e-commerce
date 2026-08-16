import Button from '../../../components/common/Button';
import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminSystemHealth() {
  const systemStatus = {
    api: { status: 'operational', responseTime: 45, uptime: 99.9 },
    database: { status: 'operational', responseTime: 12, uptime: 99.95 },
    paymentService: { status: 'operational', responseTime: 120, uptime: 99.8 },
    sms: { status: 'operational', responseTime: 200, uptime: 99.7 },
    email: { status: 'operational', responseTime: 150, uptime: 99.85 },
    storage: { status: 'operational', responseTime: 30, uptime: 99.9 },
    deliveryApi: { status: 'operational', responseTime: 80, uptime: 99.75 },
  };

  const systemMetrics = {
    apiErrors: 23,
    failedJobs: 5,
    paymentWebhookFailures: 2,
    queueFailures: 1,
    databaseHealth: 98,
    backgroundJobs: 156,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '🟢';
      case 'degraded': return '🟡';
      case 'down': return '🔴';
      default: return '⚪';
    }
  };

  const handleRestartAPI = () => {
    if (confirm('Are you sure you want to restart the API? This may cause temporary downtime.')) {
      alert('API restart initiated');
    }
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear the cache?')) {
      alert('Cache cleared successfully');
    }
  };

  const handleRunDiagnostics = () => {
    alert('Running system diagnostics...');
  };

  const handleViewLogs = () => {
    alert('Opening system logs...');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">System Health</h1>
          <p className="text-gray-600">Monitor platform infrastructure and service status</p>
        </div>

        {/* Service Status */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Service Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.api.status)}</span>
                <div>
                  <p className="font-medium">API</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.api.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.api.status)}`}>
                  {systemStatus.api.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.api.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.database.status)}</span>
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.database.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.database.status)}`}>
                  {systemStatus.database.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.database.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.paymentService.status)}</span>
                <div>
                  <p className="font-medium">Payment Service</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.paymentService.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.paymentService.status)}`}>
                  {systemStatus.paymentService.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.paymentService.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.sms.status)}</span>
                <div>
                  <p className="font-medium">SMS</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.sms.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.sms.status)}`}>
                  {systemStatus.sms.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.sms.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.email.status)}</span>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.email.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.email.status)}`}>
                  {systemStatus.email.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.email.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.storage.status)}</span>
                <div>
                  <p className="font-medium">Storage</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.storage.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.storage.status)}`}>
                  {systemStatus.storage.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.storage.uptime}% uptime</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(systemStatus.deliveryApi.status)}</span>
                <div>
                  <p className="font-medium">Delivery API</p>
                  <p className="text-sm text-gray-600">Response time: {systemStatus.deliveryApi.responseTime}ms</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getStatusColor(systemStatus.deliveryApi.status)}`}>
                  {systemStatus.deliveryApi.status.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">{systemStatus.deliveryApi.uptime}% uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">System Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">API Errors</p>
              <p className="text-2xl font-bold text-red-600">{systemMetrics.apiErrors}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Failed Jobs</p>
              <p className="text-2xl font-bold text-yellow-600">{systemMetrics.failedJobs}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Payment Webhook Failures</p>
              <p className="text-2xl font-bold text-red-600">{systemMetrics.paymentWebhookFailures}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Queue Failures</p>
              <p className="text-2xl font-bold text-yellow-600">{systemMetrics.queueFailures}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Database Health</p>
              <p className="text-2xl font-bold text-green-600">{systemMetrics.databaseHealth}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">Background Jobs</p>
              <p className="text-2xl font-bold">{systemMetrics.backgroundJobs}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">System Actions</h2>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleRestartAPI}>Restart API</Button>
            <Button variant="secondary" onClick={handleClearCache}>Clear Cache</Button>
            <Button variant="secondary" onClick={handleRunDiagnostics}>Run Diagnostics</Button>
            <Button variant="secondary" onClick={handleViewLogs}>View Logs</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
