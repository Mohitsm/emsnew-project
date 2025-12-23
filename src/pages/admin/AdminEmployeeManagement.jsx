import React, { useState, useRef } from 'react';
import { Search, Filter, Download, Upload, X, Eye, Edit2, Trash2, UserPlus, ChevronDown, Calendar, DollarSign, Phone, Mail, Briefcase, User } from 'lucide-react';

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

// Employee Profile View Modal
const EmployeeProfileModal = ({ show, employee, onClose, onEdit }) => {
  if (!employee) return null;

  const handleEdit = () => {
    onEdit(employee);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} title="Employee Profile" size="lg">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{employee.name}</h3>
            <p className="text-lg text-gray-600">{employee.designation}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
              employee.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </span>
          </div>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit2 size={16} />
            Edit
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h4>
            <div className="flex items-start gap-3">
              <Mail className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{employee.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Work Information</h4>
            <div className="flex items-start gap-3">
              <Briefcase className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-gray-900">{employee.department}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="text-gray-900">#{employee.id}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Employment Details</h4>
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="text-gray-900">{new Date(employee.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-gray-900">${Number(employee.salary).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Info</h4>
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-gray-900">
                  {Math.floor((new Date() - new Date(employee.joiningDate)) / (1000 * 60 * 60 * 24 * 365))} years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const fileInputRef = useRef(null);

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
    setShowProfileModal(false);
    setShowModal(true);
  };

  const handleDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setEmployees(employees.filter(emp => emp.id !== employee.id));
    }
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...formData, id: emp.id }
          : emp
      ));
    } else {
      const newEmployee = {
        ...formData,
        id: Math.max(...employees.map(e => e.id), 0) + 1
      };
      setEmployees([...employees, newEmployee]);
    }
    
    setShowModal(false);
    setEditingEmployee(null);
  };

  // CSV Export
  const handleExport = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Joining Date', 'Salary', 'Status'];
    const rows = filteredAndSortedEmployees.map(emp => [
      emp.id,
      `"${emp.name}"`,
      emp.email,
      emp.phone,
      emp.department,
      `"${emp.designation}"`,
      emp.joiningDate,
      emp.salary,
      emp.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // CSV Import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const newEmployees = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const emp = {};
          headers.forEach((header, index) => {
            emp[header] = values[index];
          });
          return {
            id: Math.max(...employees.map(e => e.id), 0) + employees.length + 1,
            name: emp.name || '',
            email: emp.email || '',
            phone: emp.phone || '',
            department: emp.department || '',
            designation: emp.designation || '',
            joiningDate: emp['joining date'] || new Date().toISOString().split('T')[0],
            salary: emp.salary || 0,
            status: emp.status || 'active'
          };
        });

      setEmployees([...employees, ...newEmployees]);
      setShowImportModal(false);
    };
    reader.readAsText(file);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedEmployees = employees
    .filter(employee => {
      const matchesSearch = 
        employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone?.includes(searchTerm) ||
        employee.designation?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
      const matchesStatus = !filterStatus || employee.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'salary') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Employee Management</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all employees in your organization</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={handleExport}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Upload size={18} />
                <span className="hidden sm:inline">Import CSV</span>
                <span className="sm:hidden">Import</span>
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
              >
                <UserPlus size={18} />
                <span className="hidden sm:inline">Add Employee</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Employees</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{employees.length}</div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Active</div>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === 'active').length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Inactive</div>
            <div className="text-xl sm:text-2xl font-bold text-red-600">
              {employees.filter(e => e.status === 'inactive').length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">Departments</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {new Set(employees.map(e => e.department)).size}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={18} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="name">Name</option>
                    <option value="department">Department</option>
                    <option value="designation">Designation</option>
                    <option value="joiningDate">Joining Date</option>
                    <option value="salary">Salary</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Employee Table - Desktop */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id')}>
                    ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                    Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('department')}>
                    Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{emp.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{emp.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{emp.designation}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{emp.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          emp.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleView(emp)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(emp)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp)}
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

        {/* Employee Cards - Mobile & Tablet */}
        <div className="lg:hidden space-y-4">
          {filteredAndSortedEmployees.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
              No employees found
            </div>
          ) : (
            filteredAndSortedEmployees.map((emp) => (
              <div key={emp.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">{emp.name}</h3>
                      <p className="text-sm text-gray-600">{emp.designation}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    emp.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {emp.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} className="text-gray-400" />
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                      {emp.department}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleView(emp)}
                    className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(emp)}
                    className="flex-1 px-3 py-2 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp)}
                    className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

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
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </div>
          </form>
        </Modal>

        {/* Import CSV Modal */}
        <Modal
          show={showImportModal}
          onClose={() => setShowImportModal(false)}
          title="Import Employees from CSV"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">CSV Format Guidelines</h4>
              <p className="text-sm text-blue-800 mb-3">Your CSV file should have the following columns:</p>
              <code className="block bg-white p-3 rounded text-xs text-gray-800 overflow-x-auto">
                Name, Email, Phone, Department, Designation, Joining Date, Salary, Status
              </code>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImport}
                accept=".csv"
                className="hidden"
              />
              <Upload className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select CSV File
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Ensure all required fields are filled</li>
                <li>Date format should be YYYY-MM-DD</li>
                <li>Status should be either 'active' or 'inactive'</li>
                <li>Salary should be a number without commas</li>
              </ul>
            </div>
          </div>
        </Modal>

        {/* Employee Profile Modal */}
        <EmployeeProfileModal
          show={showProfileModal}
          employee={selectedEmployee}
          onClose={() => {
            setShowProfileModal(false);
            setSelectedEmployee(null);
          }}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default AdminEmployeeManagement;