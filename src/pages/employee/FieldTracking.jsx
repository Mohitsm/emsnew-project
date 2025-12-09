import React, { useState, useEffect } from 'react';

// Modal Component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const FieldTracking = () => {
  // Hardcoded initial data
  const [trackings, setTrackings] = useState([
    {
      id: 1,
      client: 'ABC Corp',
      location: 'Mumbai, Maharashtra',
      purpose: 'Product demonstration and contract signing',
      checkIn: '09:30',
      checkOut: '11:45',
      notes: 'Successfully closed the deal. Client requested follow-up meeting next month.'
    },
    {
      id: 2,
      client: 'XYZ Industries',
      location: 'Pune, Maharashtra',
      purpose: 'Quarterly review meeting',
      checkIn: '14:00',
      checkOut: '16:30',
      notes: 'Discussed Q4 performance metrics and future requirements.'
    },
    {
      id: 3,
      client: 'Tech Solutions Ltd',
      location: 'Bangalore, Karnataka',
      purpose: 'Technical support and training',
      checkIn: '10:00',
      checkOut: '',
      notes: 'Ongoing training session for new software features.'
    },
    {
      id: 4,
      client: 'Global Enterprises',
      location: 'Delhi NCR',
      purpose: 'Contract renewal discussion',
      checkIn: '11:15',
      checkOut: '13:00',
      notes: 'Contract renewed for another year with updated terms.'
    },
    {
      id: 5,
      client: 'Retail Plus',
      location: 'Hyderabad, Telangana',
      purpose: 'Site inspection and quality check',
      checkIn: '08:45',
      checkOut: '10:30',
      notes: 'All quality standards met. Submitted inspection report.'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingDuration, setTrackingDuration] = useState(0);
  const [formData, setFormData] = useState({
    client: '',
    location: '',
    purpose: '',
    checkIn: '',
    checkOut: '',
    notes: ''
  });

  // Timer for tracking duration
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleStartTracking = () => {
    setIsTracking(true);
    setTrackingDuration(0);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const handleCreate = () => {
    setEditingId(null);
    const now = new Date();
    setFormData({
      client: '',
      location: '',
      purpose: '',
      checkIn: now.toTimeString().slice(0, 5),
      checkOut: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      client: item.client,
      location: item.location,
      purpose: item.purpose,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      notes: item.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tracking record?')) {
      setTrackings(trackings.filter(item => item.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.client || !formData.location || !formData.purpose || !formData.checkIn) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      // Update existing record
      setTrackings(trackings.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
    } else {
      // Create new record
      const newId = Math.max(...trackings.map(item => item.id), 0) + 1;
      setTrackings([{ ...formData, id: newId }, ...trackings]);
    }
    
    setShowModal(false);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkOut) return '--';
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    const diff = outMinutes - inMinutes;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Field Tracking</h2>
            <p className="text-gray-600">Track and manage field visits</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Visit
          </button>
        </div>

        {/* Live Tracking Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Live GPS Tracking</h3>
              <p className="text-gray-600">Track your field visits in real-time</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={isTracking ? handleStopTracking : handleStartTracking}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
                  isTracking 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isTracking ? '⏸ Stop Tracking' : '▶ Start Tracking'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Status</p>
                  <p className="font-semibold text-lg">
                    {isTracking ? '🟢 Active' : '⚫ Inactive'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="font-semibold text-sm">
                    {isTracking ? 'Patna, Bihar, IN' : 'Not tracking'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">⏰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Duration</p>
                  <p className="font-semibold text-lg">{formatDuration(trackingDuration)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {trackings.length}
            </div>
            <div className="text-sm text-gray-600">Total Visits</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {trackings.filter(t => t.checkOut).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {trackings.filter(t => !t.checkOut).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="text-sm text-gray-600">Today's Date</div>
          </div>
        </div>

        {/* Tracking Records */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Visit Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trackings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No tracking records found. Click "Add Visit" to create one.
                    </td>
                  </tr>
                ) : (
                  trackings.map((tracking) => (
                    <tr key={tracking.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{tracking.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-1">📍</span>
                          {tracking.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {tracking.checkIn}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tracking.checkOut ? (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                            {tracking.checkOut}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                            In Progress
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {calculateDuration(tracking.checkIn, tracking.checkOut)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">{tracking.purpose}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(tracking)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tracking.id)}
                            className="text-red-600 hover:text-red-700 font-medium"
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
              {editingId ? 'Edit Visit Record' : 'Add Visit Record'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <input
                  type="text"
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Purpose of visit"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In *
                  </label>
                  <input
                    type="time"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FieldTracking;