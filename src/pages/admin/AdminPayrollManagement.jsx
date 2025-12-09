// components/PayrollManagement.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Modal from '../common/Modal';

const AdminPayrollManagement = ({ loading, setLoading }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [salaryStructure, setSalaryStructure] = useState({
    basic: '40',
    hra: '20',
    da: '10',
    specialAllowance: '15',
    medical: '5',
    conveyance: '5',
    pf: '12',
    esic: '3.25',
    tds: '10'
  });

  const [generateData, setGenerateData] = useState({
    month: '',
    year: '',
    includeBonuses: true,
    includeDeductions: true
  });

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    setLoading(true);
    try {
      const data = await api.getPayrolls();
      setPayrolls(data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePayroll = async () => {
    try {
      await api.generatePayroll(generateData);
      setShowGenerateModal(false);
      fetchPayrolls();
      alert('Payroll generated successfully!');
    } catch (error) {
      console.error('Error generating payroll:', error);
    }
  };

  const handleSaveStructure = () => {
    alert('Salary structure saved successfully!');
    setShowStructureModal(false);
  };

  const handleDownloadSlip = (payroll) => {
    // Generate and download payslip
    alert(`Downloading payslip for ${payroll.month}`);
  };

  const handleSendSlip = (payroll) => {
    // Send payslip via email
    alert(`Payslip sent to ${payroll.employeeName}`);
  };

  const calculateSalary = (basicSalary) => {
    const basic = (basicSalary * salaryStructure.basic) / 100;
    const hra = (basicSalary * salaryStructure.hra) / 100;
    const da = (basicSalary * salaryStructure.da) / 100;
    const specialAllowance = (basicSalary * salaryStructure.specialAllowance) / 100;
    const medical = (basicSalary * salaryStructure.medical) / 100;
    const conveyance = (basicSalary * salaryStructure.conveyance) / 100;
    
    const gross = basic + hra + da + specialAllowance + medical + conveyance;
    
    const pf = (basicSalary * salaryStructure.pf) / 100;
    const esic = (basicSalary * salaryStructure.esic) / 100;
    const tds = (basicSalary * salaryStructure.tds) / 100;
    
    const deductions = pf + esic + tds;
    const net = gross - deductions;
    
    return { gross, deductions, net };
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payroll Management</h2>
          <p className="text-gray-600">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowStructureModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ⚙️ Salary Structure
          </button>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            💰 Generate Payroll
          </button>
        </div>
      </div>

      {/* Payroll List */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Payroll History</h3>
          <div className="flex space-x-2">
            <input
              type="month"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Filter by month"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Processed On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrolls.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {payroll.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payroll.employeeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">
                    ₹{payroll.totalSalary?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      payroll.status === 'processed' 
                        ? 'bg-green-100 text-green-800' 
                        : payroll.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payroll.processedDate || '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownloadSlip(payroll)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleSendSlip(payroll)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                      >
                        Send
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Structure Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Earnings Structure</h3>
          <div className="space-y-3">
            {Object.entries(salaryStructure).filter(([key]) => 
              !['pf', 'esic', 'tds'].includes(key)
            ).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-medium">{value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Deductions Structure</h3>
          <div className="space-y-3">
            {Object.entries(salaryStructure).filter(([key]) => 
              ['pf', 'esic', 'tds'].includes(key)
            ).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-700 uppercase">{key}</span>
                <span className="font-medium text-red-600">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Payroll Modal */}
      <Modal
        show={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Generate Payroll"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month *
              </label>
              <select
                value={generateData.month}
                onChange={(e) => setGenerateData({...generateData, month: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = new Date(0, i).toLocaleString('en', { month: 'long' });
                  return <option key={i} value={month}>{month}</option>;
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <select
                value={generateData.year}
                onChange={(e) => setGenerateData({...generateData, year: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Year</option>
                {[2023, 2024, 2025].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Options</h4>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={generateData.includeBonuses}
                onChange={(e) => setGenerateData({...generateData, includeBonuses: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Include performance bonuses
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={generateData.includeDeductions}
                onChange={(e) => setGenerateData({...generateData, includeDeductions: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Include tax deductions
              </label>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ This will generate payroll for all active employees for the selected period.
              Please review before finalizing.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowGenerateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleGeneratePayroll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Payroll
          </button>
        </div>
      </Modal>

      {/* Salary Structure Modal */}
      <Modal
        show={showStructureModal}
        onClose={() => setShowStructureModal(false)}
        title="Salary Structure Configuration"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(salaryStructure).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')} (%)
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setSalaryStructure({...salaryStructure, [key]: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  step="0.01"
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Sample Calculation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Basic Salary:</span>
                <span>₹50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Salary:</span>
                <span>₹{calculateSalary(50000).gross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Deductions:</span>
                <span className="text-red-600">-₹{calculateSalary(50000).deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-200 pt-2">
                <span>Net Salary:</span>
                <span className="text-green-600">₹{calculateSalary(50000).net.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowStructureModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveStructure}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Structure
          </button>
        </div>
      </Modal>
    </div>
  );
};

    export default AdminPayrollManagement;