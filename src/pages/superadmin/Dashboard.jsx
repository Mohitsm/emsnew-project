// // src/pages/superadmin/Dashboard.jsx
// import React, { useState } from 'react';
// import { 
//   Users, 
//   Activity, 
//   AlertTriangle, 
//   CheckCircle,
//   Settings,
//   Shield,
//   Database,
//   Bell,
//   TrendingUp,
//   Download,
//   Filter
// } from 'lucide-react';
// import StatCard from '../../components/widgets/StatCard';
// import ActivityFeed from '../../components/widgets/ActivityFeed';
// import PieChart from '../../components/charts/PieChart';
// import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Table from '../../components/common/Table';

// const SuperAdminDashboard = () => {
//   const [timeRange, setTimeRange] = useState('month');

//   const stats = [
//     {
//       title: 'Total Users',
//       value: '45',
//       change: '+5 this month',
//       icon: <Users className="h-6 w-6 text-emerald-600" />,
//       color: 'bg-emerald-50 dark:bg-emerald-900/20'
//     },
//     {
//       title: 'System Health',
//       value: '98.5%',
//       change: 'All systems operational',
//       icon: <CheckCircle className="h-6 w-6 text-green-600" />,
//       color: 'bg-green-50 dark:bg-green-900/20'
//     },
//     {
//       title: 'Critical Alerts',
//       value: '2',
//       change: 'Requires attention',
//       icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
//       color: 'bg-amber-50 dark:bg-amber-900/20'
//     },
//     {
//       title: 'Pending Approvals',
//       value: '12',
//       change: 'Role assignments',
//       icon: <Shield className="h-6 w-6 text-blue-600" />,
//       color: 'bg-blue-50 dark:bg-blue-900/20'
//     }
//   ];

//   const activities = [
//     { id: 1, text: 'New admin user created', time: '5 minutes ago', icon: '➕' },
//     { id: 2, text: 'Role permission updated for sub-admin', time: '15 minutes ago', icon: '🔐' },
//     { id: 3, text: 'System backup completed', time: '2 hours ago', icon: '💾' },
//     { id: 4, text: 'Database optimized', time: '4 hours ago', icon: '⚡' },
//     { id: 5, text: 'Security audit passed', time: '1 day ago', icon: '🛡️' },
//   ];

//   const roleDistribution = [
//     { name: 'Super Admin', value: 1 },
//     { name: 'Admin', value: 4 },
//     { name: 'Manager', value: 8 },
//     { name: 'Employee', value: 32 },
//   ];

//   const systemLogs = [
//     { id: 1, user: 'Admin User', action: 'User Created', ip: '192.168.1.101', time: '10:30 AM' },
//     { id: 2, user: 'System', action: 'Backup Completed', ip: 'System', time: '02:00 AM' },
//     { id: 3, user: 'Super Admin', action: 'Settings Updated', ip: '192.168.1.100', time: 'Yesterday' },
//     { id: 4, user: 'Manager', action: 'Report Generated', ip: '192.168.1.105', time: '2 days ago' },
//   ];

//   const columns = [
//     { title: 'User', dataIndex: 'user' },
//     { title: 'Action', dataIndex: 'action' },
//     { title: 'IP Address', dataIndex: 'ip' },
//     { title: 'Time', dataIndex: 'time' },
//   ];

//   const quickActions = [
//     { label: 'Add New User', icon: '👤', color: 'bg-emerald-50', action: () => {} },
//     { label: 'System Backup', icon: '💾', color: 'bg-blue-50', action: () => {} },
//     { label: 'Audit Logs', icon: '📋', color: 'bg-purple-50', action: () => {} },
//     { label: 'Settings', icon: '⚙️', color: 'bg-gray-50', action: () => {} },
//   ];

//   return (
//     <div className="space-y-6 fade-in">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">System overview and user management</p>
//         </div>
//         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//           <div className="flex items-center space-x-2">
//             <Button
//               variant={timeRange === 'day' ? 'primary' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('day')}
//             >
//               Day
//             </Button>
//             <Button
//               variant={timeRange === 'week' ? 'primary' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('week')}
//             >
//               Week
//             </Button>
//             <Button
//               variant={timeRange === 'month' ? 'primary' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('month')}
//             >
//               Month
//             </Button>
//           </div>
//           <Button variant="outline" size="sm" startIcon={<Download className="h-4 w-4" />}>
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <StatCard key={index} {...stat} />
//         ))}
//       </div>

//       {/* Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* System Administration */}
//           <Card>
//             <CardHeader>
//               <CardTitle>System Administration</CardTitle>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Manage your system settings and configurations
//               </p>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {quickActions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={action.action}
//                     className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors text-left group"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
//                         <span className="text-xl">{action.icon}</span>
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900 dark:text-white">{action.label}</div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                           Click to manage
//                         </div>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Activities */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Recent System Activities</CardTitle>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Latest actions across the system
//                 </p>
//               </div>
//               <Button variant="outline" size="sm" startIcon={<Filter className="h-4 w-4" />}>
//                 Filter
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <ActivityFeed activities={activities} />
//             </CardContent>
//           </Card>

//           {/* System Logs Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>System Logs</CardTitle>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Audit trail of system activities
//               </p>
//             </CardHeader>
//             <CardContent>
//               <Table columns={columns} data={systemLogs} />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Role Distribution Chart */}
//           <Card className="h-[400px]">
//             <CardHeader>
//               <CardTitle>User Role Distribution</CardTitle>
//             </CardHeader>
//             <CardContent className="h-[calc(100%-80px)]">
//               <PieChart data={roleDistribution} />
//             </CardContent>
//           </Card>

//           {/* System Status */}
//           <Card>
//             <CardHeader>
//               <CardTitle>System Status</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Database className="h-5 w-5 text-emerald-600" />
//                     <span className="text-gray-700 dark:text-gray-300">Database</span>
//                   </div>
//                   <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                     Healthy
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Activity className="h-5 w-5 text-blue-600" />
//                     <span className="text-gray-700 dark:text-gray-300">API Response</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900 dark:text-white">~120ms</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <Bell className="h-5 w-5 text-purple-600" />
//                     <span className="text-gray-700 dark:text-gray-300">Active Users</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900 dark:text-white">24</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <TrendingUp className="h-5 w-5 text-amber-600" />
//                     <span className="text-gray-700 dark:text-gray-300">System Load</span>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Stats */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Stats</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                   <div className="text-2xl font-bold text-emerald-600">98.5%</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">2.4TB</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">Storage Used</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">256</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">API Calls</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                   <div className="text-2xl font-bold text-amber-600">12</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;


// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  UsersIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Mock data - in real app, this would come from API
  const stats = {
    totalCompanies: 124,
    totalAdmins: 186,
    totalEmployees: 2548,
    activeCompanies: 89,
    inactiveCompanies: 35,
    revenue: {
      monthly: [65000, 72000, 81000, 75000, 92000, 88000, 95000, 102000, 98000, 105000, 112000, 120000],
      quarterly: [218000, 285000, 315000, 380000],
      yearly: [1250000, 1450000]
    }
  };

  const revenueData = stats.revenue[timeRange];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Companies Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Companies</p>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2">{stats.totalCompanies}</h3>
              <p className="text-blue-700 text-sm mt-1">
                <span className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  12% from last month
                </span>
              </p>
            </div>
            <BuildingOfficeIcon className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        {/* Total Admins Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-800">Total Admins</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mt-2">{stats.totalAdmins}</h3>
              <p className="text-emerald-700 text-sm mt-1">
                <span className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  8% from last month
                </span>
              </p>
            </div>
            <UserGroupIcon className="h-12 w-12 text-emerald-600" />
          </div>
        </div>

        {/* Total Employees Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Total Employees</p>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-900 mt-2">{stats.totalEmployees.toLocaleString()}</h3>
              <p className="text-purple-700 text-sm mt-1">
                <span className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  15% from last month
                </span>
              </p>
            </div>
            <UsersIcon className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Revenue Overview</h2>
              <p className="text-gray-600 text-sm">Monthly revenue trends</p>
            </div>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              {['monthly', 'quarterly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-64 md:h-72">
            <div className="flex items-end h-56 md:h-64 space-x-1 md:space-x-2 overflow-x-auto pb-4">
              {revenueData.map((value, index) => {
                const height = (value / maxRevenue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 min-w-[40px] md:min-w-[50px]">
                    <div
                      className="w-8 md:w-10 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-90"
                      style={{ height: `${height}%` }}
                    />
                    <div className="mt-2 text-xs text-gray-600">
                      {timeRange === 'monthly' 
                        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]
                        : timeRange === 'quarterly'
                        ? `Q${index + 1}`
                        : `202${index + 2}`
                      }
                    </div>
                    <div className="text-xs font-semibold text-gray-800 mt-1">
                      ${(value / 1000).toFixed(0)}k
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current {timeRange} revenue</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">
                  ${revenueData[revenueData.length - 1].toLocaleString()}
                </p>
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                <span className="font-medium">24.5% growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active/Inactive Companies */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Company Status</h2>
            <p className="text-gray-600 text-sm">Active vs Inactive companies</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            {/* Pie Chart Visualization */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800">
                    {Math.round((stats.activeCompanies / (stats.activeCompanies + stats.inactiveCompanies)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Active Companies Segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray={`${(stats.activeCompanies / (stats.activeCompanies + stats.inactiveCompanies)) * 251.2} 251.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                {/* Inactive Companies Segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${(stats.inactiveCompanies / (stats.activeCompanies + stats.inactiveCompanies)) * 251.2} 251.2`}
                  strokeLinecap="round"
                  transform={`rotate(${-90 + (stats.activeCompanies / (stats.activeCompanies + stats.inactiveCompanies)) * 360} 50 50)`}
                />
              </svg>
            </div>

            {/* Legend and Details */}
            <div className="lg:ml-8 mt-6 lg:mt-0 w-full lg:w-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
                    <span className="font-medium text-gray-800">Active Companies</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{stats.activeCompanies}</div>
                    <div className="text-sm text-emerald-600">72% of total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                    <span className="font-medium text-gray-800">Inactive Companies</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{stats.inactiveCompanies}</div>
                    <div className="text-sm text-red-600">28% of total</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600">
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">Total: {stats.activeCompanies + stats.inactiveCompanies} companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Devices Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Responsive Design</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <DevicePhoneMobileIcon className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-800">Mobile</h4>
              <p className="text-sm text-gray-600">Fully optimized for phones</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <TableCellsIcon className="h-8 w-8 text-emerald-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-800">Tablet</h4>
              <p className="text-sm text-gray-600">Adaptive layout for tablets</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <ComputerDesktopIcon className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <h4 className="font-medium text-gray-800">Desktop</h4>
              <p className="text-sm text-gray-600">Full dashboard experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;