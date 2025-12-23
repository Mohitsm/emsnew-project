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
      { path: '/superadmin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/superadmin/companies', label: 'Companies', icon: '🏢' },
  { path: '/superadmin/admins', label: 'Admins Management', icon: '👥' },
  { path: '/superadmin/subscriptions', label: 'Subscription Plans', icon: '💳' },
  { path: '/superadmin/reports', label: 'Reports & Analytics', icon: '📈' },
  { path: '/superadmin/settings', label: 'System Settings', icon: '⚙️' }
    ],
    admin: [
       
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/employees', label: 'Employee Management', icon: '👥' },
  { path: '/admin/attendance', label: 'Attendance Management', icon: '⏱️' },
  { path: '/admin/leave', label: 'Leave Management', icon: '📅' },
  { path: '/admin/payroll', label: 'Payroll Management', icon: '💳' },
  { path: '/admin/shift-roster', label: 'Shift Roster', icon: '🗂️' },
  { path: '/admin/departments', label: 'Department Management', icon: '🏢' },
  { path: '/admin/documents', label: 'Document Management', icon: '📁' },
  { path: '/admin/reports', label: 'Reports', icon: '📈' },
  { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  { path: '/admin/hr-appraisal', label: 'HR Appraisal', icon: '🏆' },


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