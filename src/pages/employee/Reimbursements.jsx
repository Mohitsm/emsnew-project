import React, { useState } from 'react';

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

const Reimbursements = () => {
  // Hardcoded initial data
  const [reimbursements, setReimbursements] = useState([
    {
      id: 1,
      type: 'travel',
      date: '2024-12-05',
      amount: '450',
      description: 'Flight tickets for client meeting in Mumbai',
      status: 'approved'
    },
    {
      id: 2,
      type: 'food',
      date: '2024-12-03',
      amount: '125',
      description: 'Team lunch during project discussion',
      status: 'pending'
    },
    {
      id: 3,
      type: 'supplies',
      date: '2024-12-01',
      amount: '85',
      description: 'Office supplies - stationery and printer ink',
      status: 'approved'
    },
    {
      id: 4,
      type: 'internet',
      date: '2024-11-28',
      amount: '60',
      description: 'Monthly internet bill for remote work',
      status: 'rejected'
    },
    {
      id: 5,
      type: 'travel',
      date: '2024-11-25',
      amount: '320',
      description: 'Cab fare for airport transfers',
      status: 'approved'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'travel',
    date: '',
    amount: '',
    description: '',
    status: 'pending'
  });

  const expenseTypes = [
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'food', label: 'Food & Beverage', icon: '🍽️' },
    { id: 'supplies', label: 'Office Supplies', icon: '📦' },
    { id: 'internet', label: 'Internet/Phone', icon: '📱' },
  ];

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      type: 'travel',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      type: item.type,
      date: item.date,
      amount: item.amount,
      description: item.description,
      status: item.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense claim?')) {
      setReimbursements(reimbursements.filter(item => item.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.amount || !formData.description) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Update existing record
      setReimbursements(reimbursements.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
    } else {
      // Create new record
      const newId = Math.max(...reimbursements.map(item => item.id), 0) + 1;
      setReimbursements([{ ...formData, id: newId }, ...reimbursements]);
    }
    
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalClaimed = reimbursements.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const totalApproved = reimbursements
    .filter(item => item.status === 'approved')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const totalPending = reimbursements
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reimbursements</h2>
            <p className="text-gray-600">Manage your expense claims</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Submit Expense
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ${totalClaimed.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Claimed</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${totalApproved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              ${totalPending.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {reimbursements.length}
            </div>
            <div className="text-sm text-gray-600">Total Claims</div>
          </div>
        </div>

        {/* Reimbursements Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reimbursements.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No expense claims found. Click "Submit Expense" to create one.
                    </td>
                  </tr>
                ) : (
                  reimbursements.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">
                            {expenseTypes.find(t => t.id === item.type)?.icon}
                          </span>
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        ${parseFloat(item.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
              {editingId ? 'Edit Expense Claim' : 'Submit Expense Claim'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {expenseTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                  placeholder="Provide details about this expense..."
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingId ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Reimbursements;