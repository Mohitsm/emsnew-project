// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../hooks/useAuth';
import { Award, BarChart3, Building2, CalendarDays, Clock, CreditCard, FileText, FolderOpen, LayoutDashboard, Settings, Users } from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const menuItems = {
    superadmin: [
      { label: 'Dashboard', path: '/superadmin/dashboard', icon: '📊' },
      { label: 'User Management', path: '/superadmin/users', icon: '👥' },
      { label: 'System Settings', path: '/superadmin/settings', icon: '⚙️' },
      { label: 'Reports & Logs', path: '/superadmin/reports', icon: '📈' },
      { label: 'System Health', path: '/superadmin/health', icon: '❤️' },
    ],
    admin: [
       { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/employees', label: 'Employee Management', icon: <Users size={20} /> },
    { path: '/admin/attendance', label: 'Attendance Management', icon: <Clock size={20} /> },
    { path: '/admin/leave', label: 'Leave Management', icon: <CalendarDays size={20} /> },
    { path: '/admin/payroll', label: 'Payroll Management', icon: <CreditCard size={20} /> },
    { path: '/admin/shift-roster', label: 'Shift Roster', icon: <FileText size={20} /> },
    { path: '/admin/departments', label: 'Department Management', icon: <Building2 size={20} /> },
    { path: '/admin/documents', label: 'Document Management', icon: <FolderOpen size={20} /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/admin/hr-appraisal', label: 'HR Appraisal', icon: <Award size={20} /> },
    ],
    employee: [
      { path: '/employee/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/employee/attendance', label: 'Attendance', icon: '⏰' },
  { path: '/employee/leave', label: 'Leave Management', icon: '📅' },
  { path: '/employee/payroll', label: 'Payroll', icon: '💰' },
  { path: '/employee/notifications', label: 'Notifications', icon: '📁' },
  { path: '/employee/reimbursements', label: 'Reimbursements', icon: '📈' },
  { path: '/employee/field-tracking', label: 'Field Tracking', icon: '👥' },
  { path: '/employee/help-support', label: 'Help & Support', icon: '❤️' },
  { path: '/employee/profile', label: 'Profile', icon: '👤' }
    ]
  };

  return (
   <div className="flex h-screen bg-white">

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems[user?.role] || []}
      />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar menuItems={menuItems[user?.role] || []} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Footer */}
      
      </div>
    </div>
  );
};

export default Layout;