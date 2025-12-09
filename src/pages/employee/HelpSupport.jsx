import React, { useState, useEffect } from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const HelpSupport = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Unable to mark attendance',
      category: 'attendance',
      description: 'The check-in button is not working on my mobile device',
      priority: 'high',
      status: 'open',
      createdAt: '2024-12-08'
    },
    {
      id: 2,
      title: 'Leave balance discrepancy',
      category: 'leave',
      description: 'My leave balance is showing incorrect number of days',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-12-07'
    },
    {
      id: 3,
      title: 'Salary slip download issue',
      category: 'payroll',
      description: 'Getting error when trying to download November salary slip',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-12-05'
    }
  ]);

  const [faqs] = useState([
    {
      id: 1,
      question: 'How do I apply for leave?',
      answer: 'Navigate to Leave Management section and click Apply for Leave button.',
      category: 'leave'
    },
    {
      id: 2,
      question: 'How can I download my salary slip?',
      answer: 'Go to Payroll section and click Download PDF button next to the salary month.',
      category: 'payroll'
    },
    {
      id: 3,
      question: 'What should I do if I forget to check-in?',
      answer: 'Contact your manager or HR to mark attendance manually.',
      category: 'attendance'
    },
    {
      id: 4,
      question: 'How do I update my personal information?',
      answer: 'Go to Profile section and click Edit Profile to update your details.',
      category: 'other'
    },
    {
      id: 5,
      question: 'What is the process for reimbursement claims?',
      answer: 'Submit your claim through the Payroll section with necessary receipts and approval.',
      category: 'payroll'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium',
    status: 'open'
  });

  const categories = [
    { id: 'attendance', label: 'Attendance' },
    { id: 'leave', label: 'Leave' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'technical', label: 'Technical' },
    { id: 'other', label: 'Other' },
  ];

  const handleCreateTicket = () => {
    setModalType('create');
    setSelectedTicket(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      priority: 'medium',
      status: 'open'
    });
    setShowModal(true);
  };

  const handleEditTicket = (ticket) => {
    setModalType('edit');
    setSelectedTicket(ticket);
    setFormData({
      title: ticket.title,
      category: ticket.category,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status
    });
    setShowModal(true);
  };

  const handleDeleteTicket = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(tickets.filter(ticket => ticket.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (modalType === 'create') {
      const newTicket = {
        id: Math.max(...tickets.map(t => t.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTickets([newTicket, ...tickets]);
    } else {
      setTickets(tickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? { ...ticket, ...formData }
          : ticket
      ));
    }
    
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
            <p className="text-gray-600">Get assistance and support</p>
          </div>
          <button
            onClick={handleCreateTicket}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create Ticket
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">Q: {faq.question}</h4>
                    <p className="text-gray-600 text-sm">A: {faq.answer}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {faq.category}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Was this helpful?
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-gray-600 text-sm">support@company.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-gray-600 text-sm">+91 80 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Office Hours</p>
                    <p className="text-gray-600 text-sm">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">My Tickets ({tickets.length})</h3>
              <div className="space-y-4">
                {tickets.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tickets found</p>
                    <p className="text-sm mt-2">Create a ticket to get started</p>
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 flex-1">{ticket.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)} ml-2`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {ticket.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{ticket.createdAt}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTicket(ticket)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {modalType === 'create' ? 'Create Support Ticket' : 'Edit Support Ticket'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ticket title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              {modalType === 'edit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Describe your issue in detail"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {modalType === 'create' ? 'Create Ticket' : 'Update Ticket'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HelpSupport;