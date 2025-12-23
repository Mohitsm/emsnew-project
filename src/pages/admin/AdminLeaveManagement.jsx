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

const LeaveManagement = () => {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  
  // Modal states
  const [showLeaveTypesModal, setShowLeaveTypesModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [showLeaveDetailsModal, setShowLeaveDetailsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // State for forms
  const [editingLeaveType, setEditingLeaveType] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [deleteItem, setDeleteItem] = useState({ type: '', id: null });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportRange, setExportRange] = useState('all');
  
  // Form states
  const [newLeaveType, setNewLeaveType] = useState({
    name: '',
    description: '',
    maxDays: '',
    carryForward: false,
    requiresApproval: true,
    color: '#3B82F6'
  });

  const [newLeave, setNewLeave] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null
  });

  const [balanceData, setBalanceData] = useState({
    employeeId: '',
    leaveType: '',
    balance: '',
    year: new Date().getFullYear()
  });

  // Color options for leave types
  const colorOptions = [
    { value: '#3B82F6', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Amber' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#EC4899', label: 'Pink' }
  ];

  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    setLoading(true);
    
    // Static Leave Types
    const initialLeaveTypes = [
      { id: 1, name: 'Casual Leave', description: 'For personal reasons', maxDays: 12, carryForward: true, requiresApproval: true, color: '#3B82F6', createdAt: '2024-01-01' },
      { id: 2, name: 'Sick Leave', description: 'Medical leave', maxDays: 15, carryForward: false, requiresApproval: false, color: '#10B981', createdAt: '2024-01-01' },
      { id: 3, name: 'Earned Leave', description: 'Accumulated leave', maxDays: 30, carryForward: true, requiresApproval: true, color: '#F59E0B', createdAt: '2024-01-01' },
      { id: 4, name: 'Maternity Leave', description: 'For maternity', maxDays: 90, carryForward: false, requiresApproval: true, color: '#EC4899', createdAt: '2024-01-01' },
      { id: 5, name: 'Paternity Leave', description: 'For paternity', maxDays: 15, carryForward: false, requiresApproval: true, color: '#8B5CF6', createdAt: '2024-01-01' },
      { id: 6, name: 'Unpaid Leave', description: 'Leave without pay', maxDays: 30, carryForward: false, requiresApproval: true, color: '#6B7280', createdAt: '2024-01-01' },
    ];
    setLeaveTypes(initialLeaveTypes);

    // Static Employees
    const initialEmployees = [
      { id: 1, name: 'John Doe', department: 'Engineering', email: 'john@example.com', joinDate: '2022-01-15' },
      { id: 2, name: 'Jane Smith', department: 'Marketing', email: 'jane@example.com', joinDate: '2021-03-10' },
      { id: 3, name: 'Mike Johnson', department: 'Sales', email: 'mike@example.com', joinDate: '2023-06-22' },
      { id: 4, name: 'Sarah Williams', department: 'HR', email: 'sarah@example.com', joinDate: '2020-11-05' },
      { id: 5, name: 'Tom Brown', department: 'Finance', email: 'tom@example.com', joinDate: '2022-09-18' },
      { id: 6, name: 'Emily Davis', department: 'Engineering', email: 'emily@example.com', joinDate: '2023-02-28' },
      { id: 7, name: 'Robert Wilson', department: 'Operations', email: 'robert@example.com', joinDate: '2021-12-12' },
      { id: 8, name: 'Lisa Anderson', department: 'Marketing', email: 'lisa@example.com', joinDate: '2022-07-30' },
    ];
    setEmployees(initialEmployees);

    // Static Leave Requests
    const initialLeaves = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        department: 'Engineering',
        type: 'Casual Leave',
        startDate: '2024-12-15',
        endDate: '2024-12-17',
        appliedDate: '2024-12-10',
        duration: 3,
        reason: 'Family wedding ceremony',
        status: 'pending',
        approvedBy: null,
        approvedDate: null,
        comments: ''
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Jane Smith',
        department: 'Marketing',
        type: 'Sick Leave',
        startDate: '2024-12-10',
        endDate: '2024-12-11',
        appliedDate: '2024-12-09',
        duration: 2,
        reason: 'Fever and cold',
        status: 'approved',
        approvedBy: 'Admin User',
        approvedDate: '2024-12-09',
        comments: 'Get well soon'
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: 'Mike Johnson',
        department: 'Sales',
        type: 'Earned Leave',
        startDate: '2024-12-20',
        endDate: '2024-12-24',
        appliedDate: '2024-12-05',
        duration: 5,
        reason: 'Year-end vacation',
        status: 'pending',
        approvedBy: null,
        approvedDate: null,
        comments: ''
      },
      {
        id: 4,
        employeeId: 4,
        employeeName: 'Sarah Williams',
        department: 'HR',
        type: 'Casual Leave',
        startDate: '2024-12-05',
        endDate: '2024-12-05',
        appliedDate: '2024-12-01',
        duration: 1,
        reason: 'Personal work',
        status: 'rejected',
        approvedBy: 'Admin User',
        approvedDate: '2024-12-02',
        comments: 'Busy period, please reschedule'
      },
      {
        id: 5,
        employeeId: 5,
        employeeName: 'Tom Brown',
        department: 'Finance',
        type: 'Sick Leave',
        startDate: '2024-12-12',
        endDate: '2024-12-14',
        appliedDate: '2024-12-11',
        duration: 3,
        reason: 'Medical checkup and recovery',
        status: 'approved',
        approvedBy: 'Admin User',
        approvedDate: '2024-12-11',
        comments: 'Take care'
      },
      {
        id: 6,
        employeeId: 6,
        employeeName: 'Emily Davis',
        department: 'Engineering',
        type: 'Maternity Leave',
        startDate: '2024-12-01',
        endDate: '2025-02-28',
        appliedDate: '2024-11-15',
        duration: 90,
        reason: 'Maternity leave',
        status: 'approved',
        approvedBy: 'Admin User',
        approvedDate: '2024-11-20',
        comments: 'Congratulations!'
      },
      {
        id: 7,
        employeeId: 7,
        employeeName: 'Robert Wilson',
        department: 'Operations',
        type: 'Unpaid Leave',
        startDate: '2024-12-25',
        endDate: '2024-12-31',
        appliedDate: '2024-12-10',
        duration: 7,
        reason: 'Family emergency',
        status: 'pending',
        approvedBy: null,
        approvedDate: null,
        comments: ''
      },
    ];
    setLeaves(initialLeaves);

    // Initialize leave balances
    const initialBalances = [];
    initialEmployees.forEach(employee => {
      initialLeaveTypes.forEach(type => {
        initialBalances.push({
          id: initialBalances.length + 1,
          employeeId: employee.id,
          employeeName: employee.name,
          leaveType: type.name,
          leaveTypeId: type.id,
          balance: type.maxDays,
          used: 0,
          year: 2024
        });
      });
    });
    
    // Update balances based on approved leaves
    initialLeaves.forEach(leave => {
      if (leave.status === 'approved') {
        const balanceIndex = initialBalances.findIndex(
          b => b.employeeId === leave.employeeId && b.leaveType === leave.type
        );
        if (balanceIndex !== -1) {
          initialBalances[balanceIndex].used += leave.duration;
          initialBalances[balanceIndex].balance -= leave.duration;
        }
      }
    });
    
    setLeaveBalances(initialBalances);
    setLoading(false);
  };

  // CRUD Operations for Leave Requests
  const handleApproveLeave = (leaveId) => {
    const leave = leaves.find(l => l.id === leaveId);
    if (!leave) return;

    // Check if employee has sufficient balance
    const balance = leaveBalances.find(
      b => b.employeeId === leave.employeeId && b.leaveType === leave.type
    );

    if (balance && balance.balance < leave.duration) {
      alert(`Insufficient leave balance! Available: ${balance.balance} days`);
      return;
    }

    // Update leave status
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { 
        ...leave, 
        status: 'approved',
        approvedBy: 'Admin User',
        approvedDate: new Date().toISOString().split('T')[0]
      } : leave
    ));

    // Update leave balance
    if (balance) {
      setLeaveBalances(leaveBalances.map(b =>
        b.employeeId === leave.employeeId && b.leaveType === leave.type
          ? { ...b, used: b.used + leave.duration, balance: b.balance - leave.duration }
          : b
      ));
    }

    alert('Leave request approved successfully!');
  };

  const handleRejectLeave = (leaveId) => {
    const comment = prompt('Please enter rejection reason:');
    if (comment === null) return;

    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { 
        ...leave, 
        status: 'rejected',
        approvedBy: 'Admin User',
        approvedDate: new Date().toISOString().split('T')[0],
        comments: comment
      } : leave
    ));
    
    alert('Leave request rejected!');
  };

  const handleAddLeaveRequest = () => {
    if (!newLeave.employeeId || !newLeave.leaveType || !newLeave.startDate || !newLeave.endDate) {
      alert('Please fill in all required fields!');
      return;
    }

    const employee = employees.find(e => e.id === parseInt(newLeave.employeeId));
    const startDate = new Date(newLeave.startDate);
    const endDate = new Date(newLeave.endDate);
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const newLeaveRequest = {
      id: Math.max(...leaves.map(l => l.id), 0) + 1,
      employeeId: parseInt(newLeave.employeeId),
      employeeName: employee.name,
      department: employee.department,
      type: newLeave.leaveType,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      appliedDate: new Date().toISOString().split('T')[0],
      duration: duration,
      reason: newLeave.reason,
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      comments: ''
    };

    setLeaves([newLeaveRequest, ...leaves]);
    setNewLeave({
      employeeId: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      attachment: null
    });
    setShowAddLeaveModal(false);
    alert('Leave request added successfully!');
  };

  const handleDeleteLeave = (leaveId) => {
    const leave = leaves.find(l => l.id === leaveId);
    if (leave.status === 'approved') {
      // Restore balance if approved leave is deleted
      setLeaveBalances(leaveBalances.map(b =>
        b.employeeId === leave.employeeId && b.leaveType === leave.type
          ? { ...b, used: b.used - leave.duration, balance: b.balance + leave.duration }
          : b
      ));
    }
    
    setLeaves(leaves.filter(leave => leave.id !== leaveId));
    setShowDeleteConfirmModal(false);
    alert('Leave request deleted successfully!');
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
      carryForward: newLeaveType.carryForward,
      requiresApproval: newLeaveType.requiresApproval,
      color: newLeaveType.color,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeaveTypes([...leaveTypes, newType]);
    
    // Add balance entries for all employees
    const newBalances = employees.map(employee => ({
      id: Math.max(...leaveBalances.map(b => b.id), 0) + 1,
      employeeId: employee.id,
      employeeName: employee.name,
      leaveType: newLeaveType.name,
      leaveTypeId: newType.id,
      balance: parseInt(newLeaveType.maxDays),
      used: 0,
      year: 2024
    }));
    
    setLeaveBalances([...leaveBalances, ...newBalances]);
    
    setNewLeaveType({ 
      name: '', 
      description: '', 
      maxDays: '', 
      carryForward: false, 
      requiresApproval: true,
      color: '#3B82F6' 
    });
    setShowLeaveTypesModal(false);
    alert('Leave type added successfully!');
  };

  const handleEditLeaveType = (type) => {
    setEditingLeaveType(type);
    setNewLeaveType({
      name: type.name,
      description: type.description,
      maxDays: type.maxDays.toString(),
      carryForward: type.carryForward,
      requiresApproval: type.requiresApproval,
      color: type.color
    });
    setShowLeaveTypesModal(true);
  };

  const handleUpdateLeaveType = () => {
    if (!newLeaveType.name || !newLeaveType.maxDays) {
      alert('Please fill in all required fields!');
      return;
    }

    const updatedTypes = leaveTypes.map(type =>
      type.id === editingLeaveType.id
        ? {
            ...type,
            name: newLeaveType.name,
            description: newLeaveType.description,
            maxDays: parseInt(newLeaveType.maxDays),
            carryForward: newLeaveType.carryForward,
            requiresApproval: newLeaveType.requiresApproval,
            color: newLeaveType.color
          }
        : type
    );

    setLeaveTypes(updatedTypes);
    
    // Update leave type name in leave balances
    setLeaveBalances(leaveBalances.map(balance =>
      balance.leaveTypeId === editingLeaveType.id
        ? { ...balance, leaveType: newLeaveType.name }
        : balance
    ));
    
    // Update leave type name in leaves
    setLeaves(leaves.map(leave =>
      leave.type === editingLeaveType.name
        ? { ...leave, type: newLeaveType.name }
        : leave
    ));

    setNewLeaveType({ 
      name: '', 
      description: '', 
      maxDays: '', 
      carryForward: false, 
      requiresApproval: true,
      color: '#3B82F6' 
    });
    setEditingLeaveType(null);
    setShowLeaveTypesModal(false);
    alert('Leave type updated successfully!');
  };

  const handleDeleteLeaveType = (typeId) => {
    // Check if any leaves use this type
    const leavesUsingType = leaves.filter(leave => {
      const type = leaveTypes.find(t => t.id === typeId);
      return leave.type === type?.name;
    });

    if (leavesUsingType.length > 0) {
      alert('Cannot delete leave type. Some leaves are using this type.');
      return;
    }

    setLeaveTypes(leaveTypes.filter(type => type.id !== typeId));
    setLeaveBalances(leaveBalances.filter(b => b.leaveTypeId !== typeId));
    setShowDeleteConfirmModal(false);
    alert('Leave type deleted successfully!');
  };

  // Leave Balance Management
  const handleUpdateBalance = () => {
    if (!balanceData.employeeId || !balanceData.leaveType || !balanceData.balance) {
      alert('Please fill in all required fields!');
      return;
    }

    const employee = employees.find(e => e.id === parseInt(balanceData.employeeId));
    const newBalance = parseInt(balanceData.balance);
    
    // Update or add balance
    const existingBalanceIndex = leaveBalances.findIndex(
      b => b.employeeId === parseInt(balanceData.employeeId) && 
           b.leaveType === balanceData.leaveType &&
           b.year === parseInt(balanceData.year)
    );

    if (existingBalanceIndex !== -1) {
      // Update existing balance
      const updatedBalances = [...leaveBalances];
      updatedBalances[existingBalanceIndex] = {
        ...updatedBalances[existingBalanceIndex],
        balance: newBalance
      };
      setLeaveBalances(updatedBalances);
    } else {
      // Add new balance
      const newBalanceEntry = {
        id: Math.max(...leaveBalances.map(b => b.id), 0) + 1,
        employeeId: parseInt(balanceData.employeeId),
        employeeName: employee.name,
        leaveType: balanceData.leaveType,
        leaveTypeId: leaveTypes.find(t => t.name === balanceData.leaveType)?.id,
        balance: newBalance,
        used: 0,
        year: parseInt(balanceData.year)
      };
      setLeaveBalances([...leaveBalances, newBalanceEntry]);
    }

    alert(`Leave balance updated for ${employee.name}!\nLeave Type: ${balanceData.leaveType}\nNew Balance: ${balanceData.balance} days`);
    
    setBalanceData({ 
      employeeId: '', 
      leaveType: '', 
      balance: '', 
      year: new Date().getFullYear() 
    });
    setShowBalanceModal(false);
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFilteredLeaves = () => {
    let filtered = leaves;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(leave => leave.status === filterStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(leave =>
        leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleExportData = () => {
    let dataToExport;
    
    switch(exportRange) {
      case 'pending':
        dataToExport = leaves.filter(l => l.status === 'pending');
        break;
      case 'approved':
        dataToExport = leaves.filter(l => l.status === 'approved');
        break;
      case 'rejected':
        dataToExport = leaves.filter(l => l.status === 'rejected');
        break;
      default:
        dataToExport = leaves;
    }

    if (exportFormat === 'csv') {
      const headers = ['Employee', 'Department', 'Leave Type', 'Start Date', 'End Date', 'Duration', 'Status', 'Reason'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => [
          `"${row.employeeName}"`,
          `"${row.department}"`,
          `"${row.type}"`,
          row.startDate,
          row.endDate,
          row.duration,
          row.status,
          `"${row.reason}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leave-data-${exportRange}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else if (exportFormat === 'pdf') {
      alert('PDF export would be implemented with a library like jsPDF');
      // In a real app, you would use jsPDF or similar library here
    }
    
    setShowExportModal(false);
    alert(`Data exported successfully as ${exportFormat.toUpperCase()}!`);
  };

  const handleResetBalances = () => {
    if (window.confirm('Are you sure you want to reset all leave balances to default? This cannot be undone.')) {
      const resetBalances = leaveBalances.map(balance => {
        const leaveType = leaveTypes.find(t => t.id === balance.leaveTypeId);
        return {
          ...balance,
          balance: leaveType ? leaveType.maxDays : 0,
          used: 0
        };
      });
      
      setLeaveBalances(resetBalances);
      alert('All leave balances have been reset to default!');
    }
  };

  const closeModal = () => {
    setShowLeaveTypesModal(false);
    setShowAddLeaveModal(false);
    setShowLeaveDetailsModal(false);
    setShowBalanceModal(false);
    setShowExportModal(false);
    setEditingLeaveType(null);
    setSelectedLeave(null);
    setNewLeaveType({ 
      name: '', 
      description: '', 
      maxDays: '', 
      carryForward: false, 
      requiresApproval: true,
      color: '#3B82F6' 
    });
    setNewLeave({
      employeeId: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      attachment: null
    });
    setBalanceData({ 
      employeeId: '', 
      leaveType: '', 
      balance: '', 
      year: new Date().getFullYear() 
    });
  };

  // Calculate statistics
  const getStatistics = () => {
    const total = leaves.length;
    const pending = leaves.filter(l => l.status === 'pending').length;
    const approved = leaves.filter(l => l.status === 'approved').length;
    const rejected = leaves.filter(l => l.status === 'rejected').length;
    const totalDays = leaves.reduce((sum, leave) => sum + leave.duration, 0);
    const avgDuration = total > 0 ? (totalDays / total).toFixed(1) : 0;

    return { total, pending, approved, rejected, totalDays, avgDuration };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leave management system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leave Management</h2>
            <p className="text-gray-600 mt-1">Manage employee leave requests and configurations</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              📊 Export Data
            </button>
            <button
              onClick={() => setShowBalanceModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              ⚖️ Manage Balances
            </button>
            <button
              onClick={() => setShowLeaveTypesModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              ⚙️ Configure Leave Types
            </button>
            <button
              onClick={() => setShowAddLeaveModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              ➕ Add Leave
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leaves by employee, type, or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button 
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button 
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button 
                onClick={() => setFilterStatus('rejected')}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-600 text-sm">Total Requests</div>
                <div className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</div>
              </div>
              <div className="text-2xl">📋</div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-yellow-700 text-sm">Pending</div>
                <div className="text-2xl font-bold text-yellow-900 mt-2">{stats.pending}</div>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-700 text-sm">Approved</div>
                <div className="text-2xl font-bold text-green-900 mt-2">{stats.approved}</div>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-red-700 text-sm">Rejected</div>
                <div className="text-2xl font-bold text-red-900 mt-2">{stats.rejected}</div>
              </div>
              <div className="text-2xl">❌</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-700 text-sm">Total Days</div>
                <div className="text-2xl font-bold text-blue-900 mt-2">{stats.totalDays}</div>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-700 text-sm">Avg Duration</div>
                <div className="text-2xl font-bold text-purple-900 mt-2">{stats.avgDuration} days</div>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Leave Requests</h3>
            <div className="text-sm text-gray-600">
              Showing {getFilteredLeaves().length} of {leaves.length} requests
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {getFilteredLeaves().map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{leave.employeeName}</div>
                        <div className="text-sm text-gray-500">{leave.department}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ 
                            backgroundColor: leaveTypes.find(t => t.name === leave.type)?.color || '#3B82F6' 
                          }}
                        />
                        <span className="text-gray-700">{leave.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{leave.startDate}</div>
                      <div className="text-xs text-gray-500">to {leave.endDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-700 font-medium">{leave.duration} days</div>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <div className="truncate text-gray-600">{leave.reason}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedLeave(leave);
                            setShowLeaveDetailsModal(true);
                          }}
                          className="px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                        >
                          View
                        </button>
                        
                        {leave.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleApproveLeave(leave.id)}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectLeave(leave.id)}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setDeleteItem({ type: 'leave', id: leave.id });
                              setShowDeleteConfirmModal(true);
                            }}
                            className="px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {getFilteredLeaves().length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📄</div>
                <p className="text-gray-500">No leave requests found</p>
                <p className="text-gray-400 text-sm mt-1">
                  {searchQuery ? 'Try a different search term' : 'All leave requests are processed'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Leave Types and Balances Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Leave Types Configuration */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Leave Types</h3>
              <button
                onClick={() => {
                  setEditingLeaveType(null);
                  setNewLeaveType({ 
                    name: '', 
                    description: '', 
                    maxDays: '', 
                    carryForward: false, 
                    requiresApproval: true,
                    color: '#3B82F6' 
                  });
                  setShowLeaveTypesModal(true);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                + Add Type
              </button>
            </div>
            
            <div className="space-y-4">
              {leaveTypes.map((type) => (
                <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-3"
                        style={{ backgroundColor: type.color }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">{type.maxDays} days</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditLeaveType(type)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteItem({ type: 'leaveType', id: type.id });
                            setShowDeleteConfirmModal(true);
                          }}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      type.carryForward ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {type.carryForward ? '✓ Carry Forward' : '✗ No Carry Forward'}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      type.requiresApproval ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {type.requiresApproval ? '✓ Requires Approval' : '✗ Auto-approve'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Balances Overview */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Leave Balances</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleResetBalances}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  Reset All
                </button>
                <button
                  onClick={() => {
                    setBalanceData({ 
                      employeeId: '', 
                      leaveType: '', 
                      balance: '', 
                      year: new Date().getFullYear() 
                    });
                    setShowBalanceModal(true);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Update Balance
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaveBalances.slice(0, 8).map((balance) => (
                    <tr key={balance.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {balance.employeeName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ 
                              backgroundColor: leaveTypes.find(t => t.id === balance.leaveTypeId)?.color || '#3B82F6' 
                            }}
                          />
                          <span className="text-sm text-gray-700">{balance.leaveType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          balance.balance > 10 ? 'bg-green-100 text-green-800' :
                          balance.balance > 5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {balance.balance} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {balance.used} days
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leaveBalances.length > 8 && (
                <div className="text-center pt-4 border-t">
                  <button
                    onClick={() => setShowBalanceModal(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View all {leaveBalances.length} balance records →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Employee Leave Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Employee Leave Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employees.slice(0, 4).map((employee) => {
              const employeeLeaves = leaves.filter(l => l.employeeId === employee.id);
              const approvedLeaves = employeeLeaves.filter(l => l.status === 'approved');
              const totalDays = approvedLeaves.reduce((sum, leave) => sum + leave.duration, 0);
              
              return (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-600">{employee.department}</div>
                    </div>
                    <div className="text-blue-600">👤</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Leaves:</span>
                      <span className="font-medium">{employeeLeaves.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Approved:</span>
                      <span className="font-medium text-green-600">{approvedLeaves.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Days:</span>
                      <span className="font-medium">{totalDays}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
                rows="2"
                placeholder="Description of the leave type"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Days *
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <select
                  value={newLeaveType.color}
                  onChange={(e) => setNewLeaveType({...newLeaveType, color: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
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
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newLeaveType.requiresApproval}
                  onChange={(e) => setNewLeaveType({...newLeaveType, requiresApproval: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Requires manager approval
                </label>
              </div>
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

        {/* Add Leave Request Modal */}
        <Modal
          show={showAddLeaveModal}
          onClose={closeModal}
          title="Add Leave Request"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={newLeave.employeeId}
                onChange={(e) => setNewLeave({...newLeave, employeeId: e.target.value})}
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
                value={newLeave.leaveType}
                onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.name}>{type.name}</option>
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
                  value={newLeave.startDate}
                  onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={newLeave.endDate}
                  onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason
              </label>
              <textarea
                value={newLeave.reason}
                onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter reason for leave"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  onChange={(e) => setNewLeave({...newLeave, attachment: e.target.files[0]})}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-gray-400 mb-2">📎</div>
                  <div className="text-sm text-gray-600">
                    Click to upload supporting document
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Max file size: 5MB
                  </div>
                </label>
              </div>
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
              onClick={handleAddLeaveRequest}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Leave Request
            </button>
          </div>
        </Modal>

        {/* Manage Leave Balance Modal */}
        <Modal
          show={showBalanceModal}
          onClose={() => {
            setShowBalanceModal(false);
            setBalanceData({ 
              employeeId: '', 
              leaveType: '', 
              balance: '', 
              year: new Date().getFullYear() 
            });
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={balanceData.year}
                  onChange={(e) => setBalanceData({...balanceData, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
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
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-blue-800 mr-2">ℹ️</div>
                <div className="text-sm text-blue-800">
                  Current balance will be replaced with the new value. This operation cannot be undone.
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowBalanceModal(false);
                setBalanceData({ 
                  employeeId: '', 
                  leaveType: '', 
                  balance: '', 
                  year: new Date().getFullYear() 
                });
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

        {/* Leave Details Modal */}
        <Modal
          show={showLeaveDetailsModal}
          onClose={() => {
            setShowLeaveDetailsModal(false);
            setSelectedLeave(null);
          }}
          title="Leave Request Details"
        >
          {selectedLeave && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Employee</div>
                  <div className="font-medium text-gray-900">{selectedLeave.employeeName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Department</div>
                  <div className="font-medium text-gray-900">{selectedLeave.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Leave Type</div>
                  <div className="font-medium text-gray-900">{selectedLeave.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div>
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(selectedLeave.status)}`}>
                      {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-1">Dates</div>
                <div className="font-medium text-gray-900">
                  {selectedLeave.startDate} to {selectedLeave.endDate} ({selectedLeave.duration} days)
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-1">Applied Date</div>
                <div className="font-medium text-gray-900">{selectedLeave.appliedDate}</div>
              </div>
              
              {selectedLeave.approvedBy && (
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-1">Approved By</div>
                  <div className="font-medium text-gray-900">{selectedLeave.approvedBy}</div>
                  <div className="text-sm text-gray-500">{selectedLeave.approvedDate}</div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-1">Reason</div>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedLeave.reason}
                </div>
              </div>
              
              {selectedLeave.comments && (
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-1">Comments</div>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedLeave.comments}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowLeaveDetailsModal(false);
                    setSelectedLeave(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
                {selectedLeave.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveLeave(selectedLeave.id);
                        setShowLeaveDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleRejectLeave(selectedLeave.id);
                        setShowLeaveDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteConfirmModal}
          onClose={() => {
            setShowDeleteConfirmModal(false);
            setDeleteItem({ type: '', id: null });
          }}
          title="Confirm Delete"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-red-600 text-4xl mb-4">⚠️</div>
              <p className="text-gray-900 font-medium">
                Are you sure you want to delete this {deleteItem.type}?
              </p>
              <p className="text-gray-600 text-sm mt-2">
                This action cannot be undone. All associated data will be permanently removed.
              </p>
            </div>
            
            <div className="flex justify-center space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteConfirmModal(false);
                  setDeleteItem({ type: '', id: null });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteItem.type === 'leave') {
                    handleDeleteLeave(deleteItem.id);
                  } else if (deleteItem.type === 'leaveType') {
                    handleDeleteLeaveType(deleteItem.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* Export Data Modal */}
        <Modal
          show={showExportModal}
          onClose={closeModal}
          title="Export Leave Data"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExportFormat('csv')}
                  className={`px-4 py-3 border rounded-lg text-center transition ${
                    exportFormat === 'csv' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl mb-2">📄</div>
                  <div className="font-medium">CSV</div>
                  <div className="text-xs text-gray-500">Excel compatible</div>
                </button>
                <button
                  onClick={() => setExportFormat('pdf')}
                  className={`px-4 py-3 border rounded-lg text-center transition ${
                    exportFormat === 'pdf' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl mb-2">📋</div>
                  <div className="font-medium">PDF</div>
                  <div className="text-xs text-gray-500">Printable format</div>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Range
              </label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Leave Requests', count: leaves.length },
                  { value: 'pending', label: 'Pending Requests', count: leaves.filter(l => l.status === 'pending').length },
                  { value: 'approved', label: 'Approved Requests', count: leaves.filter(l => l.status === 'approved').length },
                  { value: 'rejected', label: 'Rejected Requests', count: leaves.filter(l => l.status === 'rejected').length },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      checked={exportRange === option.value}
                      onChange={(e) => setExportRange(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.count} records</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-yellow-800 mr-2">ℹ️</div>
                <div className="text-sm text-yellow-800">
                  Exported data will include: Employee Name, Department, Leave Type, Dates, Duration, Status, and Reason.
                </div>
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
                onClick={handleExportData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Export Data
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LeaveManagement;