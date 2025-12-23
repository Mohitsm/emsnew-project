// components/Reports.jsx
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line,
  ResponsiveContainer
} from 'recharts';

const AdminReports = ({ loading, setLoading }) => {
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState({
    start: '2024-11-01',
    end: '2024-12-31'
  });
  const [exportFormat, setExportFormat] = useState('pdf');

  // Attendance Report Data
  const attendanceData = [
    { month: 'Jan', present: 240, absent: 10, late: 15 },
    { month: 'Feb', present: 230, absent: 5, late: 20 },
    { month: 'Mar', present: 250, absent: 2, late: 8 },
    { month: 'Apr', present: 245, absent: 8, late: 12 },
    { month: 'May', present: 255, absent: 3, late: 7 },
    { month: 'Jun', present: 260, absent: 1, late: 4 },
  ];

  // Payroll Report Data
  const payrollData = [
    { month: 'Jan', salary: 4500000, tax: 450000, bonus: 200000 },
    { month: 'Feb', salary: 4550000, tax: 455000, bonus: 180000 },
    { month: 'Mar', salary: 4600000, tax: 460000, bonus: 220000 },
    { month: 'Apr', salary: 4580000, tax: 458000, bonus: 190000 },
    { month: 'May', salary: 4620000, tax: 462000, bonus: 210000 },
    { month: 'Jun', salary: 4650000, tax: 465000, bonus: 230000 },
  ];

  // Leave Report Data
  const leaveData = [
    { name: 'Casual Leave', value: 45 },
    { name: 'Sick Leave', value: 25 },
    { name: 'Earned Leave', value: 15 },
    { name: 'Maternity Leave', value: 5 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const reports = [
    { id: 'attendance', label: 'Attendance Report', icon: '📅' },
    { id: 'payroll', label: 'Payroll Report', icon: '💰' },
    { id: 'leave', label: 'Leave Report', icon: '🏖️' },
    { id: 'department', label: 'Department Report', icon: '🏢' },
    { id: 'custom', label: 'Custom Report', icon: '📊' },
  ];

  const handleExport = () => {
    alert(`Exporting ${selectedReport} report in ${exportFormat.toUpperCase()} format`);
  };

  const renderReport = () => {
    switch(selectedReport) {
      case 'attendance':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Report</h3>
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10B981" name="Present" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                  <Bar dataKey="late" fill="#F59E0B" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Average Attendance Rate</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">2.5%</div>
                <div className="text-sm text-gray-600">Average Absent Rate</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">4.7%</div>
                <div className="text-sm text-gray-600">Average Late Rate</div>
              </div>
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Payroll Report</h3>
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="salary" stroke="#3B82F6" name="Total Salary" />
                  <Line type="monotone" dataKey="tax" stroke="#EF4444" name="Tax Deductions" />
                  <Line type="monotone" dataKey="bonus" stroke="#10B981" name="Bonuses" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">₹27.5M</div>
                <div className="text-sm text-gray-600">Total Salary Paid</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">₹2.75M</div>
                <div className="text-sm text-gray-600">Total Tax Deductions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">₹1.23M</div>
                <div className="text-sm text-gray-600">Total Bonuses</div>
              </div>
            </div>
          </div>
        );

      case 'leave':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Leave Report</h3>
            <div className="h-80 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">100</div>
                <div className="text-sm text-gray-600">Total Leave Applications</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{selectedReport} Report</h3>
            <p className="text-gray-600 mb-4">Select report type and date range to generate custom reports.</p>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-600">Custom report configuration will appear here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
          <p className="text-gray-600">Generate and export various HR reports</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Report Types */}
      <div className="flex flex-wrap gap-2 mb-6">
        {reports.map(report => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`flex items-center px-4 py-3 rounded-lg transition-all ${
              selectedReport === report.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl mr-2">{report.icon}</span>
            {report.label}
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex space-x-4">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {renderReport()}
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">250</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">₹2.8M</div>
          <div className="text-sm text-gray-600">Monthly Payroll</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">96.5%</div>
          <div className="text-sm text-gray-600">Average Attendance</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600">Active Leave Requests</div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;