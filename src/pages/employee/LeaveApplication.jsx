// src/pages/employee/LeaveApplication.jsx
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Send,
  Download,
  Filter,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { toast } from 'react-hot-toast';
import { leaveApplications } from '../../data/mockData';

const LeaveApplication = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    contactDuringLeave: ''
  });

  const myApplications = leaveApplications.filter(app => 
    app.employeeId === 'EMP0042'
  );

  const columns = [
    {
      title: 'Leave Type',
      dataIndex: 'type',
      render: (value) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {value}
        </span>
      )
    },
    {
      title: 'Dates',
      render: (record) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {new Date(record.startDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            to {new Date(record.endDate).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      title: 'Duration',
      render: (record) => {
        const start = new Date(record.startDate);
        const end = new Date(record.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return `${days} day${days > 1 ? 's' : ''}`;
      }
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          value === 'approved' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : value === 'rejected'
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {value === 'approved' ? <CheckCircle className="h-3 w-3 mr-1" /> :
           value === 'rejected' ? <XCircle className="h-3 w-3 mr-1" /> :
           <Clock className="h-3 w-3 mr-1" />}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      title: 'Applied On',
      dataIndex: 'appliedOn',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const leaveBalance = [
    { type: 'Casual Leave', balance: 8, total: 12 },
    { type: 'Sick Leave', balance: 5, total: 10 },
    { type: 'Earned Leave', balance: 15, total: 30 },
    { type: 'Maternity Leave', balance: 90, total: 180 },
  ];

  const handleApplyLeave = () => {
    if (!leaveForm.type || !leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) {
      toast.error('Please fill all required fields');
      return;
    }

    toast.success('Leave application submitted successfully');
    setIsApplyModalOpen(false);
    setLeaveForm({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      contactDuringLeave: ''
    });
  };

  const handleDownload = () => {
    toast.success('Downloading leave policy document...');
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Application</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Apply for leave and track your applications
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" startIcon={<Download className="h-4 w-4" />} onClick={handleDownload}>
            Policy
          </Button>
          <Button startIcon={<Send className="h-4 w-4" />} onClick={() => setIsApplyModalOpen(true)}>
            Apply Leave
          </Button>
        </div>
      </div>

      {/* Leave Balance */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            <CardTitle>Leave Balance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {leaveBalance.map((leave, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{leave.type}</div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                      {leave.balance}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    / {leave.total} days
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(leave.balance / leave.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Leave Applications ({myApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns} 
            data={myApplications}
            emptyMessage="You haven't applied for any leave yet."
          />
        </CardContent>
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for Leave"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Leave Type *
              </label>
              <select
                value={leaveForm.type}
                onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Casual">Casual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Earned">Earned Leave</option>
                <option value="Maternity">Maternity Leave</option>
                <option value="Paternity">Paternity Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact During Leave
              </label>
              <Input
                value={leaveForm.contactDuringLeave}
                onChange={(e) => setLeaveForm({ ...leaveForm, contactDuringLeave: e.target.value })}
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date *
              </label>
              <Input
                type="date"
                value={leaveForm.startDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date *
              </label>
              <Input
                type="date"
                value={leaveForm.endDate}
                onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Leave *
            </label>
            <textarea
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
              placeholder="Please provide details about your leave"
              required
            />
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">Important Notice</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 mt-2 space-y-1">
                  <li>• Leave applications should be submitted at least 3 days in advance</li>
                  <li>• Emergency leaves require immediate supervisor approval</li>
                  <li>• Medical certificate required for sick leaves beyond 3 days</li>
                  <li>• Check your leave balance before applying</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyLeave}>
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveApplication;