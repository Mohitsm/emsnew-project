// src/pages/employee/MyPayslips.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  DollarSign,
  Calendar,
  FileText,
  Eye,
  Printer,
  Send
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { toast } from 'react-hot-toast';
import { payrollRecords } from '../../data/mockData';

const MyPayslips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const myPayslips = payrollRecords.filter(record => 
    record.employeeId === 'EMP0042'
  );

  const filteredPayslips = myPayslips.filter(payslip => {
    const matchesSearch = payslip.month.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = !selectedYear || payslip.month.includes(selectedYear);
    return matchesSearch && matchesYear;
  });

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month'
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      title: 'Allowances',
      dataIndex: 'allowances',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      title: 'Deductions',
      dataIndex: 'deductions',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      render: (value) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          ₹{value.toLocaleString()}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewPayslip(record)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDownloadPayslip(record)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => handlePrintPayslip(record)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            title="Print"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  const salaryStats = [
    { label: 'Total Annual Salary', value: '₹5,40,000', color: 'text-emerald-600' },
    { label: 'Average Monthly Salary', value: '₹45,000', color: 'text-blue-600' },
    { label: 'Total Tax Paid', value: '₹64,800', color: 'text-red-600' },
    { label: 'Net Income', value: '₹4,75,200', color: 'text-green-600' },
  ];

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setIsDetailModalOpen(true);
  };

  const handleDownloadPayslip = (payslip) => {
    toast.success(`Downloading payslip for ${payslip.month}`);
  };

  const handlePrintPayslip = (payslip) => {
    toast.success(`Printing payslip for ${payslip.month}`);
  };

  const handleRequestPayslip = () => {
    toast.success('Payslip request submitted to HR');
  };

  const years = ['2024', '2023', '2022', '2021'];

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Payslips</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and download your salary slips
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" startIcon={<Send className="h-4 w-4" />} onClick={handleRequestPayslip}>
            Request Payslip
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salaryStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search by month..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-5 w-5" />}
              />
            </div>
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
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

      {/* Payslips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Slips ({filteredPayslips.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns} 
            data={filteredPayslips}
            emptyMessage="No payslips found for the selected filters."
          />
        </CardContent>
      </Card>

      {/* Payslip Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Payslip Details"
        size="lg"
      >
        {selectedPayslip && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white"> Pvt. Ltd.</h3>
              <p className="text-gray-600 dark:text-gray-400">Salary Slip for {selectedPayslip.month} 2024</p>
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Employee Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Employee Name:</span>
                    <span className="font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Employee ID:</span>
                    <span className="font-medium">EMP0042</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Department:</span>
                    <span className="font-medium">IT Department</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Designation:</span>
                    <span className="font-medium">Senior Developer</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Date:</span>
                    <span className="font-medium">05 {selectedPayslip.month} 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Mode:</span>
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Bank Account:</span>
                    <span className="font-medium">XXXXXX1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                    <span className="font-medium text-green-600">Paid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Salary Breakdown</h4>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="flex justify-between px-4 py-3">
                  <span>Basic Salary</span>
                  <span className="font-medium">₹{selectedPayslip.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                  <span>House Rent Allowance</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.allowances * 0.4).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span>Travel Allowance</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.allowances * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                  <span>Medical Allowance</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.allowances * 0.2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span>Other Allowances</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.allowances * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 font-medium">
                  <span>Gross Salary</span>
                  <span>₹{(selectedPayslip.basicSalary + selectedPayslip.allowances).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span>Professional Tax</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.deductions * 0.5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
                  <span>Provident Fund</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.deductions * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span>Income Tax</span>
                  <span className="font-medium">₹{Math.round(selectedPayslip.deductions * 0.2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-800 dark:text-emerald-300">
                  <span>Net Salary</span>
                  <span>₹{selectedPayslip.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" startIcon={<Printer className="h-4 w-4" />}>
                Print
              </Button>
              <Button startIcon={<Download className="h-4 w-4" />}>
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyPayslips;