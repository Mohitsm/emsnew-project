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

const Payroll = () => {
  // Hardcoded initial data
  const [payrolls, setPayrolls] = useState([
    {
      id: 1,
      month: '2024-11',
      basicSalary: '40000',
      allowances: '28850',
      deductions: '8200',
      netSalary: '60650'
    },
    {
      id: 2,
      month: '2024-10',
      basicSalary: '40000',
      allowances: '28850',
      deductions: '8200',
      netSalary: '60650'
    },
    {
      id: 3,
      month: '2024-09',
      basicSalary: '40000',
      allowances: '28850',
      deductions: '8200',
      netSalary: '60650'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    month: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    netSalary: ''
  });

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      month: '',
      basicSalary: '',
      allowances: '',
      deductions: '',
      netSalary: ''
    });
    setShowModal(true);
  };

  const handleEdit = (payroll) => {
    setEditingId(payroll.id);
    setFormData({
      month: payroll.month,
      basicSalary: payroll.basicSalary,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      netSalary: payroll.netSalary
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      setPayrolls(payrolls.filter(p => p.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.month || !formData.basicSalary || !formData.allowances || 
        !formData.deductions || !formData.netSalary) {
      alert('Please fill all fields');
      return;
    }
    
    if (editingId) {
      // Update existing record
      setPayrolls(payrolls.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
    } else {
      // Create new record
      const newId = Math.max(...payrolls.map(p => p.id), 0) + 1;
      setPayrolls([{ ...formData, id: newId }, ...payrolls]);
    }
    
    setShowModal(false);
  };

  const handleDownload = (payroll) => {
    const monthDate = new Date(payroll.month + '-01');
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    alert(`Downloading payslip for ${monthName}`);
  };

  const formatMonth = (monthStr) => {
    const date = new Date(monthStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payroll</h2>
            <p className="text-gray-600">View and manage your salary information</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Salary Record
          </button>
        </div>

        {/* Current Month Salary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Current Month Salary</h3>
              <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-4xl font-bold text-gray-900">₹58,650</div>
              <p className="text-green-600 font-medium">To be credited on Jan 1, 2025</p>
            </div>
          </div>
        </div>

        {/* Salary Slips */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Salary Slips</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payrolls.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No payroll records found. Click "Add Salary Record" to create one.
                    </td>
                  </tr>
                ) : (
                  payrolls.map((payroll) => (
                    <tr key={payroll.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{formatMonth(payroll.month)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{parseInt(payroll.basicSalary).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{parseInt(payroll.allowances).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-600">
                        -₹{parseInt(payroll.deductions).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-green-600">
                          ₹{parseInt(payroll.netSalary).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(payroll)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDownload(payroll)}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(payroll.id)}
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

        {/* Salary Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Salary Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Basic Salary', amount: '₹40,000' },
                { label: 'House Rent Allowance', amount: '₹16,000' },
                { label: 'Special Allowance', amount: '₹10,000' },
                { label: 'Medical Allowance', amount: '₹1,250' },
                { label: 'Conveyance Allowance', amount: '₹1,600' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Deductions</h3>
            <div className="space-y-4">
              {[
                { label: 'Provident Fund (PF)', amount: '₹4,800' },
                { label: 'Professional Tax', amount: '₹200' },
                { label: 'Income Tax (TDS)', amount: '₹3,200' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium text-red-600">-{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId ? 'Edit Salary Record' : 'Add Salary Record'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <input
                  type="month"
                  value={formData.month}
                  onChange={(e) => setFormData({...formData, month: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basic Salary
                </label>
                <input
                  type="number"
                  value={formData.basicSalary}
                  onChange={(e) => setFormData({...formData, basicSalary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowances
                </label>
                <input
                  type="number"
                  value={formData.allowances}
                  onChange={(e) => setFormData({...formData, allowances: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deductions
                </label>
                <input
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => setFormData({...formData, deductions: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Salary
                </label>
                <input
                  type="number"
                  value={formData.netSalary}
                  onChange={(e) => setFormData({...formData, netSalary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default Payroll;