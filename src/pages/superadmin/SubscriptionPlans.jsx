import { useState } from 'react'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Star, 
  CreditCard,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  Download,
  Eye
} from 'lucide-react'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic',
      price: '$19',
      period: 'per month',
      billing: 'Monthly',
      features: [
        'Up to 10 users',
        '5GB Storage',
        'Basic Support',
        'Email Support',
        'Basic Analytics'
      ],
      popular: false,
      status: 'Active',
      totalSubscribers: 245,
      revenue: '$4,655',
      growth: '+12%'
    },
    {
      id: 2,
      name: 'Pro',
      price: '$49',
      period: 'per month',
      billing: 'Monthly',
      features: [
        'Up to 50 users',
        '50GB Storage',
        'Priority Support',
        'Phone Support',
        'Advanced Analytics',
        'Custom Integrations',
        'API Access'
      ],
      popular: true,
      status: 'Active',
      totalSubscribers: 120,
      revenue: '$5,880',
      growth: '+18%'
    },
    {
      id: 3,
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      billing: 'Monthly',
      features: [
        'Unlimited users',
        '500GB Storage',
        '24/7 Support',
        'Dedicated Manager',
        'Custom Integration',
        'SLA Guarantee',
        'White Label',
        'Advanced Security'
      ],
      popular: false,
      status: 'Active',
      totalSubscribers: 48,
      revenue: '$4,752',
      growth: '+8%'
    },
    {
      id: 4,
      name: 'Starter',
      price: '$9',
      period: 'per month',
      billing: 'Monthly',
      features: [
        'Up to 5 users',
        '1GB Storage',
        'Community Support',
        'Basic Features'
      ],
      popular: false,
      status: 'Inactive',
      totalSubscribers: 89,
      revenue: '$801',
      growth: '+5%'
    },
    {
      id: 5,
      name: 'Business',
      price: '$79',
      period: 'per month',
      billing: 'Yearly',
      features: [
        'Up to 100 users',
        '200GB Storage',
        'Priority Support',
        'Phone & Email',
        'Advanced Analytics',
        'Custom Reports'
      ],
      popular: false,
      status: 'Active',
      totalSubscribers: 67,
      revenue: '$5,293',
      growth: '+15%'
    }
  ])

  const [subscribers, setSubscribers] = useState([
    { id: 1, company: 'TechCorp', plan: 'Pro', startDate: '2024-01-15', status: 'Active', renewal: '2024-04-15' },
    { id: 2, company: 'DesignStudio', plan: 'Enterprise', startDate: '2024-02-20', status: 'Active', renewal: '2024-05-20' },
    { id: 3, company: 'CloudServe', plan: 'Basic', startDate: '2024-03-10', status: 'Pending', renewal: '2024-06-10' },
    { id: 4, company: 'DataFlow', plan: 'Pro', startDate: '2024-01-28', status: 'Suspended', renewal: '2024-04-28' },
    { id: 5, company: 'InnovateLabs', plan: 'Enterprise', startDate: '2024-02-05', status: 'Active', renewal: '2024-05-05' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubscriberModalOpen, setIsSubscriberModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [selectedSubscriber, setSelectedSubscriber] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'per month',
    billing: 'Monthly',
    features: [''],
    popular: false,
    status: 'Active'
  })

  const [subscriberForm, setSubscriberForm] = useState({
    company: '',
    plan: 'Basic',
    startDate: '',
    status: 'Active'
  })

  const columns = [
    { key: 'name', title: 'Plan Name' },
    { 
      key: 'price', 
      title: 'Price',
      render: (value, row) => (
        <div>
          <div className="text-lg font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.period}</div>
        </div>
      )
    },
    { key: 'billing', title: 'Billing Cycle' },
    { 
      key: 'popular', 
      title: 'Popular',
      render: (value) => (
        value ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <Star size={12} className="mr-1" />
            Most Popular
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-800' :
          value === 'Inactive' ? 'bg-gray-100 text-gray-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'totalSubscribers', 
      title: 'Subscribers',
      render: (value) => (
        <div className="flex items-center">
          <Users size={16} className="text-gray-400 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
  ]

  const subscriberColumns = [
    { key: 'company', title: 'Company' },
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
    { key: 'startDate', title: 'Start Date' },
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
    { key: 'renewal', title: 'Renewal Date' },
  ]

  const stats = [
    {
      title: 'Total Revenue',
      value: '$21,341',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-emerald-500'
    },
    {
      title: 'Active Subscriptions',
      value: '569',
      change: '+8%',
      icon: CreditCard,
      color: 'bg-blue-500'
    },
    {
      title: 'Monthly Recurring',
      value: '$8,240',
      change: '+12%',
      icon: Zap,
      color: 'bg-amber-500'
    },
    {
      title: 'Avg. Revenue/User',
      value: '$37.50',
      change: '+5%',
      icon: Users,
      color: 'bg-purple-500'
    }
  ]

  const handleEdit = (plan) => {
    setEditingPlan(plan)
    setFormData({
      ...plan,
      features: [...plan.features]
    })
    setIsModalOpen(true)
  }

  const handleDelete = (plan) => {
    if (window.confirm(`Are you sure you want to delete the ${plan.name} plan?`)) {
      setPlans(plans.filter(p => p.id !== plan.id))
      toast.success('Plan deleted successfully')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newPlan = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      totalSubscribers: editingPlan ? editingPlan.totalSubscribers : 0,
      revenue: editingPlan ? editingPlan.revenue : '$0',
      growth: editingPlan ? editingPlan.growth : '+0%'
    }

    if (editingPlan) {
      setPlans(plans.map(p => 
        p.id === editingPlan.id ? { ...newPlan, id: p.id } : p
      ))
      toast.success('Plan updated successfully')
    } else {
      setPlans([...plans, { 
        ...newPlan, 
        id: plans.length + 1 
      }])
      toast.success('Plan added successfully')
    }
    
    handleCloseModal()
  }

  const handleViewSubscriber = (subscriber) => {
    setSelectedSubscriber(subscriber)
    setIsSubscriberModalOpen(true)
  }

  const handleUpdateSubscriber = (e) => {
    e.preventDefault()
    
    if (selectedSubscriber) {
      setSubscribers(subscribers.map(s => 
        s.id === selectedSubscriber.id ? { ...subscriberForm, id: s.id } : s
      ))
      toast.success('Subscriber updated successfully')
      setIsSubscriberModalOpen(false)
      setSelectedSubscriber(null)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPlan(null)
    setFormData({
      name: '',
      price: '',
      period: 'per month',
      billing: 'Monthly',
      features: [''],
      popular: false,
      status: 'Active'
    })
  }

  const addFeatureField = () => {
    setFormData({...formData, features: [...formData.features, '']})
  }

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({...formData, features: newFeatures})
  }

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({...formData, features: newFeatures})
  }

  const exportPlans = () => {
    const csvContent = [
      ['Plan Name', 'Price', 'Billing Cycle', 'Status', 'Subscribers', 'Revenue'],
      ...plans.map(plan => [
        plan.name,
        plan.price,
        plan.billing,
        plan.status,
        plan.totalSubscribers,
        plan.revenue
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscription-plans.csv'
    a.click()
    toast.success('Plans exported successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-gray-600">Manage your subscription plans and pricing</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportPlans}
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
            Add New Plan
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

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`card relative hover:shadow-md transition-shadow ${plan.popular ? 'border-2 border-emerald-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star size={14} className="mr-1" />
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                {plan.status === 'Inactive' && (
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    Inactive
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{plan.billing} billing</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-emerald-500 mr-3" size={18} />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.totalSubscribers}</div>
                  <div className="text-xs text-gray-500">Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.revenue}</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(plan)}
                  className="btn-secondary flex-1 flex items-center justify-center"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan)}
                  className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Subscribers Table */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Active Subscribers</h3>
            <p className="text-gray-600">Manage subscription customers</p>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="text-sm text-gray-500">Total: {subscribers.length} companies</span>
          </div>
        </div>

        <Table
          columns={subscriberColumns}
          data={subscribers}
          onView={handleViewSubscriber}
          actions={true}
        />
      </div>

      {/* Billing Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <CreditCard className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Billing Methods</h3>
              <p className="text-sm text-gray-600">Manage payment gateways</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded mr-3"></div>
                <div>
                  <p className="font-medium">Stripe</p>
                  <p className="text-sm text-gray-500">Connected</p>
                </div>
              </div>
              <span className="text-emerald-600 text-sm font-medium">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded mr-3"></div>
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-gray-500">Connected</p>
                </div>
              </div>
              <span className="text-emerald-600 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <Shield className="text-emerald-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tax Settings</h3>
              <p className="text-sm text-gray-600">Configure tax rates</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax Collection</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax Rate</span>
              <span className="font-medium">18%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax Region</span>
              <span className="font-medium">United States</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Plan Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPlan ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Professional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="$49"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Period
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                placeholder="per month"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Cycle
              </label>
              <select
                className="input-field"
                value={formData.billing}
                onChange={(e) => setFormData({...formData, billing: e.target.value})}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="One-time">One-time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="input-field"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Feature
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="popular"
                checked={formData.popular}
                onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="popular" className="ml-2 text-sm text-gray-700">
                Mark as Popular Plan
              </label>
            </div>

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
                <option value="Inactive">Inactive</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
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
              {editingPlan ? 'Update' : 'Add'} Plan
            </button>
          </div>
        </form>
      </Modal>

      {/* Subscriber Details Modal */}
      <Modal
        isOpen={isSubscriberModalOpen}
        onClose={() => {
          setIsSubscriberModalOpen(false)
          setSelectedSubscriber(null)
        }}
        title="Subscriber Details"
      >
        {selectedSubscriber && (
          <form onSubmit={handleUpdateSubscriber} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={subscriberForm.company || selectedSubscriber.company}
                onChange={(e) => setSubscriberForm({...subscriberForm, company: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan
              </label>
              <select
                className="input-field"
                value={subscriberForm.plan || selectedSubscriber.plan}
                onChange={(e) => setSubscriberForm({...subscriberForm, plan: e.target.value})}
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Starter">Starter</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  className="input-field"
                  value={subscriberForm.startDate || selectedSubscriber.startDate}
                  onChange={(e) => setSubscriberForm({...subscriberForm, startDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="input-field"
                  value={subscriberForm.status || selectedSubscriber.status}
                  onChange={(e) => setSubscriberForm({...subscriberForm, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsSubscriberModalOpen(false)
                  setSelectedSubscriber(null)
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Update Subscriber
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}