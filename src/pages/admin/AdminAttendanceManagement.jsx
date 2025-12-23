import React, { useState } from 'react';
import { Calendar, Clock, Download, Filter, Search, MapPin, Users, CheckCircle, XCircle, AlertCircle, Edit2, Trash2, Plus, FileText, ChevronDown, X } from 'lucide-react';

// Modal Component
const Modal = ({ show, onClose, title, size = 'md', children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl shadow-2xl ${
        size === 'lg' ? 'max-w-4xl' : size === 'xl' ? 'max-w-6xl' : 'max-w-2xl'
      } w-full my-8`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main Component
const AttendanceManagement = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      department: 'Engineering',
      date: today,
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      hours: '9h',
      notes: '',
      location: 'Office'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      department: 'Marketing',
      date: today,
      checkIn: '09:15',
      checkOut: '18:30',
      status: 'late',
      hours: '9h 15m',
      notes: 'Traffic delay',
      location: 'Office'
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Mike Johnson',
      department: 'Sales',
      date: today,
      checkIn: '09:00',
      checkOut: '13:00',
      status: 'half-day',
      hours: '4h',
      notes: 'Medical appointment',
      location: 'Office'
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: 'Sarah Williams',
      department: 'HR',
      date: today,
      checkIn: null,
      checkOut: null,
      status: 'absent',
      hours: '0h',
      notes: 'Sick leave',
      location: '-'
    },
    {
      id: 5,
      employeeId: 5,
      employeeName: 'David Brown',
      department: 'Finance',
      date: today,
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      hours: '9h',
      notes: '',
      location: 'Remote'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showGeofenceModal, setShowGeofenceModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState('daily');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'present',
    notes: '',
    location: 'Office'
  });

  const [reportSettings, setReportSettings] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    department: '',
    format: 'pdf'
  });

  const [geofenceSettings, setGeofenceSettings] = useState({
    enabled: false,
    latitude: '25.5941',
    longitude: '85.1376',
    radius: 100,
    locationName: 'Office Headquarters'
  });

  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    { id: 3, name: 'Mike Johnson', department: 'Sales' },
    { id: 4, name: 'Sarah Williams', department: 'HR' },
    { id: 5, name: 'David Brown', department: 'Finance' }
  ];

  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  const handleManualEntry = () => {
    setEditingRecord(null);
    setFormData({
      employeeId: '',
      employeeName: '',
      date: selectedDate,
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      notes: '',
      location: 'Office'
    });
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      employeeId: record.employeeId,
      employeeName: record.employeeName,
      date: record.date,
      checkIn: record.checkIn || '',
      checkOut: record.checkOut || '',
      status: record.status,
      notes: record.notes,
      location: record.location || 'Office'
    });
    setShowModal(true);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    
    const selectedEmployee = employees.find(emp => emp.id === parseInt(formData.employeeId));
    
    if (editingRecord) {
      setAttendance(attendance.map(record =>
        record.id === editingRecord.id
          ? {
              ...record,
              ...formData,
              employeeName: selectedEmployee?.name || record.employeeName,
              department: selectedEmployee?.department || record.department,
              hours: calculateHours(formData.checkIn, formData.checkOut)
            }
          : record
      ));
    } else {
      const newRecord = {
        id: Math.max(...attendance.map(a => a.id), 0) + 1,
        employeeId: parseInt(formData.employeeId),
        employeeName: selectedEmployee?.name || '',
        department: selectedEmployee?.department || '',
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        status: formData.status,
        hours: calculateHours(formData.checkIn, formData.checkOut),
        notes: formData.notes,
        location: formData.location
      };
      setAttendance([...attendance, newRecord]);
    }
    
    setShowModal(false);
    setEditingRecord(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setAttendance(attendance.map(record =>
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  const handleDelete = (record) => {
    if (window.confirm(`Delete attendance record for ${record.employeeName}?`)) {
      setAttendance(attendance.filter(a => a.id !== record.id));
    }
  };

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '0h';
    
    const [inH, inM] = checkIn.split(':').map(Number);
    const [outH, outM] = checkOut.split(':').map(Number);
    
    const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  const handleGenerateReport = () => {
    const filteredData = attendance.filter(record => {
      const recordDate = new Date(record.date);
      const start = new Date(reportSettings.startDate);
      const end = new Date(reportSettings.endDate);
      const inDateRange = recordDate >= start && recordDate <= end;
      const matchesDept = !reportSettings.department || record.department === reportSettings.department;
      return inDateRange && matchesDept;
    });

    // Generate CSV
    const headers = ['Employee', 'Department', 'Date', 'Check In', 'Check Out', 'Status', 'Hours', 'Location', 'Notes'];
    const rows = filteredData.map(record => [
      record.employeeName,
      record.department,
      record.date,
      record.checkIn || '-',
      record.checkOut || '-',
      record.status,
      record.hours,
      record.location,
      record.notes || '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_report_${reportSettings.startDate}_to_${reportSettings.endDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setShowReportModal(false);
  };

  const handleSaveGeofence = () => {
    setShowGeofenceModal(false);
    alert('Geofence settings saved successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'half-day': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'leave': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle size={16} className="text-green-600" />;
      case 'absent': return <XCircle size={16} className="text-red-600" />;
      case 'late': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'half-day': return <Clock size={16} className="text-blue-600" />;
      case 'leave': return <Calendar size={16} className="text-purple-600" />;
      default: return null;
    }
  };

  const filteredAttendance = attendance.filter(record => {
    // Date filter
    let dateMatch = false;
    if (viewMode === 'daily') {
      dateMatch = record.date === selectedDate;
    } else {
      dateMatch = record.date.startsWith(selectedDate.substring(0, 7));
    }

    // Search filter
    const matchesSearch = !searchTerm || 
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location?.toLowerCase().includes(searchTerm.toLowerCase());

    // Department filter
    const matchesDepartment = !filterDepartment || record.department === filterDepartment;

    // Status filter
    const matchesStatus = !filterStatus || record.status === filterStatus;

    return dateMatch && matchesSearch && matchesDepartment && matchesStatus;
  });

  const renderMonthlyView = () => {
    const [year, month] = selectedDate.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const currentDate = new Date().toISOString().split('T')[0];
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-700 py-3 text-xs sm:text-sm">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-16 sm:h-20"></div>
          ))}
          
          {days.map(day => {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayRecords = attendance.filter(a => a.date === dateStr);
            const presentCount = dayRecords.filter(a => a.status === 'present' || a.status === 'late').length;
            const absentCount = dayRecords.filter(a => a.status === 'absent').length;
            const leaveCount = dayRecords.filter(a => a.status === 'leave' || a.status === 'half-day').length;
            const isToday = dateStr === currentDate;
            const isSelected = dateStr === selectedDate;
            
            return (
              <div
                key={day}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setViewMode('daily');
                }}
                className={`h-16 sm:h-20 border-2 rounded-lg p-1.5 sm:p-2 cursor-pointer transition-all ${
                  isToday 
                    ? 'border-blue-500 bg-blue-50' 
                    : isSelected
                    ? 'border-blue-400 bg-blue-50'
                    : dayRecords.length > 0
                    ? 'border-gray-300 bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-white'
                    : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className={`text-xs sm:text-sm font-semibold mb-1 ${
                  isToday ? 'text-blue-700' : 'text-gray-900'
                }`}>
                  {day}
                </div>
                {dayRecords.length > 0 && (
                  <div className="space-y-0.5">
                    {presentCount > 0 && (
                      <div className="flex items-center gap-0.5 text-[10px] sm:text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-semibold">{presentCount}</span>
                      </div>
                    )}
                    {absentCount > 0 && (
                      <div className="flex items-center gap-0.5 text-[10px] sm:text-xs">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-red-700 font-semibold">{absentCount}</span>
                      </div>
                    )}
                    {leaveCount > 0 && (
                      <div className="flex items-center gap-0.5 text-[10px] sm:text-xs">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span className="text-purple-700 font-semibold">{leaveCount}</span>
                      </div>
                    )}
                  </div>
                )}
                {isToday && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Leave/Half-day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 bg-blue-50 rounded"></div>
            <span className="text-gray-700">Today</span>
          </div>
        </div>
      </div>
    );
  };

  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length,
    halfDay: attendance.filter(a => a.status === 'half-day').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-blue-600" size={32} />
                Attendance Management
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage employee attendance</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleManualEntry}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Manual Entry</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button 
                onClick={() => setShowReportModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FileText size={18} />
                <span className="hidden sm:inline">Report</span>
              </button>
              <button 
                onClick={() => setShowGeofenceModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MapPin size={18} />
                <span className="hidden sm:inline">Geofence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm text-gray-600">Total</div>
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm text-gray-600">Present</div>
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.present}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm text-gray-600">Absent</div>
              <XCircle size={20} className="text-red-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.absent}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm text-gray-600">Late</div>
              <AlertCircle size={20} className="text-yellow-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.late}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs sm:text-sm text-gray-600">Half Day</div>
              <Clock size={20} className="text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.halfDay}</div>
          </div>
        </div>

        {/* View Mode Toggle & Date Selector */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* View Mode Buttons */}
              <div className="flex gap-2 flex-1">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    viewMode === 'daily' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Daily View
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    viewMode === 'monthly' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly View
                </button>
              </div>
              
              {/* Date Input & Filter Button */}
              <div className="flex gap-2">
                <input
                  type={viewMode === 'daily' ? 'date' : 'month'}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter size={18} />
                  <ChevronDown size={18} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search employee, dept..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">All Status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="half-day">Half Day</option>
                      <option value="leave">Leave</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Attendance Table - Desktop */}
        {viewMode === 'daily' ? (
          <>
            <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Employee</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Check In</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Check Out</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Hours</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAttendance.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                          No attendance records found
                        </td>
                      </tr>
                    ) : (
                      filteredAttendance.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{record.employeeName}</div>
                            {record.notes && (
                              <div className="text-xs text-gray-500 mt-1">{record.notes}</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {record.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-gray-400" />
                              {record.checkIn || '--:--'}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-gray-400" />
                              {record.checkOut || '--:--'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={record.status}
                              onChange={(e) => handleStatusChange(record.id, e.target.value)}
                              className={`px-3 py-1.5 text-xs rounded-full border font-medium cursor-pointer ${getStatusColor(record.status)}`}
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="late">Late</option>
                              <option value="half-day">Half Day</option>
                              <option value="leave">Leave</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {record.hours}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-400" />
                              {record.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(record)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(record)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
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

            {/* Attendance Cards - Mobile & Tablet */}
            <div className="lg:hidden space-y-4">
              {filteredAttendance.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
                  No attendance records found
                </div>
              ) : (
                filteredAttendance.map((record) => (
                  <div key={record.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">{record.employeeName}</h3>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {record.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <select
                          value={record.status}
                          onChange={(e) => handleStatusChange(record.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded-full border font-medium ${getStatusColor(record.status)}`}
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="half-day">Half Day</option>
                          <option value="leave">Leave</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Check In</div>
                          <div className="font-medium">{record.checkIn || '--:--'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Check Out</div>
                          <div className="font-medium">{record.checkOut || '--:--'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Hours</div>
                          <div className="font-medium">{record.hours}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-medium">{record.location}</div>
                        </div>
                      </div>
                    </div>

                    {record.notes && (
                      <div className="mb-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                        <span className="font-medium">Note:</span> {record.notes}
                      </div>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(record)}
                        className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record)}
                        className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          renderMonthlyView()
        )}

        {/* Manual Entry Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)} title={editingRecord ? "Edit Attendance" : "Manual Attendance Entry"}>
          <form onSubmit={handleSaveAttendance}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
                  <select
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check In Time</label>
                  <input
                    type="time"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out Time</label>
                  <input
                    type="time"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="half-day">Half Day</option>
                    <option value="leave">Leave</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Office, Remote, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Optional notes..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingRecord ? 'Update' : 'Save'} Attendance
                </button>
              </div>
            </div>
          </form>
        </Modal>

        {/* Report Generation Modal */}
        <Modal show={showReportModal} onClose={() => setShowReportModal(false)} title="Generate Attendance Report">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <FileText size={20} />
                Report Settings
              </h4>
              <p className="text-sm text-blue-800">Configure your attendance report parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={reportSettings.startDate}
                  onChange={(e) => setReportSettings({...reportSettings, startDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={reportSettings.endDate}
                  onChange={(e) => setReportSettings({...reportSettings, endDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={reportSettings.department}
                  onChange={(e) => setReportSettings({...reportSettings, department: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={reportSettings.format}
                  onChange={(e) => setReportSettings({...reportSettings, format: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF (Coming Soon)</option>
                  <option value="excel">Excel (Coming Soon)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Generate Report
              </button>
            </div>
          </div>
        </Modal>

        {/* Geofence Settings Modal */}
        <Modal show={showGeofenceModal} onClose={() => setShowGeofenceModal(false)} title="Geofence Settings">
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <MapPin size={20} />
                Location-Based Attendance
              </h4>
              <p className="text-sm text-purple-800">Restrict attendance marking to specific geographic locations</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Enable Geofence Tracking</h4>
                <p className="text-sm text-gray-600 mt-1">Require employees to be within specified radius</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={geofenceSettings.enabled}
                  onChange={(e) => setGeofenceSettings({...geofenceSettings, enabled: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {geofenceSettings.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                  <input
                    type="text"
                    value={geofenceSettings.locationName}
                    onChange={(e) => setGeofenceSettings({...geofenceSettings, locationName: e.target.value})}
                    placeholder="e.g., Office Headquarters"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={geofenceSettings.latitude}
                      onChange={(e) => setGeofenceSettings({...geofenceSettings, latitude: e.target.value})}
                      placeholder="25.5941"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={geofenceSettings.longitude}
                      onChange={(e) => setGeofenceSettings({...geofenceSettings, longitude: e.target.value})}
                      placeholder="85.1376"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Radius (meters)</label>
                  <input
                    type="number"
                    value={geofenceSettings.radius}
                    onChange={(e) => setGeofenceSettings({...geofenceSettings, radius: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Employees must be within this radius to mark attendance</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Current Settings:</strong> {geofenceSettings.locationName} at ({geofenceSettings.latitude}, {geofenceSettings.longitude}) with {geofenceSettings.radius}m radius
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowGeofenceModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGeofence}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Save Settings
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AttendanceManagement;