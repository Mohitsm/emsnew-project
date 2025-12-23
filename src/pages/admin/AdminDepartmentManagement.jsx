// components/DepartmentManagement.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';

const AdminDepartmentManagement = () => {
    const [loading, setLoading] = useState(false);
  // Static departments data
  const staticDepartments = [
    {
      id: 1,
      name: 'Engineering',
      description: 'Software development, IT infrastructure, and technical support',
      managerId: 1,
      managerName: 'John Doe',
      budget: 5000000,
      employeeCount: 45,
      location: 'Floor 3, Building A',
      status: 'active',
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sales',
      description: 'Sales operations, customer acquisition, and revenue generation',
      managerId: 2,
      managerName: 'Jane Smith',
      budget: 3000000,
      employeeCount: 28,
      location: 'Floor 2, Building A',
      status: 'active',
      createdAt: '2023-02-20'
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Brand management, digital marketing, and advertising campaigns',
      managerId: 3,
      managerName: 'Mike Johnson',
      budget: 2000000,
      employeeCount: 15,
      location: 'Floor 1, Building A',
      status: 'active',
      createdAt: '2023-03-10'
    },
    {
      id: 4,
      name: 'Human Resources',
      description: 'Recruitment, employee relations, and organizational development',
      managerId: 4,
      managerName: 'Sarah Williams',
      budget: 1500000,
      employeeCount: 12,
      location: 'Floor 1, Building B',
      status: 'active',
      createdAt: '2023-01-20'
    },
    {
      id: 5,
      name: 'Finance',
      description: 'Accounting, budgeting, and financial planning',
      managerId: 5,
      managerName: 'David Brown',
      budget: 1800000,
      employeeCount: 10,
      location: 'Floor 2, Building B',
      status: 'active',
      createdAt: '2023-02-05'
    },
    {
      id: 6,
      name: 'Research & Development',
      description: 'Product research, innovation, and development',
      managerId: null,
      managerName: null,
      budget: 4000000,
      employeeCount: 8,
      location: 'Floor 4, Building A',
      status: 'inactive',
      createdAt: '2023-04-15'
    }
  ];

  // Static employees data
  const staticEmployees = [
    { id: 1, name: 'John Doe', department: 'Engineering', position: 'Engineering Manager', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', department: 'Sales', position: 'Sales Director', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing', position: 'Marketing Head', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Williams', department: 'Human Resources', position: 'HR Manager', email: 'sarah@example.com' },
    { id: 5, name: 'David Brown', department: 'Finance', position: 'Finance Director', email: 'david@example.com' },
    { id: 6, name: 'Lisa Anderson', department: 'Engineering', position: 'Senior Developer', email: 'lisa@example.com' },
    { id: 7, name: 'Robert Wilson', department: 'Engineering', position: 'DevOps Engineer', email: 'robert@example.com' },
    { id: 8, name: 'Emily Davis', department: 'Sales', position: 'Sales Executive', email: 'emily@example.com' },
    { id: 9, name: 'Michael Thompson', department: 'Marketing', position: 'Marketing Specialist', email: 'michael@example.com' },
    { id: 10, name: 'Jessica Miller', department: 'Human Resources', position: 'HR Executive', email: 'jessica@example.com' },
    { id: 11, name: 'Christopher Lee', department: 'Finance', position: 'Accountant', email: 'chris@example.com' },
    { id: 12, name: 'Amanda Clark', department: null, position: 'Intern', email: 'amanda@example.com' },
    { id: 13, name: 'Kevin Martinez', department: null, position: 'Intern', email: 'kevin@example.com' }
  ];

  // State management
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    managerId: '',
    budget: '',
    location: '',
    status: 'active'
  });

  const [employeeForm, setEmployeeForm] = useState({
    employeeId: '',
    departmentId: ''
  });

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  // CRUD Operations
  const fetchDepartments = () => {
    setLoading(true);
    setTimeout(() => {
      setDepartments(staticDepartments);
      setLoading(false);
    }, 500);
  };

  const fetchEmployees = () => {
    setEmployees(staticEmployees);
  };

  // CREATE - New Department
  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      managerId: '',
      budget: '',
      location: '',
      status: 'active'
    });
    setShowModal(true);
  };

  // READ - Get department by ID
  const getDepartmentById = (id) => {
    return departments.find(dept => dept.id === id);
  };

  // UPDATE - Edit Department
  const handleEdit = (dept) => {
    setEditingId(dept.id);
    setFormData({
      name: dept.name,
      description: dept.description,
      managerId: dept.managerId || '',
      budget: dept.budget,
      location: dept.location,
      status: dept.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter department name');
      return;
    }

    if (editingId) {
      // Update existing department
      const manager = formData.managerId 
        ? employees.find(emp => emp.id === parseInt(formData.managerId))
        : null;

      setDepartments(departments.map(dept =>
        dept.id === editingId
          ? { 
              ...dept, 
              ...formData,
              managerName: manager ? manager.name : null,
              budget: parseFloat(formData.budget) || 0,
              employeeCount: dept.employeeCount // Preserve employee count
            }
          : dept
      ));
    } else {
      // Create new department
      const manager = formData.managerId 
        ? employees.find(emp => emp.id === parseInt(formData.managerId))
        : null;

      const newDepartment = {
        id: Math.max(...departments.map(d => d.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        managerId: formData.managerId || null,
        managerName: manager ? manager.name : null,
        budget: parseFloat(formData.budget) || 0,
        employeeCount: 0,
        location: formData.location,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setDepartments([...departments, newDepartment]);
    }
    
    setShowModal(false);
    setEditingId(null);
    alert(editingId ? 'Department updated successfully!' : 'Department created successfully!');
  };

  // DELETE - Remove Department
  const handleDelete = (dept) => {
    if (window.confirm(`Are you sure you want to delete the "${dept.name}" department?`)) {
      // Check if department has employees
      const departmentEmployees = employees.filter(emp => emp.department === dept.name);
      if (departmentEmployees.length > 0) {
        alert('Cannot delete department with assigned employees. Please reassign or remove employees first.');
        return;
      }
      
      setDepartments(departments.filter(d => d.id !== dept.id));
      if (selectedDept?.id === dept.id) {
        setSelectedDept(null);
      }
      alert('Department deleted successfully!');
    }
  };

  // Employee Assignment Functions
  const handleAssignEmployee = (departmentId) => {
    setEmployeeForm({
      employeeId: '',
      departmentId: departmentId.toString()
    });
    setShowEmployeeModal(true);
  };

  const handleAssignEmployeeSubmit = () => {
    if (!employeeForm.employeeId || !employeeForm.departmentId) {
      alert('Please select an employee');
      return;
    }

    const employeeId = parseInt(employeeForm.employeeId);
    const departmentId = parseInt(employeeForm.departmentId);
    
    // Get employee and department details
    const employee = employees.find(emp => emp.id === employeeId);
    const department = departments.find(dept => dept.id === departmentId);
    
    if (!employee || !department) {
      alert('Invalid selection');
      return;
    }

    // Remove employee from previous department if any
    let previousDepartment = null;
    if (employee.department) {
      previousDepartment = departments.find(dept => dept.name === employee.department);
    }

    // Update employee
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, department: department.name };
      }
      return emp;
    });
    setEmployees(updatedEmployees);

    // Update department employee counts
    const updatedDepartments = departments.map(dept => {
      if (previousDepartment && dept.id === previousDepartment.id) {
        return { ...dept, employeeCount: Math.max(0, dept.employeeCount - 1) };
      }
      if (dept.id === departmentId) {
        return { ...dept, employeeCount: dept.employeeCount + 1 };
      }
      return dept;
    });
    setDepartments(updatedDepartments);

    // Update selected department if it's the one we're assigning to
    if (selectedDept?.id === departmentId) {
      setSelectedDept({...selectedDept, employeeCount: selectedDept.employeeCount + 1});
    }

    setShowEmployeeModal(false);
    setEmployeeForm({ employeeId: '', departmentId: '' });
    alert(`Employee ${employee.name} assigned to ${department.name} successfully!`);
  };

  const handleRemoveEmployee = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee || !employee.department) return;

    if (window.confirm(`Remove ${employee.name} from ${employee.department}?`)) {
      const department = departments.find(dept => dept.name === employee.department);
      
      // Update employee
      const updatedEmployees = employees.map(emp => {
        if (emp.id === employeeId) {
          return { ...emp, department: null };
        }
        return emp;
      });
      setEmployees(updatedEmployees);

      // Update department employee count
      if (department) {
        const updatedDepartments = departments.map(dept => {
          if (dept.id === department.id) {
            return { ...dept, employeeCount: Math.max(0, dept.employeeCount - 1) };
          }
          return dept;
        });
        setDepartments(updatedDepartments);

        // Update selected department
        if (selectedDept?.id === department.id) {
          setSelectedDept({...selectedDept, employeeCount: selectedDept.employeeCount - 1});
        }
      }

      alert(`Employee removed from department successfully!`);
    }
  };

  // Filter functions
  const filteredDepartments = departments.filter(dept => {
    if (filterText && !dept.name.toLowerCase().includes(filterText.toLowerCase()) && 
        !dept.description.toLowerCase().includes(filterText.toLowerCase())) {
      return false;
    }
    if (filterStatus && dept.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const getEmployeesByDepartment = (departmentName) => {
    return employees.filter(emp => emp.department === departmentName);
  };

  const getAvailableEmployees = () => {
    return employees.filter(emp => !emp.department);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Statistics
  const stats = {
    totalDepartments: departments.length,
    activeDepartments: departments.filter(d => d.status === 'active').length,
    totalEmployees: employees.filter(e => e.department).length,
    totalBudget: departments.reduce((sum, dept) => sum + dept.budget, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Department Management</h2>
            <p className="text-gray-600">Organize and manage departments and employee assignments</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 md:mt-0"
          >
            + Create Department
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Departments</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalDepartments}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Active Departments</div>
            <div className="text-2xl font-bold text-green-600">{stats.activeDepartments}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Employees</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Budget</div>
            <div className="text-2xl font-bold text-purple-600">
              ₹{stats.totalBudget.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                placeholder="Search departments..."
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setFilterText('');
                  setFilterStatus('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Departments</h3>
                <span className="text-sm text-gray-500">
                  {filteredDepartments.length} of {departments.length} departments
                </span>
              </div>
              
              {filteredDepartments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No departments found. Create your first department!
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDepartments.map(dept => (
                    <div 
                      key={dept.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedDept?.id === dept.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDept(dept)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg text-gray-900">{dept.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dept.status)}`}>
                              {dept.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              {dept.employeeCount} employees
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
                              </svg>
                              ₹{dept.budget.toLocaleString()} budget
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {dept.location || 'Location not set'}
                            </div>
                          </div>
                          
                          {dept.managerName && (
                            <div className="mt-3 text-sm">
                              <span className="text-gray-500">Manager: </span>
                              <span className="font-medium text-gray-900">{dept.managerName}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(dept);
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(dept);
                            }}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Department Details */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedDept ? selectedDept.name : 'Select a Department'}
              </h3>
              
              {selectedDept ? (
                <div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <p className="text-gray-600">{selectedDept.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedDept.status)}`}>
                          {selectedDept.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <p className="text-gray-600">{selectedDept.location || 'Not set'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department Head
                        </label>
                        <p className="text-gray-600">
                          {selectedDept.managerName || 'Not assigned'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Annual Budget
                        </label>
                        <p className="text-gray-600 font-medium">
                          ₹{selectedDept.budget.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Created Date
                      </label>
                      <p className="text-gray-600">{selectedDept.createdAt}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Employees ({selectedDept.employeeCount})</h4>
                      <button
                        onClick={() => handleAssignEmployee(selectedDept.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                      >
                        + Assign Employee
                      </button>
                    </div>
                    
                    {getEmployeesByDepartment(selectedDept.name).length === 0 ? (
                      <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 mb-2">No employees assigned to this department</p>
                        <button
                          onClick={() => handleAssignEmployee(selectedDept.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Assign an employee
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {getEmployeesByDepartment(selectedDept.name).map(emp => (
                          <div key={emp.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <div className="font-medium text-gray-900">{emp.name}</div>
                              <div className="text-sm text-gray-500">{emp.position}</div>
                            </div>
                            <button
                              onClick={() => handleRemoveEmployee(emp.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <span>Available for assignment:</span>
                        <span className="font-medium">{getAvailableEmployees().length} employees</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="mt-4">Select a department to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Department Form Modal */}
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
          title={editingId ? 'Edit Department' : 'Create New Department'}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Engineering, Sales, Marketing"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Describe the department's purpose and responsibilities"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Head (Manager)
                </label>
                <select
                  value={formData.managerId}
                  onChange={(e) => setFormData({...formData, managerId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Manager (Optional)</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.position}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="5000000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Floor 3, Building A"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingId ? 'Update Department' : 'Create Department'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Assign Employee Modal */}
        <Modal
          show={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          title="Assign Employee to Department"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Employee *
              </label>
              <select
                value={employeeForm.employeeId}
                onChange={(e) => setEmployeeForm({...employeeForm, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an employee</option>
                {getAvailableEmployees().map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.position}
                  </option>
                ))}
              </select>
              {getAvailableEmployees().length === 0 && (
                <p className="mt-2 text-sm text-red-600">No unassigned employees available</p>
              )}
            </div>

            {employeeForm.employeeId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Assignment Summary</h4>
                <div className="text-sm text-blue-800">
                  <p>Employee: {employees.find(emp => emp.id === parseInt(employeeForm.employeeId))?.name}</p>
                  <p>Department: {departments.find(dept => dept.id === parseInt(employeeForm.departmentId))?.name}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowEmployeeModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAssignEmployeeSubmit}
              disabled={!employeeForm.employeeId}
              className={`px-4 py-2 rounded-lg ${
                employeeForm.employeeId
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Assign Employee
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDepartmentManagement;