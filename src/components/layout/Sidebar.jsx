// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3,
  Heart,
  UserPlus,
  Clock,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  ChevronDown
} from 'lucide-react';

const iconMap = {
  '📊': Home,
  '👥': Users,
  '⚙️': Settings,
  '📈': BarChart3,
  '❤️': Heart,
  '👤': UserPlus,
  '⏰': Clock,
  '📅': Calendar,
  '💰': CreditCard,
  '📁': FileText
};

const Sidebar = ({ menuItems }) => {
  const { user, logout } = useAuth();
  const { sidebarCollapsed, toggleSidebar } = useTheme();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getIconComponent = (iconChar) => {
    const IconComponent = iconMap[iconChar] || Home;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-emerald-800 text-white flex flex-col h-full`}>
      
      {/* Logo */}
      <div className={`p-6 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
        {sidebarCollapsed ? (
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="font-bold">J</span>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold"></h1>
            <p className="text-emerald-200 text-sm mt-1">EMS System</p>
          </>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-emerald-700 rounded-full p-2 hover:bg-emerald-600 transition-colors"
      >
        {sidebarCollapsed ? '>' : '<'}
      </button>

      {/* Navigation */}
      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        {!sidebarCollapsed && (
          <div className="mb-6">
            <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
              Main Navigation
            </div>

            <nav className="space-y-1">

              {/* Normal Items */}
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'text-emerald-100 hover:bg-emerald-700/50'
                    }`
                  }
                >
                  {getIconComponent(item.icon)}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              ))}

              {/* Dropdown Menu */}
              <div className="mt-3">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-emerald-100 hover:bg-emerald-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span>More Options</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {openDropdown && (
                  <div className="ml-10 mt-2 space-y-1">
                    <NavLink
                      to="/profile"
                      className="block px-2 py-1 rounded text-emerald-200 hover:bg-emerald-700/50"
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className="block px-2 py-1 rounded text-emerald-200 hover:bg-emerald-700/50"
                    >
                      Settings
                    </NavLink>

                    <NavLink
                      to="/help"
                      className="block px-2 py-1 rounded text-emerald-200 hover:bg-emerald-700/50"
                    >
                      Help
                    </NavLink>
                  </div>
                )}
              </div>

            </nav>
          </div>
        )}

        {/* Collapsed Mode (icons only) */}
        {sidebarCollapsed && (
          <nav className="space-y-4 pt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-emerald-100 hover:bg-emerald-700/50'
                  }`
                }
                title={item.label}
              >
                {getIconComponent(item.icon)}
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-emerald-700">
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="font-semibold">{user?.avatar || user?.name?.charAt(0)}</span>
          </div>

          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-xs text-emerald-200 truncate">{user?.role}</p>
            </div>
          )}

          {!sidebarCollapsed && (
            <button
              onClick={handleLogout}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
// // src/components/layout/Sidebar.jsx
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useTheme } from '../../contexts/ThemeContext';
// import { 
//   Home, 
//   Users, 
//   Settings, 
//   BarChart3,
//   Clock,
//   Calendar,
//   CreditCard,
//   FileText,
//   Bell,
//   UserPlus,
//   LogOut,
//   ChevronDown,
//   UserCheck,
//   FileCheck,
//   Briefcase,
//   Banknote,
//   Shield,
//   FolderOpen
// } from 'lucide-react';

// const iconMap = {
//   '📊': Home,
//   '👥': Users,
//   '⚙️': Settings,
//   '📈': BarChart3,
//   '⏰': Clock,
//   '📅': Calendar,
//   '💰': CreditCard,
//   '📁': FileText,
//   '🔔': Bell,
//   '👤': UserPlus,
//   '✅': UserCheck,
//   '📋': FileCheck,
//   '💼': Briefcase,
//   '🏦': Banknote,
//   '🛡️': Shield,
//   '🗂️': FolderOpen
// };

// const Sidebar = ({ menuItems }) => {
//   const { user, logout } = useAuth();
//   const { sidebarCollapsed, toggleSidebar } = useTheme();
//   const navigate = useNavigate();

//   const [openDropdowns, setOpenDropdowns] = useState({
//     employeeManagement: false,
//     moreOptions: false
//   });

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const toggleDropdown = (dropdownName) => {
//     setOpenDropdowns(prev => ({
//       ...prev,
//       [dropdownName]: !prev[dropdownName]
//     }));
//   };

//   const getIconComponent = (iconChar) => {
//     const IconComponent = iconMap[iconChar] || Home;
//     return <IconComponent className="h-5 w-5" />;
//   };

//   // EMS specific navigation items
//   const emsMenuItems = [
//     {
//       label: 'Employee Management',
//       icon: '👥',
//       path: '/employees',
//       children: [
//         { label: 'All Employees', path: '/employees/list' },
//         { label: 'Add Employee', path: '/employees/add' },
//         { label: 'Employee Profiles', path: '/employees/profiles' },
//         { label: 'Role Assignment', path: '/employees/roles' },
//         { label: 'Department Management', path: '/employees/departments' }
//       ]
//     },
//     {
//       label: 'Attendance Management',
//       icon: '⏰',
//       path: '/attendance',
//       children: [
//         { label: 'Daily Attendance', path: '/attendance/daily' },
//         { label: 'Time Tracking', path: '/attendance/tracking' },
//         { label: 'Attendance Reports', path: '/attendance/reports' },
//         { label: 'Overtime Management', path: '/attendance/overtime' }
//       ]
//     },
//     {
//       label: 'Leave Management',
//       icon: '📅',
//       path: '/leave',
//       children: [
//         { label: 'Leave Requests', path: '/leave/requests' },
//         { label: 'Leave Balance', path: '/leave/balance' },
//         { label: 'Leave Calendar', path: '/leave/calendar' },
//         { label: 'Leave Approval', path: '/leave/approval' }
//       ]
//     },
//     {
//       label: 'Payroll Management',
//       icon: '💰',
//       path: '/payroll',
//       children: [
//         { label: 'Salary Processing', path: '/payroll/processing' },
//         { label: 'Payslip Generator', path: '/payroll/payslips' },
//         { label: 'Deductions', path: '/payroll/deductions' },
//         { label: 'Tax Management', path: '/payroll/taxes' }
//       ]
//     },
//     {
//       label: 'Document Management',
//       icon: '📁',
//       path: '/documents',
//       children: [
//         { label: 'Document Upload', path: '/documents/upload' },
//         { label: 'Document Library', path: '/documents/library' },
//         { label: 'Verification', path: '/documents/verification' },
//         { label: 'Expiry Alerts', path: '/documents/alerts' }
//       ]
//     },
//     {
//       label: 'Notifications',
//       icon: '🔔',
//       path: '/notifications',
//       children: [
//         { label: 'System Alerts', path: '/notifications/alerts' },
//         { label: 'Email Settings', path: '/notifications/email' },
//         { label: 'Announcements', path: '/notifications/announcements' }
//       ]
//     }
//   ];

//   return (
//     <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-emerald-800 text-white flex flex-col h-full`}>
      
//       {/* Logo */}
//       <div className={`p-6 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
//         {sidebarCollapsed ? (
//           <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
//             <span className="font-bold">EMS</span>
//           </div>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold">Employee Management</h1>
//             <p className="text-emerald-200 text-sm mt-1">Complete HR Solution</p>
//           </>
//         )}
//       </div>

//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-20 bg-emerald-700 rounded-full p-2 hover:bg-emerald-600 transition-colors z-10"
//       >
//         {sidebarCollapsed ? '>' : '<'}
//       </button>

//       {/* Navigation */}
//       <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
//         {!sidebarCollapsed && (
//           <div className="mb-6">
//             <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
//               Main Navigation
//             </div>

//             <nav className="space-y-1">
//               {/* Dashboard */}
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-emerald-700 text-white'
//                       : 'text-emerald-100 hover:bg-emerald-700/50'
//                   }`
//                 }
//               >
//                 <Home className="h-5 w-5" />
//                 <span className="ml-3">Dashboard</span>
//               </NavLink>

//               {/* EMS Modules */}
//               {emsMenuItems.map((item) => (
//                 <div key={item.label} className="space-y-1">
//                   <button
//                     onClick={() => toggleDropdown(item.label.toLowerCase().replace(/\s+/g, ''))}
//                     className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                       openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')]
//                         ? 'bg-emerald-700 text-white'
//                         : 'text-emerald-100 hover:bg-emerald-700/50'
//                     }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       {getIconComponent(item.icon)}
//                       <span>{item.label}</span>
//                     </div>
//                     <ChevronDown
//                       className={`h-4 w-4 transition-transform ${
//                         openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')] ? 'rotate-180' : ''
//                       }`}
//                     />
//                   </button>

//                   {openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')] && (
//                     <div className="ml-8 mt-1 space-y-1 border-l border-emerald-600/50 pl-3">
//                       {item.children.map((child) => (
//                         <NavLink
//                           key={child.path}
//                           to={child.path}
//                           className={({ isActive }) =>
//                             `block px-2 py-1.5 rounded text-sm transition-colors ${
//                               isActive
//                                 ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
//                                 : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
//                             }`
//                           }
//                         >
//                           {child.label}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {/* Reports & Analytics */}
//               <NavLink
//                 to="/reports"
//                 className={({ isActive }) =>
//                   `flex items-center px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-emerald-700 text-white'
//                       : 'text-emerald-100 hover:bg-emerald-700/50'
//                   }`
//                 }
//               >
//                 <BarChart3 className="h-5 w-5" />
//                 <span className="ml-3">Reports & Analytics</span>
//               </NavLink>

//               {/* More Options Dropdown */}
//               <div className="space-y-1 pt-2 mt-2 border-t border-emerald-700/50">
//                 <button
//                   onClick={() => toggleDropdown('moreOptions')}
//                   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
//                     openDropdowns.moreOptions
//                       ? 'bg-emerald-700 text-white'
//                       : 'text-emerald-100 hover:bg-emerald-700/50'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Settings className="h-5 w-5" />
//                     <span>More Options</span>
//                   </div>
//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       openDropdowns.moreOptions ? 'rotate-180' : ''
//                     }`}
//                   />
//                 </button>

//                 {openDropdowns.moreOptions && (
//                   <div className="ml-8 mt-1 space-y-1 border-l border-emerald-600/50 pl-3">
//                     <NavLink
//                       to="/profile"
//                       className={({ isActive }) =>
//                         `block px-2 py-1.5 rounded text-sm transition-colors ${
//                           isActive
//                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
//                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
//                         }`
//                       }
//                     >
//                       My Profile
//                     </NavLink>
//                     <NavLink
//                       to="/settings"
//                       className={({ isActive }) =>
//                         `block px-2 py-1.5 rounded text-sm transition-colors ${
//                           isActive
//                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
//                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
//                         }`
//                       }
//                     >
//                       System Settings
//                     </NavLink>
//                     <NavLink
//                       to="/help"
//                       className={({ isActive }) =>
//                         `block px-2 py-1.5 rounded text-sm transition-colors ${
//                           isActive
//                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
//                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
//                         }`
//                       }
//                     >
//                       Help & Support
//                     </NavLink>
//                   </div>
//                 )}
//               </div>
//             </nav>
//           </div>
//         )}

//         {/* Collapsed Mode (icons only) */}
//         {sidebarCollapsed && (
//           <nav className="space-y-2 pt-4">
//             {/* Dashboard */}
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
//                   isActive
//                     ? 'bg-emerald-700 text-white'
//                     : 'text-emerald-100 hover:bg-emerald-700/50'
//                 }`
//               }
//               title="Dashboard"
//             >
//               <Home className="h-5 w-5" />
//             </NavLink>

//             {/* EMS Module Icons */}
//             {emsMenuItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center justify-center p-3 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-emerald-700 text-white'
//                       : 'text-emerald-100 hover:bg-emerald-700/50'
//                   }`
//                 }
//                 title={item.label}
//               >
//                 {getIconComponent(item.icon)}
//               </NavLink>
//             ))}

//             {/* Reports */}
//             <NavLink
//               to="/reports"
//               className={({ isActive }) =>
//                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
//                   isActive
//                     ? 'bg-emerald-700 text-white'
//                     : 'text-emerald-100 hover:bg-emerald-700/50'
//                 }`
//               }
//               title="Reports"
//             >
//               <BarChart3 className="h-5 w-5" />
//             </NavLink>

//             {/* Settings */}
//             <NavLink
//               to="/settings"
//               className={({ isActive }) =>
//                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
//                   isActive
//                     ? 'bg-emerald-700 text-white'
//                     : 'text-emerald-100 hover:bg-emerald-700/50'
//                 }`
//               }
//               title="Settings"
//             >
//               <Settings className="h-5 w-5" />
//             </NavLink>
//           </nav>
//         )}
//       </div>

//       {/* User Section */}
//       <div className="p-4 border-t border-emerald-700">
//         <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
//           <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
//             <span className="font-semibold">{user?.avatar || user?.name?.charAt(0) || 'U'}</span>
//           </div>

//           {!sidebarCollapsed && (
//             <div className="flex-1 min-w-0">
//               <p className="font-medium truncate">{user?.name || 'User'}</p>
//               <p className="text-xs text-emerald-200 truncate">{user?.role || 'Employee'}</p>
//             </div>
//           )}

//           {!sidebarCollapsed && (
//             <button
//               onClick={handleLogout}
//               className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
//               title="Logout"
//             >
//               <LogOut className="h-5 w-5" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;