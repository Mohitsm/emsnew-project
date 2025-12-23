// components/DocumentManagement.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';

const AdminDocumentManagement = () => {
        const [loading, setLoading] = useState(false);
  // Static documents data
  const staticDocuments = [
    {
      id: 1,
      title: 'PAN Card',
      category: 'Identity',
      employeeId: 1,
      employeeName: 'John Doe',
      uploadDate: '2024-12-01',
      expiryDate: null,
      status: 'verified',
      fileSize: '1.2 MB',
      fileType: 'pdf',
      description: 'Permanent Account Number card for tax purposes',
      verifiedBy: 'Admin User',
      verifiedDate: '2024-12-02'
    },
    {
      id: 2,
      title: 'Aadhaar Card',
      category: 'Identity',
      employeeId: 2,
      employeeName: 'Jane Smith',
      uploadDate: '2024-12-02',
      expiryDate: null,
      status: 'pending',
      fileSize: '2.5 MB',
      fileType: 'jpg',
      description: 'Government issued identification card',
      verifiedBy: null,
      verifiedDate: null
    },
    {
      id: 3,
      title: 'Bachelor Degree Certificate',
      category: 'Education',
      employeeId: 1,
      employeeName: 'John Doe',
      uploadDate: '2024-11-28',
      expiryDate: null,
      status: 'verified',
      fileSize: '3.1 MB',
      fileType: 'pdf',
      description: 'B.Tech Computer Science degree certificate',
      verifiedBy: 'HR Manager',
      verifiedDate: '2024-11-29'
    },
    {
      id: 4,
      title: 'Previous Employment Certificate',
      category: 'Experience',
      employeeId: 2,
      employeeName: 'Jane Smith',
      uploadDate: '2024-12-03',
      expiryDate: null,
      status: 'rejected',
      fileSize: '1.8 MB',
      fileType: 'pdf',
      description: 'Experience letter from previous company',
      verifiedBy: 'HR Manager',
      verifiedDate: '2024-12-04',
      rejectionReason: 'Document not clear, please upload a clearer copy'
    },
    {
      id: 5,
      title: 'Passport Copy',
      category: 'Identity',
      employeeId: 3,
      employeeName: 'Mike Johnson',
      uploadDate: '2024-12-05',
      expiryDate: '2030-06-15',
      status: 'pending',
      fileSize: '4.2 MB',
      fileType: 'pdf',
      description: 'International passport for travel purposes',
      verifiedBy: null,
      verifiedDate: null
    },
    {
      id: 6,
      title: 'Bank Statement',
      category: 'Financial',
      employeeId: 4,
      employeeName: 'Sarah Williams',
      uploadDate: '2024-12-04',
      expiryDate: null,
      status: 'verified',
      fileSize: '2.3 MB',
      fileType: 'pdf',
      description: 'Last 3 months bank statement',
      verifiedBy: 'Finance Admin',
      verifiedDate: '2024-12-05'
    },
    {
      id: 7,
      title: 'Driving License',
      category: 'Identity',
      employeeId: 5,
      employeeName: 'David Brown',
      uploadDate: '2024-12-06',
      expiryDate: '2028-03-31',
      status: 'pending',
      fileSize: '1.5 MB',
      fileType: 'jpg',
      description: 'Valid driving license',
      verifiedBy: null,
      verifiedDate: null
    }
  ];

  // Static categories data
  const staticCategories = [
    { 
      id: 1, 
      name: 'Identity', 
      description: 'Personal identification documents (PAN, Aadhaar, Passport, Driving License)',
      count: 4,
      required: true
    },
    { 
      id: 2, 
      name: 'Education', 
      description: 'Educational certificates, degrees, and transcripts',
      count: 1,
      required: true
    },
    { 
      id: 3, 
      name: 'Experience', 
      description: 'Previous work experience letters and certificates',
      count: 1,
      required: false
    },
    { 
      id: 4, 
      name: 'Financial', 
      description: 'Bank statements, salary slips, and financial documents',
      count: 1,
      required: true
    },
    { 
      id: 5, 
      name: 'Legal', 
      description: 'Legal agreements, contracts, and compliance documents',
      count: 0,
      required: false
    },
    { 
      id: 6, 
      name: 'Medical', 
      description: 'Medical certificates and health insurance documents',
      count: 0,
      required: false
    }
  ];

  // Static employees data
  const staticEmployees = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Sales' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing' },
    { id: 4, name: 'Sarah Williams', department: 'HR' },
    { id: 5, name: 'David Brown', department: 'Finance' }
  ];

  // State management
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Form states
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: '',
    employeeId: '',
    description: '',
    expiryDate: '',
    file: null,
    fileName: '',
    fileSize: 0,
    fileType: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    required: false
  });

  const [rejectionForm, setRejectionForm] = useState({
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD Operations
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setDocuments(staticDocuments);
      setCategories(staticCategories);
      setEmployees(staticEmployees);
      setLoading(false);
    }, 500);
  };

  // DOCUMENT CRUD
  const handleUploadDocument = () => {
    if (!uploadForm.title.trim()) {
      alert('Please enter document title');
      return;
    }
    
    if (!uploadForm.category) {
      alert('Please select a category');
      return;
    }
    
    if (!uploadForm.employeeId) {
      alert('Please select an employee');
      return;
    }

    const employee = employees.find(emp => emp.id === parseInt(uploadForm.employeeId));
    const category = categories.find(cat => cat.name === uploadForm.category);

    if (!employee || !category) {
      alert('Invalid selection');
      return;
    }

    const newDocument = {
      id: Math.max(...documents.map(d => d.id), 0) + 1,
      title: uploadForm.title,
      category: uploadForm.category,
      employeeId: parseInt(uploadForm.employeeId),
      employeeName: employee.name,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: uploadForm.expiryDate || null,
      status: 'pending',
      fileSize: uploadForm.fileSize ? `${(uploadForm.fileSize / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      fileType: uploadForm.fileType || 'unknown',
      description: uploadForm.description,
      verifiedBy: null,
      verifiedDate: null
    };

    // Update category count
    const updatedCategories = categories.map(cat => 
      cat.name === uploadForm.category ? { ...cat, count: cat.count + 1 } : cat
    );
    setCategories(updatedCategories);

    setDocuments([newDocument, ...documents]);
    
    // Reset form
    setUploadForm({
      title: '',
      category: '',
      employeeId: '',
      description: '',
      expiryDate: '',
      file: null,
      fileName: '',
      fileSize: 0,
      fileType: ''
    });
    
    setShowUploadModal(false);
    alert('Document uploaded successfully!');
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const handleVerifyDocument = (documentId) => {
    setDocuments(documents.map(doc =>
      doc.id === documentId 
        ? { 
            ...doc, 
            status: 'verified',
            verifiedBy: 'Admin User',
            verifiedDate: new Date().toISOString().split('T')[0]
          } 
        : doc
    ));
    
    if (selectedDocument?.id === documentId) {
      setSelectedDocument(prev => ({
        ...prev,
        status: 'verified',
        verifiedBy: 'Admin User',
        verifiedDate: new Date().toISOString().split('T')[0]
      }));
    }
    
    alert('Document verified successfully!');
  };

  const handleRejectDocument = (documentId) => {
    if (!rejectionForm.reason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setDocuments(documents.map(doc =>
      doc.id === documentId 
        ? { 
            ...doc, 
            status: 'rejected',
            rejectionReason: rejectionForm.reason,
            verifiedBy: 'Admin User',
            verifiedDate: new Date().toISOString().split('T')[0]
          } 
        : doc
    ));
    
    if (selectedDocument?.id === documentId) {
      setSelectedDocument(prev => ({
        ...prev,
        status: 'rejected',
        rejectionReason: rejectionForm.reason,
        verifiedBy: 'Admin User',
        verifiedDate: new Date().toISOString().split('T')[0]
      }));
    }
    
    setRejectionForm({ reason: '' });
    alert('Document rejected successfully!');
  };

  const handleDeleteDocument = (documentId) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;

    if (window.confirm(`Are you sure you want to delete "${document.title}"?`)) {
      // Update category count
      const updatedCategories = categories.map(cat => 
        cat.name === document.category ? { ...cat, count: cat.count - 1 } : cat
      );
      setCategories(updatedCategories);

      setDocuments(documents.filter(doc => doc.id !== documentId));
      if (selectedDocument?.id === documentId) {
        setSelectedDocument(null);
        setShowDocumentModal(false);
      }
      alert('Document deleted successfully!');
    }
  };

  const handleDownloadDocument = (document) => {
    // Simulate file download
    const documentContent = `
      Document Details:
      Title: ${document.title}
      Category: ${document.category}
      Employee: ${document.employeeName}
      Upload Date: ${document.uploadDate}
      Status: ${document.status}
      Description: ${document.description}
      ${document.expiryDate ? `Expiry Date: ${document.expiryDate}` : ''}
      ${document.verifiedBy ? `Verified By: ${document.verifiedBy}` : ''}
      ${document.verifiedDate ? `Verified Date: ${document.verifiedDate}` : ''}
      ${document.rejectionReason ? `Rejection Reason: ${document.rejectionReason}` : ''}
    `;

    const blob = new Blob([documentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title.replace(/\s+/g, '-').toLowerCase()}-${document.employeeName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // CATEGORY CRUD
  const handleAddCategory = () => {
    if (!categoryForm.name.trim()) {
      alert('Please enter category name');
      return;
    }

    // Check for duplicate category name
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === categoryForm.name.toLowerCase()
    );
    
    if (existingCategory) {
      alert('Category with this name already exists!');
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...categoryForm }
          : cat
      ));
      alert('Category updated successfully!');
    } else {
      // Create new category
      const newCategory = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        name: categoryForm.name,
        description: categoryForm.description,
        count: 0,
        required: categoryForm.required
      };
      setCategories([...categories, newCategory]);
      alert('Category added successfully!');
    }

    setCategoryForm({
      name: '',
      description: '',
      required: false
    });
    setEditingCategory(null);
    setShowCategoryModal(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      required: category.required
    });
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    // Check if category has documents
    if (category.count > 0) {
      alert('Cannot delete category with assigned documents. Please reassign or delete documents first.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${category.name}" category?`)) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      alert('Category deleted successfully!');
    }
  };

  // Helper functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('jpg') || fileType.includes('jpeg') || fileType.includes('png')) return '🖼️';
    if (fileType.includes('doc')) return '📝';
    return '📎';
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    if (filterCategory && doc.category !== filterCategory) return false;
    if (filterStatus && doc.status !== filterStatus) return false;
    if (filterEmployee && doc.employeeId !== parseInt(filterEmployee)) return false;
    if (searchQuery && 
        !doc.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doc.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doc.employeeName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Statistics
  const stats = {
    totalDocuments: documents.length,
    verified: documents.filter(d => d.status === 'verified').length,
    pending: documents.filter(d => d.status === 'pending').length,
    rejected: documents.filter(d => d.status === 'rejected').length
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm({
        ...uploadForm,
        file: file,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });
    }
  };

  // Get employees without documents
  const getEmployeesWithoutDocuments = () => {
    const employeesWithDocs = new Set(documents.map(doc => doc.employeeId));
    return employees.filter(emp => !employeesWithDocs.has(emp.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Document Management</h2>
            <p className="text-gray-600">Manage employee documents and verification</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', description: '', required: false });
                setShowCategoryModal(true);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              📂 Add Category
            </button>
            <button
              onClick={() => {
                setUploadForm({
                  title: '',
                  category: '',
                  employeeId: '',
                  description: '',
                  expiryDate: '',
                  file: null,
                  fileName: '',
                  fileSize: 0,
                  fileType: ''
                });
                setShowUploadModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              📤 Upload Document
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Total Documents</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Verified</div>
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Pending Review</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-600">Rejected</div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                placeholder="Search documents..."
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('');
                  setFilterStatus('');
                  setFilterEmployee('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'list' ? 'Grid View' : 'List View'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Categories */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Document Categories</h3>
                <span className="text-sm text-gray-500">{categories.length} categories</span>
              </div>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        {category.required && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">{category.count} docs</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Verified Documents</span>
                  <span className="font-bold text-green-600">{stats.verified}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Pending Review</span>
                  <span className="font-bold text-yellow-600">{stats.pending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rejected</span>
                  <span className="font-bold text-red-600">{stats.rejected}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Employees without docs:</span>
                    <span className="font-bold text-blue-600">{getEmployeesWithoutDocuments().length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document List/Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Documents ({filteredDocuments.length})</h3>
                <span className="text-sm text-gray-500">
                  Showing {filteredDocuments.length} of {documents.length} documents
                </span>
              </div>

              {viewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDocuments.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                            No documents found. Try adjusting your filters or upload a new document.
                          </td>
                        </tr>
                      ) : (
                        filteredDocuments.map(doc => (
                          <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <span className="text-2xl mr-3">{getFileIcon(doc.fileType)}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{doc.title}</div>
                                  <div className="text-sm text-gray-500">{doc.fileSize} • {doc.fileType}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{doc.employeeName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                {doc.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {doc.uploadDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewDocument(doc)}
                                  className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleDownloadDocument(doc)}
                                  className="text-green-600 hover:text-green-700 text-sm"
                                >
                                  Download
                                </button>
                                {doc.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleVerifyDocument(doc.id)}
                                      className="text-green-600 hover:text-green-700 text-sm"
                                    >
                                      Verify
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedDocument(doc);
                                        setShowDocumentModal(true);
                                      }}
                                      className="text-red-600 hover:text-red-700 text-sm"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  className="text-red-600 hover:text-red-700 text-sm"
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
              ) : (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map(doc => (
                    <div key={doc.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="text-3xl mr-3">{getFileIcon(doc.fileType)}</span>
                            <div>
                              <h4 className="font-bold text-gray-900">{doc.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-3">📊 {doc.fileSize}</span>
                            <span>🗓️ {doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-medium text-gray-900">{doc.employeeName}</div>
                          <span className="text-sm text-gray-500">{doc.category}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDownloadDocument(doc)}
                          className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Document Modal */}
        <Modal
          show={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload New Document"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., PAN Card, Degree Certificate"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name} {cat.required ? '(Required)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={uploadForm.employeeId}
                onChange={(e) => setUploadForm({...uploadForm, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Document description or notes"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={uploadForm.expiryDate}
                  onChange={(e) => setUploadForm({...uploadForm, expiryDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Size
                </label>
                <div className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
                  {uploadForm.fileSize ? `${(uploadForm.fileSize / (1024 * 1024)).toFixed(1)} MB` : 'No file selected'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                {uploadForm.file ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl mb-4">📄</span>
                    <div className="text-center mb-4">
                      <p className="font-medium text-gray-900">{uploadForm.fileName}</p>
                      <p className="text-sm text-gray-600">
                        {(uploadForm.fileSize / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadForm({...uploadForm, file: null, fileName: '', fileSize: 0, fileType: ''})}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-4">📎</div>
                    <p className="text-gray-600 mb-4">Drag & drop your file or click to browse</p>
                    <label className="cursor-pointer">
                      <span className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 inline-block">
                        Browse Files
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-4">
                      Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX<br />
                      Max file size: 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUploadDocument}
              disabled={!uploadForm.title || !uploadForm.category || !uploadForm.employeeId}
              className={`px-4 py-2 rounded-lg ${
                !uploadForm.title || !uploadForm.category || !uploadForm.employeeId
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Upload Document
            </button>
          </div>
        </Modal>

        {/* Add/Edit Category Modal */}
        <Modal
          show={showCategoryModal}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          title={editingCategory ? 'Edit Category' : 'Add Document Category'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Identity Documents"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Describe what documents belong to this category"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={categoryForm.required}
                onChange={(e) => setCategoryForm({...categoryForm, required: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="required" className="ml-2 text-sm text-gray-700">
                Required for all employees
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowCategoryModal(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddCategory}
              disabled={!categoryForm.name.trim()}
              className={`px-4 py-2 rounded-lg ${
                !categoryForm.name.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </Modal>

        {/* Document Details Modal */}
        <Modal
          show={showDocumentModal}
          onClose={() => {
            setShowDocumentModal(false);
            setSelectedDocument(null);
          }}
          title="Document Details"
          size="lg"
        >
          {selectedDocument ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{getFileIcon(selectedDocument.fileType)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedDocument.title}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full mt-2 inline-block ${getStatusColor(selectedDocument.status)}`}>
                      {selectedDocument.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Uploaded</div>
                  <div className="font-medium">{selectedDocument.uploadDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                  <p className="text-gray-900 font-medium">{selectedDocument.employeeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {selectedDocument.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                  <p className="text-gray-900">{selectedDocument.fileSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <p className="text-gray-900">{selectedDocument.fileType.toUpperCase()}</p>
                </div>
              </div>

              {selectedDocument.expiryDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <p className="text-gray-900">{selectedDocument.expiryDate}</p>
                  {new Date(selectedDocument.expiryDate) < new Date() && (
                    <p className="text-sm text-red-600 mt-1">⚠️ This document has expired</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900">{selectedDocument.description}</p>
              </div>

              {selectedDocument.status === 'verified' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <div>
                      <h4 className="font-medium text-green-900">Verified Document</h4>
                      <p className="text-sm text-green-700">
                        Verified by {selectedDocument.verifiedBy} on {selectedDocument.verifiedDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedDocument.status === 'rejected' && selectedDocument.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-2">✗</span>
                    <div>
                      <h4 className="font-medium text-red-900">Rejected Document</h4>
                      <p className="text-sm text-red-700">
                        Rejected by {selectedDocument.verifiedBy} on {selectedDocument.verifiedDate}
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        <strong>Reason:</strong> {selectedDocument.rejectionReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedDocument.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="mb-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Pending Review</h4>
                    <p className="text-sm text-yellow-700">
                      This document is waiting for verification by HR or admin.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-yellow-700">Rejection Reason (if rejecting)</label>
                    <textarea
                      value={rejectionForm.reason}
                      onChange={(e) => setRejectionForm({...rejectionForm, reason: e.target.value})}
                      className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      rows="2"
                      placeholder="Enter reason for rejection..."
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadDocument(selectedDocument)}
                  className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  Download
                </button>
                
                {selectedDocument.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleVerifyDocument(selectedDocument.id);
                        setShowDocumentModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Verify Document
                    </button>
                    <button
                      onClick={() => {
                        if (rejectionForm.reason.trim()) {
                          handleRejectDocument(selectedDocument.id);
                          setShowDocumentModal(false);
                        } else {
                          alert('Please enter a rejection reason');
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Document
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDeleteDocument(selectedDocument.id)}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No document selected
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminDocumentManagement;