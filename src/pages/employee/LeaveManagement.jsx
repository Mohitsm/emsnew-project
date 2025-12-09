import React, { useState } from 'react';

// Modal Component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const LeaveManagement = () => {
  // Initial hardcoded leave data
  const initialLeaves = [
    {
      id: 1,
      type: 'casual',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      reason: 'Family vacation',
      status: 'approved',
      appliedDate: '2024-12-01',
      days: 3
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2024-12-15',
      endDate: '2024-12-15',
      reason: 'Medical checkup',
      status: 'pending',
      appliedDate: '2024-12-10',
      days: 1
    },
    {
      id: 3,
      type: 'earned',
      startDate: '2024-11-28',
      endDate: '2024-11-30',
      reason: 'Personal work',
      status: 'approved',
      appliedDate: '2024-11-20',
      days: 3
    },
    {
      id: 4,
      type: 'casual',
      startDate: '2024-11-10',
      endDate: '2024-11-11',
      reason: 'Wedding ceremony',
      status: 'rejected',
      appliedDate: '2024-11-05',
      days: 2
    }
  ];

  const [leaves, setLeaves] = useState(initialLeaves);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'casual',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  });

  // Leave types with balances
  const [leaveBalances, setLeaveBalances] = useState([
    { id: 'casual', label: 'Casual Leave', balance: 10, icon: '🏖️' },
    { id: 'sick', label: 'Sick Leave', balance: 15, icon: '🏥' },
    { id: 'earned', label: 'Earned Leave', balance: 20, icon: '✨' },
    { id: 'maternity', label: 'Maternity Leave', balance: 90, icon: '👶' },
  ]);

  // Calculate days between two dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      type: 'casual',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  const handleEdit = (leave) => {
    setEditingId(leave.id);
    setFormData({
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      const leaveToDelete = leaves.find(l => l.id === id);
      if (leaveToDelete && leaveToDelete.status === 'approved') {
        // Return the days back to balance
        setLeaveBalances(leaveBalances.map(balance => 
          balance.id === leaveToDelete.type 
            ? { ...balance, balance: balance.balance + leaveToDelete.days }
            : balance
        ));
      }
      setLeaves(leaves.filter(leave => leave.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const days = calculateDays(formData.startDate, formData.endDate);
      const appliedDate = new Date().toISOString().split('T')[0];

      if (editingId) {
        // Update existing leave
        const oldLeave = leaves.find(l => l.id === editingId);
        
        // If status changed to approved, deduct from balance
        if (formData.status === 'approved' && oldLeave.status !== 'approved') {
          setLeaveBalances(leaveBalances.map(balance => 
            balance.id === formData.type 
              ? { ...balance, balance: Math.max(0, balance.balance - days) }
              : balance
          ));
        }
        
        // If status changed from approved to something else, add back to balance
        if (oldLeave.status === 'approved' && formData.status !== 'approved') {
          setLeaveBalances(leaveBalances.map(balance => 
            balance.id === oldLeave.type 
              ? { ...balance, balance: balance.balance + oldLeave.days }
              : balance
          ));
        }

        setLeaves(leaves.map(leave => 
          leave.id === editingId 
            ? { ...leave, ...formData, days, appliedDate: leave.appliedDate }
            : leave
        ));
      } else {
        // Create new leave
        const newLeave = {
          id: Math.max(...leaves.map(l => l.id), 0) + 1,
          ...formData,
          days,
          appliedDate
        };
        setLeaves([newLeave, ...leaves]);
      }

      setShowModal(false);
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeLabel = (typeId) => {
    const leaveType = leaveBalances.find(t => t.id === typeId);
    return leaveType ? leaveType.label : typeId;
  };

  // Calculate statistics
  const totalLeavesApplied = leaves.length;
  const approvedLeaves = leaves.filter(l => l.status === 'approved').length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const rejectedLeaves = leaves.filter(l => l.status === 'rejected').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
          <p className="text-gray-600">Manage your leave requests and balances</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          + Apply for Leave
        </button>
      </div>

      {/* Leave Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{totalLeavesApplied}</div>
          <div className="text-sm text-gray-600">Total Applied</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{approvedLeaves}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">{pendingLeaves}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-red-600">{rejectedLeaves}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Leave Balance Cards */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Leave Balance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leaveBalances.map((type) => (
            <div key={type.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{type.icon}</span>
                <div className="text-3xl font-bold text-blue-600">{type.balance}</div>
              </div>
              <div className="text-sm font-medium text-gray-900">{type.label}</div>
              <div className="text-xs text-gray-500 mt-1">days remaining</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave History Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leave History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No leave requests found. Click "Apply for Leave" to create one.
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{getLeaveTypeLabel(leave.type)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{leave.days}</span>
                      <span className="text-gray-500 text-sm ml-1">day(s)</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm text-gray-600 truncate">{leave.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                      {leave.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(leave)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? '✏️ Edit Leave Request' : '📋 Apply for Leave'}
          </h3>
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {leaveBalances.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.label} ({type.balance} days left)
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              {formData.startDate && formData.endDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    📅 Total Days: <span className="font-bold">{calculateDays(formData.startDate, formData.endDate)}</span>
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Please provide a reason for your leave..."
                  required
                />
              </div>
              {editingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : (editingId ? 'Update' : 'Apply')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveManagement;