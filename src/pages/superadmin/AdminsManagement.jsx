import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'
import { 
  Plus, 
  User, 
  Users, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  Lock,
  Activity,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react'

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@example.com', 
      phone: '+1 (555) 123-4567',
      role: 'Super Admin',
      status: 'Active', 
      joinDate: '2023-08-15',
      lastLogin: '2024-03-15 14:30',
      permissions: ['Full Access'],
      department: 'IT',
      twoFactor: true
    },
    { 
      id: 2, 
      name: 'Emma Johnson', 
      email: 'emma.j@example.com', 
      phone: '+1 (555) 987-6543',
      role: 'Admin',
      status: 'Active', 
      joinDate: '2023-10-20',
      lastLogin: '2024-03-15 09:15',
      permissions: ['Manage Users', 'View Reports'],
      department: 'Operations',
      twoFactor: false
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      email: 'michael.c@example.com', 
      phone: '+1 (555) 456-7890',
      role: 'Editor',
      status: 'Inactive', 
      joinDate: '2023-12-10',
      lastLogin: '2024-03-10 16:45',
      permissions: ['Edit Content'],
      department: 'Marketing',
      twoFactor: true
    },
    { 
      id: 4, 
      name: 'Sarah Williams', 
      email: 'sarah.w@example.com', 
      phone: '+1 (555) 321-0987',
      role: 'Viewer',
      status: 'Active', 
      joinDate: '2024-01-28',
      lastLogin: '2024-03-15 11:20',
      permissions: ['View Only'],
      department: 'Sales',
      twoFactor: false
    },
    { 
      id: 5, 
      name: 'David Brown', 
      email: 'david.b@example.com', 
      phone: '+1 (555) 654-3210',
      role: 'Admin',
      status: 'Pending', 
      joinDate: '2024-02-05',
      lastLogin: '2024-03-12 13:45',
      permissions: ['Manage Users'],
      department: 'Support',
      twoFactor: false
    },
    { 
      id: 6, 
      name: 'Lisa Anderson', 
      email: 'lisa.a@example.com', 
      phone: '+1 (555) 789-0123',
      role: 'Super Admin',
      status: 'Active', 
      joinDate: '2023-09-01',
      lastLogin: '2024-03-15 10:00',
      permissions: ['Full Access'],
      department: 'Management',
      twoFactor: true
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [viewingAdmin, setViewingAdmin] = useState(null)
  const [filterRole, setFilterRole] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
    status: 'Active',
    department: '',
    twoFactor: false,
    permissions: []
  })

  const columns = [
    { 
      key: 'name', 
      title: 'Admin',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <User className="text-indigo-600" size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.department}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      title: 'Email',
      render: (value) => (
        <span className="text-gray-700">{value}</span>
      )
    },
    { 
      key: 'role', 
      title: 'Role',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Super Admin' ? 'bg-red-100 text-red-700' :
          value === 'Admin' ? 'bg-blue-100 text-blue-700' :
          value === 'Editor' ? 'bg-purple-100 text-purple-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Active' ? 'bg-green-100 text-green-700' :
          value === 'Pending' ? 'bg-amber-100 text-amber-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'lastLogin', 
      title: 'Last Login',
      render: (value) => {
        if (!value || typeof value !== 'string') {
          return <span className="text-gray-500 text-sm">Never</span>
        }
        const parts = value.split(' ')
        return (
          <div>
            <p className="font-medium text-gray-900">{parts[0] || 'N/A'}</p>
            <p className="text-xs text-gray-500">{parts[1] || ''}</p>
          </div>
        )
      }
    },
    { 
      key: 'twoFactor', 
      title: '2FA',
      render: (value) => (
        value ? (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center justify-center w-fit">
            <CheckCircle size={12} className="mr-1" />
            Enabled
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 flex items-center justify-center w-fit">
            <XCircle size={12} className="mr-1" />
            Disabled
          </span>
        )
      )
    },
  ]

  const stats = [
    {
      title: 'Total Admins',
      value: admins.length,
      change: '+8%',
      icon: Users,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      lightBg: 'bg-indigo-50'
    },
    {
      title: 'Active Admins',
      value: admins.filter(a => a.status === 'Active').length,
      change: '+5%',
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      lightBg: 'bg-green-50'
    },
    {
      title: 'Super Admins',
      value: admins.filter(a => a.role === 'Super Admin').length,
      change: '+12%',
      icon: Shield,
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      lightBg: 'bg-amber-50'
    },
    {
      title: '2FA Enabled',
      value: admins.filter(a => a.twoFactor).length,
      change: '+15%',
      icon: Lock,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50'
    }
  ]

  const permissionOptions = [
    'Full Access',
    'Manage Users',
    'Manage Companies',
    'View Reports',
    'Edit Content',
    'Manage Settings',
    'Manage Subscriptions',
    'Export Data'
  ]

  const filteredAdmins = admins.filter(admin => {
    if (filterRole !== 'All' && admin.role !== filterRole) return false
    if (filterStatus !== 'All' && admin.status !== filterStatus) return false
    return true
  })

  const handleEdit = (admin) => {
    setEditingAdmin(admin)
    setFormData({
      ...admin,
      permissions: [...admin.permissions]
    })
    setIsModalOpen(true)
  }

  const handleView = (admin) => {
    setViewingAdmin(admin)
    setIsViewModalOpen(true)
  }

  const handleDelete = (admin) => {
    if (window.confirm(`Are you sure you want to delete ${admin.name}?`)) {
      setAdmins(admins.filter(a => a.id !== admin.id))
      toast.success('Admin deleted successfully', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingAdmin) {
      setAdmins(admins.map(a => 
        a.id === editingAdmin.id ? { ...formData, id: a.id, joinDate: a.joinDate, lastLogin: a.lastLogin } : a
      ))
      toast.success('Admin updated successfully', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      })
    } else {
      const newAdmin = {
        ...formData,
        id: Math.max(...admins.map(a => a.id), 0) + 1,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      setAdmins([...admins, newAdmin])
      toast.success('Admin added successfully', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      })
    }
    
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAdmin(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Admin',
      status: 'Active',
      department: '',
      twoFactor: false,
      permissions: []
    })
  }

  const togglePermission = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission]
    setFormData({...formData, permissions: newPermissions})
  }

  const exportAdmins = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Department', '2FA', 'Join Date', 'Last Login'],
      ...admins.map(admin => [
        admin.name,
        admin.email,
        admin.role,
        admin.status,
        admin.department,
        admin.twoFactor ? 'Enabled' : 'Disabled',
        admin.joinDate,
        admin.lastLogin || 'Never'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admins-list-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Admins exported successfully', {
      style: {
        background: '#10B981',
        color: '#fff',
      },
    })
  }

  const getRoleCounts = () => {
    const counts = { 'Super Admin': 0, Admin: 0, Editor: 0, Viewer: 0 }
    admins.forEach(a => counts[a.role]++)
    return counts
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admins Management</h1>
            <p className="text-gray-600 mt-1">Manage system administrators and permissions</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportAdmins}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center shadow-sm"
            >
              <Download size={18} className="mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Add Admin
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`${stat.lightBg} rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center font-medium">
                      <TrendingUp size={14} className="mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-xl shadow-md`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Role Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(getRoleCounts()).map(([role, count]) => (
              <div key={role} className={`p-5 rounded-xl border-2 ${
                role === 'Super Admin' ? 'bg-red-50 border-red-200' :
                role === 'Admin' ? 'bg-blue-50 border-blue-200' :
                role === 'Editor' ? 'bg-purple-50 border-purple-200' :
                'bg-gray-50 border-gray-200'
              } hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${
                      role === 'Super Admin' ? 'text-red-700' :
                      role === 'Admin' ? 'text-blue-700' :
                      role === 'Editor' ? 'text-purple-700' :
                      'text-gray-700'
                    }`}>
                      {role}
                    </p>
                    <p className="text-2xl font-bold mt-2 text-gray-900">{count}</p>
                    <p className="text-xs text-gray-600 mt-1">Total Users</p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    role === 'Super Admin' ? 'bg-red-100' :
                    role === 'Admin' ? 'bg-blue-100' :
                    role === 'Editor' ? 'bg-purple-100' :
                    'bg-gray-100'
                  }`}>
                    <Shield className={
                      role === 'Super Admin' ? 'text-red-600' :
                      role === 'Admin' ? 'text-blue-600' :
                      role === 'Editor' ? 'text-purple-600' :
                      'text-gray-600'
                    } size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <Filter size={20} className="text-indigo-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-900">Filter Admins</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              <select
                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              {(filterRole !== 'All' || filterStatus !== 'All') && (
                <button
                  onClick={() => {
                    setFilterRole('All')
                    setFilterStatus('All')
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <Table
            columns={columns}
            data={filteredAdmins}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>

        {/* Add/Edit Admin Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingAdmin ? 'Edit Admin' : 'Add New Admin'}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="e.g., IT, Operations"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Permissions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {permissionOptions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`perm-${permission}`}
                      checked={formData.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor={`perm-${permission}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <input
                type="checkbox"
                id="twoFactor"
                checked={formData.twoFactor}
                onChange={(e) => setFormData({...formData, twoFactor: e.target.checked})}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="twoFactor" className="ml-3 text-sm font-semibold text-gray-700 cursor-pointer flex items-center">
                <Lock size={16} className="mr-2 text-indigo-600" />
                Enable Two-Factor Authentication
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-3 pt-5 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {editingAdmin ? 'Update Admin' : 'Add Admin'}
              </button>
            </div>
          </form>
        </Modal>

        {/* View Admin Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false)
            setViewingAdmin(null)
          }}
          title="Admin Details"
        >
          {viewingAdmin && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md border-2 border-indigo-200">
                  <User className="text-indigo-600" size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">{viewingAdmin.name}</h4>
                  <p className="text-gray-600 font-medium">{viewingAdmin.department}</p>
                  <div className="flex gap-2 mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      viewingAdmin.role === 'Super Admin' ? 'bg-red-100 text-red-700' :
                      viewingAdmin.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                      viewingAdmin.role === 'Editor' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {viewingAdmin.role}
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      viewingAdmin.status === 'Active' ? 'bg-green-100 text-green-700' :
                      viewingAdmin.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {viewingAdmin.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Mail size={16} className="mr-2 text-indigo-600" />
                    <span className="text-sm font-semibold">Email</span>
                  </div>
                  <p className="font-medium text-gray-900">{viewingAdmin.email}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Phone size={16} className="mr-2 text-indigo-600" />
                    <span className="text-sm font-semibold">Phone</span>
                  </div>
                  <p className="font-medium text-gray-900">{viewingAdmin.phone}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2 text-indigo-600" />
                    <span className="text-sm font-semibold">Join Date</span>
                  </div>
                  <p className="font-medium text-gray-900">{viewingAdmin.joinDate}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Activity size={16} className="mr-2 text-indigo-600" />
                    <span className="text-sm font-semibold">Last Login</span>
                  </div>
                  <p className="font-medium text-gray-900">{viewingAdmin.lastLogin || 'Never'}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center text-gray-600 mb-3">
                  <Lock size={16} className="mr-2 text-indigo-600" />
                  <span className="text-sm font-semibold">Two-Factor Authentication</span>
                </div>
                <p className={`font-semibold text-lg ${viewingAdmin.twoFactor ? 'text-green-600' : 'text-gray-600'}`}>
                  {viewingAdmin.twoFactor ? '✓ Enabled' : '✗ Disabled'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center text-gray-600 mb-3">
                  <Shield size={16} className="mr-2 text-indigo-600" />
                  <span className="text-sm font-semibold">Permissions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {viewingAdmin.permissions.map((perm, index) => (
                    <span key={index} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-5 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false)
                    setViewingAdmin(null)
                  }}
                  className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleEdit(viewingAdmin)
                    setIsViewModalOpen(false)
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Edit Admin
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}