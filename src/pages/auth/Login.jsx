// // // // // // // src/pages/auth/Login.jsx
// // // // // // import React, { useState } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import { useAuth } from '../../hooks/useAuth';
// // // // // // import { toast } from 'react-hot-toast';
// // // // // // import { 
// // // // // //   Mail, 
// // // // // //   Lock, 
// // // // // //   Eye, 
// // // // // //   EyeOff,
// // // // // //   Shield,
// // // // // //   Users,
// // // // // //   Briefcase,
// // // // // //   Building2,
// // // // // //   Calendar,
// // // // // //   BarChart3,
// // // // // //   FileText
// // // // // // } from 'lucide-react';

// // // // // // const Login = () => {
// // // // // //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const { login } = useAuth();
// // // // // //   const navigate = useNavigate();

// // // // // //   const demoCredentials = [
// // // // // //     { 
// // // // // //       role: 'Super Admin', 
// // // // // //       username: 'superadmin', 
// // // // // //       password: 'super123',
// // // // // //       icon: <Shield className="h-5 w-5" />,
// // // // // //       color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
// // // // // //     },
// // // // // //     { 
// // // // // //       role: 'Admin', 
// // // // // //       username: 'admin', 
// // // // // //       password: 'admin123',
// // // // // //       icon: <Users className="h-5 w-5" />,
// // // // // //       color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
// // // // // //     },
// // // // // //     { 
// // // // // //       role: 'Employee', 
// // // // // //       username: 'employee', 
// // // // // //       password: 'employee123',
// // // // // //       icon: <Briefcase className="h-5 w-5" />,
// // // // // //       color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
// // // // // //     }
// // // // // //   ];

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!credentials.username || !credentials.password) {
// // // // // //       toast.error('Please fill in all fields');
// // // // // //       return;
// // // // // //     }

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       await login(credentials);
// // // // // //       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
// // // // // //                       credentials.username === 'admin' ? 'admin' : 'employee';
// // // // // //       navigate(`/${userRole}/dashboard`);
// // // // // //     } catch (error) {
// // // // // //       toast.error('Login failed. Please check your credentials.');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const fillCredentials = (username, password) => {
// // // // // //     setCredentials({ username, password });
// // // // // //     toast.success(`Filled ${username} credentials`);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
// // // // // //       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        
// // // // // //         {/* Left Section - Login Form */}
// // // // // //         <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 xl:p-12">
// // // // // //           <div className="text-center mb-6 sm:mb-8">
// // // // // //             <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl mb-3 sm:mb-4">
// // // // // //               <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />
// // // // // //             </div>
// // // // // //             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
// // // // // //               Welcome Back
// // // // // //             </h1>
// // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
// // // // // //               Employee Management System
// // // // // //             </h2>
// // // // // //             <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Secure & Centralized HR Platform</p>
// // // // // //           </div>

// // // // // //           <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // // // //                 Username
// // // // // //               </label>
// // // // // //               <div className="relative">
// // // // // //                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   required
// // // // // //                   className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
// // // // // //                   placeholder="Enter username or email"
// // // // // //                   value={credentials.username}
// // // // // //                   onChange={(e) => setCredentials({...credentials, username: e.target.value})}
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>
            
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // // // //                 Password
// // // // // //               </label>
// // // // // //               <div className="relative">
// // // // // //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // // // // //                 <input
// // // // // //                   type={showPassword ? "text" : "password"}
// // // // // //                   required
// // // // // //                   className="w-full pl-10 pr-12 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
// // // // // //                   placeholder="Enter password"
// // // // // //                   value={credentials.password}
// // // // // //                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}
// // // // // //                 />
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
// // // // // //                   onClick={() => setShowPassword(!showPassword)}
// // // // // //                 >
// // // // // //                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="flex items-center justify-between text-sm">
// // // // // //               <label className="flex items-center cursor-pointer">
// // // // // //                 <input
// // // // // //                   type="checkbox"
// // // // // //                   className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
// // // // // //                 />
// // // // // //                 <span className="ml-2 text-gray-600 dark:text-gray-400">Remember me</span>
// // // // // //               </label>
// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
// // // // // //                 onClick={() => toast.info('Password reset feature coming soon')}
// // // // // //               >
// // // // // //                 Forgot password?
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             <button
// // // // // //               type="submit"
// // // // // //               disabled={loading}
// // // // // //               className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
// // // // // //             >
// // // // // //               {loading ? (
// // // // // //                 <>
// // // // // //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
// // // // // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // // // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // // // //                   </svg>
// // // // // //                   Signing in...
// // // // // //                 </>
// // // // // //               ) : 'Sign in'}
// // // // // //             </button>
// // // // // //           </form>

// // // // // //           <div className="mt-6 sm:mt-8">
// // // // // //             <div className="relative">
// // // // // //               <div className="absolute inset-0 flex items-center">
// // // // // //                 <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
// // // // // //               </div>
// // // // // //               <div className="relative flex justify-center text-sm">
// // // // // //                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
// // // // // //                   Demo Credentials
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
// // // // // //               {demoCredentials.map((cred, index) => (
// // // // // //                 <div 
// // // // // //                   key={index} 
// // // // // //                   className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-[1.01]"
// // // // // //                 >
// // // // // //                   <div className="flex items-center space-x-3">
// // // // // //                     <div className={`p-2 rounded-lg ${cred.color}`}>
// // // // // //                       {cred.icon}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{cred.role}</div>
// // // // // //                       <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
// // // // // //                         {cred.username} / {cred.password}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <button
// // // // // //                     onClick={() => fillCredentials(cred.username, cred.password)}
// // // // // //                     className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-md transition-all transform hover:scale-105"
// // // // // //                   >
// // // // // //                     Fill
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Right Section - Image Background with Stats Overlay */}
// // // // // //         <div className="relative lg:col-span-3 min-h-[300px] lg:min-h-full overflow-hidden">
// // // // // //           {/* Background Image with Overlay */}
// // // // // //           <div 
// // // // // //             className="absolute inset-0 bg-cover bg-center"
// // // // // //             style={{
// // // // // //               backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80")',
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-emerald-900/50"></div>
// // // // // //           </div>
          
// // // // // //           {/* Content */}
// // // // // //           <div className="relative z-10 h-full p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between">
// // // // // //             <div>
// // // // // //               <div className="flex items-center space-x-3 mb-6 sm:mb-8">
// // // // // //                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
// // // // // //                   <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
// // // // // //                 </div>
// // // // // //                 <div>
// // // // // //                   <h2 className="text-xl sm:text-2xl font-bold text-white">EMS Pro</h2>
// // // // // //                   <p className="text-emerald-200 text-xs sm:text-sm">Enterprise Edition</p>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="mb-6 sm:mb-8">
// // // // // //                 <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Trusted by 500+ Companies</h3>
                
// // // // // //                 <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
// // // // // //                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // // // //                     <div className="flex items-center space-x-2 sm:space-x-3">
// // // // // //                       <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
// // // // // //                         <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                         <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
// // // // // //                         <div className="text-emerald-200 text-xs sm:text-sm">Active Users</div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
                  
// // // // // //                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // // // //                     <div className="flex items-center space-x-2 sm:space-x-3">
// // // // // //                       <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
// // // // // //                         <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                         <div className="text-xl sm:text-2xl font-bold text-white">99.8%</div>
// // // // // //                         <div className="text-emerald-200 text-xs sm:text-sm">Uptime</div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="space-y-3 sm:space-y-4">
// // // // // //                 <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
// // // // // //                   <div className="w-8 h-8 bg-emerald-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// // // // // //                     <Calendar className="h-4 w-4 text-white" />
// // // // // //                   </div>
// // // // // //                   <span className="text-sm sm:text-base text-emerald-100">Automated Attendance Tracking</span>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
// // // // // //                   <div className="w-8 h-8 bg-emerald-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// // // // // //                     <FileText className="h-4 w-4 text-white" />
// // // // // //                   </div>
// // // // // //                   <span className="text-sm sm:text-base text-emerald-100">Digital Payroll Processing</span>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
// // // // // //                   <div className="w-8 h-8 bg-emerald-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// // // // // //                     <Shield className="h-4 w-4 text-white" />
// // // // // //                   </div>
// // // // // //                   <span className="text-sm sm:text-base text-emerald-100">Enterprise Grade Security</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Testimonial */}
// // // // // //             <div className="mt-6 sm:mt-8">
// // // // // //               <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
// // // // // //                 <div className="flex items-center space-x-3 mb-3 sm:mb-4">
// // // // // //                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
// // // // // //                     JD
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <div className="font-semibold text-white text-sm sm:text-base">Ravi KUmar</div>
// // // // // //                     <div className="text-emerald-200 text-xs sm:text-sm">HR Director at Acetech work organization private limited</div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <p className="text-emerald-100 italic text-sm sm:text-base">
// // // // // //                   "EMS Pro reduced our HR processing time by 70%. The team management features are exceptional."
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Login;


// // // // // // src/pages/auth/Login.jsx
// // // // // import React, { useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { useAuth } from '../../hooks/useAuth';
// // // // // import { toast } from 'react-hot-toast';
// // // // // import { 
// // // // //   Mail, 
// // // // //   Lock, 
// // // // //   Eye, 
// // // // //   EyeOff,
// // // // //   Shield,
// // // // //   Users,
// // // // //   Briefcase,
// // // // //   Building2,
// // // // //   Calendar,
// // // // //   BarChart3,
// // // // //   FileText,
// // // // //   CheckCircle
// // // // // } from 'lucide-react';

// // // // // const Login = () => {
// // // // //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const { login } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const demoCredentials = [
// // // // //     { 
// // // // //       role: 'Super Admin', 
// // // // //       username: 'superadmin', 
// // // // //       password: 'super123',
// // // // //       icon: <Shield className="h-5 w-5" />,
// // // // //       color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
// // // // //       textColor: 'text-white',
// // // // //       badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
// // // // //     },
// // // // //     { 
// // // // //       role: 'Admin', 
// // // // //       username: 'admin', 
// // // // //       password: 'admin123',
// // // // //       icon: <Users className="h-5 w-5" />,
// // // // //       color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
// // // // //       textColor: 'text-white',
// // // // //       badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
// // // // //     },
// // // // //     { 
// // // // //       role: 'Employee', 
// // // // //       username: 'employee', 
// // // // //       password: 'employee123',
// // // // //       icon: <Briefcase className="h-5 w-5" />,
// // // // //       color: 'bg-gradient-to-r from-emerald-500 to-green-600',
// // // // //       textColor: 'text-white',
// // // // //       badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
// // // // //     }
// // // // //   ];

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!credentials.username || !credentials.password) {
// // // // //       toast.error('Please fill in all fields');
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       await login(credentials);
// // // // //       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
// // // // //                       credentials.username === 'admin' ? 'admin' : 'employee';
// // // // //       toast.success('Login successful!');
// // // // //       setTimeout(() => navigate(`/${userRole}/dashboard`), 500);
// // // // //     } catch (error) {
// // // // //       toast.error('Login failed. Please check your credentials.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fillCredentials = (username, password) => {
// // // // //     setCredentials({ username, password });
// // // // //     toast.success(`Filled ${username} credentials`);
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
// // // // //       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        
// // // // //         {/* Left Section - Login Form */}
// // // // //         <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
// // // // //           {/* Logo and Brand */}
// // // // //           <div className="flex items-center space-x-3 mb-8">
// // // // //             <div className="relative">
// // // // //               <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
// // // // //                 <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // //                   <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z"/>
// // // // //                   <path d="M12 7.5l3.5 7h-7l3.5-7z"/>
// // // // //                 </svg>
// // // // //               </div>
// // // // //               <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
// // // // //                 <CheckCircle className="w-3 h-3 text-white" />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
// // // // //                 EMS Pro
// // // // //               </h1>
// // // // //               <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Management System</p>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="text-center mb-8">
// // // // //             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
// // // // //               Welcome Back
// // // // //             </h2>
// // // // //             <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
// // // // //           </div>

// // // // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // // // //             <div className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // // //                   Username
// // // // //                 </label>
// // // // //                 <div className="relative group">
// // // // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // // //                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // // // //                   <input
// // // // //                     type="text"
// // // // //                     required
// // // // //                     className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // // // //                     placeholder="Enter username or email"
// // // // //                     value={credentials.username}
// // // // //                     onChange={(e) => setCredentials({...credentials, username: e.target.value})}
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // // //                   Password
// // // // //                 </label>
// // // // //                 <div className="relative group">
// // // // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // // //                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // // // //                   <input
// // // // //                     type={showPassword ? "text" : "password"}
// // // // //                     required
// // // // //                     className="w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // // // //                     placeholder="Enter password"
// // // // //                     value={credentials.password}
// // // // //                     onChange={(e) => setCredentials({...credentials, password: e.target.value})}
// // // // //                   />
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
// // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // //                   >
// // // // //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex items-center justify-between text-sm">
// // // // //               <label className="flex items-center cursor-pointer space-x-2">
// // // // //                 <div className="relative">
// // // // //                   <input
// // // // //                     type="checkbox"
// // // // //                     className="sr-only"
// // // // //                   />
// // // // //                   <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors">
// // // // //                     <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// // // // //                     </svg>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <span className="text-gray-600 dark:text-gray-400">Remember me</span>
// // // // //               </label>
// // // // //               <button
// // // // //                 type="button"
// // // // //                 className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors hover:underline"
// // // // //                 onClick={() => toast.info('Password reset feature coming soon')}
// // // // //               >
// // // // //                 Forgot password?
// // // // //               </button>
// // // // //             </div>

// // // // //             <button
// // // // //               type="submit"
// // // // //               disabled={loading}
// // // // //               className="w-full relative overflow-hidden group"
// // // // //             >
// // // // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:from-emerald-600 group-hover:to-blue-600 transition-all"></div>
// // // // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // // //               <div className="relative py-3.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white flex items-center justify-center space-x-2">
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
// // // // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // // //                     </svg>
// // // // //                     <span>Signing in...</span>
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <span>Sign in</span>
// // // // //                     <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
// // // // //                     </svg>
// // // // //                   </>
// // // // //                 )}
// // // // //               </div>
// // // // //             </button>
// // // // //           </form>

// // // // //           {/* Demo Credentials */}
// // // // //           <div className="mt-8">
// // // // //             <div className="relative">
// // // // //               <div className="absolute inset-0 flex items-center">
// // // // //                 <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
// // // // //               </div>
// // // // //               <div className="relative flex justify-center text-sm">
// // // // //                 <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
// // // // //                   Try demo accounts
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
// // // // //               {demoCredentials.map((cred, index) => (
// // // // //                 <div 
// // // // //                   key={index} 
// // // // //                   className="relative overflow-hidden group cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
// // // // //                   onClick={() => fillCredentials(cred.username, cred.password)}
// // // // //                 >
// // // // //                   <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // // //                   <div className="relative p-4">
// // // // //                     <div className="flex items-center space-x-3">
// // // // //                       <div className={`w-10 h-10 ${cred.color} rounded-lg flex items-center justify-center ${cred.textColor} shadow-md`}>
// // // // //                         {cred.icon}
// // // // //                       </div>
// // // // //                       <div className="flex-1">
// // // // //                         <div className="font-semibold text-gray-900 dark:text-white text-sm">{cred.role}</div>
// // // // //                         <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
// // // // //                           {cred.username}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="mt-3 flex items-center justify-between">
// // // // //                       <span className="text-xs text-gray-600 dark:text-gray-400">•••••••</span>
// // // // //                       <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Click to fill</span>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Right Section - Features & Stats */}
// // // // //         <div className="relative hidden lg:block bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
// // // // //           {/* Background Pattern */}
// // // // //           <div className="absolute inset-0 opacity-10">
// // // // //             <div className="absolute inset-0" style={{
// // // // //               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// // // // //               backgroundSize: '30px 30px'
// // // // //             }}></div>
// // // // //           </div>

// // // // //           <div className="relative h-full p-10 xl:p-12 flex flex-col justify-between">
// // // // //             {/* Header */}
// // // // //             <div>
// // // // //               <div className="mb-10">
// // // // //                 <h3 className="text-3xl font-bold text-white mb-3">
// // // // //                   Streamline Your HR Operations
// // // // //                 </h3>
// // // // //                 <p className="text-emerald-200/80">
// // // // //                   Powerful tools for modern workforce management
// // // // //                 </p>
// // // // //               </div>

// // // // //               {/* Stats */}
// // // // //               <div className="grid grid-cols-2 gap-6 mb-10">
// // // // //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // // //                   <div className="flex items-center space-x-4">
// // // // //                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
// // // // //                       <Users className="h-6 w-6 text-white" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div className="text-2xl font-bold text-white">10K+</div>
// // // // //                       <div className="text-sm text-emerald-200">Active Employees</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
                
// // // // //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // // //                   <div className="flex items-center space-x-4">
// // // // //                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
// // // // //                       <BarChart3 className="h-6 w-6 text-white" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div className="text-2xl font-bold text-white">99.8%</div>
// // // // //                       <div className="text-sm text-emerald-200">System Uptime</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Features */}
// // // // //               <div className="space-y-4">
// // // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // // //                   <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-lg flex items-center justify-center">
// // // // //                     <Calendar className="h-5 w-5 text-emerald-300" />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <h4 className="font-medium text-white">Smart Attendance</h4>
// // // // //                     <p className="text-sm text-emerald-200/70">AI-powered tracking & insights</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // // //                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
// // // // //                     <FileText className="h-5 w-5 text-blue-300" />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <h4 className="font-medium text-white">Digital Payroll</h4>
// // // // //                     <p className="text-sm text-emerald-200/70">Automated processing & compliance</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // // //                   <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center">
// // // // //                     <Shield className="h-5 w-5 text-purple-300" />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <h4 className="font-medium text-white">Bank-Grade Security</h4>
// // // // //                     <p className="text-sm text-emerald-200/70">End-to-end encryption & audit logs</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Testimonial */}
// // // // //             <div className="mt-8">
// // // // //               <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
// // // // //                 <div className="flex items-start space-x-4">
// // // // //                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
// // // // //                     RK
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <p className="text-emerald-100 italic mb-4">
// // // // //                       "EMS Pro revolutionized our HR department. We reduced administrative tasks by 70% and improved employee satisfaction significantly."
// // // // //                     </p>
// // // // //                     <div>
// // // // //                       <div className="font-semibold text-white">Ravi Kumar</div>
// // // // //                       <div className="text-sm text-emerald-200">HR Director, Acetech Work Organization</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Mobile Features Section */}
// // // // //         <div className="lg:hidden bg-gradient-to-r from-emerald-900 to-blue-900 p-6">
// // // // //           <div className="text-center mb-6">
// // // // //             <h3 className="text-xl font-bold text-white mb-2">Why Choose EMS Pro?</h3>
// // // // //             <p className="text-emerald-200/80">Modern HR solutions for growing businesses</p>
// // // // //           </div>
// // // // //           <div className="grid grid-cols-2 gap-4">
// // // // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // // // //               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // // // //                 <Users className="h-5 w-5 text-white" />
// // // // //               </div>
// // // // //               <div className="text-sm font-medium text-white">Team Management</div>
// // // // //             </div>
// // // // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // // // //               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // // // //                 <Shield className="h-5 w-5 text-white" />
// // // // //               </div>
// // // // //               <div className="text-sm font-medium text-white">Secure Platform</div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Login;


// // // // // src/pages/auth/Login.jsx
// // // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../../hooks/useAuth';
// // // // import { toast } from 'react-hot-toast';
// // // // import { 
// // // //   Mail, 
// // // //   Lock, 
// // // //   Eye, 
// // // //   EyeOff,
// // // //   Shield,
// // // //   Users,
// // // //   Briefcase,
// // // //   Calendar,
// // // //   BarChart3,
// // // //   FileText,
// // // //   CheckCircle
// // // // } from 'lucide-react';

// // // // // Import your logo images - adjust these paths according to your project structure
// // // // import logoLight from '/logo.jpg'; // For dark backgrounds
// // // // import logoDark from '/logo.jpg';   // For light backgrounds
// // // //    // For favicon/icon use

// // // // // If you don't have different logos, use a single logo
// // // // import logo from '/logo.jpg';

// // // // const Login = () => {
// // // //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const { login } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const demoCredentials = [
// // // //     { 
// // // //       role: 'Super Admin', 
// // // //       username: 'superadmin', 
// // // //       password: 'super123',
// // // //       icon: <Shield className="h-5 w-5" />,
// // // //       color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
// // // //       textColor: 'text-white',
// // // //       badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
// // // //     },
// // // //     { 
// // // //       role: 'Admin', 
// // // //       username: 'admin', 
// // // //       password: 'admin123',
// // // //       icon: <Users className="h-5 w-5" />,
// // // //       color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
// // // //       textColor: 'text-white',
// // // //       badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
// // // //     },
// // // //     { 
// // // //       role: 'Employee', 
// // // //       username: 'employee', 
// // // //       password: 'employee123',
// // // //       icon: <Briefcase className="h-5 w-5" />,
// // // //       color: 'bg-gradient-to-r from-emerald-500 to-green-600',
// // // //       textColor: 'text-white',
// // // //       badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
// // // //     }
// // // //   ];

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!credentials.username || !credentials.password) {
// // // //       toast.error('Please fill in all fields');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       await login(credentials);
// // // //       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
// // // //                       credentials.username === 'admin' ? 'admin' : 'employee';
// // // //       toast.success('Login successful!');
// // // //       setTimeout(() => navigate(`/${userRole}/dashboard`), 500);
// // // //     } catch (error) {
// // // //       toast.error('Login failed. Please check your credentials.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fillCredentials = (username, password) => {
// // // //     setCredentials({ username, password });
// // // //     toast.success(`Filled ${username} credentials`);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
// // // //       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        
// // // //         {/* Left Section - Login Form */}
// // // //         <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
// // // //           {/* Logo and Brand */}
// // // //           <div className="flex items-center space-x-3 mb-8">
// // // //             <div className="relative">
// // // //               {/* Logo Image Container */}
// // // //               <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center p-2 shadow-lg border border-emerald-100 dark:border-emerald-800/50">
// // // //                 <img 
// // // //                   src={logo} 
// // // //                   alt="EMS Pro Logo" 
// // // //                   className="w-full h-full object-contain"
// // // //                   onError={(e) => {
// // // //                     e.target.onerror = null;
// // // //                     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z'/%3E%3Cpath d='M12 7.5l3.5 7h-7l3.5-7z'/%3E%3C/svg%3E";
// // // //                   }}
// // // //                 />
// // // //               </div>
// // // //               <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center shadow-md">
// // // //                 <CheckCircle className="w-3 h-3 text-white" />
// // // //               </div>
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
// // // //                 EMS Pro
// // // //               </h1>
// // // //               <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Management System</p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="text-center mb-8">
// // // //             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
// // // //               Welcome Back
// // // //             </h2>
// // // //             <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
// // // //           </div>

// // // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // // //             <div className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // //                   Username
// // // //                 </label>
// // // //                 <div className="relative group">
// // // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // //                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // // //                   <input
// // // //                     type="text"
// // // //                     required
// // // //                     className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // // //                     placeholder="Enter username or email"
// // // //                     value={credentials.username}
// // // //                     onChange={(e) => setCredentials({...credentials, username: e.target.value})}
// // // //                   />
// // // //                 </div>
// // // //               </div>
              
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // // //                   Password
// // // //                 </label>
// // // //                 <div className="relative group">
// // // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // //                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // // //                   <input
// // // //                     type={showPassword ? "text" : "password"}
// // // //                     required
// // // //                     className="w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // // //                     placeholder="Enter password"
// // // //                     value={credentials.password}
// // // //                     onChange={(e) => setCredentials({...credentials, password: e.target.value})}
// // // //                   />
// // // //                   <button
// // // //                     type="button"
// // // //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                   >
// // // //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center justify-between text-sm">
// // // //               <label className="flex items-center cursor-pointer space-x-2">
// // // //                 <div className="relative">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     className="sr-only"
// // // //                   />
// // // //                   <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors">
// // // //                     <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// // // //                     </svg>
// // // //                   </div>
// // // //                 </div>
// // // //                 <span className="text-gray-600 dark:text-gray-400">Remember me</span>
// // // //               </label>
// // // //               <button
// // // //                 type="button"
// // // //                 className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors hover:underline"
// // // //                 onClick={() => toast.info('Password reset feature coming soon')}
// // // //               >
// // // //                 Forgot password?
// // // //               </button>
// // // //             </div>

// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading}
// // // //               className="w-full relative overflow-hidden group"
// // // //             >
// // // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:from-emerald-600 group-hover:to-blue-600 transition-all"></div>
// // // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // //               <div className="relative py-3.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white flex items-center justify-center space-x-2">
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
// // // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                     </svg>
// // // //                     <span>Signing in...</span>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <span>Sign in</span>
// // // //                     <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
// // // //                     </svg>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             </button>
// // // //           </form>

// // // //           {/* Demo Credentials */}
// // // //           <div className="mt-8">
// // // //             <div className="relative">
// // // //               <div className="absolute inset-0 flex items-center">
// // // //                 <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
// // // //               </div>
// // // //               <div className="relative flex justify-center text-sm">
// // // //                 <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
// // // //                   Try demo accounts
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
// // // //               {demoCredentials.map((cred, index) => (
// // // //                 <div 
// // // //                   key={index} 
// // // //                   className="relative overflow-hidden group cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
// // // //                   onClick={() => fillCredentials(cred.username, cred.password)}
// // // //                 >
// // // //                   <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // // //                   <div className="relative p-4">
// // // //                     <div className="flex items-center space-x-3">
// // // //                       <div className={`w-10 h-10 ${cred.color} rounded-lg flex items-center justify-center ${cred.textColor} shadow-md`}>
// // // //                         {cred.icon}
// // // //                       </div>
// // // //                       <div className="flex-1">
// // // //                         <div className="font-semibold text-gray-900 dark:text-white text-sm">{cred.role}</div>
// // // //                         <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
// // // //                           {cred.username}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="mt-3 flex items-center justify-between">
// // // //                       <span className="text-xs text-gray-600 dark:text-gray-400">•••••••</span>
// // // //                       <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Click to fill</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Right Section - Features & Stats */}
// // // //         <div className="relative hidden lg:block bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
// // // //           {/* Background Pattern */}
// // // //           <div className="absolute inset-0 opacity-10">
// // // //             <div className="absolute inset-0" style={{
// // // //               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// // // //               backgroundSize: '30px 30px'
// // // //             }}></div>
// // // //           </div>

// // // //           <div className="relative h-full p-10 xl:p-12 flex flex-col justify-between">
// // // //             {/* Header with Logo */}
// // // //             <div>
// // // //               <div className="flex items-center space-x-4 mb-10">
// // // //                 <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center p-2 border border-white/20">
// // // //                   <img 
// // // //                     src={logoLight || logo} 
// // // //                     alt="EMS Logo" 
// // // //                     className="w-full h-full object-contain filter brightness-0 invert"
// // // //                     onError={(e) => {
// // // //                       e.target.onerror = null;
// // // //                       e.target.style.filter = 'none';
// // // //                       e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z'/%3E%3Cpath d='M12 7.5l3.5 7h-7l3.5-7z'/%3E%3C/svg%3E";
// // // //                     }}
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h3 className="text-3xl font-bold text-white mb-1">
// // // //                     EMS Pro
// // // //                   </h3>
// // // //                   <p className="text-emerald-200/80">
// // // //                     Enterprise Management System
// // // //                   </p>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Stats */}
// // // //               <div className="grid grid-cols-2 gap-6 mb-10">
// // // //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // //                   <div className="flex items-center space-x-4">
// // // //                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
// // // //                       <Users className="h-6 w-6 text-white" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-2xl font-bold text-white">10K+</div>
// // // //                       <div className="text-sm text-emerald-200">Active Employees</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
                
// // // //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
// // // //                   <div className="flex items-center space-x-4">
// // // //                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
// // // //                       <BarChart3 className="h-6 w-6 text-white" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-2xl font-bold text-white">99.8%</div>
// // // //                       <div className="text-sm text-emerald-200">System Uptime</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Features */}
// // // //               <div className="space-y-4">
// // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // //                   <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-lg flex items-center justify-center">
// // // //                     <Calendar className="h-5 w-5 text-emerald-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-medium text-white">Smart Attendance</h4>
// // // //                     <p className="text-sm text-emerald-200/70">AI-powered tracking & insights</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // //                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
// // // //                     <FileText className="h-5 w-5 text-blue-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-medium text-white">Digital Payroll</h4>
// // // //                     <p className="text-sm text-emerald-200/70">Automated processing & compliance</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
// // // //                   <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center">
// // // //                     <Shield className="h-5 w-5 text-purple-300" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h4 className="font-medium text-white">Bank-Grade Security</h4>
// // // //                     <p className="text-sm text-emerald-200/70">End-to-end encryption & audit logs</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Testimonial */}
// // // //             <div className="mt-8">
// // // //               <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
// // // //                 <div className="flex items-start space-x-4">
// // // //                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
// // // //                     RK
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="text-emerald-100 italic mb-4">
// // // //                       "EMS Pro revolutionized our HR department. We reduced administrative tasks by 70% and improved employee satisfaction significantly."
// // // //                     </p>
// // // //                     <div>
// // // //                       <div className="font-semibold text-white">Ravi Kumar</div>
// // // //                       <div className="text-sm text-emerald-200">HR Director, Acetech Work Organization</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Mobile Features Section */}
// // // //         <div className="lg:hidden bg-gradient-to-r from-emerald-900 to-blue-900 p-6">
// // // //           <div className="flex items-center justify-center mb-6">
// // // //             <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 border border-white/20">
// // // //               <img 
// // // //                 src={logoLight || logo} 
// // // //                 alt="EMS Logo" 
// // // //                 className="w-full h-full object-contain"
// // // //                 onError={(e) => {
// // // //                   e.target.onerror = null;
// // // //                   e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z'/%3E%3Cpath d='M12 7.5l3.5 7h-7l3.5-7z'/%3E%3C/svg%3E";
// // // //                 }}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //           <div className="text-center mb-6">
// // // //             <h3 className="text-xl font-bold text-white mb-2">Why Choose EMS Pro?</h3>
// // // //             <p className="text-emerald-200/80">Modern HR solutions for growing businesses</p>
// // // //           </div>
// // // //           <div className="grid grid-cols-2 gap-4">
// // // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // // //               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // // //                 <Users className="h-5 w-5 text-white" />
// // // //               </div>
// // // //               <div className="text-sm font-medium text-white">Team Management</div>
// // // //             </div>
// // // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // // //               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // // //                 <Shield className="h-5 w-5 text-white" />
// // // //               </div>
// // // //               <div className="text-sm font-medium text-white">Secure Platform</div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;


// // // // src/pages/auth/Login.jsx
// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useAuth } from '../../hooks/useAuth';
// // // import { toast } from 'react-hot-toast';
// // // import { 
// // //   Mail, 
// // //   Lock, 
// // //   Eye, 
// // //   EyeOff,
// // //   Shield,
// // //   Users,
// // //   Briefcase,
// // //   Calendar,
// // //   BarChart3,
// // //   FileText,
// // //   CheckCircle,
// // //   Building2,
// // //   Globe,
// // //   Cpu,
// // //   Zap
// // // } from 'lucide-react';

// // // const Login = () => {
// // //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const { login } = useAuth();
// // //   const navigate = useNavigate();

// // //   const demoCredentials = [
// // //     { 
// // //       role: 'Super Admin', 
// // //       username: 'superadmin', 
// // //       password: 'super123',
// // //       icon: <Shield className="h-5 w-5" />,
// // //       color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
// // //       textColor: 'text-white',
// // //       badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
// // //     },
// // //     { 
// // //       role: 'Admin', 
// // //       username: 'admin', 
// // //       password: 'admin123',
// // //       icon: <Users className="h-5 w-5" />,
// // //       color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
// // //       textColor: 'text-white',
// // //       badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
// // //     },
// // //     { 
// // //       role: 'Employee', 
// // //       username: 'employee', 
// // //       password: 'employee123',
// // //       icon: <Briefcase className="h-5 w-5" />,
// // //       color: 'bg-gradient-to-r from-emerald-500 to-green-600',
// // //       textColor: 'text-white',
// // //       badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
// // //     }
// // //   ];

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!credentials.username || !credentials.password) {
// // //       toast.error('Please fill in all fields');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       await login(credentials);
// // //       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
// // //                       credentials.username === 'admin' ? 'admin' : 'employee';
// // //       toast.success('Login successful!');
// // //       setTimeout(() => navigate(`/${userRole}/dashboard`), 500);
// // //     } catch (error) {
// // //       toast.error('Login failed. Please check your credentials.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fillCredentials = (username, password) => {
// // //     setCredentials({ username, password });
// // //     toast.success(`Filled ${username} credentials`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
// // //       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        
// // //         {/* Left Section - Login Form */}
// // //         <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
// // //           {/* Logo and Brand */}
// // //           <div className="flex items-center space-x-3 mb-8">
// // //             <div className="relative">
// // //               {/* Logo from public folder */}
// // //               <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center p-2 shadow-lg border border-emerald-100 dark:border-emerald-800/50">
// // //                 <img 
// // //                   src="/logo.png" 
// // //                   alt="EMS Pro Logo" 
// // //                   className="w-full h-full object-contain"
// // //                   onError={(e) => {
// // //                     // Fallback SVG if logo doesn't exist
// // //                     e.target.onerror = null;
// // //                     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
// // //                   }}
// // //                 />
// // //               </div>
// // //               <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center shadow-md">
// // //                 <CheckCircle className="w-3 h-3 text-white" />
// // //               </div>
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
// // //                 EMS Pro
// // //               </h1>
// // //               <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Management System</p>
// // //             </div>
// // //           </div>

// // //           <div className="text-center mb-8">
// // //             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
// // //               Welcome Back
// // //             </h2>
// // //             <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
// // //           </div>

// // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // //             <div className="space-y-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                   Username
// // //                 </label>
// // //                 <div className="relative group">
// // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // //                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // //                   <input
// // //                     type="text"
// // //                     required
// // //                     className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // //                     placeholder="Enter username or email"
// // //                     value={credentials.username}
// // //                     onChange={(e) => setCredentials({...credentials, username: e.target.value})}
// // //                   />
// // //                 </div>
// // //               </div>
              
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                   Password
// // //                 </label>
// // //                 <div className="relative group">
// // //                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // //                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
// // //                   <input
// // //                     type={showPassword ? "text" : "password"}
// // //                     required
// // //                     className="w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all group-hover:border-emerald-300 dark:group-hover:border-emerald-700"
// // //                     placeholder="Enter password"
// // //                     value={credentials.password}
// // //                     onChange={(e) => setCredentials({...credentials, password: e.target.value})}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                   >
// // //                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center justify-between text-sm">
// // //               <label className="flex items-center cursor-pointer space-x-2">
// // //                 <div className="relative">
// // //                   <input
// // //                     type="checkbox"
// // //                     className="sr-only"
// // //                   />
// // //                   <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors">
// // //                     <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// // //                     </svg>
// // //                   </div>
// // //                 </div>
// // //                 <span className="text-gray-600 dark:text-gray-400">Remember me</span>
// // //               </label>
// // //               <button
// // //                 type="button"
// // //                 className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors hover:underline"
// // //                 onClick={() => toast.info('Password reset feature coming soon')}
// // //               >
// // //                 Forgot password?
// // //               </button>
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full relative overflow-hidden group"
// // //             >
// // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:from-emerald-600 group-hover:to-blue-600 transition-all"></div>
// // //               <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // //               <div className="relative py-3.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white flex items-center justify-center space-x-2">
// // //                 {loading ? (
// // //                   <>
// // //                     <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
// // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                     </svg>
// // //                     <span>Signing in...</span>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <span>Sign in</span>
// // //                     <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
// // //                     </svg>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </button>
// // //           </form>

// // //           {/* Demo Credentials */}
// // //           <div className="mt-8">
// // //             <div className="relative">
// // //               <div className="absolute inset-0 flex items-center">
// // //                 <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
// // //               </div>
// // //               <div className="relative flex justify-center text-sm">
// // //                 <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
// // //                   Try demo accounts
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
// // //               {demoCredentials.map((cred, index) => (
// // //                 <div 
// // //                   key={index} 
// // //                   className="relative overflow-hidden group cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg"
// // //                   onClick={() => fillCredentials(cred.username, cred.password)}
// // //                 >
// // //                   <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
// // //                   <div className="relative p-4">
// // //                     <div className="flex items-center space-x-3">
// // //                       <div className={`w-10 h-10 ${cred.color} rounded-lg flex items-center justify-center ${cred.textColor} shadow-md`}>
// // //                         {cred.icon}
// // //                       </div>
// // //                       <div className="flex-1">
// // //                         <div className="font-semibold text-gray-900 dark:text-white text-sm">{cred.role}</div>
// // //                         <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
// // //                           {cred.username}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="mt-3 flex items-center justify-between">
// // //                       <span className="text-xs text-gray-600 dark:text-gray-400">•••••••</span>
// // //                       <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Click to fill</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Right Section - Features & Stats with Background Image */}
// // //         <div className="relative hidden lg:block overflow-hidden">
// // //           {/* Background Image with Gradient Overlay */}
// // //           <div className="absolute inset-0">
// // //             {/* Primary background image */}
// // //             <img 
// // //               src="/images/login-bg.jpg" 
// // //               alt="EMS Dashboard" 
// // //               className="w-full h-full object-cover"
// // //               onError={(e) => {
// // //                 // Fallback to Unsplash image if local doesn't exist
// // //                 e.target.onerror = null;
// // //                 e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
// // //               }}
// // //             />
// // //             {/* Gradient overlay */}
// // //             <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/70 to-purple-900/60"></div>
// // //             {/* Pattern overlay */}
// // //             <div className="absolute inset-0 opacity-10" style={{
// // //               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// // //               backgroundSize: '30px 30px'
// // //             }}></div>
// // //           </div>

// // //           <div className="relative h-full p-10 xl:p-12 flex flex-col justify-between backdrop-blur-sm">
// // //             {/* Header with Logo */}
// // //             <div>
// // //               <div className="flex items-center space-x-4 mb-10">
// // //                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center p-2 border border-white/30 shadow-2xl">
// // //                   <img 
// // //                     src="/logo-white.png" 
// // //                     alt="EMS Logo" 
// // //                     className="w-full h-full object-contain"
// // //                     onError={(e) => {
// // //                       e.target.onerror = null;
// // //                       e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
// // //                     }}
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-3xl font-bold text-white mb-1">
// // //                     EMS Pro
// // //                   </h3>
// // //                   <p className="text-emerald-200/90">
// // //                     Enterprise Management System
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               {/* Stats */}
// // //               <div className="grid grid-cols-2 gap-6 mb-10">
// // //                 <div className="bg-white/15 backdrop-blur-lg rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all transform hover:scale-105 shadow-xl">
// // //                   <div className="flex items-center space-x-4">
// // //                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-300 rounded-xl flex items-center justify-center shadow-lg">
// // //                       <Users className="h-6 w-6 text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-2xl font-bold text-white">10K+</div>
// // //                       <div className="text-sm text-emerald-100">Active Employees</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="bg-white/15 backdrop-blur-lg rounded-xl p-5 border border-white/30 hover:bg-white/20 transition-all transform hover:scale-105 shadow-xl">
// // //                   <div className="flex items-center space-x-4">
// // //                     <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg">
// // //                       <BarChart3 className="h-6 w-6 text-white" />
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-2xl font-bold text-white">99.8%</div>
// // //                       <div className="text-sm text-emerald-100">System Uptime</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Features */}
// // //               <div className="space-y-4">
// // //                 <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all group hover:border-emerald-300">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
// // //                     <Cpu className="h-6 w-6 text-emerald-300" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-medium text-white text-lg">AI-Powered Insights</h4>
// // //                     <p className="text-sm text-emerald-100/80">Smart analytics and predictions</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all group hover:border-blue-300">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
// // //                     <Globe className="h-6 w-6 text-blue-300" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-medium text-white text-lg">Global Access</h4>
// // //                     <p className="text-sm text-emerald-100/80">Access from anywhere, anytime</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all group hover:border-purple-300">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
// // //                     <Zap className="h-6 w-6 text-purple-300" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="font-medium text-white text-lg">Lightning Fast</h4>
// // //                     <p className="text-sm text-emerald-100/80">Optimized for performance</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Testimonial */}
// // //             <div className="mt-8">
// // //               <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl">
// // //                 <div className="flex items-start space-x-4">
// // //                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
// // //                     RK
// // //                   </div>
// // //                   <div>
// // //                     <div className="flex items-center mb-2">
// // //                       {[...Array(5)].map((_, i) => (
// // //                         <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
// // //                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// // //                         </svg>
// // //                       ))}
// // //                     </div>
// // //                     <p className="text-emerald-100 italic mb-4">
// // //                       "EMS Pro revolutionized our HR operations. We reduced administrative tasks by 70% and improved employee satisfaction significantly. The dashboard analytics are game-changing!"
// // //                     </p>
// // //                     <div>
// // //                       <div className="font-semibold text-white">Ravi Kumar</div>
// // //                       <div className="text-sm text-emerald-200">HR Director, Acetech Work Organization</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Features Section */}
// // //         <div className="lg:hidden bg-gradient-to-r from-emerald-900 to-blue-900 p-6">
// // //           <div className="flex items-center justify-center mb-6">
// // //             <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center p-2 border border-white/20">
// // //               <img 
// // //                 src="/logo-white.png" 
// // //                 alt="EMS Logo" 
// // //                 className="w-full h-full object-contain"
// // //                 onError={(e) => {
// // //                   e.target.onerror = null;
// // //                   e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
// // //                 }}
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className="text-center mb-6">
// // //             <h3 className="text-xl font-bold text-white mb-2">Why Choose EMS Pro?</h3>
// // //             <p className="text-emerald-200/80">Modern HR solutions for growing businesses</p>
// // //           </div>
// // //           <div className="grid grid-cols-2 gap-4">
// // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // //               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // //                 <Users className="h-5 w-5 text-white" />
// // //               </div>
// // //               <div className="text-sm font-medium text-white">Team Management</div>
// // //             </div>
// // //             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
// // //               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
// // //                 <Shield className="h-5 w-5 text-white" />
// // //               </div>
// // //               <div className="text-sm font-medium text-white">Secure Platform</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // // src/pages/auth/Login.jsx
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../hooks/useAuth';
// // import { toast } from 'react-hot-toast';
// // import { 
// //   Mail, 
// //   Lock, 
// //   Eye, 
// //   EyeOff,
// //   Shield,
// //   Users,
// //   Briefcase,
// //   Smartphone,
// //   Monitor,
// //   Tablet,
// //   CheckCircle,
// //   ArrowRight,
// //   Building,
// //   Clock,
// //   TrendingUp,
// //   Users as UsersIcon,
// //   BarChart3,
// //   ShieldCheck
// // } from 'lucide-react';

// // const Login = () => {
// //   const [credentials, setCredentials] = useState({ username: '', password: '' });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const demoCredentials = [
// //     { 
// //       role: 'Super Admin', 
// //       username: 'superadmin', 
// //       password: 'super123',
// //       icon: <Shield className="h-5 w-5" />,
// //       color: 'from-purple-500 to-purple-600',
// //       bgColor: 'bg-purple-50 dark:bg-purple-900/20',
// //       borderColor: 'border-purple-200 dark:border-purple-800'
// //     },
// //     { 
// //       role: 'Admin', 
// //       username: 'admin', 
// //       password: 'admin123',
// //       icon: <Users className="h-5 w-5" />,
// //       color: 'from-blue-500 to-blue-600',
// //       bgColor: 'bg-blue-50 dark:bg-blue-900/20',
// //       borderColor: 'border-blue-200 dark:border-blue-800'
// //     },
// //     { 
// //       role: 'Employee', 
// //       username: 'employee', 
// //       password: 'employee123',
// //       icon: <Briefcase className="h-5 w-5" />,
// //       color: 'from-emerald-500 to-emerald-600',
// //       bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
// //       borderColor: 'border-emerald-200 dark:border-emerald-800'
// //     }
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!credentials.username || !credentials.password) {
// //       toast.error('Please fill in all fields');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       await login(credentials);
// //       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
// //                       credentials.username === 'admin' ? 'admin' : 'employee';
// //       navigate(`/${userRole}/dashboard`);
// //     } catch (error) {
// //       toast.error('Login failed. Please check your credentials.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fillCredentials = (username, password) => {
// //     setCredentials({ username, password });
// //     toast.success(`Filled ${username} credentials`, {
// //       icon: '🔐',
// //       duration: 2000,
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
// //       <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
// //         {/* Left Section - Login Form (3 columns) */}
// //         <div className="lg:col-span-3 p-8 lg:p-12">
// //           <div className="max-w-md mx-auto">
// //             {/* Logo Header */}
// //             <div className="text-center mb-10">
// //               <div className="inline-flex flex-col items-center mb-6">
// //                 {/* Logo Image */}
// //                 <div className="w-20 h-20 mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
// //                   <img 
// //                     src="/logo.jpg" 
// //                     alt="ACE TechWork Logo" 
// //                     className="w-14 h-14 object-contain"
// //                   />
// //                 </div>
// //                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                   <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //                     EMS PRO
// //                   </span>
// //                 </h1>
// //                 <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// //                   Employee Management System
// //                 </div>
// //                 <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
// //                   ACE TECHWORK ORGANIZATION PVT.LTD.
// //                 </div>
// //                 <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
// //                   Together. Trust us for creation
// //                 </div>
// //               </div>
              
// //               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
// //                 Welcome Back 👋
// //               </h2>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Sign in to access your employee management dashboard
// //               </p>
// //             </div>

// //             <form className="space-y-6" onSubmit={handleSubmit}>
// //               <div className="space-y-5">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Username / Email
// //                   </label>
// //                   <div className="relative group">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
// //                     </div>
// //                     <input
// //                       type="text"
// //                       required
// //                       className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
// //                       placeholder="Enter your username or email"
// //                       value={credentials.username}
// //                       onChange={(e) => setCredentials({...credentials, username: e.target.value})}
// //                     />
// //                   </div>
// //                 </div>
                
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Password
// //                   </label>
// //                   <div className="relative group">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
// //                     </div>
// //                     <input
// //                       type={showPassword ? "text" : "password"}
// //                       required
// //                       className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
// //                       placeholder="Enter your password"
// //                       value={credentials.password}
// //                       onChange={(e) => setCredentials({...credentials, password: e.target.value})}
// //                     />
// //                     <button
// //                       type="button"
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                     >
// //                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex items-center justify-between">
// //                 <label className="flex items-center cursor-pointer group">
// //                   <div className="relative">
// //                     <input
// //                       type="checkbox"
// //                       className="sr-only"
// //                     />
// //                     <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 group-hover:border-blue-500 transition-colors"></div>
// //                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-has-[:checked]:opacity-100">
// //                       <CheckCircle className="h-4 w-4 text-blue-500" />
// //                     </div>
// //                   </div>
// //                   <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
// //                     Remember me
// //                   </span>
// //                 </label>
// //                 <button
// //                   type="button"
// //                   className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
// //                   onClick={() => toast.info('Password reset link sent to your email')}
// //                 >
// //                   Forgot password?
// //                 </button>
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                     Signing in...
// //                   </>
// //                 ) : (
// //                   <>
// //                     Sign In to Dashboard
// //                     <ArrowRight className="ml-2 h-4 w-4" />
// //                   </>
// //                 )}
// //               </button>
// //             </form>

// //             <div className="mt-10">
// //               <div className="relative">
// //                 <div className="absolute inset-0 flex items-center">
// //                   <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
// //                 </div>
// //                 <div className="relative flex justify-center text-sm">
// //                   <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
// //                     Try Demo Accounts
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
// //                 {demoCredentials.map((cred, index) => (
// //                   <div 
// //                     key={index} 
// //                     className={`group relative overflow-hidden ${cred.bgColor} border ${cred.borderColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer`}
// //                     onClick={() => fillCredentials(cred.username, cred.password)}
// //                   >
// //                     <div className="flex items-center justify-between mb-3">
// //                       <div className={`p-2 rounded-lg bg-gradient-to-br ${cred.color} shadow-sm`}>
// //                         <div className="text-white">
// //                           {cred.icon}
// //                         </div>
// //                       </div>
// //                       <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
// //                         {cred.role}
// //                       </span>
// //                     </div>
                    
// //                     <div className="mb-3">
// //                       <div className="text-sm font-medium text-gray-900 dark:text-white">
// //                         {cred.username}
// //                       </div>
// //                       <div className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
// //                         Password: {cred.password}
// //                       </div>
// //                     </div>
                    
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         fillCredentials(cred.username, cred.password);
// //                       }}
// //                       className="w-full text-center py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-200 group-hover:shadow-md"
// //                     >
// //                       Use This Account
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="mt-8 text-center">
// //               <p className="text-sm text-gray-600 dark:text-gray-400">
// //                 By signing in, you agree to our{' '}
// //                 <button
// //                   className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
// //                   onClick={() => toast.info('Terms & Conditions page coming soon')}
// //                 >
// //                   Terms of Service
// //                 </button>{' '}
// //                 and{' '}
// //                 <button
// //                   className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
// //                   onClick={() => toast.info('Privacy Policy page coming soon')}
// //                 >
// //                   Privacy Policy
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Section - Multi-Device Showcase (2 columns) */}
// //         <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
// //           {/* Multi-Device Images Container */}
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             {/* Laptop Image */}
// //             <div className="absolute z-30 w-[500px] h-[300px] -top-10 -right-20 transform rotate-6">
// //               <div className="relative w-full h-full">
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm"></div>
// //                 <img
// //                   src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
// //                   alt="EMS Dashboard on Laptop"
// //                   className="absolute inset-4 rounded-2xl object-cover shadow-2xl"
// //                 />
// //                 <div className="absolute -bottom-4 -left-4 w-24 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center">
// //                   <Monitor className="h-8 w-8 text-white" />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Tablet Image */}
// //             <div className="absolute z-20 w-[300px] h-[400px] top-1/2 -translate-y-1/2 -left-10 transform -rotate-12">
// //               <div className="relative w-full h-full">
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl backdrop-blur-sm"></div>
// //                 <img
// //                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
// //                   alt="EMS Mobile App"
// //                   className="absolute inset-3 rounded-xl object-cover shadow-xl"
// //                 />
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center">
// //                   <Tablet className="h-6 w-6 text-white" />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Phone Image */}
// //             <div className="absolute z-10 w-[180px] h-[350px] bottom-10 right-10 transform rotate-3">
// //               <div className="relative w-full h-full">
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-xl backdrop-blur-sm"></div>
// //                 <img
// //                   src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
// //                   alt="EMS Mobile View"
// //                   className="absolute inset-2 rounded-lg object-cover shadow-lg"
// //                 />
// //                 <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-lg shadow-md flex items-center justify-center">
// //                   <Smartphone className="h-5 w-5 text-white" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Content Overlay */}
// //           <div className="relative h-full flex flex-col justify-between p-8 lg:p-12 text-white z-40">
// //             {/* <div>
// //               <div className="flex items-center space-x-3 mb-8">
// //                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
// //                   <TrendingUp className="h-6 w-6" />
// //                 </div>
// //                 <div>
// //                   <h2 className="text-2xl font-bold">Access Anywhere</h2>
// //                   <p className="text-white/80">Mobile • Tablet • Desktop</p>
// //                 </div>
// //               </div>

// //               <div className="mb-10">
// //                 <h3 className="text-3xl font-bold mb-6 leading-tight">
// //                   <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
// //                     Multi-Platform
// //                   </span>{' '}
// //                   Experience
// //                 </h3>
// //                 <p className="text-white/90 text-lg mb-8">
// //                   Access your employee management system seamlessly across all devices. Perfect for on-the-go HR management.
// //                 </p>
// //               </div>

// //               <div className="grid grid-cols-2 gap-4 mb-10">
// //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
// //                   <div className="flex items-center space-x-3">
// //                     <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
// //                       <ShieldCheck className="h-5 w-5" />
// //                     </div>
// //                     <div>
// //                       <div className="text-lg font-bold">100% Secure</div>
// //                       <div className="text-white/80 text-xs">Bank-level encryption</div>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
// //                   <div className="flex items-center space-x-3">
// //                     <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
// //                       <Clock className="h-5 w-5" />
// //                     </div>
// //                     <div>
// //                       <div className="text-lg font-bold">24/7 Access</div>
// //                       <div className="text-white/80 text-xs">Always available</div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div className="flex items-center space-x-3">
// //                   <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// //                     <CheckCircle className="h-4 w-4 text-blue-300" />
// //                   </div>
// //                   <span className="text-white/90">Real-time synchronization across devices</span>
// //                 </div>
// //                 <div className="flex items-center space-x-3">
// //                   <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// //                     <CheckCircle className="h-4 w-4 text-purple-300" />
// //                   </div>
// //                   <span className="text-white/90">Offline access for mobile workforce</span>
// //                 </div>
// //                 <div className="flex items-center space-x-3">
// //                   <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
// //                     <CheckCircle className="h-4 w-4 text-blue-300" />
// //                   </div>
// //                   <span className="text-white/90">Touch-optimized for tablets</span>
// //                 </div>
// //               </div>
// //             </div> */}

// //             {/* Stats Footer */}
// //             <div className="mt-12 pt-6 border-t border-white/20">
// //               {/* <div className="flex items-center justify-between">
// //                 <div className="text-center">
// //                   <div className="text-2xl font-bold">500+</div>
// //                   <div className="text-white/80 text-xs">Companies</div>
// //                 </div>
// //                 <div className="text-center">
// //                   <div className="text-2xl font-bold">50K+</div>
// //                   <div className="text-white/80 text-xs">Users</div>
// //                 </div>
// //                 <div className="text-center">
// //                   <div className="text-2xl font-bold">99.9%</div>
// //                   <div className="text-white/80 text-xs">Uptime</div>
// //                 </div>
// //                 <div className="text-center">
// //                   <div className="text-2xl font-bold">24/7</div>
// //                   <div className="text-white/80 text-xs">Support</div>
// //                 </div>
// //               </div> */}
// //             </div>
// //           </div>

// //           {/* Floating Elements */}
// //           <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
// //           <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// // src/pages/auth/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { toast } from 'react-hot-toast';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff,
//   CheckCircle,
//   Shield,
//   Users,
//   Briefcase,
//   ChevronRight
// } from 'lucide-react';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const demoCredentials = [
//     { 
//       role: 'Super Admin', 
//       username: 'superadmin', 
//       password: 'super123',
//       icon: <Shield className="h-5 w-5" />,
//       color: 'bg-gradient-to-br from-purple-500 to-purple-600'
//     },
//     { 
//       role: 'Admin', 
//       username: 'admin', 
//       password: 'admin123',
//       icon: <Users className="h-5 w-5" />,
//       color: 'bg-gradient-to-br from-blue-500 to-blue-600'
//     },
//     { 
//       role: 'Employee', 
//       username: 'employee', 
//       password: 'employee123',
//       icon: <Briefcase className="h-5 w-5" />,
//       color: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
//     }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!credentials.username || !credentials.password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       await login(credentials);
//       const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
//                       credentials.username === 'admin' ? 'admin' : 'employee';
//       navigate(`/${userRole}/dashboard`);
//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fillCredentials = (username, password) => {
//     setCredentials({ username, password });
//     toast.success(`Filled ${username} credentials`);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Logo Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
//               <img 
//                 src="/logo.jpg" 
//                 alt="ACE TechWork Logo" 
//                 className="w-10 h-10 object-contain"
//               />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 EMS PRO
//               </span>
//             </h1>
//             <h2 className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">
//               Employee Management System
//             </h2>
//             <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
//               ACE TECHWORK ORGANIZATION PVT.LTD.
//             </p>
//             <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
//               Together. Trust us for creation
//             </p>
//           </div>

//           {/* Welcome Text */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Welcome Back!
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Sign in to access your employee management dashboard
//             </p>
//           </div>

//           {/* Login Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email/Username Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email / Username
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   required
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Enter your email or username"
//                   value={credentials.username}
//                   onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   placeholder="Enter your password"
//                   value={credentials.password}
//                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="sr-only"
//                 />
//                 <div className={`w-4 h-4 border rounded flex items-center justify-center mr-2 transition-all duration-200 ${rememberMe ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'} group-hover:border-blue-500`}>
//                   {rememberMe && <CheckCircle className="h-3 w-3 text-white" />}
//                 </div>
//                 <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">
//                   Remember me
//                 </span>
//               </label>
              
//               <button
//                 type="button"
//                 className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
//                 onClick={() => toast.info('Password reset feature coming soon')}
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : (
//                 <>
//                   Log In
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </>
//               )}
//             </button>

//             {/* Demo Credentials Section */}
//             <div className="pt-4">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
//                     Try Demo Accounts
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-3 mt-6">
//                 {demoCredentials.map((cred, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     onClick={() => fillCredentials(cred.username, cred.password)}
//                     className={`${cred.color} text-white text-xs font-medium py-3 px-2 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow`}
//                   >
//                     <div className="mb-1">
//                       {cred.icon}
//                     </div>
//                     <span>{cred.role}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sign Up Link */}
//             <div className="text-center pt-4">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Don't have an account?{' '}
//                 <button
//                   type="button"
//                   className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
//                   onClick={() => toast.info('Sign up feature coming soon')}
//                 >
//                   Sign Up
//                 </button>
//               </p>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
//             <p className="text-xs text-center text-gray-500 dark:text-gray-500">
//               By signing in, you agree to our{' '}
//               <button
//                 className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
//                 onClick={() => toast.info('Terms & Conditions page coming soon')}
//               >
//                 Terms of Service
//               </button>{' '}
//               and{' '}
//               <button
//                 className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
//                 onClick={() => toast.info('Privacy Policy page coming soon')}
//               >
//                 Privacy Policy
//               </button>
//             </p>
//           </div>

//           {/* Stats Row */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
//               <div className="text-xl font-bold text-blue-600 dark:text-blue-400">500+</div>
//               <div className="text-xs text-blue-500 dark:text-blue-300 mt-1">Companies</div>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-800">
//               <div className="text-xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
//               <div className="text-xs text-purple-500 dark:text-purple-300 mt-1">Users</div>
//             </div>
//             <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 text-center border border-emerald-200 dark:border-emerald-800">
//               <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
//               <div className="text-xs text-emerald-500 dark:text-emerald-300 mt-1">Uptime</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <img
//             src="https://flightbridgeed.com/wp-content/uploads/2022/12/EMSLighthouseProjectPodcast-Bestof2020_square-6-624x624.jpg"
//             alt="Modern Office Workspace"
//             className="w-full h-full object-cover"
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
//           {/* Top Content */}
//           <div>
//             <div className="flex items-center space-x-3 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Shield className="h-6 w-6" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Enterprise Platform</h2>
//                 <p className="text-blue-200 text-sm">Secure & Scalable</p>
//               </div>
//             </div>

//             <h3 className="text-4xl font-bold mb-6 leading-tight">
//               Transform Your <br />
//               <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Workforce Management
//               </span>
//             </h3>

//             <p className="text-gray-300 text-lg mb-10 max-w-lg">
//               Join thousands of companies who trust our platform to streamline HR operations, 
//               automate processes, and boost productivity across the organization.
//             </p>
//           </div>

//           {/* Features List */}
//           <div className="space-y-6">
//             <div className="flex items-start space-x-4">
//               <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
//                 <CheckCircle className="h-5 w-5 text-blue-300" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-lg mb-1">Real-time Analytics</h4>
//                 <p className="text-gray-300 text-sm">Live workforce insights and performance metrics</p>
//               </div>
//             </div>
            
//             <div className="flex items-start space-x-4">
//               <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
//                 <CheckCircle className="h-5 w-5 text-purple-300" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-lg mb-1">Automated Workflows</h4>
//                 <p className="text-gray-300 text-sm">Reduce manual HR tasks by 80% with intelligent automation</p>
//               </div>
//             </div>
            
//             <div className="flex items-start space-x-4">
//               <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
//                 <CheckCircle className="h-5 w-5 text-emerald-300" />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-lg mb-1">Mobile Accessibility</h4>
//                 <p className="text-gray-300 text-sm">Access your dashboard from anywhere, on any device</p>
//               </div>
//             </div>
//           </div>

//           {/* Testimonial */}
//           <div className="mt-12 pt-8 border-t border-white/20">
//             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//               <div className="flex items-start space-x-4">
//                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                   JD
//                 </div>
//                 <div>
//                   <div className="font-semibold text-lg">Jane Doe</div>
//                   <div className="text-blue-200 text-sm mb-3">HR Director at TechCorp</div>
//                   <p className="text-gray-300 italic">
//                     "This platform transformed our HR operations. Onboarding time reduced from weeks to days, 
//                     and employee satisfaction is at an all-time high."
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  Shield,
  Users,
  Briefcase,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoCredentials = [
    { 
      role: 'Super Admin', 
      username: 'superadmin', 
      password: 'super123',
      icon: <Shield className="h-5 w-5" />,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      shadow: 'shadow-purple-500/50'
    },
    { 
      role: 'Admin', 
      username: 'admin', 
      password: 'admin123',
      icon: <Users className="h-5 w-5" />,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      shadow: 'shadow-blue-500/50'
    },
    { 
      role: 'Employee', 
      username: 'employee', 
      password: 'employee123',
      icon: <Briefcase className="h-5 w-5" />,
      gradient: 'from-emerald-500 via-teal-500 to-green-500',
      shadow: 'shadow-emerald-500/50'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(credentials);
      const userRole = credentials.username === 'superadmin' ? 'superadmin' : 
                      credentials.username === 'admin' ? 'admin' : 'employee';
      navigate(`/${userRole}/dashboard`);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (username, password) => {
    setCredentials({ username, password });
    toast.success(`Filled ${username} credentials`);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl animate-float" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-slate-700/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          {/* Logo Header */}
          <div className="text-center space-y-6">
            {/* Logo Container */}
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75 animate-pulse-slow" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <img 
                  src="/logo.jpg" 
                  alt="ACE TechWork Logo" 
                  className="w-12 h-12 object-contain drop-shadow-2xl"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Brand Text */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  EMS PRO
                </span>
              </h1>
              <h2 className="text-sm sm:text-base text-slate-400 uppercase tracking-[0.3em] font-semibold">
                Employee Management
              </h2>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-slate-500 font-medium tracking-wider">
                  ACE TECHWORK ORGANIZATION PVT.LTD.
                </p>
                <p className="text-xs text-slate-600 italic font-light">
                  Together. Trust us for creation
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="text-center space-y-3 pt-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome Back!
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Sign in to access your employee management dashboard
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email/Username Field */}
            <div className="space-y-2 animate-slide-in-right delay-100">
              <label className="block text-sm font-medium text-slate-300 pl-1">
                Email / Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-all duration-300" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800/80 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-xl"
                  placeholder="Enter your email or username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 group-focus-within:from-blue-500/10 group-focus-within:via-blue-500/5 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 animate-slide-in-right delay-200">
              <label className="block text-sm font-medium text-slate-300 pl-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-all duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-12 pr-14 py-4 bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/80 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-xl"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-purple-400 transition-all duration-300 z-10 group/eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 group-hover/eye:scale-110 transition-transform" />
                  ) : (
                    <Eye className="h-5 w-5 group-hover/eye:scale-110 transition-transform" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-blue-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between animate-fade-in delay-300">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-slate-600 rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-300 flex items-center justify-center group-hover:border-blue-400">
                    {rememberMe && <CheckCircle className="h-3.5 w-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  Remember me
                </span>
              </label>
              
              <button
                type="button"
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-all duration-300 relative group"
                onClick={() => toast.info('Password reset feature coming soon')}
              >
                Forgot Password?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center overflow-hidden group animate-fade-in delay-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium tracking-wide">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="font-medium tracking-wide">Log In</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Demo Credentials Section */}
            <div className="pt-6 animate-fade-in delay-500">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-950 text-slate-500 font-medium">
                    Try Demo Accounts
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillCredentials(cred.username, cred.password)}
                    className={`relative group bg-gradient-to-br ${cred.gradient} text-white text-xs font-semibold py-4 px-3 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center shadow-lg ${cred.shadow} hover:shadow-2xl overflow-hidden`}
                    style={{ animationDelay: `${(index + 6) * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        {cred.icon}
                      </div>
                      <span className="block text-center">{cred.role}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 animate-fade-in delay-600">
              <p className="text-sm text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors relative group"
                  onClick={() => toast.info('Sign up feature coming soon')}
                >
                  Sign Up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </button>
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-800 animate-fade-in delay-700">
            <p className="text-xs text-center text-slate-500 leading-relaxed">
              By signing in, you agree to our{' '}
              <button
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                onClick={() => toast.info('Terms & Conditions page coming soon')}
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                onClick={() => toast.info('Privacy Policy page coming soon')}
              >
                Privacy Policy
              </button>
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 animate-fade-in delay-800">
            <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4 text-center hover:border-blue-400/40 hover:from-blue-500/15 hover:to-blue-600/10 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">500+</div>
                <div className="text-xs text-blue-400 mt-1.5 font-medium tracking-wide">Companies</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4 text-center hover:border-purple-400/40 hover:from-purple-500/15 hover:to-purple-600/10 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-xs text-purple-400 mt-1.5 font-medium tracking-wide">Users</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-4 text-center hover:border-emerald-400/40 hover:from-emerald-500/15 hover:to-emerald-600/10 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-2xl font-bold bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">99.9%</div>
                <div className="text-xs text-emerald-400 mt-1.5 font-medium tracking-wide">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664733-d514e60bc4e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1925&q=80"
            alt="Modern Office Workspace"
            className="w-full h-full object-cover scale-105"
          />
          {/* Multi-layer Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 xl:p-16 text-white">
          {/* Top Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Enterprise Platform</h2>
                <p className="text-blue-300 text-sm font-medium">Secure & Scalable</p>
              </div>
            </div>

            <h3 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              Transform Your <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Workforce Management
              </span>
            </h3>

            <p className="text-slate-300 text-lg xl:text-xl leading-relaxed max-w-xl">
              Join thousands of companies who trust our platform to streamline HR operations, 
              automate processes, and boost productivity across the organization.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-5 animate-fade-in-up delay-200">
            <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1.5">Real-time Analytics</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Live workforce insights and performance metrics</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1.5">Automated Workflows</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Reduce manual HR tasks by 80% with intelligent automation</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-all duration-300">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1.5">Mobile Accessibility</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Access your dashboard from anywhere, on any device</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="animate-fade-in-up delay-400">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-slate-800/40 backdrop-blur-2xl rounded-3xl p-6 xl:p-8 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">Jane Doe</div>
                    <div className="text-blue-300 text-sm mb-3 font-medium">HR Director at TechCorp</div>
                    <p className="text-slate-300 italic leading-relaxed">
                      "This platform transformed our HR operations. Onboarding time reduced from weeks to days, 
                      and employee satisfaction is at an all-time high."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-float-delayed pointer-events-none" />
      </div>

      {/* Add Custom CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-1000 { animation-delay: 1000ms; }

        .bg-grid-slate-700\/10 {
          background-image: 
            linear-gradient(to right, rgba(51, 65, 85, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 65, 85, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Login;