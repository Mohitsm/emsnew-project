// import { useState } from 'react'
// import { 
//   Users, 
//   Building2, 
//   CreditCard, 
//   TrendingUp, 
//   DollarSign, 
//   Activity,
//   Shield,
//   Globe,
//   Database,
//   AlertCircle,
//   Bell,
//   Clock,
//   Download,
//   Filter,
//   Calendar
// } from 'lucide-react'
// import ChartComponent from '../../components/charts/ChartComponent'

// export default function SuperAdminDashboard() {
//   const [timeRange, setTimeRange] = useState('today')

//   const stats = [
//     {
//       title: 'Total Revenue',
//       value: '$124,580',
//       change: '+18.2%',
//       icon: DollarSign,
//       color: 'bg-emerald-500',
//       trend: 'up'
//     },
//     {
//       title: 'Active Companies',
//       value: '1,245',
//       change: '+12.5%',
//       icon: Building2,
//       color: 'bg-blue-500',
//       trend: 'up'
//     },
//     {
//       title: 'Total Admins',
//       value: '89',
//       change: '+8.3%',
//       icon: Users,
//       color: 'bg-purple-500',
//       trend: 'up'
//     },
//     {
//       title: 'Active Subscriptions',
//       value: '3,458',
//       change: '+5.7%',
//       icon: CreditCard,
//       color: 'bg-amber-500',
//       trend: 'up'
//     },
//     {
//       title: 'System Uptime',
//       value: '99.9%',
//       change: '+0.1%',
//       icon: Shield,
//       color: 'bg-green-500',
//       trend: 'up'
//     },
//     {
//       title: 'API Requests',
//       value: '2.4M',
//       change: '+22.4%',
//       icon: Database,
//       color: 'bg-indigo-500',
//       trend: 'up'
//     }
//   ]

//   const recentActivities = [
//     { id: 1, type: 'company', action: 'TechCorp upgraded to Enterprise plan', time: '2 min ago', user: 'John Smith' },
//     { id: 2, type: 'admin', action: 'New admin added to Support team', time: '15 min ago', user: 'Emma Johnson' },
//     { id: 3, type: 'system', action: 'System backup completed successfully', time: '1 hour ago', user: 'System' },
//     { id: 4, type: 'security', action: 'Failed login attempt detected', time: '2 hours ago', user: 'Security System' },
//     { id: 5, type: 'billing', action: 'Monthly invoice generated', time: '5 hours ago', user: 'Billing System' },
//     { id: 6, type: 'api', action: 'API rate limit exceeded by client', time: '8 hours ago', user: 'API Monitor' },
//   ]

//   const systemStatus = {
//     overall: 'healthy',
//     services: [
//       { name: 'Web Server', status: 'up', uptime: '99.9%', latency: '45ms' },
//       { name: 'Database', status: 'up', uptime: '99.8%', latency: '12ms' },
//       { name: 'API Gateway', status: 'up', uptime: '99.7%', latency: '78ms' },
//       { name: 'Email Service', status: 'warning', uptime: '95.2%', latency: '120ms' },
//       { name: 'Cache Server', status: 'up', uptime: '99.6%', latency: '5ms' },
//       { name: 'File Storage', status: 'up', uptime: '99.9%', latency: '65ms' },
//     ]
//   }

//   const topCompanies = [
//     { id: 1, name: 'TechCorp Inc.', revenue: '$45,230', growth: '+18%', plan: 'Enterprise' },
//     { id: 2, name: 'InnovateLabs', revenue: '$38,750', growth: '+22%', plan: 'Enterprise' },
//     { id: 3, name: 'DataFlow Analytics', revenue: '$28,910', growth: '+15%', plan: 'Pro' },
//     { id: 4, name: 'CloudServe Systems', revenue: '$25,680', growth: '+12%', plan: 'Pro' },
//     { id: 5, name: 'DesignStudio LLC', revenue: '$22,450', growth: '+8%', plan: 'Pro' },
//   ]

//   const alerts = [
//     { id: 1, severity: 'high', message: 'Database connection pool at 90% capacity', time: '10 min ago' },
//     { id: 2, severity: 'medium', message: 'Email service latency above threshold', time: '45 min ago' },
//     { id: 3, severity: 'low', message: 'Backup storage at 85% capacity', time: '2 hours ago' },
//     { id: 4, severity: 'info', message: 'Weekly maintenance scheduled', time: '1 day ago' },
//   ]

//   const exportReport = (type) => {
//     toast.success(`${type} report exported successfully`)
//   }

//   const getAlertColor = (severity) => {
//     switch (severity) {
//       case 'high': return 'bg-red-100 text-red-800'
//       case 'medium': return 'bg-amber-100 text-amber-800'
//       case 'low': return 'bg-blue-100 text-blue-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
//           <p className="text-gray-600">Complete system overview and monitoring</p>
//         </div>
//         <div className="flex space-x-3">
//           <select
//             className="input-field"
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//           >
//             <option value="today">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//             <option value="quarter">This Quarter</option>
//             <option value="year">This Year</option>
//           </select>
//           <button
//             onClick={() => exportReport('full')}
//             className="btn-secondary flex items-center"
//           >
//             <Download size={18} className="mr-2" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//   {stats.map((stat, index) => {
//     const Icon = stat.icon

//     return (
//       <div
//         key={index}
//         className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200"
//       >
//         <div className="flex items-start justify-between">
//           {/* Left content */}
//           <div>
//             <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//               {stat.title}
//             </p>

//             <p className="text-3xl font-bold text-gray-900 mt-2">
//               {stat.value}
//             </p>

//             <div
//               className={`mt-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
//                 stat.trend === 'up'
//                   ? 'bg-emerald-50 text-emerald-600'
//                   : 'bg-red-50 text-red-600'
//               }`}
//             >
//               <TrendingUp size={12} className="mr-1" />
//               {stat.change}
//             </div>
//           </div>

//           {/* Icon */}
//           <div
//             className={`flex items-center justify-center h-12 w-12 rounded-lg ${stat.color}`}
//           >
//             <Icon className="text-white" size={22} />
//           </div>
//         </div>
//       </div>
//     )
//   })}
// </div>


//       {/* Main Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="card">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h3 className="text-lg font-semibold">Revenue Overview</h3>
//               <p className="text-sm text-gray-600">Monthly recurring revenue</p>
//             </div>
//             <DollarSign className="text-emerald-600" size={24} />
//           </div>
//           <ChartComponent type="line" />
//         </div>

//         <div className="card">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h3 className="text-lg font-semibold">User Growth</h3>
//               <p className="text-sm text-gray-600">New vs returning users</p>
//             </div>
//             <Users className="text-blue-600" size={24} />
//           </div>
//           <ChartComponent type="bar" />
//         </div>
//       </div>

//       {/* System Status & Recent Activities */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* System Status */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-emerald-100 rounded-lg mr-3">
//                 <Shield className="text-emerald-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">System Status</h3>
//                 <p className="text-sm text-gray-600">All services operational</p>
//               </div>
//             </div>
//             <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
//               {systemStatus.overall.toUpperCase()}
//             </span>
//           </div>

//           <div className="space-y-3">
//             {systemStatus.services.map((service, index) => (
//               <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
//                 <div className="flex items-center">
//                   <div className={`w-3 h-3 rounded-full mr-3 ${
//                     service.status === 'up' ? 'bg-emerald-500' :
//                     service.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
//                   }`}></div>
//                   <div>
//                     <p className="font-medium">{service.name}</p>
//                     <p className="text-sm text-gray-500">Latency: {service.latency}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">{service.uptime}</p>
//                   <p className="text-sm text-gray-500">Uptime</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <button className="w-full btn-secondary">
//               View Detailed Status
//             </button>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg mr-3">
//                 <Activity className="text-blue-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">Recent Activities</h3>
//                 <p className="text-sm text-gray-600">Latest system activities</p>
//               </div>
//             </div>
//             <Bell className="text-gray-400" size={20} />
//           </div>

//           <div className="space-y-4">
//             {recentActivities.map((activity) => (
//               <div key={activity.id} className="flex items-start">
//                 <div className={`p-2 rounded-lg mr-3 ${
//                   activity.type === 'company' ? 'bg-emerald-100' :
//                   activity.type === 'admin' ? 'bg-blue-100' :
//                   activity.type === 'security' ? 'bg-red-100' :
//                   activity.type === 'system' ? 'bg-purple-100' : 'bg-gray-100'
//                 }`}>
//                   {activity.type === 'company' && <Building2 className="text-emerald-600" size={16} />}
//                   {activity.type === 'admin' && <Users className="text-blue-600" size={16} />}
//                   {activity.type === 'system' && <Database className="text-purple-600" size={16} />}
//                   {activity.type === 'security' && <Shield className="text-red-600" size={16} />}
//                   {activity.type === 'billing' && <DollarSign className="text-green-600" size={16} />}
//                   {activity.type === 'api' && <Globe className="text-indigo-600" size={16} />}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium">{activity.action}</p>
//                   <div className="flex items-center mt-1">
//                     <p className="text-sm text-gray-500">{activity.user}</p>
//                     <span className="mx-2">•</span>
//                     <Clock size={14} className="text-gray-400 mr-1" />
//                     <span className="text-sm text-gray-500">{activity.time}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <button className="w-full btn-secondary">
//               View All Activities
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Top Companies & System Alerts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Performing Companies */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-amber-100 rounded-lg mr-3">
//                 <TrendingUp className="text-amber-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">Top Performing Companies</h3>
//                 <p className="text-sm text-gray-600">By monthly revenue</p>
//               </div>
//             </div>
//             <Filter className="text-gray-400" size={20} />
//           </div>

//           <div className="space-y-4">
//             {topCompanies.map((company) => (
//               <div key={company.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
//                     <Building2 className="text-emerald-600" size={20} />
//                   </div>
//                   <div>
//                     <p className="font-medium">{company.name}</p>
//                     <p className="text-sm text-gray-500">{company.plan} Plan</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold">{company.revenue}</p>
//                   <p className={`text-sm ${
//                     company.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
//                   }`}>
//                     {company.growth}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <button className="w-full btn-secondary">
//               View Full Report
//             </button>
//           </div>
//         </div>

//         {/* System Alerts */}
//         <div className="card">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-red-100 rounded-lg mr-3">
//                 <AlertCircle className="text-red-600" size={20} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">System Alerts</h3>
//                 <p className="text-sm text-gray-600">Active alerts and warnings</p>
//               </div>
//             </div>
//             <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
//               {alerts.length} Active
//             </span>
//           </div>

//           <div className="space-y-3">
//             {alerts.map((alert) => (
//               <div key={alert.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
//                 <div className={`px-2 py-1 rounded text-xs font-medium mr-3 ${getAlertColor(alert.severity)}`}>
//                   {alert.severity.toUpperCase()}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium">{alert.message}</p>
//                   <div className="flex items-center mt-1">
//                     <Clock size={14} className="text-gray-400 mr-1" />
//                     <span className="text-sm text-gray-500">{alert.time}</span>
//                   </div>
//                 </div>
//                 <button className="p-1 text-gray-400 hover:text-gray-600">
//                   <AlertCircle size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 pt-6 border-t">
//             <div className="flex space-x-3">
//               <button className="flex-1 btn-secondary">
//                 Acknowledge All
//               </button>
//               <button className="flex-1 btn-primary">
//                 Resolve Issues
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Performance Metrics */}
//       <div className="card">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h3 className="text-lg font-semibold">Performance Metrics</h3>
//             <p className="text-sm text-gray-600">Real-time system performance</p>
//           </div>
//           <Calendar className="text-gray-400" size={20} />
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="text-center p-4 bg-emerald-50 rounded-lg">
//             <div className="text-3xl font-bold text-emerald-700">2.4s</div>
//             <div className="text-sm text-emerald-600 mt-2">Avg. Response Time</div>
//             <div className="text-xs text-emerald-500 mt-1">-0.3s from yesterday</div>
//           </div>

//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-3xl font-bold text-blue-700">99.9%</div>
//             <div className="text-sm text-blue-600 mt-2">Success Rate</div>
//             <div className="text-xs text-blue-500 mt-1">+0.1% from last week</div>
//           </div>

//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-3xl font-bold text-purple-700">12.8K</div>
//             <div className="text-sm text-purple-600 mt-2">Requests/Minute</div>
//             <div className="text-xs text-purple-500 mt-1">+1.2K from peak</div>
//           </div>

//           <div className="text-center p-4 bg-amber-50 rounded-lg">
//             <div className="text-3xl font-bold text-amber-700">98.5%</div>
//             <div className="text-sm text-amber-600 mt-2">Cache Hit Rate</div>
//             <div className="text-xs text-amber-500 mt-1">+2.3% optimized</div>
//           </div>
//         </div>

//         <div className="mt-6 pt-6 border-t">
//           <button className="w-full btn-primary">
//             View Detailed Analytics
//           </button>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="card">
//         <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex flex-col items-center justify-center transition-colors">
//             <Users className="text-emerald-600 mb-2" size={24} />
//             <span className="font-medium text-gray-900">Add Admin</span>
//             <span className="text-sm text-gray-600">New administrator</span>
//           </button>

//           <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center justify-center transition-colors">
//             <Building2 className="text-blue-600 mb-2" size={24} />
//             <span className="font-medium text-gray-900">Add Company</span>
//             <span className="text-sm text-gray-600">New organization</span>
//           </button>

//           <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex flex-col items-center justify-center transition-colors">
//             <CreditCard className="text-purple-600 mb-2" size={24} />
//             <span className="font-medium text-gray-900">Create Plan</span>
//             <span className="text-sm text-gray-600">New subscription</span>
//           </button>

//           <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg flex flex-col items-center justify-center transition-colors">
//             <Database className="text-amber-600 mb-2" size={24} />
//             <span className="font-medium text-gray-900">Run Backup</span>
//             <span className="text-sm text-gray-600">System backup</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { 
  Users, 
  Building2, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Shield,
  Globe,
  Database,
  AlertCircle,
  Bell,
  Clock,
  Download,
  Filter,
  Calendar,
  Smartphone,
  Tablet,
  Laptop,
  CheckCircle,
  XCircle,
  Search,
  Edit,
  Trash2,
  Plus,
  Eye,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart
} from 'lucide-react'
import ChartComponent from '../../components/charts/ChartComponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as XLSX from 'xlsx'

export default function SuperAdminDashboard() {
  const [timeRange, setTimeRange] = useState('today')
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlan, setFilterPlan] = useState('all')
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' })
  const [selectedRows, setSelectedRows] = useState([])

  // Initial Data
  const initialStats = [
    {
      title: 'Total Revenue',
      value: '$124,580',
      change: '+18.2%',
      icon: DollarSign,
      color: 'bg-emerald-500',
      trend: 'up'
    },
    {
      title: 'Total Companies',
      value: '1,245',
      change: '+12.5%',
      icon: Building2,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Total Admins',
      value: '89',
      change: '+8.3%',
      icon: Users,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Total Employees',
      value: '12,845',
      change: '+15.3%',
      icon: Users,
      color: 'bg-cyan-500',
      trend: 'up'
    },
    {
      title: 'Active Subscriptions',
      value: '3,458',
      change: '+5.7%',
      icon: CreditCard,
      color: 'bg-amber-500',
      trend: 'up'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Shield,
      color: 'bg-green-500',
      trend: 'up'
    }
  ]

  const initialCompanies = [
    { id: 1, name: 'TechCorp Inc.', email: 'contact@techcorp.com', phone: '+1-555-0123', revenue: '$45,230', growth: '+18%', plan: 'Enterprise', status: 'active', employees: 245, location: 'San Francisco', joinDate: '2023-01-15' },
    { id: 2, name: 'InnovateLabs', email: 'info@innovatelabs.com', phone: '+1-555-0124', revenue: '$38,750', growth: '+22%', plan: 'Enterprise', status: 'active', employees: 189, location: 'New York', joinDate: '2023-02-20' },
    { id: 3, name: 'DataFlow Analytics', email: 'support@dataflow.com', phone: '+1-555-0125', revenue: '$28,910', growth: '+15%', plan: 'Pro', status: 'active', employees: 156, location: 'Austin', joinDate: '2023-03-10' },
    { id: 4, name: 'CloudServe Systems', email: 'hello@cloudserve.com', phone: '+1-555-0126', revenue: '$25,680', growth: '+12%', plan: 'Pro', status: 'inactive', employees: 98, location: 'Seattle', joinDate: '2023-01-30' },
    { id: 5, name: 'DesignStudio LLC', email: 'studio@designllc.com', phone: '+1-555-0127', revenue: '$22,450', growth: '+8%', plan: 'Pro', status: 'active', employees: 112, location: 'Los Angeles', joinDate: '2023-04-05' },
    { id: 6, name: 'SecureNet Solutions', email: 'security@securenets.com', phone: '+1-555-0128', revenue: '$19,340', growth: '+25%', plan: 'Enterprise', status: 'active', employees: 78, location: 'Boston', joinDate: '2023-05-12' },
    { id: 7, name: 'EduTech Platforms', email: 'learn@edutech.com', phone: '+1-555-0129', revenue: '$17,890', growth: '+5%', plan: 'Basic', status: 'pending', employees: 45, location: 'Chicago', joinDate: '2023-06-18' },
    { id: 8, name: 'MediCare Systems', email: 'care@medicare.com', phone: '+1-555-0130', revenue: '$32,150', growth: '+14%', plan: 'Enterprise', status: 'active', employees: 210, location: 'Houston', joinDate: '2023-02-28' },
  ]

  const initialAdmins = [
    { id: 1, name: 'John Smith', email: 'john@acetech.com', role: 'Super Admin', status: 'active', lastLogin: '2 hours ago', phone: '+1-555-0001' },
    { id: 2, name: 'Emma Johnson', email: 'emma@acetech.com', role: 'Admin', status: 'active', lastLogin: '1 day ago', phone: '+1-555-0002' },
    { id: 3, name: 'Michael Chen', email: 'michael@acetech.com', role: 'Support Admin', status: 'inactive', lastLogin: '1 week ago', phone: '+1-555-0003' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@acetech.com', role: 'Billing Admin', status: 'active', lastLogin: '3 hours ago', phone: '+1-555-0004' },
    { id: 5, name: 'Robert Kim', email: 'robert@acetech.com', role: 'Admin', status: 'pending', lastLogin: 'Never', phone: '+1-555-0005' },
  ]

  const initialActivities = [
    { id: 1, type: 'company', action: 'TechCorp upgraded to Enterprise plan', time: '2 min ago', user: 'John Smith' },
    { id: 2, type: 'admin', action: 'New admin added to Support team', time: '15 min ago', user: 'Emma Johnson' },
    { id: 3, type: 'system', action: 'System backup completed successfully', time: '1 hour ago', user: 'System' },
    { id: 4, type: 'security', action: 'Failed login attempt detected', time: '2 hours ago', user: 'Security System' },
    { id: 5, type: 'billing', action: 'Monthly invoice generated', time: '5 hours ago', user: 'Billing System' },
    { id: 6, type: 'api', action: 'API rate limit exceeded by client', time: '8 hours ago', user: 'API Monitor' },
  ]

  const [stats, setStats] = useState(initialStats)
  const [companies, setCompanies] = useState(initialCompanies)
  const [admins, setAdmins] = useState(initialAdmins)
  const [recentActivities, setRecentActivities] = useState(initialActivities)
  const [companyForm, setCompanyForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Pro',
    status: 'active',
    employees: '',
    location: '',
    revenue: ''
  })
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
    status: 'active'
  })

  // Filter Companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus
    const matchesPlan = filterPlan === 'all' || company.plan === filterPlan
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  // Sort Companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortConfig.key === 'revenue' ? parseFloat(a.revenue.replace('$', '').replace(',', '')) : a[sortConfig.key]
      const bValue = sortConfig.key === 'revenue' ? parseFloat(b.revenue.replace('$', '').replace(',', '')) : b[sortConfig.key]
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
    }
    return 0
  })

  // Company Status Summary
  const companyStatus = {
    active: companies.filter(c => c.status === 'active').length,
    inactive: companies.filter(c => c.status === 'inactive').length,
    pending: companies.filter(c => c.status === 'pending').length,
    total: companies.length
  }

  // Device Usage Data
  const deviceUsage = [
    { type: 'Mobile', percentage: 45, icon: Smartphone, color: 'bg-blue-500', users: '5,780' },
    { type: 'Tablet', percentage: 25, icon: Tablet, color: 'bg-purple-500', users: '3,211' },
    { type: 'Desktop', percentage: 30, icon: Laptop, color: 'bg-emerald-500', users: '3,854' }
  ]

  // Handle Sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  // CRUD Operations for Companies
  const handleAddCompany = () => {
    setEditingCompany(null)
    setCompanyForm({
      name: '',
      email: '',
      phone: '',
      plan: 'Pro',
      status: 'active',
      employees: '',
      location: '',
      revenue: ''
    })
    setShowCompanyModal(true)
  }

  const handleEditCompany = (company) => {
    setEditingCompany(company)
    setCompanyForm({
      name: company.name,
      email: company.email,
      phone: company.phone,
      plan: company.plan,
      status: company.status,
      employees: company.employees.toString(),
      location: company.location,
      revenue: company.revenue.replace('$', '')
    })
    setShowCompanyModal(true)
  }

  const handleDeleteCompany = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company.id !== id))
      toast.success('Company deleted successfully')
    }
  }

  const handleSaveCompany = () => {
    if (!companyForm.name || !companyForm.email) {
      toast.error('Please fill in required fields')
      return
    }

    if (editingCompany) {
      // Update existing company
      setCompanies(companies.map(company => 
        company.id === editingCompany.id 
          ? { 
              ...company, 
              ...companyForm, 
              revenue: `$${parseInt(companyForm.revenue).toLocaleString()}`,
              employees: parseInt(companyForm.employees),
              id: editingCompany.id
            } 
          : company
      ))
      toast.success('Company updated successfully')
    } else {
      // Add new company
      const newCompany = {
        id: companies.length + 1,
        ...companyForm,
        revenue: `$${parseInt(companyForm.revenue).toLocaleString()}`,
        employees: parseInt(companyForm.employees),
        growth: '+10%',
        joinDate: new Date().toISOString().split('T')[0]
      }
      setCompanies([...companies, newCompany])
      toast.success('Company added successfully')
    }
    setShowCompanyModal(false)
  }

  // CRUD Operations for Admins
  const handleAddAdmin = () => {
    setEditingAdmin(null)
    setAdminForm({
      name: '',
      email: '',
      phone: '',
      role: 'Admin',
      status: 'active'
    })
    setShowAdminModal(true)
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
    setAdminForm({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      status: admin.status
    })
    setShowAdminModal(true)
  }

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id))
      toast.success('Admin deleted successfully')
    }
  }

  const handleSaveAdmin = () => {
    if (!adminForm.name || !adminForm.email) {
      toast.error('Please fill in required fields')
      return
    }

    if (editingAdmin) {
      // Update existing admin
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...adminForm, lastLogin: 'Just now', id: editingAdmin.id } 
          : admin
      ))
      toast.success('Admin updated successfully')
    } else {
      // Add new admin
      const newAdmin = {
        id: admins.length + 1,
        ...adminForm,
        lastLogin: 'Never'
      }
      setAdmins([...admins, newAdmin])
      toast.success('Admin added successfully')
    }
    setShowAdminModal(false)
  }

  // Export to Excel
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
    XLSX.writeFile(workbook, `${fileName}.xlsx`)
    toast.success(`Exported ${data.length} records to ${fileName}.xlsx`)
  }

  // Handle Row Selection
  const toggleRowSelection = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const selectAllRows = () => {
    if (selectedRows.length === sortedCompanies.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(sortedCompanies.map(company => company.id))
    }
  }

  // Quick Actions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'addAdmin':
        handleAddAdmin()
        break
      case 'addCompany':
        handleAddCompany()
        break
      case 'createPlan':
        toast.info('Create Plan feature coming soon!')
        break
      case 'runBackup':
        toast.info('System backup initiated!')
        // Simulate backup
        setTimeout(() => {
          toast.success('Backup completed successfully')
        }, 2000)
        break
      case 'acknowledgeAlerts':
        toast.success('All alerts acknowledged')
        break
      case 'resolveIssues':
        toast.success('Issues resolution process started')
        break
      default:
        break
    }
  }

  // Filter Badge Component
  const FilterBadge = ({ label, value, onRemove }) => (
    <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
      {label}: {value}
      <button onClick={onRemove} className="ml-2 text-blue-600 hover:text-blue-800">
        <X size={14} />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header with Logo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
         
         
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
           
          </div>
        </div>
        
        <div className="flex space-x-3">
          <select
            className="input-field border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => exportToExcel(companies, 'companies_report')}
            className="btn-secondary flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <div
                    className={`mt-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === 'up'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    <TrendingUp size={12} className="mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-lg ${stat.color}`}
                >
                  <Icon className="text-white" size={22} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Advanced Filters Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterPlan('all')
                setSelectedRows([])
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          {/* Plan Filter */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Basic">Basic</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">
              Showing {sortedCompanies.length} of {companies.length} companies
            </span>
            {selectedRows.length > 0 && (
              <span className="text-sm font-medium text-blue-600">
                {selectedRows.length} selected
              </span>
            )}
          </div>
        </div>

        {/* Active Filters */}
        <div className="mt-4">
          {(searchTerm || filterStatus !== 'all' || filterPlan !== 'all') && (
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Active filters:</span>
              {searchTerm && (
                <FilterBadge 
                  label="Search" 
                  value={searchTerm} 
                  onRemove={() => setSearchTerm('')} 
                />
              )}
              {filterStatus !== 'all' && (
                <FilterBadge 
                  label="Status" 
                  value={filterStatus} 
                  onRemove={() => setFilterStatus('all')} 
                />
              )}
              {filterPlan !== 'all' && (
                <FilterBadge 
                  label="Plan" 
                  value={filterPlan} 
                  onRemove={() => setFilterPlan('all')} 
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Companies Table with CRUD */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Companies Management</h3>
              <p className="text-sm text-gray-600">CRUD operations for companies</p>
            </div>
            <div className="flex space-x-3">
              {selectedRows.length > 0 && (
                <button
                  onClick={() => {
                    setCompanies(companies.filter(c => !selectedRows.includes(c.id)))
                    setSelectedRows([])
                    toast.success(`${selectedRows.length} companies deleted`)
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete Selected ({selectedRows.length})
                </button>
              )}
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Company
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === sortedCompanies.length && sortedCompanies.length > 0}
                    onChange={selectAllRows}
                    className="rounded border-gray-300"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Company Name
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === 'status' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('employees')}
                >
                  <div className="flex items-center">
                    Employees
                    {sortConfig.key === 'employees' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('plan')}
                >
                  <div className="flex items-center">
                    Plan
                    {sortConfig.key === 'plan' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center">
                    Revenue
                    {sortConfig.key === 'revenue' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(company.id)}
                      onChange={() => toggleRowSelection(company.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-3">
                        <Building2 className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.email}</div>
                    <div className="text-sm text-gray-500">{company.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : company.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{company.employees}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.plan === 'Enterprise' 
                        ? 'bg-purple-100 text-purple-800' 
                        : company.plan === 'Pro'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-bold text-gray-900">{company.revenue}</div>
                      <div className={`text-sm ${
                        company.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {company.growth}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCompany(company)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => toast.info(`Viewing ${company.name}`)}
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedCompanies.length}</span> of{' '}
              <span className="font-medium">{companies.length}</span> companies
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Status & Device Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Status Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mr-3">
                <Building2 className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Company Status</h3>
                <p className="text-sm text-gray-600">Active vs Inactive Companies</p>
              </div>
            </div>
            <button
              onClick={() => exportToExcel(companies, 'company_status_report')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Download size={18} className="mr-1" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-800">Active</p>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">{companyStatus.active}</p>
                </div>
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Inactive</p>
                  <p className="text-2xl font-bold text-red-900 mt-1">{companyStatus.inactive}</p>
                </div>
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">Pending</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{companyStatus.pending}</p>
                </div>
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(companyStatus.active / companyStatus.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-red-500 h-full"
                  style={{ width: `${(companyStatus.inactive / companyStatus.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-amber-500 h-full"
                  style={{ width: `${(companyStatus.pending / companyStatus.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>{((companyStatus.active / companyStatus.total) * 100).toFixed(1)}% Active</span>
              <span>{((companyStatus.inactive / companyStatus.total) * 100).toFixed(1)}% Inactive</span>
              <span>{((companyStatus.pending / companyStatus.total) * 100).toFixed(1)}% Pending</span>
            </div>
          </div>
        </div>

        {/* Device Usage Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                <Globe className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
                <p className="text-sm text-gray-600">Access by device type</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              12,845 Users
            </span>
          </div>

          <div className="space-y-4">
            {deviceUsage.map((device, index) => {
              const Icon = device.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${device.color.replace('bg-', 'bg-')}`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{device.type}</p>
                      <p className="text-sm text-gray-500">{device.users} users</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${device.color} rounded-full`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900 w-12 text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6">
            <button
              onClick={() => toast.info('Device usage data exported!')}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <Download size={18} className="mr-2" />
              Export Device Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Admins Management */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admins Management</h3>
              <p className="text-sm text-gray-600">Manage system administrators</p>
            </div>
            <button
              onClick={handleAddAdmin}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add Admin
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <Users className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{admin.name}</div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                        <div className="text-sm text-gray-500">{admin.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.role.includes('Super') 
                        ? 'bg-red-100 text-red-800' 
                        : admin.role.includes('Support')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : admin.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => toast.info(`Reset password for ${admin.name}`)}
                        className="text-emerald-600 hover:text-emerald-900"
                        title="Reset Password"
                      >
                        <Shield size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('addAdmin')}
            className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex flex-col items-center justify-center transition-colors duration-200"
          >
            <Users className="text-emerald-600 mb-2" size={24} />
            <span className="font-medium text-gray-900">Add Admin</span>
            <span className="text-sm text-gray-600">New administrator</span>
          </button>

          <button 
            onClick={() => handleQuickAction('addCompany')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center justify-center transition-colors duration-200"
          >
            <Building2 className="text-blue-600 mb-2" size={24} />
            <span className="font-medium text-gray-900">Add Company</span>
            <span className="text-sm text-gray-600">New organization</span>
          </button>

          <button 
            onClick={() => handleQuickAction('createPlan')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex flex-col items-center justify-center transition-colors duration-200"
          >
            <CreditCard className="text-purple-600 mb-2" size={24} />
            <span className="font-medium text-gray-900">Create Plan</span>
            <span className="text-sm text-gray-600">New subscription</span>
          </button>

          <button 
            onClick={() => handleQuickAction('runBackup')}
            className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg flex flex-col items-center justify-center transition-colors duration-200"
          >
            <Database className="text-amber-600 mb-2" size={24} />
            <span className="font-medium text-gray-900">Run Backup</span>
            <span className="text-sm text-gray-600">System backup</span>
          </button>
        </div>
      </div>

      {/* Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCompany ? 'Edit Company' : 'Add New Company'}
                </h3>
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.email}
                    onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                    placeholder="company@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.phone}
                    onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                    placeholder="+1-555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.location}
                    onChange={(e) => setCompanyForm({...companyForm, location: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.plan}
                    onChange={(e) => setCompanyForm({...companyForm, plan: e.target.value})}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.status}
                    onChange={(e) => setCompanyForm({...companyForm, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.employees}
                    onChange={(e) => setCompanyForm({...companyForm, employees: e.target.value})}
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Revenue ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={companyForm.revenue}
                    onChange={(e) => setCompanyForm({...companyForm, revenue: e.target.value})}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCompany}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingCompany ? 'Update Company' : 'Add Company'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
                </h3>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                    placeholder="admin@acetech.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adminForm.phone}
                    onChange={(e) => setAdminForm({...adminForm, phone: e.target.value})}
                    placeholder="+1-555-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adminForm.role}
                    onChange={(e) => setAdminForm({...adminForm, role: e.target.value})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Support Admin">Support Admin</option>
                    <option value="Billing Admin">Billing Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={adminForm.status}
                    onChange={(e) => setAdminForm({...adminForm, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdmin}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingAdmin ? 'Update Admin' : 'Add Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}