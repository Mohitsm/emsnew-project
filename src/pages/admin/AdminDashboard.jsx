import React, { useState } from 'react';

const AdminDashboard = () => {
  const [stats] = useState({
    totalEmployees: 150,
    presentToday: 142,
    absentToday: 5,
    lateToday: 3,
    onLeaveToday: 8,
    totalSalary: '45,00,000',
    taxDeductions: '6,75,000',
    netPayable: '38,25,000'
  });

  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: 'Rajesh Kumar', department: 'Engineering', status: 'present', time: '09:15 AM' },
    { id: 2, name: 'Priya Sharma', department: 'Marketing', status: 'present', time: '09:00 AM' },
    { id: 3, name: 'Amit Patel', department: 'Sales', status: 'late', time: '10:30 AM' },
    { id: 4, name: 'Sneha Reddy', department: 'HR', status: 'present', time: '08:55 AM' },
    { id: 5, name: 'Vikram Singh', department: 'Finance', status: 'absent', time: '-' }
  ]);

  const [pendingLeaves, setPendingLeaves] = useState([
    {
      id: 1,
      employeeName: 'Arjun Mehta',
      type: 'Sick Leave',
      duration: 2,
      startDate: '2024-12-10',
      endDate: '2024-12-11',
      reason: 'Medical checkup',
      status: 'pending'
    },
    {
      id: 2,
      employeeName: 'Kavita Iyer',
      type: 'Casual Leave',
      duration: 3,
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      reason: 'Family function',
      status: 'pending'
    },
    {
      id: 3,
      employeeName: 'Rahul Gupta',
      type: 'Annual Leave',
      duration: 5,
      startDate: '2024-12-20',
      endDate: '2024-12-24',
      reason: 'Vacation',
      status: 'pending'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Holiday Notice',
      message: 'Office will be closed on December 25th for Christmas',
      date: '2024-12-08',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Team Meeting',
      message: 'All hands meeting scheduled for Friday at 3 PM',
      date: '2024-12-09',
      priority: 'medium'
    }
  ]);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleApproveLeave = (leaveId) => {
    setPendingLeaves(pendingLeaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'approved' } : leave
    ).filter(leave => leave.status === 'pending'));
    alert('Leave request approved successfully!');
  };

  const handleRejectLeave = (leaveId) => {
    if (window.confirm('Are you sure you want to reject this leave request?')) {
      setPendingLeaves(pendingLeaves.map(leave => 
        leave.id === leaveId ? { ...leave, status: 'rejected' } : leave
      ).filter(leave => leave.status === 'pending'));
      alert('Leave request rejected');
    }
  };

  const handleViewLeaveDetails = (leave) => {
    setSelectedLeave(leave);
    setShowLeaveModal(true);
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const statsCards = [
    { 
      title: 'Total Employees', 
      value: stats.totalEmployees, 
      icon: '👥', 
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Present Today', 
      value: stats.presentToday, 
      icon: '✅', 
      color: 'from-green-500 to-emerald-500',
      change: '95%',
      trend: 'up'
    },
    { 
      title: 'Absent Today', 
      value: stats.absentToday, 
      icon: '❌', 
      color: 'from-red-500 to-rose-500',
      change: '3%',
      trend: 'down'
    },
    { 
      title: 'Pending Leaves', 
      value: pendingLeaves.length, 
      icon: '🏖️', 
      color: 'from-amber-500 to-orange-500',
      change: `${pendingLeaves.length}`,
      trend: 'neutral'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Overview of your HR management system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Today's Attendance Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Today's Attendance</h3>
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Present</span>
                </div>
                <span className="font-semibold">{stats.presentToday} employees</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Absent</span>
                </div>
                <span className="font-semibold">{stats.absentToday} employees</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Late</span>
                </div>
                <span className="font-semibold">{stats.lateToday} employees</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">On Leave</span>
                </div>
                <span className="font-semibold">{stats.onLeaveToday} employees</span>
              </div>
            </div>

            {/* Recent Attendance List */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Check-ins</h4>
              <div className="space-y-2">
                {attendanceList.slice(0, 3).map(emp => (
                  <div key={emp.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs">👤</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{emp.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Leave Requests */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Pending Leave Requests</h3>
              <span className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700">View All</span>
            </div>
            
            <div className="space-y-4">
              {pendingLeaves.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl block mb-2">✓</span>
                  <p>No pending leave requests</p>
                </div>
              ) : (
                pendingLeaves.map((leave) => (
                  <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{leave.employeeName}</h4>
                        <p className="text-sm text-gray-600">{leave.type} - {leave.duration} days</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {leave.startDate} to {leave.endDate}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleViewLeaveDetails(leave)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Details
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApproveLeave(leave.id)}
                        className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        ✓ Approve
                      </button>
                      <button 
                        onClick={() => handleRejectLeave(leave.id)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Payroll Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Payroll Summary</h3>
            <span className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700">View Details</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">₹{stats.totalSalary}</div>
              <div className="text-sm text-gray-600">Total Monthly Salary</div>
              <div className="mt-3 text-xs text-gray-500">For {stats.totalEmployees} employees</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">₹{stats.taxDeductions}</div>
              <div className="text-sm text-gray-600">Tax Deductions</div>
              <div className="mt-3 text-xs text-gray-500">15% average rate</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">₹{stats.netPayable}</div>
              <div className="text-sm text-gray-600">Net Payable</div>
              <div className="mt-3 text-xs text-gray-500">After all deductions</div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Announcements</h3>
            <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + New Announcement
            </button>
          </div>
          
          <div className="space-y-3">
            {announcements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No announcements</p>
              </div>
            ) : (
              announcements.map(announcement => (
                <div key={announcement.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                    <p className="text-xs text-gray-500">{announcement.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-red-600 hover:text-red-700 text-sm ml-4"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Leave Details Modal */}
        {showLeaveModal && selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave Request Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Employee Name</label>
                  <p className="text-gray-900">{selectedLeave.employeeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Leave Type</label>
                  <p className="text-gray-900">{selectedLeave.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <p className="text-gray-900">{selectedLeave.duration} days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Period</label>
                  <p className="text-gray-900">{selectedLeave.startDate} to {selectedLeave.endDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Reason</label>
                  <p className="text-gray-900">{selectedLeave.reason}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApproveLeave(selectedLeave.id);
                    setShowLeaveModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleRejectLeave(selectedLeave.id);
                    setShowLeaveModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;