import React, { useState } from 'react';

// Modal Component
const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Main Component
const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      date: '2024-12-09',
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      hours: '9h',
      notes: ''
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      date: '2024-12-09',
      checkIn: '09:15',
      checkOut: '18:30',
      status: 'late',
      hours: '9h 15m',
      notes: 'Traffic delay'
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Mike Johnson',
      date: '2024-12-09',
      checkIn: '09:00',
      checkOut: '13:00',
      status: 'half-day',
      hours: '4h',
      notes: 'Medical appointment'
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: 'Sarah Williams',
      date: '2024-12-09',
      checkIn: null,
      checkOut: null,
      status: 'absent',
      hours: '0h',
      notes: 'Sick leave'
    },
    {
      id: 5,
      employeeId: 5,
      employeeName: 'David Brown',
      date: '2024-12-09',
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      hours: '9h',
      notes: ''
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('daily');
  const [filterDepartment, setFilterDepartment] = useState('');
  
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'present',
    notes: ''
  });

  const [geofenceSettings, setGeofenceSettings] = useState({
    enabled: false,
    latitude: '',
    longitude: '',
    radius: 100
  });

  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    { id: 3, name: 'Mike Johnson', department: 'Sales' },
    { id: 4, name: 'Sarah Williams', department: 'HR' },
    { id: 5, name: 'David Brown', department: 'Finance' }
  ];

  const handleManualEntry = () => {
    setEditingRecord(null);
    setFormData({
      employeeId: '',
      employeeName: '',
      date: selectedDate,
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      notes: ''
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
      notes: record.notes
    });
    setShowModal(true);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    
    const selectedEmployee = employees.find(emp => emp.id === parseInt(formData.employeeId));
    
    if (editingRecord) {
      // Update existing record
      setAttendance(attendance.map(record =>
        record.id === editingRecord.id
          ? {
              ...record,
              ...formData,
              employeeName: selectedEmployee?.name || record.employeeName,
              hours: calculateHours(formData.checkIn, formData.checkOut)
            }
          : record
      ));
    } else {
      // Create new record
      const newRecord = {
        id: Math.max(...attendance.map(a => a.id), 0) + 1,
        employeeId: parseInt(formData.employeeId),
        employeeName: selectedEmployee?.name || '',
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        status: formData.status,
        hours: calculateHours(formData.checkIn, formData.checkOut),
        notes: formData.notes
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

  const handleSaveGeofence = () => {
    alert('Geofence settings saved successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'half-day': return 'bg-blue-100 text-blue-800';
      case 'leave': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAttendance = attendance.filter(record => {
    if (viewMode === 'daily') {
      return record.date === selectedDate;
    }
    return record.date.startsWith(selectedDate.substring(0, 7));
  });

  const renderMonthlyView = () => {
    const [year, month] = selectedDate.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-16"></div>
          ))}
          
          {days.map(day => {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayRecords = attendance.filter(a => a.date === dateStr);
            const presentCount = dayRecords.filter(a => a.status === 'present' || a.status === 'late').length;
            
            return (
              <div
                key={day}
                className="h-16 border border-gray-200 rounded-lg p-2 hover:bg-gray-50"
              >
                <div className="text-sm font-medium text-gray-900">{day}</div>
                {dayRecords.length > 0 && (
                  <div className="text-xs text-gray-600 mt-1">
                    {presentCount}/{dayRecords.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter(a => a.status === 'present').length,
    absent: filteredAttendance.filter(a => a.status === 'absent').length,
    late: filteredAttendance.filter(a => a.status === 'late').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Attendance Management</h2>
            <p className="text-gray-600">Track and manage employee attendance</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleManualEntry}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              📝 Manual Entry
            </button>
            <button 
              onClick={() => alert('Report generated!')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              📊 Generate Report
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Present</div>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Absent</div>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Late</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
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
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'monthly' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly View
              </button>
            </div>
            
            <div className="flex space-x-4">
              <input
                type={viewMode === 'daily' ? 'date' : 'month'}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select 
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        {viewMode === 'daily' ? (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No attendance records found for this date
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{record.employeeName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {record.checkIn || '--:--'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {record.checkOut || '--:--'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={record.status}
                            onChange={(e) => handleStatusChange(record.id, e.target.value)}
                            className={`px-3 py-1 text-sm rounded-full border-0 ${getStatusColor(record.status)}`}
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                            <option value="half-day">Half Day</option>
                            <option value="leave">Leave</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {record.hours}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {record.notes || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEdit(record)}
                            className="text-blue-600 hover:text-blue-700 text-sm mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          renderMonthlyView()
        )}

        {/* Geofence Settings */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Geofence Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable Geofence Tracking</h4>
                <p className="text-sm text-gray-600">Restrict attendance to specific locations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={geofenceSettings.enabled}
                  onChange={(e) => setGeofenceSettings({...geofenceSettings, enabled: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {geofenceSettings.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="text"
                    value={geofenceSettings.latitude}
                    onChange={(e) => setGeofenceSettings({...geofenceSettings, latitude: e.target.value})}
                    placeholder="12.9716"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="text"
                    value={geofenceSettings.longitude}
                    onChange={(e) => setGeofenceSettings({...geofenceSettings, longitude: e.target.value})}
                    placeholder="77.5946"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Radius (meters)</label>
                  <input
                    type="number"
                    value={geofenceSettings.radius}
                    onChange={(e) => setGeofenceSettings({...geofenceSettings, radius: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveGeofence}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>

        {/* Manual Entry Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)} title={editingRecord ? "Edit Attendance" : "Manual Attendance Entry"}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
              <select
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check In Time</label>
                <input
                  type="time"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check Out Time</label>
                <input
                  type="time"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
                <option value="leave">Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Optional notes..."
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAttendance}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingRecord ? 'Update' : 'Save'} Attendance
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AttendanceManagement;