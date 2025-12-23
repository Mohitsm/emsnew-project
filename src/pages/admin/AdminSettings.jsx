// components/Settings.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';

const AdminSettings = () => {
    const [loading, setLoading] = useState(false);
  // Settings tabs
  const [activeTab, setActiveTab] = useState('company');
  
  // Company Profile Settings
  const [companyProfile, setCompanyProfile] = useState({
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    phone: '+91 80 1234 5678',
    address: '123 Business Street, Silicon Valley, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    pincode: '560001',
    website: 'https://www.techcorp.com',
    taxId: 'TAX123456789',
    registrationNumber: 'REG2023001',
    foundedDate: '2015-01-15',
    industry: 'Technology',
    employeeCount: 150,
    logo: null
  });

  // Attendance Settings
  const [attendanceSettings, setAttendanceSettings] = useState({
    checkInTime: '09:00',
    checkOutTime: '18:00',
    lateThreshold: 15,
    halfDayHours: 4,
    fullDayHours: 8,
    autoCheckout: true,
    weekendWorking: false,
    gracePeriod: 5,
    shiftRotation: false,
    geofencing: false,
    biometricIntegration: true
  });

  // Payroll Settings
  const [payrollSettings, setPayrollSettings] = useState({
    payrollDay: 5,
    currency: 'INR',
    taxDeduction: true,
    pfEnabled: true,
    pfEmployerContribution: 12,
    pfEmployeeContribution: 12,
    esicEnabled: true,
    esicEmployerContribution: 3.25,
    esicEmployeeContribution: 0.75,
    bonusPercentage: 10,
    advanceSalaryLimit: 50,
    loanDeduction: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    leaveApproval: true,
    payrollReminder: true,
    attendanceAlerts: true,
    holidayReminder: true,
    birthdayReminder: true,
    announcementNotifications: true,
    documentExpiryAlerts: true
  });

  // Leave Settings
  const [leaveSettings, setLeaveSettings] = useState({
    casualLeave: 12,
    sickLeave: 12,
    earnedLeave: 15,
    maternityLeave: 26,
    paternityLeave: 7,
    carryForward: true,
    maxCarryForward: 30,
    approvalWorkflow: 'direct_manager',
    leaveEncashment: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    ipRestriction: false,
    deviceRestriction: false,
    auditLogs: true,
    failedAttempts: 5,
    encryptionEnabled: true
  });

  // UI Settings
  const [uiSettings, setUiSettings] = useState({
    theme: 'light',
    language: 'english',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: '24h',
    defaultDashboard: 'overview',
    compactView: false,
    animations: true,
    highContrast: false
  });

  // Integration Settings
  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: false,
    slackIntegration: true,
    whatsappNotifications: false,
    biometricDevice: true,
    accountingSoftware: 'Tally',
    emailService: 'Gmail',
    smsGateway: 'Twilio',
    cloudStorage: 'AWS'
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [backupData, setBackupData] = useState(null);

  // Load settings from localStorage on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Try to load from localStorage
      const savedCompanyProfile = localStorage.getItem('companyProfile');
      const savedAttendanceSettings = localStorage.getItem('attendanceSettings');
      const savedPayrollSettings = localStorage.getItem('payrollSettings');
      const savedNotificationSettings = localStorage.getItem('notificationSettings');
      const savedLeaveSettings = localStorage.getItem('leaveSettings');
      const savedSecuritySettings = localStorage.getItem('securitySettings');
      const savedUiSettings = localStorage.getItem('uiSettings');
      const savedIntegrationSettings = localStorage.getItem('integrationSettings');
      
      if (savedCompanyProfile) setCompanyProfile(JSON.parse(savedCompanyProfile));
      if (savedAttendanceSettings) setAttendanceSettings(JSON.parse(savedAttendanceSettings));
      if (savedPayrollSettings) setPayrollSettings(JSON.parse(savedPayrollSettings));
      if (savedNotificationSettings) setNotificationSettings(JSON.parse(savedNotificationSettings));
      if (savedLeaveSettings) setLeaveSettings(JSON.parse(savedLeaveSettings));
      if (savedSecuritySettings) setSecuritySettings(JSON.parse(savedSecuritySettings));
      if (savedUiSettings) setUiSettings(JSON.parse(savedUiSettings));
      if (savedIntegrationSettings) setIntegrationSettings(JSON.parse(savedIntegrationSettings));
      
      setLoading(false);
    }, 800);
  };

  const handleSave = () => {
    setLoading(true);
    
    // Simulate saving delay
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem('companyProfile', JSON.stringify(companyProfile));
      localStorage.setItem('attendanceSettings', JSON.stringify(attendanceSettings));
      localStorage.setItem('payrollSettings', JSON.stringify(payrollSettings));
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      localStorage.setItem('leaveSettings', JSON.stringify(leaveSettings));
      localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
      localStorage.setItem('uiSettings', JSON.stringify(uiSettings));
      localStorage.setItem('integrationSettings', JSON.stringify(integrationSettings));
      
      setLoading(false);
      alert('Settings saved successfully!');
    }, 500);
  };

  const handleReset = () => {
    // Reset all settings to default
    setCompanyProfile({
      name: 'TechCorp Solutions',
      email: 'hr@techcorp.com',
      phone: '+91 80 1234 5678',
      address: '123 Business Street, Silicon Valley, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001',
      website: 'https://www.techcorp.com',
      taxId: 'TAX123456789',
      registrationNumber: 'REG2023001',
      foundedDate: '2015-01-15',
      industry: 'Technology',
      employeeCount: 150,
      logo: null
    });
    
    setAttendanceSettings({
      checkInTime: '09:00',
      checkOutTime: '18:00',
      lateThreshold: 15,
      halfDayHours: 4,
      fullDayHours: 8,
      autoCheckout: true,
      weekendWorking: false,
      gracePeriod: 5,
      shiftRotation: false,
      geofencing: false,
      biometricIntegration: true
    });
    
    setPayrollSettings({
      payrollDay: 5,
      currency: 'INR',
      taxDeduction: true,
      pfEnabled: true,
      pfEmployerContribution: 12,
      pfEmployeeContribution: 12,
      esicEnabled: true,
      esicEmployerContribution: 3.25,
      esicEmployeeContribution: 0.75,
      bonusPercentage: 10,
      advanceSalaryLimit: 50,
      loanDeduction: true
    });
    
    setNotificationSettings({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      leaveApproval: true,
      payrollReminder: true,
      attendanceAlerts: true,
      holidayReminder: true,
      birthdayReminder: true,
      announcementNotifications: true,
      documentExpiryAlerts: true
    });
    
    setLeaveSettings({
      casualLeave: 12,
      sickLeave: 12,
      earnedLeave: 15,
      maternityLeave: 26,
      paternityLeave: 7,
      carryForward: true,
      maxCarryForward: 30,
      approvalWorkflow: 'direct_manager',
      leaveEncashment: true
    });
    
    setSecuritySettings({
      twoFactorAuth: true,
      passwordExpiry: 90,
      sessionTimeout: 30,
      ipRestriction: false,
      deviceRestriction: false,
      auditLogs: true,
      failedAttempts: 5,
      encryptionEnabled: true
    });
    
    setUiSettings({
      theme: 'light',
      language: 'english',
      dateFormat: 'DD-MM-YYYY',
      timeFormat: '24h',
      defaultDashboard: 'overview',
      compactView: false,
      animations: true,
      highContrast: false
    });
    
    setIntegrationSettings({
      googleCalendar: false,
      slackIntegration: true,
      whatsappNotifications: false,
      biometricDevice: true,
      accountingSoftware: 'Tally',
      emailService: 'Gmail',
      smsGateway: 'Twilio',
      cloudStorage: 'AWS'
    });
    
    setShowResetModal(false);
    alert('Settings reset to defaults successfully!');
  };

  const handleExportSettings = () => {
    const allSettings = {
      companyProfile,
      attendanceSettings,
      payrollSettings,
      notificationSettings,
      leaveSettings,
      securitySettings,
      uiSettings,
      integrationSettings,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(allSettings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setShowExportModal(false);
    alert('Settings exported successfully!');
  };

  const handleImportSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        
        if (importedSettings.companyProfile) setCompanyProfile(importedSettings.companyProfile);
        if (importedSettings.attendanceSettings) setAttendanceSettings(importedSettings.attendanceSettings);
        if (importedSettings.payrollSettings) setPayrollSettings(importedSettings.payrollSettings);
        if (importedSettings.notificationSettings) setNotificationSettings(importedSettings.notificationSettings);
        if (importedSettings.leaveSettings) setLeaveSettings(importedSettings.leaveSettings);
        if (importedSettings.securitySettings) setSecuritySettings(importedSettings.securitySettings);
        if (importedSettings.uiSettings) setUiSettings(importedSettings.uiSettings);
        if (importedSettings.integrationSettings) setIntegrationSettings(importedSettings.integrationSettings);
        
        alert('Settings imported successfully! Please save to apply changes.');
      } catch (error) {
        alert('Error importing settings: Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: '🏢', description: 'Manage company information and details' },
    { id: 'attendance', label: 'Attendance', icon: '📅', description: 'Configure attendance rules and settings' },
    { id: 'payroll', label: 'Payroll', icon: '💰', description: 'Payroll calculation and deduction settings' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'Notification preferences and alerts' },
    { id: 'leave', label: 'Leave', icon: '🏖️', description: 'Leave policies and approval workflow' },
    { id: 'security', label: 'Security', icon: '🔒', description: 'Security and access control settings' },
    { id: 'ui', label: 'UI/UX', icon: '🎨', description: 'User interface and experience settings' },
    { id: 'integrations', label: 'Integrations', icon: '🔄', description: 'Third-party integrations and APIs' },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'company':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Company Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyProfile.name}
                  onChange={(e) => setCompanyProfile({...companyProfile, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={companyProfile.email}
                  onChange={(e) => setCompanyProfile({...companyProfile, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="company@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={companyProfile.phone}
                  onChange={(e) => setCompanyProfile({...companyProfile, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 80 1234 5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={companyProfile.website}
                  onChange={(e) => setCompanyProfile({...companyProfile, website: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={companyProfile.address}
                  onChange={(e) => setCompanyProfile({...companyProfile, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={companyProfile.city}
                  onChange={(e) => setCompanyProfile({...companyProfile, city: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={companyProfile.state}
                  onChange={(e) => setCompanyProfile({...companyProfile, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={companyProfile.country}
                  onChange={(e) => setCompanyProfile({...companyProfile, country: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  value={companyProfile.pincode}
                  onChange={(e) => setCompanyProfile({...companyProfile, pincode: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="560001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID *
                </label>
                <input
                  type="text"
                  value={companyProfile.taxId}
                  onChange={(e) => setCompanyProfile({...companyProfile, taxId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="TAX123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={companyProfile.registrationNumber}
                  onChange={(e) => setCompanyProfile({...companyProfile, registrationNumber: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="REG2023001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founded Date
                </label>
                <input
                  type="date"
                  value={companyProfile.foundedDate}
                  onChange={(e) => setCompanyProfile({...companyProfile, foundedDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={companyProfile.industry}
                  onChange={(e) => setCompanyProfile({...companyProfile, industry: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Count
                </label>
                <input
                  type="number"
                  value={companyProfile.employeeCount}
                  onChange={(e) => setCompanyProfile({...companyProfile, employeeCount: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="150"
                  min="1"
                />
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Attendance Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Check-in Time
                </label>
                <input
                  type="time"
                  value={attendanceSettings.checkInTime}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, checkInTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Check-out Time
                </label>
                <input
                  type="time"
                  value={attendanceSettings.checkOutTime}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, checkOutTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Late Threshold (minutes)
                </label>
                <input
                  type="number"
                  value={attendanceSettings.lateThreshold}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, lateThreshold: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Half Day Hours (minimum)
                </label>
                <input
                  type="number"
                  value={attendanceSettings.halfDayHours}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, halfDayHours: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="8"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Day Hours
                </label>
                <input
                  type="number"
                  value={attendanceSettings.fullDayHours}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, fullDayHours: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="12"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grace Period (minutes)
                </label>
                <input
                  type="number"
                  value={attendanceSettings.gracePeriod}
                  onChange={(e) => setAttendanceSettings({...attendanceSettings, gracePeriod: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="30"
                />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'autoCheckout', label: 'Auto Check-out', description: 'Automatically check-out employees at end of day' },
                { key: 'weekendWorking', label: 'Weekend Working', description: 'Allow attendance on weekends' },
                { key: 'shiftRotation', label: 'Shift Rotation', description: 'Enable shift-based attendance system' },
                { key: 'geofencing', label: 'Geofencing', description: 'Restrict check-in to specific locations' },
                { key: 'biometricIntegration', label: 'Biometric Integration', description: 'Connect with biometric devices' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attendanceSettings[setting.key]}
                      onChange={(e) => setAttendanceSettings({...attendanceSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Payroll Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payroll Day
                </label>
                <select
                  value={payrollSettings.payrollDay}
                  onChange={(e) => setPayrollSettings({...payrollSettings, payrollDay: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}th of month</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={payrollSettings.currency}
                  onChange={(e) => setPayrollSettings({...payrollSettings, currency: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bonus Percentage (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.bonusPercentage}
                  onChange={(e) => setPayrollSettings({...payrollSettings, bonusPercentage: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Salary Limit (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.advanceSalaryLimit}
                  onChange={(e) => setPayrollSettings({...payrollSettings, advanceSalaryLimit: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="1"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PF Employer Contribution (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.pfEmployerContribution}
                  onChange={(e) => setPayrollSettings({...payrollSettings, pfEmployerContribution: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
                  min="0"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PF Employee Contribution (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.pfEmployeeContribution}
                  onChange={(e) => setPayrollSettings({...payrollSettings, pfEmployeeContribution: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
                  min="0"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ESIC Employer Contribution (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.esicEmployerContribution}
                  onChange={(e) => setPayrollSettings({...payrollSettings, esicEmployerContribution: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ESIC Employee Contribution (%)
                </label>
                <input
                  type="number"
                  value={payrollSettings.esicEmployeeContribution}
                  onChange={(e) => setPayrollSettings({...payrollSettings, esicEmployeeContribution: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'taxDeduction', label: 'Tax Deduction', description: 'Enable tax deductions from salary' },
                { key: 'pfEnabled', label: 'Provident Fund (PF)', description: 'Enable PF deductions' },
                { key: 'esicEnabled', label: 'ESIC', description: 'Enable ESIC deductions' },
                { key: 'loanDeduction', label: 'Loan Deduction', description: 'Enable loan repayment deductions' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payrollSettings[setting.key]}
                      onChange={(e) => setPayrollSettings({...payrollSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Send notifications via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', description: 'Send notifications via SMS' },
                { key: 'pushNotifications', label: 'Push Notifications', description: 'Send push notifications' },
                { key: 'leaveApproval', label: 'Leave Approval', description: 'Notify on leave approval requests' },
                { key: 'payrollReminder', label: 'Payroll Reminder', description: 'Remind about payroll processing' },
                { key: 'attendanceAlerts', label: 'Attendance Alerts', description: 'Alert for attendance anomalies' },
                { key: 'holidayReminder', label: 'Holiday Reminder', description: 'Notify about upcoming holidays' },
                { key: 'birthdayReminder', label: 'Birthday Reminder', description: 'Notify about employee birthdays' },
                { key: 'announcementNotifications', label: 'Announcements', description: 'Notify about company announcements' },
                { key: 'documentExpiryAlerts', label: 'Document Expiry Alerts', description: 'Alert about expiring documents' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings[setting.key]}
                      onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'leave':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Leave Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'casualLeave', label: 'Casual Leave (days/year)', min: 0, max: 30 },
                { key: 'sickLeave', label: 'Sick Leave (days/year)', min: 0, max: 30 },
                { key: 'earnedLeave', label: 'Earned Leave (days/year)', min: 0, max: 45 },
                { key: 'maternityLeave', label: 'Maternity Leave (weeks)', min: 0, max: 52 },
                { key: 'paternityLeave', label: 'Paternity Leave (days)', min: 0, max: 30 },
                { key: 'maxCarryForward', label: 'Max Carry Forward (days)', min: 0, max: 60 }
              ].map(setting => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {setting.label}
                  </label>
                  <input
                    type="number"
                    value={leaveSettings[setting.key]}
                    onChange={(e) => setLeaveSettings({...leaveSettings, [setting.key]: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={setting.min}
                    max={setting.max}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Workflow
                </label>
                <select
                  value={leaveSettings.approvalWorkflow}
                  onChange={(e) => setLeaveSettings({...leaveSettings, approvalWorkflow: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="direct_manager">Direct Manager Only</option>
                  <option value="hr_approval">HR Approval Required</option>
                  <option value="multiple_levels">Multiple Level Approval</option>
                  <option value="auto_approval">Auto Approval for Small Leaves</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'carryForward', label: 'Leave Carry Forward', description: 'Allow unused leaves to carry forward' },
                { key: 'leaveEncashment', label: 'Leave Encashment', description: 'Allow employees to encash unused leaves' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={leaveSettings[setting.key]}
                      onChange={(e) => setLeaveSettings({...leaveSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Expiry (days)
                </label>
                <input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="30"
                  max="365"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="5"
                  max="240"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Failed Login Attempts
                </label>
                <input
                  type="number"
                  value={securitySettings.failedAttempts}
                  onChange={(e) => setSecuritySettings({...securitySettings, failedAttempts: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="3"
                  max="10"
                />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Require 2FA for all logins' },
                { key: 'ipRestriction', label: 'IP Restriction', description: 'Restrict access to specific IP addresses' },
                { key: 'deviceRestriction', label: 'Device Restriction', description: 'Allow access only from registered devices' },
                { key: 'auditLogs', label: 'Audit Logs', description: 'Keep detailed audit logs of all activities' },
                { key: 'encryptionEnabled', label: 'Data Encryption', description: 'Encrypt sensitive data at rest' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings[setting.key]}
                      onChange={(e) => setSecuritySettings({...securitySettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ui':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">UI/UX Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={uiSettings.theme}
                  onChange={(e) => setUiSettings({...uiSettings, theme: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={uiSettings.language}
                  onChange={(e) => setUiSettings({...uiSettings, language: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={uiSettings.dateFormat}
                  onChange={(e) => setUiSettings({...uiSettings, dateFormat: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                  <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Format
                </label>
                <select
                  value={uiSettings.timeFormat}
                  onChange={(e) => setUiSettings({...uiSettings, timeFormat: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="24h">24 Hour (14:30)</option>
                  <option value="12h">12 Hour (2:30 PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Dashboard
                </label>
                <select
                  value={uiSettings.defaultDashboard}
                  onChange={(e) => setUiSettings({...uiSettings, defaultDashboard: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="overview">Overview Dashboard</option>
                  <option value="attendance">Attendance Dashboard</option>
                  <option value="payroll">Payroll Dashboard</option>
                  <option value="employees">Employee Dashboard</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'compactView', label: 'Compact View', description: 'Use compact layout for data tables' },
                { key: 'animations', label: 'Animations', description: 'Enable UI animations and transitions' },
                { key: 'highContrast', label: 'High Contrast', description: 'Enable high contrast mode for accessibility' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={uiSettings[setting.key]}
                      onChange={(e) => setUiSettings({...uiSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Integration Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accounting Software
                </label>
                <select
                  value={integrationSettings.accountingSoftware}
                  onChange={(e) => setIntegrationSettings({...integrationSettings, accountingSoftware: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Tally">Tally</option>
                  <option value="QuickBooks">QuickBooks</option>
                  <option value="Xero">Xero</option>
                  <option value="Zoho Books">Zoho Books</option>
                  <option value="SAP">SAP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Service
                </label>
                <select
                  value={integrationSettings.emailService}
                  onChange={(e) => setIntegrationSettings({...integrationSettings, emailService: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Gmail">Gmail</option>
                  <option value="Outlook">Microsoft Outlook</option>
                  <option value="SendGrid">SendGrid</option>
                  <option value="SMTP">Custom SMTP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Gateway
                </label>
                <select
                  value={integrationSettings.smsGateway}
                  onChange={(e) => setIntegrationSettings({...integrationSettings, smsGateway: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Twilio">Twilio</option>
                  <option value="Msg91">Msg91</option>
                  <option value="TextLocal">TextLocal</option>
                  <option value="Amazon SNS">Amazon SNS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cloud Storage
                </label>
                <select
                  value={integrationSettings.cloudStorage}
                  onChange={(e) => setIntegrationSettings({...integrationSettings, cloudStorage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="AWS">Amazon S3</option>
                  <option value="Google Drive">Google Drive</option>
                  <option value="OneDrive">Microsoft OneDrive</option>
                  <option value="Dropbox">Dropbox</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'googleCalendar', label: 'Google Calendar', description: 'Sync events with Google Calendar' },
                { key: 'slackIntegration', label: 'Slack Integration', description: 'Send notifications to Slack' },
                { key: 'whatsappNotifications', label: 'WhatsApp Notifications', description: 'Send notifications via WhatsApp' },
                { key: 'biometricDevice', label: 'Biometric Devices', description: 'Connect biometric attendance devices' }
              ].map(setting => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={integrationSettings[setting.key]}
                      onChange={(e) => setIntegrationSettings({...integrationSettings, [setting.key]: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure all system settings and preferences</p>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    activeTab === tab.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl mb-2">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                  <span className="text-xs mt-1 opacity-75">{tab.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Indicators */}
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mr-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h3>
              <p className="text-sm text-gray-600">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Last saved: {localStorage.getItem('settingsLastSaved') || 'Never'}
            </div>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-4">
            {renderTabContent()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-3">
            <button
              onClick={() => setShowResetModal(true)}
              className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
            >
              Reset to Defaults
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Export Settings
            </button>
            <label className="cursor-pointer">
              <span className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 inline-block">
                Import Settings
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => loadSettings()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Save All Settings
            </button>
          </div>
        </div>

        {/* Reset Modal */}
        <Modal
          show={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="Reset Settings to Default"
        >
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>This will reset all settings to their default values. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-700">The following settings will be reset:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Company Profile Information</li>
                <li>Attendance Rules and Timings</li>
                <li>Payroll Calculations and Deductions</li>
                <li>Notification Preferences</li>
                <li>Leave Policies</li>
                <li>Security Settings</li>
                <li>UI/UX Preferences</li>
                <li>Integration Configurations</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reset All Settings
            </button>
          </div>
        </Modal>

        {/* Export Modal */}
        <Modal
          show={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Settings"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Information</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Export all system settings as a JSON backup file. You can import this file later to restore settings.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">The following settings will be exported:</p>
              <div className="grid grid-cols-2 gap-2">
                {tabs.map(tab => (
                  <div key={tab.id} className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleExportSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export Settings
            </button>
          </div>
        </Modal>

        {/* Settings Summary */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600">Company Profile</div>
              <div className="text-lg font-semibold text-gray-900">{companyProfile.name}</div>
              <div className="text-sm text-gray-500 truncate">{companyProfile.industry}</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600">Attendance Hours</div>
              <div className="text-lg font-semibold text-gray-900">
                {attendanceSettings.checkInTime} - {attendanceSettings.checkOutTime}
              </div>
              <div className="text-sm text-gray-500">{attendanceSettings.fullDayHours}h full day</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600">Payroll Settings</div>
              <div className="text-lg font-semibold text-gray-900">
                {payrollSettings.payrollDay}th of month
              </div>
              <div className="text-sm text-gray-500">{payrollSettings.currency} • {payrollSettings.pfEnabled ? 'PF Enabled' : 'No PF'}</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600">Notifications</div>
              <div className="text-lg font-semibold text-gray-900">
                {Object.values(notificationSettings).filter(v => v === true).length} active
              </div>
              <div className="text-sm text-gray-500">{notificationSettings.emailNotifications ? 'Email' : 'No Email'}, {notificationSettings.smsNotifications ? 'SMS' : 'No SMS'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;