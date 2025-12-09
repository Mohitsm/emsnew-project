import React, { useState, useEffect } from 'react';

// Modal Component
const Modal = ({ show, onClose, title, size = 'md', children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl ${size === 'lg' ? 'max-w-4xl' : 'max-w-2xl'} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
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

// Table Component
const Table = ({ columns, data, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {col}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.designation}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.phone}</td>
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onView(row)}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(row)}
                        className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
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
  );
};

// Main Component
const AdminEmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1-555-0101',
      department: 'Engineering',
      designation: 'Senior Developer',
      joiningDate: '2023-01-15',
      salary: 75000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+1-555-0102',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2022-06-20',
      salary: 65000,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1-555-0103',
      department: 'Sales',
      designation: 'Sales Executive',
      joiningDate: '2023-03-10',
      salary: 55000,
      status: 'active'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@company.com',
      phone: '+1-555-0104',
      department: 'HR',
      designation: 'HR Specialist',
      joiningDate: '2021-11-05',
      salary: 60000,
      status: 'active'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@company.com',
      phone: '+1-555-0105',
      department: 'Finance',
      designation: 'Financial Analyst',
      joiningDate: '2022-08-15',
      salary: 70000,
      status: 'inactive'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: '',
    salary: '',
    status: 'active'
  });

  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  const handleCreate = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      status: employee.status
    });
    setShowModal(true);
  };

  const handleDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setEmployees(employees.filter(emp => emp.id !== employee.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...formData, id: emp.id }
          : emp
      ));
    } else {
      // Create new employee
      const newEmployee = {
        ...formData,
        id: Math.max(...employees.map(e => e.id), 0) + 1
      };
      setEmployees([...employees, newEmployee]);
    }
    
    setShowModal(false);
    setEditingEmployee(null);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone?.includes(searchTerm);
    
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
    const matchesStatus = !filterStatus || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const tableData = filteredEmployees.map(emp => ({
    ...emp,
    status: (
      <span className={`px-2 py-1 text-xs rounded-full ${
        emp.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {emp.status}
      </span>
    )
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Employee Management</h2>
            <p className="text-gray-600">Manage all employees in your organization</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <span className="mr-2">+</span> Add Employee
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Employees</div>
            <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === 'active').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Inactive</div>
            <div className="text-2xl font-bold text-red-600">
              {employees.filter(e => e.status === 'inactive').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Departments</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(employees.map(e => e.department)).size}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <Table
          columns={['ID', 'Name', 'Email', 'Department', 'Designation', 'Phone', 'Status']}
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={(emp) => {
            alert(`Viewing profile of ${emp.name}\n\nDepartment: ${emp.department}\nDesignation: ${emp.designation}\nJoining Date: ${emp.joiningDate}\nSalary: $${emp.salary}`);
          }}
        />

        {/* Employee Form Modal */}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          size="lg"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary *
                  </label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminEmployeeManagement;