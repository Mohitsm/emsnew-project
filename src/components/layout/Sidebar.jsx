// // // src/components/layout/Sidebar.jsx
// // import React, { useState } from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../hooks/useAuth';
// // import { useTheme } from '../../contexts/ThemeContext';
// // import { 
// //   Home, 
// //   Users, 
// //   Settings, 
// //   BarChart3,
// //   Heart,
// //   UserPlus,
// //   Clock,
// //   Calendar,
// //   CreditCard,
// //   FileText,
// //   LogOut,
// //   ChevronDown
// // } from 'lucide-react';

// // const iconMap = {
// //   '📊': Home,
// //   '👥': Users,
// //   '⚙️': Settings,
// //   '📈': BarChart3,
// //   '❤️': Heart,
// //   '👤': UserPlus,
// //   '⏰': Clock,
// //   '📅': Calendar,
// //   '💰': CreditCard,
// //   '📁': FileText
// // };

// // const Sidebar = ({ menuItems }) => {
// //   const { user, logout } = useAuth();
// //   const { sidebarCollapsed, toggleSidebar } = useTheme();
// //   const navigate = useNavigate();

// //   const [openDropdown, setOpenDropdown] = useState(false);

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   const getIconComponent = (iconChar) => {
// //     const IconComponent = iconMap[iconChar] || Home;
// //     return <IconComponent className="h-5 w-5" />;
// //   };

// //   return (
// //     <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-emerald-800 text-white flex flex-col h-full`}>
      
// //       {/* Logo */}
// //       <div className={`p-6 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
// //         {sidebarCollapsed ? (
// //           <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
// //             <span className="font-bold">J</span>
// //           </div>
// //         ) : (
// //           <>
// //             <h1 className="text-2xl font-bold"></h1>
// //             <p className="text-emerald-200 text-sm mt-1">EMS System</p>
// //           </>
// //         )}
// //       </div>

// //       {/* Toggle Button */}
// //       <button
// //         onClick={toggleSidebar}
// //         className="absolute -right-3 top-20 bg-emerald-700 rounded-full p-2 hover:bg-emerald-600 transition-colors"
// //       >
// //         {sidebarCollapsed ? '>' : '<'}
// //       </button>

// //       {/* Navigation */}
// //       <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
// //         {!sidebarCollapsed && (
// //           <div className="mb-6">
// //             <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
// //               Main Navigation
// //             </div>

// //             <nav className="space-y-1">

// //               {/* Normal Items */}
// //               {menuItems.map((item) => (
// //                 <NavLink
// //                   key={item.path}
// //                   to={item.path}
// //                   className={({ isActive }) =>
// //                     `flex items-center px-3 py-2 rounded-lg transition-colors ${
// //                       isActive
// //                         ? 'bg-emerald-700 text-white'
// //                         : 'text-emerald-100 hover:bg-emerald-700/50'
// //                     }`
// //                   }
// //                 >
// //                   {getIconComponent(item.icon)}
// //                   <span className="ml-3">{item.label}</span>
// //                 </NavLink>
// //               ))}

            

// //             </nav>
// //           </div>
// //         )}

// //         {/* Collapsed Mode (icons only) */}
// //         {sidebarCollapsed && (
// //           <nav className="space-y-4 pt-4">
// //             {menuItems.map((item) => (
// //               <NavLink
// //                 key={item.path}
// //                 to={item.path}
// //                 className={({ isActive }) =>
// //                   `flex items-center justify-center p-3 rounded-lg transition-colors ${
// //                     isActive
// //                       ? 'bg-emerald-700 text-white'
// //                       : 'text-emerald-100 hover:bg-emerald-700/50'
// //                   }`
// //                 }
// //                 title={item.label}
// //               >
// //                 {getIconComponent(item.icon)}
// //               </NavLink>
// //             ))}
// //           </nav>
// //         )}
// //       </div>

// //       {/* User Section */}
// //       <div className="p-4 border-t border-emerald-700">
// //         <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
// //           <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
// //             <span className="font-semibold">{user?.avatar || user?.name?.charAt(0)}</span>
// //           </div>

// //           {!sidebarCollapsed && (
// //             <div className="flex-1 min-w-0">
// //               <p className="font-medium truncate">{user?.name}</p>
// //               <p className="text-xs text-emerald-200 truncate">{user?.role}</p>
// //             </div>
// //           )}

// //           {!sidebarCollapsed && (
// //             <button
// //               onClick={handleLogout}
// //               className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
// //               title="Logout"
// //             >
// //               <LogOut className="h-5 w-5" />
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// // // // src/components/layout/Sidebar.jsx
// // // import React, { useState } from 'react';
// // // import { NavLink, useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../../hooks/useAuth';
// // // import { useTheme } from '../../contexts/ThemeContext';
// // // import { 
// // //   Home, 
// // //   Users, 
// // //   Settings, 
// // //   BarChart3,
// // //   Clock,
// // //   Calendar,
// // //   CreditCard,
// // //   FileText,
// // //   Bell,
// // //   UserPlus,
// // //   LogOut,
// // //   ChevronDown,
// // //   UserCheck,
// // //   FileCheck,
// // //   Briefcase,
// // //   Banknote,
// // //   Shield,
// // //   FolderOpen
// // // } from 'lucide-react';

// // // const iconMap = {
// // //   '📊': Home,
// // //   '👥': Users,
// // //   '⚙️': Settings,
// // //   '📈': BarChart3,
// // //   '⏰': Clock,
// // //   '📅': Calendar,
// // //   '💰': CreditCard,
// // //   '📁': FileText,
// // //   '🔔': Bell,
// // //   '👤': UserPlus,
// // //   '✅': UserCheck,
// // //   '📋': FileCheck,
// // //   '💼': Briefcase,
// // //   '🏦': Banknote,
// // //   '🛡️': Shield,
// // //   '🗂️': FolderOpen
// // // };

// // // const Sidebar = ({ menuItems }) => {
// // //   const { user, logout } = useAuth();
// // //   const { sidebarCollapsed, toggleSidebar } = useTheme();
// // //   const navigate = useNavigate();

// // //   const [openDropdowns, setOpenDropdowns] = useState({
// // //     employeeManagement: false,
// // //     moreOptions: false
// // //   });

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate('/login');
// // //   };

// // //   const toggleDropdown = (dropdownName) => {
// // //     setOpenDropdowns(prev => ({
// // //       ...prev,
// // //       [dropdownName]: !prev[dropdownName]
// // //     }));
// // //   };

// // //   const getIconComponent = (iconChar) => {
// // //     const IconComponent = iconMap[iconChar] || Home;
// // //     return <IconComponent className="h-5 w-5" />;
// // //   };

// // //   // EMS specific navigation items
// // //   const emsMenuItems = [
// // //     {
// // //       label: 'Employee Management',
// // //       icon: '👥',
// // //       path: '/employees',
// // //       children: [
// // //         { label: 'All Employees', path: '/employees/list' },
// // //         { label: 'Add Employee', path: '/employees/add' },
// // //         { label: 'Employee Profiles', path: '/employees/profiles' },
// // //         { label: 'Role Assignment', path: '/employees/roles' },
// // //         { label: 'Department Management', path: '/employees/departments' }
// // //       ]
// // //     },
// // //     {
// // //       label: 'Attendance Management',
// // //       icon: '⏰',
// // //       path: '/attendance',
// // //       children: [
// // //         { label: 'Daily Attendance', path: '/attendance/daily' },
// // //         { label: 'Time Tracking', path: '/attendance/tracking' },
// // //         { label: 'Attendance Reports', path: '/attendance/reports' },
// // //         { label: 'Overtime Management', path: '/attendance/overtime' }
// // //       ]
// // //     },
// // //     {
// // //       label: 'Leave Management',
// // //       icon: '📅',
// // //       path: '/leave',
// // //       children: [
// // //         { label: 'Leave Requests', path: '/leave/requests' },
// // //         { label: 'Leave Balance', path: '/leave/balance' },
// // //         { label: 'Leave Calendar', path: '/leave/calendar' },
// // //         { label: 'Leave Approval', path: '/leave/approval' }
// // //       ]
// // //     },
// // //     {
// // //       label: 'Payroll Management',
// // //       icon: '💰',
// // //       path: '/payroll',
// // //       children: [
// // //         { label: 'Salary Processing', path: '/payroll/processing' },
// // //         { label: 'Payslip Generator', path: '/payroll/payslips' },
// // //         { label: 'Deductions', path: '/payroll/deductions' },
// // //         { label: 'Tax Management', path: '/payroll/taxes' }
// // //       ]
// // //     },
// // //     {
// // //       label: 'Document Management',
// // //       icon: '📁',
// // //       path: '/documents',
// // //       children: [
// // //         { label: 'Document Upload', path: '/documents/upload' },
// // //         { label: 'Document Library', path: '/documents/library' },
// // //         { label: 'Verification', path: '/documents/verification' },
// // //         { label: 'Expiry Alerts', path: '/documents/alerts' }
// // //       ]
// // //     },
// // //     {
// // //       label: 'Notifications',
// // //       icon: '🔔',
// // //       path: '/notifications',
// // //       children: [
// // //         { label: 'System Alerts', path: '/notifications/alerts' },
// // //         { label: 'Email Settings', path: '/notifications/email' },
// // //         { label: 'Announcements', path: '/notifications/announcements' }
// // //       ]
// // //     }
// // //   ];

// // //   return (
// // //     <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-emerald-800 text-white flex flex-col h-full`}>
      
// // //       {/* Logo */}
// // //       <div className={`p-6 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
// // //         {sidebarCollapsed ? (
// // //           <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
// // //             <span className="font-bold">EMS</span>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <h1 className="text-2xl font-bold">Employee Management</h1>
// // //             <p className="text-emerald-200 text-sm mt-1">Complete HR Solution</p>
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* Toggle Button */}
// // //       <button
// // //         onClick={toggleSidebar}
// // //         className="absolute -right-3 top-20 bg-emerald-700 rounded-full p-2 hover:bg-emerald-600 transition-colors z-10"
// // //       >
// // //         {sidebarCollapsed ? '>' : '<'}
// // //       </button>

// // //       {/* Navigation */}
// // //       <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
// // //         {!sidebarCollapsed && (
// // //           <div className="mb-6">
// // //             <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
// // //               Main Navigation
// // //             </div>

// // //             <nav className="space-y-1">
// // //               {/* Dashboard */}
// // //               <NavLink
// // //                 to="/dashboard"
// // //                 className={({ isActive }) =>
// // //                   `flex items-center px-3 py-2 rounded-lg transition-colors ${
// // //                     isActive
// // //                       ? 'bg-emerald-700 text-white'
// // //                       : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                   }`
// // //                 }
// // //               >
// // //                 <Home className="h-5 w-5" />
// // //                 <span className="ml-3">Dashboard</span>
// // //               </NavLink>

// // //               {/* EMS Modules */}
// // //               {emsMenuItems.map((item) => (
// // //                 <div key={item.label} className="space-y-1">
// // //                   <button
// // //                     onClick={() => toggleDropdown(item.label.toLowerCase().replace(/\s+/g, ''))}
// // //                     className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
// // //                       openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')]
// // //                         ? 'bg-emerald-700 text-white'
// // //                         : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                     }`}
// // //                   >
// // //                     <div className="flex items-center space-x-3">
// // //                       {getIconComponent(item.icon)}
// // //                       <span>{item.label}</span>
// // //                     </div>
// // //                     <ChevronDown
// // //                       className={`h-4 w-4 transition-transform ${
// // //                         openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')] ? 'rotate-180' : ''
// // //                       }`}
// // //                     />
// // //                   </button>

// // //                   {openDropdowns[item.label.toLowerCase().replace(/\s+/g, '')] && (
// // //                     <div className="ml-8 mt-1 space-y-1 border-l border-emerald-600/50 pl-3">
// // //                       {item.children.map((child) => (
// // //                         <NavLink
// // //                           key={child.path}
// // //                           to={child.path}
// // //                           className={({ isActive }) =>
// // //                             `block px-2 py-1.5 rounded text-sm transition-colors ${
// // //                               isActive
// // //                                 ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
// // //                                 : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
// // //                             }`
// // //                           }
// // //                         >
// // //                           {child.label}
// // //                         </NavLink>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ))}

// // //               {/* Reports & Analytics */}
// // //               <NavLink
// // //                 to="/reports"
// // //                 className={({ isActive }) =>
// // //                   `flex items-center px-3 py-2 rounded-lg transition-colors ${
// // //                     isActive
// // //                       ? 'bg-emerald-700 text-white'
// // //                       : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                   }`
// // //                 }
// // //               >
// // //                 <BarChart3 className="h-5 w-5" />
// // //                 <span className="ml-3">Reports & Analytics</span>
// // //               </NavLink>

// // //               {/* More Options Dropdown */}
// // //               <div className="space-y-1 pt-2 mt-2 border-t border-emerald-700/50">
// // //                 <button
// // //                   onClick={() => toggleDropdown('moreOptions')}
// // //                   className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
// // //                     openDropdowns.moreOptions
// // //                       ? 'bg-emerald-700 text-white'
// // //                       : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                   }`}
// // //                 >
// // //                   <div className="flex items-center space-x-3">
// // //                     <Settings className="h-5 w-5" />
// // //                     <span>More Options</span>
// // //                   </div>
// // //                   <ChevronDown
// // //                     className={`h-4 w-4 transition-transform ${
// // //                       openDropdowns.moreOptions ? 'rotate-180' : ''
// // //                     }`}
// // //                   />
// // //                 </button>

// // //                 {openDropdowns.moreOptions && (
// // //                   <div className="ml-8 mt-1 space-y-1 border-l border-emerald-600/50 pl-3">
// // //                     <NavLink
// // //                       to="/profile"
// // //                       className={({ isActive }) =>
// // //                         `block px-2 py-1.5 rounded text-sm transition-colors ${
// // //                           isActive
// // //                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
// // //                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
// // //                         }`
// // //                       }
// // //                     >
// // //                       My Profile
// // //                     </NavLink>
// // //                     <NavLink
// // //                       to="/settings"
// // //                       className={({ isActive }) =>
// // //                         `block px-2 py-1.5 rounded text-sm transition-colors ${
// // //                           isActive
// // //                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
// // //                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
// // //                         }`
// // //                       }
// // //                     >
// // //                       System Settings
// // //                     </NavLink>
// // //                     <NavLink
// // //                       to="/help"
// // //                       className={({ isActive }) =>
// // //                         `block px-2 py-1.5 rounded text-sm transition-colors ${
// // //                           isActive
// // //                             ? 'bg-emerald-600/30 text-white border-l-2 border-emerald-400'
// // //                             : 'text-emerald-200 hover:bg-emerald-700/50 hover:text-white'
// // //                         }`
// // //                       }
// // //                     >
// // //                       Help & Support
// // //                     </NavLink>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </nav>
// // //           </div>
// // //         )}

// // //         {/* Collapsed Mode (icons only) */}
// // //         {sidebarCollapsed && (
// // //           <nav className="space-y-2 pt-4">
// // //             {/* Dashboard */}
// // //             <NavLink
// // //               to="/dashboard"
// // //               className={({ isActive }) =>
// // //                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
// // //                   isActive
// // //                     ? 'bg-emerald-700 text-white'
// // //                     : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                 }`
// // //               }
// // //               title="Dashboard"
// // //             >
// // //               <Home className="h-5 w-5" />
// // //             </NavLink>

// // //             {/* EMS Module Icons */}
// // //             {emsMenuItems.map((item) => (
// // //               <NavLink
// // //                 key={item.path}
// // //                 to={item.path}
// // //                 className={({ isActive }) =>
// // //                   `flex items-center justify-center p-3 rounded-lg transition-colors ${
// // //                     isActive
// // //                       ? 'bg-emerald-700 text-white'
// // //                       : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                   }`
// // //                 }
// // //                 title={item.label}
// // //               >
// // //                 {getIconComponent(item.icon)}
// // //               </NavLink>
// // //             ))}

// // //             {/* Reports */}
// // //             <NavLink
// // //               to="/reports"
// // //               className={({ isActive }) =>
// // //                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
// // //                   isActive
// // //                     ? 'bg-emerald-700 text-white'
// // //                     : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                 }`
// // //               }
// // //               title="Reports"
// // //             >
// // //               <BarChart3 className="h-5 w-5" />
// // //             </NavLink>

// // //             {/* Settings */}
// // //             <NavLink
// // //               to="/settings"
// // //               className={({ isActive }) =>
// // //                 `flex items-center justify-center p-3 rounded-lg transition-colors ${
// // //                   isActive
// // //                     ? 'bg-emerald-700 text-white'
// // //                     : 'text-emerald-100 hover:bg-emerald-700/50'
// // //                 }`
// // //               }
// // //               title="Settings"
// // //             >
// // //               <Settings className="h-5 w-5" />
// // //             </NavLink>
// // //           </nav>
// // //         )}
// // //       </div>

// // //       {/* User Section */}
// // //       <div className="p-4 border-t border-emerald-700">
// // //         <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
// // //           <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
// // //             <span className="font-semibold">{user?.avatar || user?.name?.charAt(0) || 'U'}</span>
// // //           </div>

// // //           {!sidebarCollapsed && (
// // //             <div className="flex-1 min-w-0">
// // //               <p className="font-medium truncate">{user?.name || 'User'}</p>
// // //               <p className="text-xs text-emerald-200 truncate">{user?.role || 'Employee'}</p>
// // //             </div>
// // //           )}

// // //           {!sidebarCollapsed && (
// // //             <button
// // //               onClick={handleLogout}
// // //               className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
// // //               title="Logout"
// // //             >
// // //               <LogOut className="h-5 w-5" />
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;


// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useTheme } from '../../contexts/ThemeContext';
// import { 
//   Home, 
//   Users, 
//   Settings, 
//   BarChart3,
//   Heart,
//   UserPlus,
//   Clock,
//   Calendar,
//   CreditCard,
//   FileText,
//   LogOut,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const iconMap = {
//   '📊': Home,
//   '👥': Users,
//   '⚙️': Settings,
//   '📈': BarChart3,
//   '❤️': Heart,
//   '👤': UserPlus,
//   '⏰': Clock,
//   '📅': Calendar,
//   '💰': CreditCard,
//   '📁': FileText
// };

// const Sidebar = ({ menuItems }) => {
//   const { user, logout } = useAuth();
//   const { sidebarCollapsed, toggleSidebar } = useTheme();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const getIconComponent = (iconChar) => {
//     const IconComponent = iconMap[iconChar] || Home;
//     return <IconComponent className="h-5 w-5" />;
//   };

//   return (
//     <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col h-full relative shadow-2xl`}>
      
//       {/* Animated Background Effect */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-green-500/30 to-blue-500/30 animate-pulse"></div>
//       </div>

//       {/* Logo Section */}
//       <div className={`relative p-6 border-b border-gray-700 bg-gradient-to-r from-orange-600/20 via-green-600/20 to-blue-600/20 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
//         {sidebarCollapsed ? (
//           <div className="relative">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
//               <span className="text-2xl font-black text-white">E</span>
//             </div>
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
//           </div>
//         ) : (
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
//                 <span className="text-2xl font-black text-white">E</span>
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
//             </div>
//             <div>
//               <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
//                 EMS SYSTEM
//               </h1>
//               <p className="text-xs text-gray-400 font-medium">Acetech Work Organization</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute -right-3 top-24 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg z-50"
//       >
//         {sidebarCollapsed ? (
//           <ChevronRight className="h-4 w-4 text-white" />
//         ) : (
//           <ChevronLeft className="h-4 w-4 text-white" />
//         )}
//       </button>

//       {/* Navigation */}
//       <div className="flex-1 px-4 overflow-y-auto custom-scrollbar relative">
//         {!sidebarCollapsed && (
//           <div className="mb-6 mt-6">
//             <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 px-3">
//               Main Navigation
//             </div>

//             <nav className="space-y-2">
//               {menuItems.map((item, index) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   style={{ animationDelay: `${index * 50}ms` }}
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
//                       isActive
//                         ? 'bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 shadow-lg scale-105'
//                         : 'hover:bg-white/10 hover:scale-105'
//                     }`
//                   }
//                 >
//                   {({ isActive }) => (
//                     <>
//                       {isActive && (
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
//                       )}
//                       <div className="relative z-10 flex items-center w-full">
//                         {getIconComponent(item.icon)}
//                         <span className="ml-3 font-semibold text-sm">{item.label}</span>
//                       </div>
//                     </>
//                   )}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>
//         )}

//         {/* Collapsed Mode (icons only) */}
//         {sidebarCollapsed && (
//           <nav className="space-y-3 pt-6">
//             {menuItems.map((item, index) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 style={{ animationDelay: `${index * 50}ms` }}
//                 className={({ isActive }) =>
//                   `flex items-center justify-center p-3.5 rounded-xl transition-all duration-300 group relative ${
//                     isActive
//                       ? 'bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 shadow-lg scale-110'
//                       : 'hover:bg-white/10 hover:scale-110'
//                   }`
//                 }
//                 title={item.label}
//               >
//                 {getIconComponent(item.icon)}
//               </NavLink>
//             ))}
//           </nav>
//         )}
//       </div>

//       {/* User Section */}
//       <div className="relative p-4 border-t border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
//         <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
//           <div className="relative">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg font-semibold text-white">
//               {user?.avatar || user?.name?.charAt(0)}
//             </div>
//             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
//           </div>

//           {!sidebarCollapsed && (
//             <>
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-white truncate">{user?.name}</p>
//                 <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 group"
//                 title="Logout"
//               >
//                 <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
//               </button>
//             </>
//           )}

//           {sidebarCollapsed && (
//             <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//               {user?.name}
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }

//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #f97316, #22c55e, #3b82f6);
//           border-radius: 10px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #ea580c, #16a34a, #2563eb);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Sidebar;


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
  ChevronDown,
  ChevronLeft,
  ChevronRight
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getIconComponent = (iconChar) => {
    const IconComponent = iconMap[iconChar] || Home;
    return <IconComponent className="h-5 w-5" />;
  };

  // Handler for clicking icons in collapsed mode
  const handleCollapsedIconClick = (e, path) => {
    e.preventDefault();
    toggleSidebar(); // Expand the sidebar
    setTimeout(() => {
      navigate(path); // Navigate after sidebar expands
    }, 100);
  };

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} sidebar-transition bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col h-full relative shadow-2xl`}>
      
      {/* Animated Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-green-500/30 to-blue-500/30 animate-pulse"></div>
      </div>

      {/* Logo Section */}
      <div className={`relative p-6 border-b border-gray-700 bg-gradient-to-r from-orange-600/20 via-green-600/20 to-blue-600/20 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
        {sidebarCollapsed ? (
          <div className="relative">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-gradient-to-br', 'from-orange-500', 'via-green-500', 'to-blue-500');
                  e.target.parentElement.innerHTML = '<span class="flex items-center justify-center w-full h-full text-2xl font-black text-white">E</span>';
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg transform hover:scale-110 transition-transform duration-300">
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-orange-500', 'via-green-500', 'to-blue-500');
                    e.target.parentElement.innerHTML = '<span class="flex items-center justify-center w-full h-full text-2xl font-black text-white">E</span>';
                  }}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                EMS SYSTEM
              </h1>
              <p className="text-xs text-gray-400 font-medium">Acetech Work Organization PVT.LTD</p>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg z-50"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-4 w-4 text-white" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-white" />
        )}
      </button>

      {/* Navigation */}
      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar relative">
        {!sidebarCollapsed && (
          <div className="mb-6 mt-6">
            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 px-3">
              Main Navigation
            </div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 shadow-lg scale-105'
                        : 'hover:bg-white/10 hover:scale-105'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      )}
                      <div className="relative z-10 flex items-center w-full">
                        {getIconComponent(item.icon)}
                        <span className="ml-3 font-semibold text-sm">{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Collapsed Mode (icons only) - Click to expand and navigate */}
        {sidebarCollapsed && (
          <nav className="space-y-3 pt-6">
            {menuItems.map((item, index) => (
              <div key={item.path} className="relative group">
                <button
                  onClick={(e) => handleCollapsedIconClick(e, item.path)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="w-full flex items-center justify-center p-3.5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-110"
                  title={item.label}
                >
                  {getIconComponent(item.icon)}
                </button>
                
                {/* Tooltip on hover */}
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {item.label}
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* User Section */}
      <div className="relative p-4 border-t border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg font-semibold text-white">
              {user?.avatar || user?.name?.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
          </div>

          {!sidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 group"
                title="Logout"
              >
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {sidebarCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {user?.name}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .sidebar-transition {
          transition: width 0.3s ease-in-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #22c55e, #3b82f6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #16a34a, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;