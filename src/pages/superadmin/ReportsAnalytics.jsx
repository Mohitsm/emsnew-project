import { useState } from 'react'
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  RefreshCw,
  Share2,
  Printer,
  ChevronDown,
  Plus

} from 'lucide-react'
import ChartComponent from '../../components/charts/ChartComponent'

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('30days')
  const [selectedReport, setSelectedReport] = useState('overview')
  const [reportType, setReportType] = useState('financial')

  const reports = [
    { id: 'overview', name: 'Overview', count: '245', change: '+12%', icon: Eye },
    { id: 'users', name: 'User Growth', count: '1,234', change: '+8%', icon: Users },
    { id: 'revenue', name: 'Revenue', count: '$45,230', change: '+15%', icon: DollarSign },
    { id: 'conversion', name: 'Conversion Rate', count: '3.2%', change: '+2%', icon: TrendingUp },
  ]

  const reportTypes = [
    { id: 'financial', name: 'Financial Reports', icon: DollarSign },
    { id: 'users', name: 'User Analytics', icon: Users },
    { id: 'performance', name: 'Performance Metrics', icon: TrendingUp },
    { id: 'system', name: 'System Reports', icon: BarChart3 },
  ]

  const recentReports = [
    { 
      id: 1, 
      name: 'Monthly Revenue Report', 
      date: 'Mar 15, 2024', 
      type: 'PDF', 
      size: '2.4 MB',
      generatedBy: 'John Smith'
    },
    { 
      id: 2, 
      name: 'User Activity Analysis', 
      date: 'Mar 14, 2024', 
      type: 'CSV', 
      size: '1.8 MB',
      generatedBy: 'Emma Johnson'
    },
    { 
      id: 3, 
      name: 'Subscription Metrics', 
      date: 'Mar 13, 2024', 
      type: 'PDF', 
      size: '3.1 MB',
      generatedBy: 'System'
    },
    { 
      id: 4, 
      name: 'System Performance', 
      date: 'Mar 12, 2024', 
      type: 'XLSX', 
      size: '4.2 MB',
      generatedBy: 'Michael Chen'
    },
    { 
      id: 5, 
      name: 'Customer Feedback', 
      date: 'Mar 11, 2024', 
      type: 'PDF', 
      size: '1.5 MB',
      generatedBy: 'Sarah Williams'
    },
  ]

  const metrics = [
    { label: 'Total Sessions', value: '12,458', change: '+8.2%' },
    { label: 'Avg. Session Duration', value: '4m 32s', change: '+12.1%' },
    { label: 'Bounce Rate', value: '32.1%', change: '-2.4%' },
    { label: 'New Users', value: '3,245', change: '+15.3%' },
    { label: 'Returning Users', value: '9,213', change: '+6.7%' },
    { label: 'Conversion Rate', value: '3.8%', change: '+1.2%' },
  ]

  const generateReport = () => {
    const reportData = {
      type: reportType,
      dateRange: dateRange,
      timestamp: new Date().toISOString()
    }
    toast.success(`Generating ${reportType} report... Check back in a few moments.`)
    console.log('Generating report:', reportData)
  }

  const downloadReport = (report) => {
    toast.success(`Downloading ${report.name}...`)
  }

  const shareReport = (report) => {
    toast.success(`Share link for ${report.name} copied to clipboard`)
  }

  const printReport = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View and analyze system reports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={printReport}
            className="btn-secondary flex items-center"
          >
            <Printer size={18} className="mr-2" />
            Print
          </button>
          <button
            onClick={generateReport}
            className="btn-primary flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              className="input-field"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="financial">Financial Reports</option>
              <option value="users">User Analytics</option>
              <option value="performance">Performance Metrics</option>
              <option value="system">System Reports</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              className="input-field"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Export Format
            </label>
            <select className="input-field">
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
              <option value="json">JSON Data</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <div key={report.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{report.name}</p>
                  <p className="text-2xl font-bold mt-2">{report.count}</p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center">
                    <TrendingUp size={14} className="inline mr-1" />
                    {report.change} from last period
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Icon className="text-emerald-600" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue Trends</h3>
              <p className="text-sm text-gray-600">Monthly revenue growth</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-400" size={20} />
              <ChevronDown className="text-gray-400" size={20} />
            </div>
          </div>
          <ChartComponent type="line" />
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing data for {dateRange}
            </div>
            <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
              View Details →
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">User Distribution</h3>
              <p className="text-sm text-gray-600">By subscription plan</p>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-gray-400" size={20} />
              <ChevronDown className="text-gray-400" size={20} />
            </div>
          </div>
          <ChartComponent type="pie" />
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total active users: 1,234
            </div>
            <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
              Export Data →
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            <p className="text-sm text-gray-600">Key performance indicators</p>
          </div>
          <TrendingUp className="text-emerald-600" size={24} />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
              <div className={`text-xs mt-2 ${
                metric.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Types */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Report Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTypes.map((type) => {
            const Icon = type.icon
            return (
              <div 
                key={type.id}
                className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedReport === type.id 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedReport(type.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    selectedReport === type.id 
                      ? 'bg-emerald-100' 
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={
                      selectedReport === type.id 
                        ? 'text-emerald-600' 
                        : 'text-gray-600'
                    } size={24} />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{type.name}</h4>
                <p className="text-sm text-gray-600">
                  Generate detailed {type.name.toLowerCase()}
                </p>
                {selectedReport === type.id && (
                  <div className="mt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setReportType(type.id)
                        generateReport()
                      }}
                      className="w-full btn-primary"
                    >
                      Generate Now
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Recent Reports</h3>
            <p className="text-gray-600">Recently generated reports</p>
          </div>
          <button className="text-emerald-600 hover:text-emerald-800 font-medium mt-2 sm:mt-0">
            View All Reports
          </button>
        </div>
        
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <FileText className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-500">
                    {report.date} • {report.type} • {report.size} • By {report.generatedBy}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => shareReport(report)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                  title="Share"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => downloadReport(report)}
                  className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg"
                  title="Download"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-3">
                <LineChart className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Monthly Executive Summary</h4>
                <p className="text-sm text-gray-600">Comprehensive overview for executives</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="btn-primary flex-1">Use Template</button>
              <button className="btn-secondary flex-1">Preview</button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-3">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Performance Dashboard</h4>
                <p className="text-sm text-gray-600">Real-time performance metrics</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="btn-primary flex-1">Use Template</button>
              <button className="btn-secondary flex-1">Preview</button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Custom Report Builder</h3>
            <p className="text-gray-600">Create custom reports with drag-and-drop</p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus size={18} className="mr-2" />
            New Report
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="text-emerald-600" size={32} />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Build Custom Reports</h4>
          <p className="text-gray-600 mb-4">
            Drag and drop metrics to create custom reports tailored to your needs
          </p>
          <button className="btn-primary">
            Launch Report Builder
          </button>
        </div>
      </div>
    </div>
  )
}