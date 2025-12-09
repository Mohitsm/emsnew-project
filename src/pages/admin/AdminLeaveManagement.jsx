import React, { useState, useEffect } from 'react';

// Modal Component
const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminLeaveManagement = () => {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showLeaveTypesModal, setShowLeaveTypesModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [newLeaveType, setNewLeaveType] = useState({
    name: '',
    description: '',
    maxDays: '',
    carryForward: false
  });

  const [balanceData, setBalanceData] = useState({
    employeeId: '',
    leaveType: '',
    balance: ''
  });

  // Initialize static data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Static Leave Types
    setLeaveTypes([
      { id: 1, name: 'Casual Leave', description: 'For personal reasons', maxDays: 12, carryForward: true },
      { id: 2, name: 'Sick Leave', description: 'Medical leave', maxDays: 15, carryForward: false },
      { id: 3, name: 'Earned Leave', description: 'Accumulated leave', maxDays: 30, carryForward: true },
      { id: 4, name: 'Maternity Leave', description: 'For maternity', maxDays: 90, carryForward: false },
    ]);

    // Static Employees
    setEmployees([
      { id: 1, name: 'John Doe', department: 'Engineering' },
      { id: 2, name: 'Jane Smith', department: 'Marketing' },
      { id: 3, name: 'Mike Johnson', department: 'Sales' },
      { id: 4, name: 'Sarah Williams', department: 'HR' },
      { id: 5, name: 'Tom Brown', department: 'Finance' },
    ]);

    // Static Leave Requests
    setLeaves([
      {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        type: 'Casual Leave',
        startDate: '2024-12-15',
        endDate: '2024-12-17',
        duration: 3,
        reason: 'Family wedding ceremony',
        status: 'pending'
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Jane Smith',
        type: 'Sick Leave',
        startDate: '2024-12-10',
        endDate: '2024-12-11',
        duration: 2,
        reason: 'Fever and cold',
        status: 'approved'
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Mike Johnson',
        type: 'Earned Leave',
        startDate: '2024-12-20',
        endDate: '2024-12-24',
        duration: 5,
        reason: 'Year-end vacation',
        status: 'pending'
      },
      {
        id: 4,
        employeeId: 4,
        employeeName: 'Sarah Williams',
        type: 'Casual Leave',
        startDate: '2024-12-05',
        endDate: '2024-12-05',
        duration: 1,
        reason: 'Personal work',
        status: 'rejected'
      },
      {
        id: 5,
        employeeId: 5,
        employeeName: 'Tom Brown',
        type: 'Sick Leave',
        startDate: '2024-12-12',
        endDate: '2024-12-14',
        duration: 3,
        reason: 'Medical checkup and recovery',
        status: 'approved'
      },
    ]);
  };

  // CRUD Operations for Leave Requests
  const handleApproveLeave = (leaveId) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'approved' } : leave
    ));
    alert('Leave request approved successfully!');
  };

  const handleRejectLeave = (leaveId) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'rejected' } : leave
    ));
    alert('Leave request rejected!');
  };

  // CRUD Operations for Leave Types
  const handleAddLeaveType = () => {
    if (!newLeaveType.name || !newLeaveType.maxDays) {
      alert('Please fill in all required fields!');
      return;
    }

    const newType = {
      id: Math.max(...leaveTypes.map(t => t.id), 0) + 1,
      name: newLeaveType.name,
      description: newLeaveType.description,
      maxDays: parseInt(newLeaveType.maxDays),
      carryForward: newLeaveType.carryForward
    };

    setLeaveTypes([...leaveTypes, newType]);
    setNewLeaveType({ name: '', description: '', maxDays: '', carryForward: false });
    setShowLeaveTypesModal(false);
    alert('Leave type added successfully!');
  };

  const handleEditLeaveType = (type) => {
    setEditingLeaveType(type);
    setNewLeaveType({
      name: type.name,
      description: type.description,
      maxDays: type.maxDays.toString(),
      carryForward: type.carryForward
    });
    setShowLeaveTypesModal(true);
  };

  const handleUpdateLeaveType = () => {
    if (!newLeaveType.name || !newLeaveType.maxDays) {
      alert('Please fill in all required fields!');
      return;
    }

    setLeaveTypes(leaveTypes.map(type =>
      type.id === editingLeaveType.id
        ? {
            ...type,
            name: newLeaveType.name,
            description: newLeaveType.description,
            maxDays: parseInt(newLeaveType.maxDays),
            carryForward: newLeaveType.carryForward
          }
        : type
    ));

    setNewLeaveType({ name: '', description: '', maxDays: '', carryForward: false });
    setEditingLeaveType(null);
    setShowLeaveTypesModal(false);
    alert('Leave type updated successfully!');
  };

  const handleDeleteLeaveType = (typeId) => {
    if (window.confirm('Are you sure you want to delete this leave type?')) {
      setLeaveTypes(leaveTypes.filter(type => type.id !== typeId));
      alert('Leave type deleted successfully!');
    }
  };

  // Leave Balance Management
  const handleUpdateBalance = () => {
    if (!balanceData.employeeId || !balanceData.leaveType || !balanceData.balance) {
      alert('Please fill in all required fields!');
      return;
    }

    const employee = employees.find(e => e.id === parseInt(balanceData.employeeId));
    alert(`Leave balance updated for ${employee.name}!\nLeave Type: ${balanceData.leaveType}\nNew Balance: ${balanceData.balance} days`);
    
    setBalanceData({ employeeId: '', leaveType: '', balance: '' });
    setShowBalanceModal(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilteredLeaves = () => {
    if (filterStatus === 'all') return leaves;
    return leaves.filter(leave => leave.status === filterStatus);
  };

  const closeModal = () => {
    setShowLeaveTypesModal(false);
    setEditingLeaveType(null);
    setNewLeaveType({ name: '', description: '', maxDays: '', carryForward: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Leave Management</h2>
            <p className="text-gray-600 mt-1">Manage employee leave requests and configurations</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowBalanceModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              📊 Manage Balances
            </button>
            <button
              onClick={() => setShowLeaveTypesModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ⚙️ Configure Leave Types
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-gray-600 text-sm">Total Requests</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{leaves.length}</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="text-yellow-700 text-sm">Pending</div>
            <div className="text-3xl font-bold text-yellow-900 mt-2">
              {leaves.filter(l => l.status === 'pending').length}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="text-green-700 text-sm">Approved</div>
            <div className="text-3xl font-bold text-green-900 mt-2">
              {leaves.filter(l => l.status === 'approved').length}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-700 text-sm">Rejected</div>
            <div className="text-3xl font-bold text-red-900 mt-2">
              {leaves.filter(l => l.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Leave Requests</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
                }`}
              >
                Approved
              </button>
              <button 
                onClick={() => setFilterStatus('rejected')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {getFilteredLeaves().map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{leave.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {leave.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {leave.duration} days
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate text-gray-600">{leave.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveLeave(leave.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLeave(leave.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">Action Taken</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Types Configuration */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Leave Types Configuration</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carry Forward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {leaveTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {type.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {type.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {type.maxDays} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        type.carryForward 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {type.carryForward ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditLeaveType(type)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteLeaveType(type.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Leave Type Modal */}
        <Modal
          show={showLeaveTypesModal}
          onClose={closeModal}
          title={editingLeaveType ? 'Edit Leave Type' : 'Add Leave Type'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type Name *
              </label>
              <input
                type="text"
                value={newLeaveType.name}
                onChange={(e) => setNewLeaveType({...newLeaveType, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Casual Leave"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newLeaveType.description}
                onChange={(e) => setNewLeaveType({...newLeaveType, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Description of the leave type"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Days Per Year *
              </label>
              <input
                type="number"
                value={newLeaveType.maxDays}
                onChange={(e) => setNewLeaveType({...newLeaveType, maxDays: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
                min="1"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newLeaveType.carryForward}
                onChange={(e) => setNewLeaveType({...newLeaveType, carryForward: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Allow carry forward to next year
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={editingLeaveType ? handleUpdateLeaveType : handleAddLeaveType}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingLeaveType ? 'Update Leave Type' : 'Add Leave Type'}
            </button>
          </div>
        </Modal>

        {/* Manage Leave Balance Modal */}
        <Modal
          show={showBalanceModal}
          onClose={() => {
            setShowBalanceModal(false);
            setBalanceData({ employeeId: '', leaveType: '', balance: '' });
          }}
          title="Manage Leave Balance"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={balanceData.employeeId}
                onChange={(e) => setBalanceData({...balanceData, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type *
              </label>
              <select
                value={balanceData.leaveType}
                onChange={(e) => setBalanceData({...balanceData, leaveType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Balance *
              </label>
              <input
                type="number"
                value={balanceData.balance}
                onChange={(e) => setBalanceData({...balanceData, balance: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new balance"
                min="0"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-800">
                ℹ️ Current balance will be replaced with the new value.
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowBalanceModal(false);
                setBalanceData({ employeeId: '', leaveType: '', balance: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateBalance}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Balance
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;