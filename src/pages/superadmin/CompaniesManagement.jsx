import { useState } from 'react'
import toast from 'react-hot-toast'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'
import { 
  Plus, 
  Building2, 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Calendar,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react'

export default function CompaniesManagement() {
  const [companies, setCompanies] = useState([
    { 
      id: 1, 
      name: 'TechCorp Inc.', 
      email: 'contact@techcorp.com', 
      phone: '+1 (555) 123-4567',
      industry: 'Technology',
      employees: '250-500',
      plan: 'Enterprise', 
      status: 'Active', 
      joinDate: '2024-01-15',
      address: '123 Tech St, San Francisco, CA',
      website: 'www.techcorp.com',
      revenue: '$5.2M',
      growth: '+15%'
    },
    { 
      id: 2, 
      name: 'DesignStudio LLC', 
      email: 'hello@designstudio.com', 
      phone: '+1 (555) 987-6543',
      industry: 'Design',
      employees: '50-100',
      plan: 'Pro', 
      status: 'Active', 
      joinDate: '2024-02-20',
      address: '456 Creative Ave, New York, NY',
      website: 'www.designstudio.com',
      revenue: '$1.8M',
      growth: '+22%'
    },
    { 
      id: 3, 
      name: 'CloudServe Systems', 
      email: 'info@cloudserve.com', 
      phone: '+1 (555) 456-7890',
      industry: 'Cloud Services',
      employees: '100-250',
      plan: 'Basic', 
      status: 'Pending', 
      joinDate: '2024-03-10',
      address: '789 Cloud Blvd, Austin, TX',
      website: 'www.cloudserve.com',
      revenue: '$3.5M',
      growth: '+8%'
    },
    { 
      id: 4, 
      name: 'DataFlow Analytics', 
      email: 'support@dataflow.com', 
      phone: '+1 (555) 321-0987',
      industry: 'Data Analytics',
      employees: '75-150',
      plan: 'Pro', 
      status: 'Suspended', 
      joinDate: '2024-01-28',
      address: '321 Data Dr, Boston, MA',
      website: 'www.dataflow.com',
      revenue: '$2.1M',
      growth: '-5%'
    },
    { 
      id: 5, 
      name: 'InnovateLabs', 
      email: 'contact@innovatelabs.com', 
      phone: '+1 (555) 654-3210',
      industry: 'Research & Development',
      employees: '300-600',
      plan: 'Enterprise', 
      status: 'Active', 
      joinDate: '2024-02-05',
      address: '654 Innovation Way, Seattle, WA',
      website: 'www.innovatelabs.com',
      revenue: '$8.7M',
      growth: '+18%'
    },
    { 
      id: 6, 
      name: 'GreenTech Solutions', 
      email: 'info@greentech.com', 
      phone: '+1 (555) 789-0123',
      industry: 'Renewable Energy',
      employees: '150-300',
      plan: 'Pro', 
      status: 'Active', 
      joinDate: '2024-03-01',
      address: '987 Green St, Denver, CO',
      website: 'www.greentech.com',
      revenue: '$4.3M',
      growth: '+32%'
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [viewingCompany, setViewingCompany] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPlan, setFilterPlan] = useState('All')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    employees: '',
    plan: 'Basic',
    status: 'Active',
    address: '',
    website: '',
    revenue: '',
    growth: ''
  })

  const columns = [
    { 
      key: 'name', 
      title: 'Company',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
            <Building2 className="text-emerald-600" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.industry}</p>
          </div>
        </div>
      )
    },
    { key: 'email', title: 'Email' },
    { 
      key: 'plan', 
      title: 'Plan',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
          value === 'Pro' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-800' :
          value === 'Pending' ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'employees', title: 'Employees' },
    { 
      key: 'revenue', 
      title: 'Revenue',
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className={`text-xs ${
            row.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {row.growth} growth
          </p>
        </div>
      )
    },
  ]

  const stats = [
    {
      title: 'Total Companies',
      value: companies.length,
      change: '+12%',
      icon: Building2,
      color: 'bg-emerald-500'
    },
    {
      title: 'Active Companies',
      value: companies.filter(c => c.status === 'Active').length,
      change: '+8%',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Revenue',
      value: '$25.6M',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-amber-500'
    },
    {
      title: 'Avg. Employees',
      value: '287',
      change: '+5%',
      icon: Users,
      color: 'bg-purple-500'
    }
  ]

  const filteredCompanies = companies.filter(company => {
    if (filterStatus !== 'All' && company.status !== filterStatus) return false
    if (filterPlan !== 'All' && company.plan !== filterPlan) return false
    return true
  })

  const handleEdit = (company) => {
    setEditingCompany(company)
    setFormData(company)
    setIsModalOpen(true)
  }

  const handleView = (company) => {
    setViewingCompany(company)
    setIsViewModalOpen(true)
  }

  const handleDelete = (company) => {
    if (window.confirm(`Are you sure you want to delete ${company.name}?`)) {
      setCompanies(companies.filter(c => c.id !== company.id))
      toast.success('Company deleted successfully')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingCompany) {
      setCompanies(companies.map(c => 
        c.id === editingCompany.id ? { ...formData, id: c.id, joinDate: c.joinDate } : c
      ))
      toast.success('Company updated successfully')
    } else {
      const newCompany = {
        ...formData,
        id: companies.length + 1,
        joinDate: new Date().toISOString().split('T')[0]
      }
      setCompanies([...companies, newCompany])
      toast.success('Company added successfully')
    }
    
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCompany(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      industry: '',
      employees: '',
      plan: 'Basic',
      status: 'Active',
      address: '',
      website: '',
      revenue: '',
      growth: ''
    })
  }

  const exportCompanies = () => {
    const csvContent = [
      ['Company Name', 'Email', 'Plan', 'Status', 'Employees', 'Revenue', 'Growth'],
      ...companies.map(company => [
        company.name,
        company.email,
        company.plan,
        company.status,
        company.employees,
        company.revenue,
        company.growth
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'companies-list.csv'
    a.click()
    toast.success('Companies exported successfully')
  }

  const getStatusCounts = () => {
    const counts = { Active: 0, Pending: 0, Suspended: 0 }
    companies.forEach(c => counts[c.status]++)
    return counts
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies Management</h1>
          <p className="text-gray-600">Manage all registered companies</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportCompanies}
            className="btn-secondary flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Company
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Status Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Company Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(getStatusCounts()).map(([status, count]) => (
            <div key={status} className={`p-4 rounded-lg ${
              status === 'Active' ? 'bg-emerald-50' :
              status === 'Pending' ? 'bg-amber-50' :
              'bg-red-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    status === 'Active' ? 'text-emerald-800' :
                    status === 'Pending' ? 'text-amber-800' :
                    'text-red-800'
                  }`}>
                    {status}
                  </p>
                  <p className="text-2xl font-bold mt-2">{count} Companies</p>
                </div>
                <div className={`p-2 rounded-full ${
                  status === 'Active' ? 'bg-emerald-100' :
                  status === 'Pending' ? 'bg-amber-100' :
                  'bg-red-100'
                }`}>
                  {status === 'Active' ? (
                    <CheckCircle className="text-emerald-600" size={24} />
                  ) : status === 'Pending' ? (
                    <Calendar className="text-amber-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
            <select
              className="input-field"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="All">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <Table
        columns={columns}
        data={filteredCompanies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Add/Edit Company Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCompany ? 'Edit Company' : 'Add New Company'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="company@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="input-field"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                placeholder="e.g., Technology"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Range
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.employees}
                onChange={(e) => setFormData({...formData, employees: e.target.value})}
                placeholder="e.g., 50-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Plan
              </label>
              <select
                className="input-field"
                value={formData.plan}
                onChange={(e) => setFormData({...formData, plan: e.target.value})}
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="input-field"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Revenue
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.revenue}
                onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                placeholder="$1.5M"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              className="input-field"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              placeholder="www.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              className="input-field"
              rows="2"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter company address"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {editingCompany ? 'Update' : 'Add'} Company
            </button>
          </div>
        </form>
      </Modal>

      {/* View Company Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setViewingCompany(null)
        }}
        title="Company Details"
      >
        {viewingCompany && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Building2 className="text-emerald-600" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{viewingCompany.name}</h4>
                <p className="text-gray-600">{viewingCompany.industry}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  viewingCompany.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                  viewingCompany.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {viewingCompany.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-gray-500">
                  <Mail size={16} className="mr-2" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-medium">{viewingCompany.email}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-500">
                  <Phone size={16} className="mr-2" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-medium">{viewingCompany.phone}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-500">
                  <Globe size={16} className="mr-2" />
                  <span className="text-sm">Website</span>
                </div>
                <a href={`https://${viewingCompany.website}`} className="font-medium text-emerald-600 hover:underline">
                  {viewingCompany.website}
                </a>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-500">
                  <Users size={16} className="mr-2" />
                  <span className="text-sm">Employees</span>
                </div>
                <p className="font-medium">{viewingCompany.employees}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gray-500">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">Address</span>
              </div>
              <p className="font-medium">{viewingCompany.address}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{viewingCompany.revenue}</div>
                <div className="text-sm text-gray-500">Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${
                  viewingCompany.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {viewingCompany.growth}
                </div>
                <div className="text-sm text-gray-500">Growth</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{viewingCompany.plan}</div>
                <div className="text-sm text-gray-500">Plan</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  handleEdit(viewingCompany)
                  setIsViewModalOpen(false)
                }}
                className="btn-primary"
              >
                Edit Company
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}