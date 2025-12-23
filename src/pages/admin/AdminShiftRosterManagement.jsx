// components/ShiftRosterManagement.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';

const AdminShiftRosterManagement = () => {
    const [loading, setLoading] = useState(false);
  // Static data for shifts
  const staticShifts = [
    { 
      id: 1, 
      name: 'Morning Shift', 
      startTime: '09:00', 
      endTime: '18:00', 
      breakTime: '01:00', 
      color: '#3B82F6',
      totalHours: 8,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Evening Shift', 
      startTime: '14:00', 
      endTime: '23:00', 
      breakTime: '01:00', 
      color: '#10B981',
      totalHours: 8,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Night Shift', 
      startTime: '22:00', 
      endTime: '06:00', 
      breakTime: '00:30', 
      color: '#8B5CF6',
      totalHours: 7.5,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Weekend Shift', 
      startTime: '10:00', 
      endTime: '18:00', 
      breakTime: '00:30', 
      color: '#F59E0B',
      totalHours: 7.5,
      status: 'inactive'
    }
  ];

  // Static data for employees
  const staticEmployees = [
    { id: 1, name: 'John Doe', department: 'Engineering', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', department: 'Sales', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Williams', department: 'HR', email: 'sarah@example.com' },
    { id: 5, name: 'David Brown', department: 'Finance', email: 'david@example.com' },
    { id: 6, name: 'Lisa Anderson', department: 'Engineering', email: 'lisa@example.com' }
  ];

  // Static data for rosters
  const staticRosters = [
    { id: 1, employeeId: 1, shiftId: 1, date: '2024-12-09', status: 'scheduled' },
    { id: 2, employeeId: 2, shiftId: 2, date: '2024-12-09', status: 'scheduled' },
    { id: 3, employeeId: 3, shiftId: 1, date: '2024-12-09', status: 'completed' },
    { id: 4, employeeId: 4, shiftId: 3, date: '2024-12-09', status: 'cancelled' },
    { id: 5, employeeId: 5, shiftId: 1, date: '2024-12-10', status: 'scheduled' },
    { id: 6, employeeId: 6, shiftId: 2, date: '2024-12-10', status: 'scheduled' }
  ];

  // Static data for overtime
  const staticOvertime = [
    { 
      id: 1, 
      employeeId: 1, 
      date: '2024-11-30', 
      hours: 3, 
      rate: 1.5, 
      status: 'approved',
      reason: 'Project deadline'
    },
    { 
      id: 2, 
      employeeId: 2, 
      date: '2024-12-01', 
      hours: 2, 
      rate: 1.5, 
      status: 'pending',
      reason: 'Client meeting'
    },
    { 
      id: 3, 
      employeeId: 3, 
      date: '2024-12-02', 
      hours: 4, 
      rate: 2.0, 
      status: 'rejected',
      reason: 'Emergency support'
    }
  ];

  // State management
  const [shifts, setShifts] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [overtimeRecords, setOvertimeRecords] = useState([]);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showRosterModal, setShowRosterModal] = useState(false);
  const [showOvertimeModal, setShowOvertimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'weekly'
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterShift, setFilterShift] = useState('');
  const [editingShift, setEditingShift] = useState(null);
  const [editingRoster, setEditingRoster] = useState(null);

  // Form states
  const [shiftForm, setShiftForm] = useState({
    name: '',
    startTime: '09:00',
    endTime: '18:00',
    breakTime: '01:00',
    color: '#3B82F6',
    status: 'active'
  });

  const [rosterForm, setRosterForm] = useState({
    employeeId: '',
    shiftId: '',
    date: '',
    status: 'scheduled',
    notes: ''
  });

  const [overtimeForm, setOvertimeForm] = useState({
    employeeId: '',
    date: '',
    hours: '',
    rate: 1.5,
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD Operations
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setShifts(staticShifts);
      setRosters(staticRosters);
      setOvertimeRecords(staticOvertime);
      setLoading(false);
    }, 500);
  };

  // SHIFT CRUD
  const handleCreateShift = () => {
    if (!shiftForm.name.trim()) {
      alert('Please enter shift name');
      return;
    }

    if (editingShift) {
      // Update existing shift
      setShifts(shifts.map(shift =>
        shift.id === editingShift.id
          ? { ...shift, ...shiftForm, totalHours: calculateShiftHours(shiftForm) }
          : shift
      ));
    } else {
      // Create new shift
      const newShift = {
        id: Math.max(...shifts.map(s => s.id), 0) + 1,
        ...shiftForm,
        totalHours: calculateShiftHours(shiftForm)
      };
      setShifts([...shifts, newShift]);
    }
    
    setShiftForm({
      name: '',
      startTime: '09:00',
      endTime: '18:00',
      breakTime: '01:00',
      color: '#3B82F6',
      status: 'active'
    });
    setEditingShift(null);
    setShowShiftModal(false);
  };

  const handleEditShift = (shift) => {
    setEditingShift(shift);
    setShiftForm({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      breakTime: shift.breakTime,
      color: shift.color,
      status: shift.status
    });
    setShowShiftModal(true);
  };

  const handleDeleteShift = (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      // Check if shift is used in any roster
      const shiftInUse = rosters.some(roster => roster.shiftId === id);
      if (shiftInUse) {
        alert('Cannot delete shift that is assigned to employees!');
        return;
      }
      setShifts(shifts.filter(shift => shift.id !== id));
    }
  };

  // ROSTER CRUD
  const handleCreateRoster = () => {
    if (!rosterForm.employeeId || !rosterForm.shiftId || !rosterForm.date) {
      alert('Please fill all required fields');
      return;
    }

    const selectedEmployee = staticEmployees.find(emp => emp.id === parseInt(rosterForm.employeeId));
    const selectedShift = shifts.find(shift => shift.id === parseInt(rosterForm.shiftId));

    if (!selectedEmployee || !selectedShift) {
      alert('Invalid employee or shift selection');
      return;
    }

    if (editingRoster) {
      // Update existing roster
      setRosters(rosters.map(roster =>
        roster.id === editingRoster.id
          ? { 
              ...roster, 
              ...rosterForm,
              employeeId: parseInt(rosterForm.employeeId),
              shiftId: parseInt(rosterForm.shiftId)
            }
          : roster
      ));
    } else {
      // Create new roster
      // Check for duplicate assignment
      const existingRoster = rosters.find(r => 
        r.employeeId === parseInt(rosterForm.employeeId) && 
        r.date === rosterForm.date
      );
      
      if (existingRoster) {
        alert('Employee already has a shift assigned for this date!');
        return;
      }

      const newRoster = {
        id: Math.max(...rosters.map(r => r.id), 0) + 1,
        employeeId: parseInt(rosterForm.employeeId),
        shiftId: parseInt(rosterForm.shiftId),
        date: rosterForm.date,
        status: rosterForm.status,
        notes: rosterForm.notes
      };
      setRosters([...rosters, newRoster]);
    }
    
    setRosterForm({
      employeeId: '',
      shiftId: '',
      date: '',
      status: 'scheduled',
      notes: ''
    });
    setEditingRoster(null);
    setShowRosterModal(false);
  };

  const handleEditRoster = (roster) => {
    setEditingRoster(roster);
    setRosterForm({
      employeeId: roster.employeeId.toString(),
      shiftId: roster.shiftId.toString(),
      date: roster.date,
      status: roster.status,
      notes: roster.notes || ''
    });
    setShowRosterModal(true);
  };

  const handleDeleteRoster = (id) => {
    if (window.confirm('Are you sure you want to delete this roster assignment?')) {
      setRosters(rosters.filter(roster => roster.id !== id));
    }
  };

  // OVERTIME CRUD
  const handleCreateOvertime = () => {
    if (!overtimeForm.employeeId || !overtimeForm.date || !overtimeForm.hours) {
      alert('Please fill all required fields');
      return;
    }

    const newOvertime = {
      id: Math.max(...overtimeRecords.map(o => o.id), 0) + 1,
      employeeId: parseInt(overtimeForm.employeeId),
      date: overtimeForm.date,
      hours: parseFloat(overtimeForm.hours),
      rate: parseFloat(overtimeForm.rate),
      status: 'pending',
      reason: overtimeForm.reason
    };
    
    setOvertimeRecords([...overtimeRecords, newOvertime]);
    setOvertimeForm({
      employeeId: '',
      date: '',
      hours: '',
      rate: 1.5,
      reason: ''
    });
    setShowOvertimeModal(false);
  };

  const handleApproveOvertime = (id) => {
    setOvertimeRecords(overtimeRecords.map(record =>
      record.id === id ? { ...record, status: 'approved' } : record
    ));
  };

  const handleRejectOvertime = (id) => {
    setOvertimeRecords(overtimeRecords.map(record =>
      record.id === id ? { ...record, status: 'rejected' } : record
    ));
  };

  const handleDeleteOvertime = (id) => {
    if (window.confirm('Are you sure you want to delete this overtime record?')) {
      setOvertimeRecords(overtimeRecords.filter(record => record.id !== id));
    }
  };

  // Helper functions
  const calculateShiftHours = (shift) => {
    const [startHour, startMin] = shift.startTime.split(':').map(Number);
    const [endHour, endMin] = shift.endTime.split(':').map(Number);
    const [breakHour, breakMin] = shift.breakTime.split(':').map(Number);
    
    let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    totalMinutes -= (breakHour * 60 + breakMin);
    
    return totalMinutes / 60;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get employee name by ID
  const getEmployeeName = (employeeId) => {
    const employee = staticEmployees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const getShiftName = (shiftId) => {
    const shift = shifts.find(s => s.id === shiftId);
    return shift ? shift.name : 'Unknown';
  };

  const getShiftColor = (shiftId) => {
    const shift = shifts.find(s => s.id === shiftId);
    return shift ? shift.color : '#6B7280';
  };

  // Filter rosters based on selected criteria
  const filteredRosters = rosters.filter(roster => {
    if (viewMode === 'daily' && roster.date !== selectedDate) return false;
    if (filterDepartment) {
      const employee = staticEmployees.find(emp => emp.id === roster.employeeId);
      if (!employee || employee.department !== filterDepartment) return false;
    }
    if (filterShift && roster.shiftId !== parseInt(filterShift)) return false;
    return true;
  });

  // Generate weekly calendar view
  const renderCalendarView = () => {
    const startDate = new Date(selectedDate);
    const dayOfWeek = startDate.getDay();
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - dayOfWeek);
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date.toISOString().split('T')[0];
    });

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Weekly Roster Calendar</h3>
          <div className="flex space-x-2">
            <input
              type="week"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                {weekDays.map(day => (
                  <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <div className="text-center">
                      <div className="font-medium">{new Date(day).toLocaleDateString('en', { weekday: 'short' })}</div>
                      <div className="text-xs text-gray-500">{new Date(day).getDate()}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staticEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <div>
                      <div className="text-gray-900">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.department}</div>
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const roster = rosters.find(r => 
                      r.employeeId === employee.id && r.date === day
                    );
                    return (
                      <td key={day} className="px-6 py-4">
                        {roster ? (
                          <div className="flex flex-col items-center">
                            <div 
                              className={`px-3 py-2 rounded-lg text-sm w-full text-center cursor-pointer hover:opacity-90`}
                              style={{ 
                                backgroundColor: getShiftColor(roster.shiftId) + '20',
                                color: getShiftColor(roster.shiftId),
                                border: `2px solid ${getShiftColor(roster.shiftId)}`
                              }}
                              onClick={() => handleEditRoster(roster)}
                            >
                              <div className="font-medium">{getShiftName(roster.shiftId)}</div>
                              <div className="text-xs opacity-75">{roster.status}</div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setRosterForm({
                                employeeId: employee.id.toString(),
                                shiftId: '',
                                date: day,
                                status: 'scheduled',
                                notes: ''
                              });
                              setShowRosterModal(true);
                            }}
                            className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-400"
                          >
                            + Assign
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Statistics
  const stats = {
    totalShifts: shifts.length,
    activeShifts: shifts.filter(s => s.status === 'active').length,
    totalAssigned: rosters.filter(r => r.date === selectedDate).length,
    pendingOvertime: overtimeRecords.filter(o => o.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Shift & Roster Management</h2>
            <p className="text-gray-600">Manage work shifts and employee schedules</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowOvertimeModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ⏰ Log Overtime
            </button>
            <button
              onClick={() => setShowRosterModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              📅 Assign Roster
            </button>
            <button
              onClick={() => {
                setEditingShift(null);
                setShiftForm({
                  name: '',
                  startTime: '09:00',
                  endTime: '18:00',
                  breakTime: '01:00',
                  color: '#3B82F6',
                  status: 'active'
                });
                setShowShiftModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🕐 Create Shift
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Shifts</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalShifts}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Active Shifts</div>
            <div className="text-2xl font-bold text-green-600">{stats.activeShifts}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Today's Assignments</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalAssigned}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Pending Overtime</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingOvertime}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'daily' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Daily View
              </button>
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'weekly' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly View
              </button>
            </div>
            
            <div className="flex space-x-4">
              {viewMode === 'daily' && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              )}
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Shifts</option>
                {shifts.map(shift => (
                  <option key={shift.id} value={shift.id}>{shift.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Shifts Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Shift List</h3>
              <div className="space-y-4">
                {shifts.map(shift => (
                  <div key={shift.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: shift.color }}
                      ></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{shift.name}</h4>
                        <div className="text-sm text-gray-600">
                          <span>{shift.startTime} - {shift.endTime}</span>
                          <span className="mx-2">•</span>
                          <span>{shift.breakTime} break</span>
                          <span className="mx-2">•</span>
                          <span>{shift.totalHours}h total</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </span>
                      <button
                        onClick={() => handleEditShift(shift)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteShift(shift.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Roster Table */}
            {viewMode === 'daily' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Daily Roster - {new Date(selectedDate).toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timing</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredRosters.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            No roster assignments for this date
                          </td>
                        </tr>
                      ) : (
                        filteredRosters.map(roster => {
                          const shift = shifts.find(s => s.id === roster.shiftId);
                          const employee = staticEmployees.find(emp => emp.id === roster.employeeId);
                          
                          return (
                            <tr key={roster.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{employee?.name || 'Unknown'}</div>
                                <div className="text-sm text-gray-500">{employee?.department || '-'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: shift?.color || '#6B7280' }}
                                  ></div>
                                  <span className="font-medium">{shift?.name || 'Unknown'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {shift ? (
                                  <div className="text-gray-600">
                                    {shift.startTime} - {shift.endTime}
                                    <div className="text-sm text-gray-500">{shift.breakTime} break</div>
                                  </div>
                                ) : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(roster.status)}`}>
                                  {roster.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditRoster(roster)}
                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRoster(roster.id)}
                                    className="text-red-600 hover:text-red-700 text-sm"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Overtime Section */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Overtime Requests</h3>
              </div>
              <div className="space-y-4">
                {overtimeRecords.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No overtime requests
                  </div>
                ) : (
                  overtimeRecords.map(record => {
                    const employee = staticEmployees.find(emp => emp.id === record.employeeId);
                    return (
                      <div key={record.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{employee?.name || 'Unknown'}</h4>
                            <p className="text-sm text-gray-600">{record.date}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-700">{record.reason}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">
                              {record.hours} hours × {record.rate}x
                              <span className="ml-2 text-gray-600">
                                = ₹{Math.round(record.hours * record.rate * 500).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {record.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveOvertime(record.id)}
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectOvertime(record.id)}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteOvertime(record.id)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Calendar View */}
        {viewMode === 'weekly' && renderCalendarView()}

        {/* Create/Edit Shift Modal */}
        <Modal
          show={showShiftModal}
          onClose={() => {
            setShowShiftModal(false);
            setEditingShift(null);
          }}
          title={editingShift ? "Edit Shift" : "Create New Shift"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift Name *
              </label>
              <input
                type="text"
                value={shiftForm.name}
                onChange={(e) => setShiftForm({...shiftForm, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Morning Shift"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={shiftForm.startTime}
                  onChange={(e) => setShiftForm({...shiftForm, startTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={shiftForm.endTime}
                  onChange={(e) => setShiftForm({...shiftForm, endTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Break Duration
              </label>
              <select
                value={shiftForm.breakTime}
                onChange={(e) => setShiftForm({...shiftForm, breakTime: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="00:00">No break</option>
                <option value="00:15">15 minutes</option>
                <option value="00:30">30 minutes</option>
                <option value="00:45">45 minutes</option>
                <option value="01:00">1 hour</option>
                <option value="01:30">1.5 hours</option>
                <option value="02:00">2 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color *
              </label>
              <div className="flex space-x-2 mb-2">
                {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280'].map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setShiftForm({...shiftForm, color})}
                    className={`w-8 h-8 rounded-full border-2 ${shiftForm.color === color ? 'border-gray-900' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={shiftForm.color}
                onChange={(e) => setShiftForm({...shiftForm, color: e.target.value})}
                className="w-full h-10 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={shiftForm.status}
                onChange={(e) => setShiftForm({...shiftForm, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setShowShiftModal(false);
                setEditingShift(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateShift}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingShift ? 'Update' : 'Create'} Shift
            </button>
          </div>
        </Modal>

        {/* Create/Edit Roster Modal */}
        <Modal
          show={showRosterModal}
          onClose={() => {
            setShowRosterModal(false);
            setEditingRoster(null);
          }}
          title={editingRoster ? "Edit Roster Assignment" : "Assign Employee to Roster"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={rosterForm.employeeId}
                onChange={(e) => setRosterForm({...rosterForm, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Employee</option>
                {staticEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift *
              </label>
              <select
                value={rosterForm.shiftId}
                onChange={(e) => setRosterForm({...rosterForm, shiftId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Shift</option>
                {shifts.filter(s => s.status === 'active').map(shift => (
                  <option key={shift.id} value={shift.id}>
                    {shift.name} ({shift.startTime} - {shift.endTime})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={rosterForm.date}
                onChange={(e) => setRosterForm({...rosterForm, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={rosterForm.status}
                onChange={(e) => setRosterForm({...rosterForm, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={rosterForm.notes}
                onChange={(e) => setRosterForm({...rosterForm, notes: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Additional notes or instructions"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setShowRosterModal(false);
                setEditingRoster(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRoster}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingRoster ? 'Update' : 'Assign'} Roster
            </button>
          </div>
        </Modal>

        {/* Create Overtime Modal */}
        <Modal
          show={showOvertimeModal}
          onClose={() => setShowOvertimeModal(false)}
          title="Log Overtime"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={overtimeForm.employeeId}
                onChange={(e) => setOvertimeForm({...overtimeForm, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Employee</option>
                {staticEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={overtimeForm.date}
                onChange={(e) => setOvertimeForm({...overtimeForm, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours *
                </label>
                <input
                  type="number"
                  value={overtimeForm.hours}
                  onChange={(e) => setOvertimeForm({...overtimeForm, hours: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  min="0.5"
                  step="0.5"
                  placeholder="0.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Multiplier
                </label>
                <select
                  value={overtimeForm.rate}
                  onChange={(e) => setOvertimeForm({...overtimeForm, rate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="1.0">1.0x (Regular)</option>
                  <option value="1.5">1.5x (Standard Overtime)</option>
                  <option value="2.0">2.0x (Holiday/Weekend)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason *
              </label>
              <textarea
                value={overtimeForm.reason}
                onChange={(e) => setOvertimeForm({...overtimeForm, reason: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Reason for overtime work"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowOvertimeModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateOvertime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Overtime
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminShiftRosterManagement;