// // // // src/components/layout/Topbar.jsx
// // // import React, { useState } from 'react';
// // // import { useAuth } from '../../hooks/useAuth';
// // // import { useTheme } from '../../contexts/ThemeContext';
// // // import { 
// // //   Bell, 
// // //   Search, 
// // //   Sun, 
// // //   Moon,
// // //   User,
// // //   Settings as SettingsIcon,
// // //   HelpCircle,
// // //   LogOut
// // // } from 'lucide-react';
// // // import { toast } from 'react-hot-toast';

// // // const Topbar = ({ onMenuClick }) => {
// // //   const { user, logout } = useAuth();
// // //   const { theme, toggleTheme, isDark } = useTheme();
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [showNotifications, setShowNotifications] = useState(false);
// // //   const [showProfileMenu, setShowProfileMenu] = useState(false);

// // //   const notifications = [
// // //     { id: 1, title: 'New employee joined', time: '5 min ago', read: false },
// // //     { id: 2, title: 'Leave request pending', time: '1 hour ago', read: false },
// // //     { id: 3, title: 'System backup completed', time: '2 hours ago', read: true },
// // //     { id: 4, title: 'Monthly report ready', time: '1 day ago', read: true },
// // //   ];

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     toast.success(`Searching for: ${searchQuery}`);
// // //     setSearchQuery('');
// // //   };

// // //   const handleLogout = () => {
// // //     logout();
// // //     setShowProfileMenu(false);
// // //   };

// // //   return (
// // //     <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6">
// // //       <div className="flex items-center justify-between">
// // //         {/* Left Section */}
// // //         <div className="flex items-center space-x-4">
// // //           <button
// // //             onClick={onMenuClick}
// // //             className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// // //           >
// // //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // //             </svg>
// // //           </button>
          
// // //           <div className="hidden md:block">
// // //             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
// // //               Welcome, {user?.name}
// // //             </h2>
// // //             <p className="text-sm text-gray-600 dark:text-gray-400">
// // //               Role: <span className="capitalize">{user?.role}</span>
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Center Section - Search */}
// // //         <div className="flex-1 max-w-2xl mx-4 hidden md:block">
// // //           <form onSubmit={handleSearch} className="relative">
// // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // //             <input
// // //               type="search"
// // //               placeholder="Search employees, reports, or settings..."
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //             />
// // //           </form>
// // //         </div>

// // //         {/* Right Section */}
// // //         <div className="flex items-center space-x-3">
// // //           {/* Theme Toggle */}
// // //           <button
// // //             onClick={toggleTheme}
// // //             className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// // //             title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
// // //           >
// // //             {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
// // //           </button>

// // //           {/* Search Button (Mobile) */}
// // //           <button className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
// // //             <Search className="h-5 w-5" />
// // //           </button>

// // //           {/* Notifications */}
// // //           <div className="relative">
// // //             <button
// // //               onClick={() => setShowNotifications(!showNotifications)}
// // //               className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
// // //             >
// // //               <Bell className="h-5 w-5" />
// // //               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
// // //             </button>

// // //             {showNotifications && (
// // //               <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
// // //                 <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// // //                   <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
// // //                   <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                     {notifications.filter(n => !n.read).length} new
// // //                   </p>
// // //                 </div>
// // //                 <div className="max-h-96 overflow-y-auto">
// // //                   {notifications.map((notification) => (
// // //                     <div
// // //                       key={notification.id}
// // //                       className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
// // //                         !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
// // //                       }`}
// // //                     >
// // //                       <div className="flex justify-between items-start">
// // //                         <p className="font-medium text-gray-900 dark:text-white">
// // //                           {notification.title}
// // //                         </p>
// // //                         {!notification.read && (
// // //                           <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
// // //                         )}
// // //                       </div>
// // //                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// // //                         {notification.time}
// // //                       </p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //                 <div className="p-3 border-t border-gray-200 dark:border-gray-700">
// // //                   <button className="w-full text-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium">
// // //                     View all notifications
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Help */}
// // //           <button
// // //             className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// // //             title="Help"
// // //             onClick={() => toast.success('Help documentation will open in new tab')}
// // //           >
// // //             <HelpCircle className="h-5 w-5" />
// // //           </button>

// // //           {/* Settings */}
// // //           <button
// // //             className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// // //             title="Settings"
// // //             onClick={() => toast.info('Settings page coming soon')}
// // //           >
// // //             <SettingsIcon className="h-5 w-5" />
// // //           </button>

// // //           {/* Profile Menu */}
// // //           <div className="relative">
// // //             <button
// // //               onClick={() => setShowProfileMenu(!showProfileMenu)}
// // //               className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// // //             >
// // //               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
// // //                 {user?.avatar || user?.name?.charAt(0)}
// // //               </div>
// // //               <div className="hidden md:block text-left">
// // //                 <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
// // //                 <p className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</p>
// // //               </div>
// // //             </button>

// // //             {showProfileMenu && (
// // //               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
// // //                 <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// // //                   <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
// // //                   <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
// // //                 </div>
// // //                 <div className="p-2">
// // //                   <button
// // //                     onClick={() => {
// // //                       setShowProfileMenu(false);
// // //                       toast.info('Profile page opening...');
// // //                     }}
// // //                     className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
// // //                   >
// // //                     <User className="h-5 w-5" />
// // //                     <span>My Profile</span>
// // //                   </button>
// // //                   <button
// // //                     onClick={handleLogout}
// // //                     className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors mt-1"
// // //                   >
// // //                     <LogOut className="h-5 w-5" />
// // //                     <span>Logout</span>
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // };

// // // export default Topbar;



// // // src/components/layout/Topbar.jsx
// // import React, { useState } from 'react';
// // import { useAuth } from '../../hooks/useAuth';
// // import { toast } from 'react-hot-toast';
// // import { 
// //   Bell, 
// //   Search, 
// //   User,
// //   Settings as SettingsIcon,
// //   HelpCircle,
// //   LogOut
// // } from 'lucide-react';

// // const Topbar = ({ onMenuClick }) => {
// //   const { user, logout } = useAuth();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showProfileMenu, setShowProfileMenu] = useState(false);

// //   const notifications = [
// //     { id: 1, title: 'New employee joined', time: '5 min ago', read: false },
// //     { id: 2, title: 'Leave request pending', time: '1 hour ago', read: false },
// //     { id: 3, title: 'System backup completed', time: '2 hours ago', read: true },
// //     { id: 4, title: 'Monthly report ready', time: '1 day ago', read: true },
// //   ];

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     toast.success(`Searching for: ${searchQuery}`);
// //     setSearchQuery('');
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     setShowProfileMenu(false);
// //   };

// //   return (
// //     <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
// //       <div className="flex items-center justify-between">
// //         {/* Left Section */}
// //         <div className="flex items-center space-x-4">
// //           <button
// //             onClick={onMenuClick}
// //             className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //             </svg>
// //           </button>
          
// //           <div className="hidden md:block">
// //             <h2 className="text-xl font-semibold text-gray-800">
// //               Welcome, {user?.name}
// //             </h2>
// //             <p className="text-sm text-gray-600">
// //               Role: <span className="capitalize">{user?.role}</span>
// //             </p>
// //           </div>
// //         </div>

       
// //           {/* Profile Menu */}
// //           <div className="relative">
// //             <button
// //               onClick={() => setShowProfileMenu(!showProfileMenu)}
// //               className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //             >
// //               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
// //                 {user?.avatar || user?.name?.charAt(0)}
// //               </div>
// //               <div className="hidden md:block text-left">
// //                 <p className="font-medium text-gray-900">{user?.name}</p>
// //                 <p className="text-xs text-gray-600">{user?.email}</p>
// //               </div>
// //             </button>

// //             {showProfileMenu && (
// //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
// //                 <div className="p-4 border-b border-gray-200">
// //                   <p className="font-medium text-gray-900">{user?.name}</p>
// //                   <p className="text-sm text-gray-600">{user?.email}</p>
// //                 </div>
// //                 <div className="p-2">
// //                   <button
// //                     onClick={() => {
// //                       setShowProfileMenu(false);
// //                       toast.info('Profile page opening...');
// //                     }}
// //                     className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
// //                   >
// //                     <User className="h-5 w-5" />
// //                     <span>My Profile</span>
// //                   </button>
// //                   <button
// //                     onClick={handleLogout}
// //                     className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
// //                   >
// //                     <LogOut className="h-5 w-5" />
// //                     <span>Logout</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
      
// //     </header>
// //   );
// // };

// // export default Topbar;


// import React, { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import { toast } from 'react-hot-toast';
// import { 
//   Bell, 
//   Search, 
//   User,
//   Settings as SettingsIcon,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';

// const Topbar = ({ onMenuClick }) => {
//   const { user, logout } = useAuth();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const notifications = [
//     { id: 1, title: 'New employee joined', time: '5 min ago', read: false, color: 'from-green-500 to-green-600' },
//     { id: 2, title: 'Leave request pending', time: '1 hour ago', read: false, color: 'from-orange-500 to-orange-600' },
//     { id: 3, title: 'System backup completed', time: '2 hours ago', read: true, color: 'from-blue-500 to-blue-600' },
//     { id: 4, title: 'Monthly report ready', time: '1 day ago', read: true, color: 'from-red-500 to-red-600' },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       toast.success(`Searching for: ${searchQuery}`);
//       setSearchQuery('');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setShowProfileMenu(false);
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 px-4 py-3 md:px-6 sticky top-0 z-40 shadow-sm">
//       <div className="flex items-center justify-between">
//         {/* Left Section */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onMenuClick}
//             className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all duration-300 hover:scale-110"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
          
//           <div className="hidden md:block">
//             <h2 className="text-2xl font-black bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
//               Welcome, {user?.name}! 👋
//             </h2>
//             <p className="text-sm text-gray-600 font-medium mt-0.5">
//               Role: <span className="capitalize font-semibold text-gray-800">{user?.role}</span>
//             </p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-3">
       

//           {/* Profile Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setShowProfileMenu(!showProfileMenu)}
//               className="flex items-center space-x-2 md:space-x-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all duration-300 group hover:scale-105"
//             >
//               <div className="relative">
//                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
//                   {user?.avatar || user?.name?.charAt(0)}
//                 </div>
//                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
//               </div>
//               <div className="hidden md:block text-left">
//                 <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
//                 <p className="text-xs text-gray-600">{user?.email}</p>
//               </div>
//             </button>

//             {showProfileMenu && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40" 
//                   onClick={() => setShowProfileMenu(false)}
//                 ></div>
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 via-green-50 to-blue-50">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
//                         {user?.avatar || user?.name?.charAt(0)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-gray-900 truncate">{user?.name}</p>
//                         <p className="text-sm text-gray-600 truncate">{user?.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2">
//                     <button
//                       onClick={() => {
//                         setShowProfileMenu(false);
//                         toast.info('Profile page opening...');
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
//                     >
//                       <User className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
//                       <span className="font-semibold">My Profile</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowProfileMenu(false);
//                         toast.info('Settings page opening...');
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
//                     >
//                       <SettingsIcon className="h-5 w-5 group-hover:text-green-500 transition-colors" />
//                       <span className="font-semibold">Settings</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowProfileMenu(false);
//                         toast.info('Help center opening...');
//                       }}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
//                     >
//                       <HelpCircle className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
//                       <span className="font-semibold">Help Center</span>
//                     </button>
//                     <div className="my-2 border-t border-gray-200"></div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group font-semibold"
//                     >
//                       <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { 
  Bell, 
  Search, 
  User,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New employee joined', time: '5 min ago', read: false, color: 'from-green-500 to-green-600' },
    { id: 2, title: 'Leave request pending', time: '1 hour ago', read: false, color: 'from-orange-500 to-orange-600' },
    { id: 3, title: 'System backup completed', time: '2 hours ago', read: true, color: 'from-blue-500 to-blue-600' },
    { id: 4, title: 'Monthly report ready', time: '1 day ago', read: true, color: 'from-red-500 to-red-600' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate('/profile');
    toast.success('Navigating to Profile');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate('/settings');
    toast.success('Navigating to Settings');
  };

  const handleHelpClick = () => {
    setShowProfileMenu(false);
    navigate('/help');
    toast.success('Navigating to Help Center');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 px-4 py-3 md:px-6 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all duration-300 hover:scale-110"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:block">
            <h2 className="text-2xl font-black bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Welcome, {user?.name}! 👋
            </h2>
            <p className="text-sm text-gray-600 font-medium mt-0.5">
              Role: <span className="capitalize font-semibold text-gray-800">{user?.role}</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
       

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 md:space-x-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user?.avatar || user?.name?.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 via-green-50 to-blue-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-green-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.avatar || user?.name?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
                    >
                      <User className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
                      <span className="font-semibold">My Profile</span>
                    </button>
                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
                    >
                      <SettingsIcon className="h-5 w-5 group-hover:text-green-500 transition-colors" />
                      <span className="font-semibold">Settings</span>
                    </button>
                    <button
                      onClick={handleHelpClick}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 rounded-xl transition-all duration-300 group"
                    >
                      <HelpCircle className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                      <span className="font-semibold">Help Center</span>
                    </button>
                    <div className="my-2 border-t border-gray-200"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group font-semibold"
                    >
                      <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;