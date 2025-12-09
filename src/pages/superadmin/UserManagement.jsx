// // src/pages/superadmin/UserManagement.jsx
// import React, { useState } from 'react';
// import { 
//   Search, 
//   Filter, 
//   UserPlus, 
//   Download,
//   Edit,
//   Trash2,
//   Eye,
//   MoreVertical,
//   UserCheck,
//   UserX
// } from 'lucide-react';
// import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import Table from '../../components/common/Table';
// import Modal from '../../components/common/Modal';
// import { toast } from 'react-hot-toast';
// import { users } from '../../data/mockData';

// const UserManagement = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [usersData, setUsersData] = useState(users);

//   const roles = ['all', 'superadmin', 'admin', 'employee'];
//   const statuses = ['all', 'active', 'inactive'];

//   const filteredUsers = usersData.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesRole = selectedRole === 'all' || user.role === selectedRole;
//     const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const columns = [
//     {
//       title: 'User',
//       dataIndex: 'name',
//       render: (value, record) => (
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
//             <span className="font-semibold text-emerald-800">{record.avatar}</span>
//           </div>
//           <div>
//             <div className="font-medium text-gray-900 dark:text-white">{value}</div>
//             <div className="text-sm text-gray-500 dark:text-gray-400">{record.email}</div>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       render: (value) => (
//         <span className="capitalize px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
//           {value}
//         </span>
//       )
//     },
//     {
//       title: 'Department',
//       dataIndex: 'department'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: (value) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           value === 'active' 
//             ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
//             : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
//         }`}>
//           {value.charAt(0).toUpperCase() + value.slice(1)}
//         </span>
//       )
//     },
//     {
//       title: 'Last Login',
//       dataIndex: 'lastLogin',
//       render: (value) => new Date(value).toLocaleDateString()
//     },
//     {
//       title: 'Actions',
//       render: (_, record) => (
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handleViewUser(record)}
//             className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//             title="View"
//           >
//             <Eye className="h-4 w-4" />
//           </button>
//           <button
//             onClick={() => handleEditUser(record)}
//             className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
//             title="Edit"
//           >
//             <Edit className="h-4 w-4" />
//           </button>
//           <button
//             onClick={() => handleToggleStatus(record)}
//             className="p-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
//             title={record.status === 'active' ? 'Deactivate' : 'Activate'}
//           >
//             {record.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
//           </button>
//           <button
//             onClick={() => handleDeleteUser(record.id)}
//             className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//             title="Delete"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const handleAddUser = () => {
//     setIsAddModalOpen(true);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleViewUser = (user) => {
//     toast.info(`Viewing details for ${user.name}`);
//   };

//   const handleToggleStatus = (user) => {
//     setUsersData(usersData.map(u => 
//       u.id === user.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
//     ));
//     toast.success(`${user.name} ${user.status === 'active' ? 'deactivated' : 'activated'} successfully`);
//   };

//   const handleDeleteUser = (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsersData(usersData.filter(user => user.id !== id));
//       toast.success('User deleted successfully');
//     }
//   };

//   const handleExport = () => {
//     toast.success('Exporting user data...');
//   };

//   return (
//     <div className="space-y-6 fade-in">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Manage system users and their permissions
//           </p>
//         </div>
//         <div className="flex items-center space-x-3 mt-4 md:mt-0">
//           <Button variant="outline" startIcon={<Download className="h-4 w-4" />} onClick={handleExport}>
//             Export
//           </Button>
//           <Button startIcon={<UserPlus className="h-4 w-4" />} onClick={handleAddUser}>
//             Add User
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="md:col-span-2">
//               <Input
//                 placeholder="Search users by name or email..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 startIcon={<Search className="h-5 w-5" />}
//               />
//             </div>
//             <div>
//               <select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="all">All Roles</option>
//                 <option value="superadmin">Super Admin</option>
//                 <option value="admin">Admin</option>
//                 <option value="employee">Employee</option>
//               </select>
//             </div>
//             <div>
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Users ({filteredUsers.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table 
//             columns={columns} 
//             data={filteredUsers}
//             emptyMessage="No users found. Try changing your filters."
//           />
//         </CardContent>
//       </Card>

//       {/* Add User Modal */}
//       <Modal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         title="Add New User"
//         size="lg"
//       >
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input label="Full Name" placeholder="Enter full name" required />
//             <Input label="Email" type="email" placeholder="Enter email" required />
//             <Input label="Username" placeholder="Enter username" required />
//             <Input label="Password" type="password" placeholder="Enter password" required />
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Role
//               </label>
//               <select className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
//                 <option value="">Select Role</option>
//                 <option value="superadmin">Super Admin</option>
//                 <option value="admin">Admin</option>
//                 <option value="employee">Employee</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Department
//               </label>
//               <select className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
//                 <option value="">Select Department</option>
//                 <option value="it">IT</option>
//                 <option value="hr">HR</option>
//                 <option value="finance">Finance</option>
//                 <option value="sales">Sales</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-3 pt-4">
//             <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={() => {
//               toast.success('User added successfully');
//               setIsAddModalOpen(false);
//             }}>
//               Add User
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       {/* Edit User Modal */}
//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         title="Edit User"
//         size="lg"
//       >
//         {selectedUser && (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input label="Full Name" defaultValue={selectedUser.name} />
//               <Input label="Email" type="email" defaultValue={selectedUser.email} />
//               <Input label="Username" defaultValue={selectedUser.username} />
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Role
//                 </label>
//                 <select 
//                   defaultValue={selectedUser.role}
//                   className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="superadmin">Super Admin</option>
//                   <option value="admin">Admin</option>
//                   <option value="employee">Employee</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Status
//                 </label>
//                 <select 
//                   defaultValue={selectedUser.status}
//                   className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4">
//               <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => {
//                 toast.success('User updated successfully');
//                 setIsEditModalOpen(false);
//               }}>
//                 Save Changes
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default UserManagement;


// components/CompaniesManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const CompaniesManagement = () => {
  // Initial mock data
  const initialCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "www.techcorp.com",
      employees: 245,
      status: "active",
      joinedDate: "2023-01-15",
      address: "123 Tech Street, San Francisco, CA",
      description: "Leading technology solutions provider"
    },
    {
      id: 2,
      name: "Green Energy Ltd",
      industry: "Renewable Energy",
      email: "info@greenenergy.com",
      phone: "+1 (555) 987-6543",
      website: "www.greenenergy.com",
      employees: 156,
      status: "active",
      joinedDate: "2023-02-20",
      address: "456 Eco Avenue, Denver, CO",
      description: "Sustainable energy solutions"
    },
    {
      id: 3,
      name: "MediCare Systems",
      industry: "Healthcare",
      email: "support@medicare.com",
      phone: "+1 (555) 456-7890",
      website: "www.medicare.com",
      employees: 320,
      status: "active",
      joinedDate: "2023-03-10",
      address: "789 Health Blvd, Boston, MA",
      description: "Healthcare management systems"
    },
    {
      id: 4,
      name: "Foodies Express",
      industry: "Food & Beverage",
      email: "hello@foodies.com",
      phone: "+1 (555) 234-5678",
      website: "www.foodies.com",
      employees: 89,
      status: "inactive",
      joinedDate: "2023-04-05",
      address: "101 Food Court, Chicago, IL",
      description: "Food delivery service"
    },
    {
      id: 5,
      name: "EduTech Pro",
      industry: "Education",
      email: "contact@edutech.com",
      phone: "+1 (555) 345-6789",
      website: "www.edutech.com",
      employees: 134,
      status: "active",
      joinedDate: "2023-05-12",
      address: "202 Learning Lane, Austin, TX",
      description: "Educational technology platform"
    },
    {
      id: 6,
      name: "AutoMotive Inc",
      industry: "Automotive",
      email: "info@automotive.com",
      phone: "+1 (555) 567-8901",
      website: "www.automotive.com",
      employees: 278,
      status: "active",
      joinedDate: "2023-06-18",
      address: "303 Car Street, Detroit, MI",
      description: "Automotive parts manufacturer"
    },
    {
      id: 7,
      name: "Fashion Hub",
      industry: "Retail",
      email: "style@fashionhub.com",
      phone: "+1 (555) 678-9012",
      website: "www.fashionhub.com",
      employees: 67,
      status: "inactive",
      joinedDate: "2023-07-22",
      address: "404 Fashion Ave, New York, NY",
      description: "Online fashion retailer"
    },
    {
      id: 8,
      name: "Construct Pro",
      industry: "Construction",
      email: "build@constructpro.com",
      phone: "+1 (555) 789-0123",
      website: "www.constructpro.com",
      employees: 189,
      status: "active",
      joinedDate: "2023-08-30",
      address: "505 Builders Road, Houston, TX",
      description: "Construction and contracting services"
    }
  ];

  // State management
  const [companies, setCompanies] = useState(initialCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'view'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    email: '',
    phone: '',
    website: '',
    employees: '',
    status: 'active',
    address: '',
    description: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  // Get unique industries
  const industries = ['all', ...new Set(initialCompanies.map(company => company.industry))];

  // Filter companies based on search and filters
  useEffect(() => {
    let results = companies;

    // Search filter
    if (searchTerm) {
      results = results.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Industry filter
    if (selectedIndustry !== 'all') {
      results = results.filter(company => company.industry === selectedIndustry);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      results = results.filter(company => company.status === selectedStatus);
    }

    setFilteredCompanies(results);
  }, [searchTerm, selectedIndustry, selectedStatus, companies]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new company
  const handleAddCompany = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields');
      return;
    }

    const newCompany = {
      id: companies.length + 1,
      ...formData,
      employees: parseInt(formData.employees) || 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setCompanies([...companies, newCompany]);
    setFormData({
      name: '',
      industry: '',
      email: '',
      phone: '',
      website: '',
      employees: '',
      status: 'active',
      address: '',
      description: ''
    });
    setCurrentView('list');
  };

  // Edit company
  const handleEditCompany = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields');
      return;
    }

    const updatedCompanies = companies.map(company =>
      company.id === selectedCompany.id
        ? { ...company, ...formData, employees: parseInt(formData.employees) || 0 }
        : company
    );

    setCompanies(updatedCompanies);
    setCurrentView('list');
    setSelectedCompany(null);
  };

  // Delete company
  const handleDeleteCompany = () => {
    const updatedCompanies = companies.filter(company => company.id !== companyToDelete.id);
    setCompanies(updatedCompanies);
    setShowDeleteModal(false);
    setCompanyToDelete(null);
  };

  // Set form for editing
  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      industry: company.industry,
      email: company.email,
      phone: company.phone,
      website: company.website,
      employees: company.employees.toString(),
      status: company.status,
      address: company.address,
      description: company.description
    });
    setCurrentView('edit');
  };

  // View company details
  const handleViewClick = (company) => {
    setSelectedCompany(company);
    setCurrentView('view');
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('all');
    setSelectedStatus('all');
  };

  // Render List View
  const renderListView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Companies Management</h2>
          <p className="text-gray-600">Manage all registered companies</p>
        </div>
        <button
          onClick={() => {
            setCurrentView('add');
            setFormData({
              name: '',
              industry: '',
              email: '',
              phone: '',
              website: '',
              employees: '',
              status: 'active',
              address: '',
              description: ''
            });
          }}
          className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Company
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies by name, email, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FunnelIcon className="h-5 w-5 mr-2 text-gray-600" />
            Filters
            {(selectedIndustry !== 'all' || selectedStatus !== 'all') && (
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Active
              </span>
            )}
          </button>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2 text-gray-600" />
            Reset
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-lg">
                          <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                        {company.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.employees.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        company.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {company.status === 'active' ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewClick(company)}
                          className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditClick(company)}
                          className="text-emerald-600 hover:text-emerald-900 transition-colors p-1"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCompanyToDelete(company);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900 transition-colors p-1"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No companies found</p>
                      <p className="mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredCompanies.length}</span> of{' '}
              <span className="font-medium">{companies.length}</span> companies
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Add/Edit Form
  const renderFormView = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setCurrentView('list')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back to Companies
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {currentView === 'add' ? 'Add New Company' : 'Edit Company'}
        </h2>
        <p className="text-gray-600">
          {currentView === 'add' ? 'Fill in the details to add a new company' : 'Update company information'}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Construction">Construction</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="company@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="www.example.com"
              />
            </div>

            {/* Employees */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Employees
              </label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company address"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description about the company"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setCurrentView('list')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={currentView === 'add' ? handleAddCompany : handleEditCompany}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentView === 'add' ? 'Add Company' : 'Update Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render Company Details View
  const renderDetailsView = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setCurrentView('list')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back to Companies
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedCompany?.name}</h2>
            <p className="text-gray-600">{selectedCompany?.description}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleEditClick(selectedCompany)}
              className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Company
            </button>
            <button
              onClick={() => {
                setCompanyToDelete(selectedCompany);
                setShowDeleteModal(true);
              }}
              className="inline-flex items-center px-4 py-2.5 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 flex items-center justify-center bg-blue-100 rounded-xl">
                  <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">{selectedCompany?.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedCompany?.industry}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCompany?.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedCompany?.status === 'active' ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Description
              </h4>
              <p className="text-gray-700">{selectedCompany?.description}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{selectedCompany?.email}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedCompany?.phone}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <a
                    href={`https://${selectedCompany?.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {selectedCompany?.website}
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Employees</p>
                  <p className="font-medium text-gray-900">
                    {selectedCompany?.employees?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Company Details */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Joined Date</span>
                <span className="font-medium text-gray-900">{selectedCompany?.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Company ID</span>
                <span className="font-medium text-gray-900">#{selectedCompany?.id}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Address
              </h5>
              <p className="text-gray-700">{selectedCompany?.address}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button
                onClick={() => handleEditClick(selectedCompany)}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-white border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Company
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Companies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const renderDeleteModal = () => (
    showDeleteModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 flex items-center justify-center bg-red-100 rounded-lg mr-4">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Company</h3>
              <p className="text-sm text-gray-600">This action cannot be undone</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <span className="font-semibold">{companyToDelete?.name}</span>? 
            This will permanently remove all company data.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setCompanyToDelete(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCompany}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Company
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {currentView === 'list' && renderListView()}
      {(currentView === 'add' || currentView === 'edit') && renderFormView()}
      {currentView === 'view' && renderDetailsView()}
      {renderDeleteModal()}
    </div>
  );
};

export default CompaniesManagement;