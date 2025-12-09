// src/pages/employee/MyAttendance.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { attendanceRecords } from '../../data/mockData';

const MyAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const myRecords = attendanceRecords.filter(record => 
    record.employeeId === 'EMP0042'
  ).slice(0, 20);

  const filteredRecords = myRecords.filter(record => {
    const matchesMonth = !selectedMonth || record.date.includes(selectedMonth);
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesMonth && matchesStatus;
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (value) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(value).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn'
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut'
    },
    {
      title: 'Working Hours',
      render: () => '9 hours'
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      render: (value) => value > 0 ? `${value} hours` : '-'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          value === 'present' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : value === 'late'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {value === 'present' ? <CheckCircle className="h-3 w-3 mr-1" /> :
           value === 'late' ? <Clock className="h-3 w-3 mr-1" /> :
           <XCircle className="h-3 w-3 mr-1" />}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  const attendanceStats = [
    { label: 'Total Present', value: '22 days', color: 'text-green-600', icon: CheckCircle },
    { label: 'Total Absent', value: '0 days', color: 'text-red-600', icon: XCircle },
    { label: 'Late Arrivals', value: '2 days', color: 'text-yellow-600', icon: Clock },
    { label: 'Overtime', value: '8 hours', color: 'text-blue-600', icon: TrendingUp },
  ];

  const monthlyData = [
    { month: 'Jan', present: 22, absent: 0, late: 2 },
    { month: 'Feb', present: 20, absent: 2, late: 1 },
    { month: 'Mar', present: 23, absent: 0, late: 0 },
    { month: 'Apr', present: 21, absent: 1, late: 3 },
    { month: 'May', present: 22, absent: 0, late: 1 },
    { month: 'Jun', present: 20, absent: 2, late: 2 },
  ];

  const handleExport = () => {
    // Export functionality
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your attendance records and working hours
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" startIcon={<Download className="h-4 w-4" />} onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-')} bg-opacity-10`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                startIcon={<Calendar className="h-5 w-5" />}
              />
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>
            <div>
              <Button variant="outline" className="w-full" startIcon={<Filter className="h-4 w-4" />}>
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns} 
            data={filteredRecords}
            emptyMessage="No attendance records found for the selected filters."
          />
        </CardContent>
      </Card>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <CardTitle>Monthly Attendance Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <div className="flex items-end justify-between h-48 mt-4">
                {monthlyData.map((month, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <div 
                        className="w-8 bg-emerald-500 rounded-t"
                        style={{ height: `${(month.present / 25) * 100}%` }}
                        title={`Present: ${month.present}`}
                      ></div>
                      <div 
                        className="w-8 bg-red-500 rounded-t"
                        style={{ height: `${(month.absent / 25) * 100}%` }}
                        title={`Absent: ${month.absent}`}
                      ></div>
                      <div 
                        className="w-8 bg-yellow-500 rounded-t"
                        style={{ height: `${(month.late / 25) * 100}%` }}
                        title={`Late: ${month.late}`}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Absent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Late</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Total Working Days</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">22/22</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Attendance Percentage</span>
                <span className="font-bold text-green-600 dark:text-green-400">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Average Working Hours</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">9.2 hrs/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Total Overtime</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">8 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Late Arrivals</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">2 days</span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">A+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Attendance Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyAttendance;