import React, { useState, useEffect } from 'react';

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

const Attendance = () => {
  // Initial hardcoded data
  const initialData = [
    {
      id: 1,
      date: '2024-12-09',
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      hours: '9h',
      notes: 'Regular day'
    },
    {
      id: 2,
      date: '2024-12-08',
      checkIn: '09:15',
      checkOut: '17:45',
      status: 'present',
      hours: '8.5h',
      notes: ''
    },
    {
      id: 3,
      date: '2024-12-07',
      checkIn: '09:00',
      checkOut: '13:00',
      status: 'half-day',
      hours: '4h',
      notes: 'Left early for appointment'
    },
    {
      id: 4,
      date: '2024-12-06',
      checkIn: '-',
      checkOut: '-',
      status: 'absent',
      hours: '0h',
      notes: 'Sick leave'
    },
    {
      id: 5,
      date: '2024-12-05',
      checkIn: '08:45',
      checkOut: '18:15',
      status: 'present',
      hours: '9.5h',
      notes: 'Overtime work'
    }
  ];

  const [attendance, setAttendance] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'present',
    notes: ''
  });

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut || checkIn === '-' || checkOut === '-') return '0h';
    
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return minutes > 0 ? `${hours}.${Math.round(minutes / 6)}h` : `${hours}h`;
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      checkIn: '',
      checkOut: '',
      status: 'present',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date,
      checkIn: item.checkIn === '-' ? '' : item.checkIn,
      checkOut: item.checkOut === '-' ? '' : item.checkOut,
      status: item.status,
      notes: item.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      setAttendance(attendance.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const hours = calculateHours(formData.checkIn, formData.checkOut);
      
      if (editingId) {
        // Update existing record
        setAttendance(attendance.map(item => 
          item.id === editingId 
            ? { ...item, ...formData, hours }
            : item
        ));
      } else {
        // Create new record
        const newRecord = {
          id: Math.max(...attendance.map(a => a.id), 0) + 1,
          ...formData,
          hours
        };
        setAttendance([newRecord, ...attendance]);
      }
      
      setShowModal(false);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance</h2>
          <p className="text-gray-600">Manage your attendance records</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Attendance
        </button>
      </div>

      {/* Attendance Methods */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button className="flex flex-col items-center justify-center p-6 border-2 border-blue-500 bg-blue-50 rounded-xl transition-all hover:shadow-md">
          <span className="text-3xl mb-2">📱</span>
          <span className="font-medium text-blue-700">QR Code</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all hover:shadow-md">
          <span className="text-3xl mb-2">📍</span>
          <span className="font-medium">GPS</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all hover:shadow-md">
          <span className="text-3xl mb-2">👆</span>
          <span className="font-medium">Biometric</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all hover:shadow-md">
          <span className="text-3xl mb-2">👤</span>
          <span className="font-medium">Face ID</span>
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No attendance records found. Click "Add Attendance" to create one.
                  </td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{record.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {record.checkIn || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {record.checkOut || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'half-day' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'leave' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {record.hours || '0h'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
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

      {/* Calendar View */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Calendar View</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={i}
                className={`h-12 flex items-center justify-center rounded-lg font-medium transition-all hover:shadow-md cursor-pointer ${
                  i % 5 === 0 ? 'bg-red-100 text-red-800' :
                  i % 7 === 0 ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Attendance' : 'Add Attendance'}
          </h3>
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In
                  </label>
                  <input
                    type="time"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out
                  </label>
                  <input
                    type="time"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="present">Present</option>
                  <option value="half-day">Half Day</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Add any notes..."
                />
              </div>
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
                {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Attendance;