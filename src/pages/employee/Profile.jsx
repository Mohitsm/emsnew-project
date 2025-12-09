import React, { useState } from 'react';

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

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    phone: '+91 98765 43210',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    location: 'Bangalore',
    emergencyContact: '+91 98765 43211',
    bloodGroup: 'O+',
    employeeId: 'EMP00123',
    joinDate: '2022-01-15'
  });

  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Aadhaar Card', 
      type: 'Identity', 
      uploaded: true,
      uploadDate: '2024-01-10',
      fileSize: '2.5 MB'
    },
    { 
      id: 2, 
      name: 'PAN Card', 
      type: 'Identity', 
      uploaded: true,
      uploadDate: '2024-01-10',
      fileSize: '1.8 MB'
    },
    { 
      id: 3, 
      name: 'Degree Certificate', 
      type: 'Education', 
      uploaded: true,
      uploadDate: '2024-01-12',
      fileSize: '3.2 MB'
    },
    { 
      id: 4, 
      name: 'Experience Letter', 
      type: 'Professional', 
      uploaded: false,
      uploadDate: '',
      fileSize: ''
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: 'Identity',
    file: null
  });
  const [editingDoc, setEditingDoc] = useState(null);

  const handleEditProfile = () => {
    setModalType('profile');
    setFormData({ ...profile });
    setShowModal(true);
  };

  const handleChangePassword = () => {
    setModalType('password');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowModal(true);
  };

  const handleUploadDocument = () => {
    setModalType('document');
    setEditingDoc(null);
    setDocumentForm({
      name: '',
      type: 'Identity',
      file: null
    });
    setShowModal(true);
  };

  const handleEditDocument = (doc) => {
    setModalType('editDocument');
    setEditingDoc(doc);
    setDocumentForm({
      name: doc.name,
      type: doc.type,
      file: null
    });
    setShowModal(true);
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleProfileSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setProfile({ ...formData });
    setShowModal(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    setShowModal(false);
    alert('Password changed successfully!');
  };

  const handleDocumentSubmit = () => {
    if (!documentForm.name) {
      alert('Please enter document name');
      return;
    }

    if (modalType === 'document') {
      const newDoc = {
        id: Math.max(...documents.map(d => d.id), 0) + 1,
        name: documentForm.name,
        type: documentForm.type,
        uploaded: true,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: '2.1 MB'
      };
      setDocuments([...documents, newDoc]);
      alert('Document uploaded successfully!');
    } else {
      setDocuments(documents.map(doc => 
        doc.id === editingDoc.id 
          ? { ...doc, name: documentForm.name, type: documentForm.type }
          : doc
      ));
      alert('Document updated successfully!');
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-5xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                <p className="text-gray-600">{profile.designation}</p>
                <p className="text-sm text-gray-500 mt-1">{profile.department}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleEditProfile}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="mr-2">✏️</span>
                  Edit Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="mr-2">🔒</span>
                  Change Password
                </button>
                <button
                  onClick={handleUploadDocument}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="mr-2">📄</span>
                  Upload Document
                </button>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee ID</span>
                    <span className="font-medium">{profile.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{profile.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group</span>
                    <span className="font-medium">{profile.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Join Date</span>
                    <span className="font-medium">{profile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.phone}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.emergencyContact}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.department}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    {profile.designation}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Documents ({documents.length})</h3>
                <button
                  onClick={handleUploadDocument}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Upload New
                </button>
              </div>

              <div className="space-y-4">
                {documents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No documents uploaded</p>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-2xl">📄</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <p className="text-sm text-gray-600">{doc.type}</p>
                            {doc.uploaded && doc.fileSize && (
                              <>
                                <span className="text-gray-400">•</span>
                                <p className="text-sm text-gray-600">{doc.fileSize}</p>
                              </>
                            )}
                            {doc.uploaded && doc.uploadDate && (
                              <>
                                <span className="text-gray-400">•</span>
                                <p className="text-sm text-gray-600">{doc.uploadDate}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          doc.uploaded
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.uploaded ? 'Uploaded' : 'Pending'}
                        </span>
                        <div className="flex space-x-3">
                          {doc.uploaded && (
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                              View
                            </button>
                          )}
                          <button
                            onClick={() => handleEditDocument(doc)}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
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

        {/* Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            {modalType === 'profile' ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter emergency contact"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
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
                    onClick={handleProfileSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : modalType === 'password' ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
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
                    onClick={handlePasswordSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Change Password
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {modalType === 'document' ? 'Upload Document' : 'Edit Document'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Name *
                    </label>
                    <input
                      type="text"
                      value={documentForm.name}
                      onChange={(e) => setDocumentForm({...documentForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter document name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select 
                      value={documentForm.type}
                      onChange={(e) => setDocumentForm({...documentForm, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Identity">Identity</option>
                      <option value="Education">Education</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                  {modalType === 'document' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload File
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <span className="text-4xl mb-2 block">📁</span>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDocumentSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {modalType === 'document' ? 'Upload' : 'Update'}
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;