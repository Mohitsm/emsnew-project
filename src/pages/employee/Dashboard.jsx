// // src/pages/employee/Dashboard.jsx
// import React, { useState } from 'react';
// import { 
//   Calendar, 
//   Clock, 
//   DollarSign, 
//   FileText,
//   TrendingUp,
//   Award,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   CalendarDays
// } from 'lucide-react';
// import StatCard from '../../components/widgets/StatCard';
// import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import { toast } from 'react-hot-toast';

// const EmployeeDashboard = () => {
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [punchTime, setPunchTime] = useState('');

//   const stats = [
//     {
//       title: 'Total Working Days',
//       value: '22',
//       change: 'This month',
//       icon: <Calendar className="h-6 w-6 text-emerald-600" />,
//       color: 'bg-emerald-50 dark:bg-emerald-900/20'
//     },
//     {
//       title: 'Leave Balance',
//       value: '12',
//       change: 'Days available',
//       icon: <Clock className="h-6 w-6 text-blue-600" />,
//       color: 'bg-blue-50 dark:bg-blue-900/20'
//     },
//     {
//       title: 'This Month Salary',
//       value: '₹45,000',
//       change: '+₹2,500 bonus',
//       icon: <DollarSign className="h-6 w-6 text-purple-600" />,
//       color: 'bg-purple-50 dark:bg-purple-900/20'
//     },
//     {
//       title: 'Pending Tasks',
//       value: '3',
//       change: 'To be completed',
//       icon: <FileText className="h-6 w-6 text-amber-600" />,
//       color: 'bg-amber-50 dark:bg-amber-900/20'
//     }
//   ];

//   const recentActivities = [
//     { id: 1, activity: 'Punched in for today', time: 'Today, 9:00 AM', status: 'success' },
//     { id: 2, activity: 'Leave application approved', time: 'Yesterday, 3:30 PM', status: 'success' },
//     { id: 3, activity: 'Salary credited', time: 'Dec 5, 2024', status: 'success' },
//     { id: 4, activity: 'Profile updated', time: 'Dec 3, 2024', status: 'success' },
//   ];

//   const upcomingEvents = [
//     { id: 1, title: 'Team Meeting', time: 'Tomorrow, 10:00 AM', location: 'Conference Room A' },
//     { id: 2, title: 'Training Session', time: 'Dec 15, 2:00 PM', location: 'Online - Zoom' },
//     { id: 3, title: 'Performance Review', time: 'Dec 20, 11:00 AM', location: 'HR Department' },
//   ];

//   const handlePunchInOut = () => {
//     const now = new Date();
//     const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
//     if (!isClockedIn) {
//       setIsClockedIn(true);
//       setPunchTime(time);
//       toast.success(`Punched in at ${time}`);
//     } else {
//       setIsClockedIn(false);
//       toast.success(`Punched out at ${time}`);
//     }
//   };

//   return (
//     <div className="space-y-6 fade-in">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, John Doe!</p>
//         </div>
//         <div className="flex items-center space-x-2 mt-4 md:mt-0">
//           <span className="text-sm font-medium text-gray-700 dark:text-gray-300"></span>
//           <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-full">
//             EMS System
//           </span>
//         </div>
//       </div>

//       {/* Punch In/Out Card */}
//       <Card>
//         <CardContent>
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="text-center md:text-left mb-4 md:mb-0">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {isClockedIn ? 'You are clocked in' : 'Ready to clock in?'}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 {isClockedIn 
//                   ? `Punched in at ${punchTime || '9:00 AM'}`
//                   : 'Click the button below to punch in for the day'}
//               </p>
//             </div>
//             <Button
//               size="lg"
//               startIcon={<Clock className="h-5 w-5" />}
//               onClick={handlePunchInOut}
//               variant={isClockedIn ? 'danger' : 'success'}
//             >
//               {isClockedIn ? 'Punch Out' : 'Punch In'}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <StatCard key={index} {...stat} />
//         ))}
//       </div>

//       {/* Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Quick Actions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Quickly access frequently used features
//               </p>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <button 
//                   onClick={() => toast.success('Opening attendance...')}
//                   className="flex flex-col items-center justify-center p-6 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors group"
//                 >
//                   <div className="p-4 bg-white dark:bg-gray-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                     <Clock className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
//                   </div>
//                   <span className="font-medium text-emerald-800 dark:text-emerald-300">My Attendance</span>
//                   <span className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">View records</span>
//                 </button>
//                 <button 
//                   onClick={() => toast.success('Opening leave application...')}
//                   className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl transition-colors group"
//                 >
//                   <div className="p-4 bg-white dark:bg-gray-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                     <CalendarDays className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <span className="font-medium text-blue-800 dark:text-blue-300">Apply Leave</span>
//                   <span className="text-sm text-blue-600 dark:text-blue-400 mt-1">Submit request</span>
//                 </button>
//                 <button 
//                   onClick={() => toast.success('Opening payslips...')}
//                   className="flex flex-col items-center justify-center p-6 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl transition-colors group"
//                 >
//                   <div className="p-4 bg-white dark:bg-gray-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                     <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <span className="font-medium text-purple-800 dark:text-purple-300">View Payslip</span>
//                   <span className="text-sm text-purple-600 dark:text-purple-400 mt-1">Download PDF</span>
//                 </button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Activities */}
//           <Card>
//             <CardHeader>
//               <CardTitle>My Recent Activities</CardTitle>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Latest updates and activities
//               </p>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivities.map((activity) => (
//                   <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                     <div className={`p-2 rounded-full ${
//                       activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'
//                     }`}>
//                       {activity.status === 'success' ? 
//                         <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> : 
//                         <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
//                       }
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-900 dark:text-white">{activity.activity}</div>
//                       <div className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Upcoming Events */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="h-5 w-5 text-emerald-600" />
//                 <CardTitle>Upcoming Events</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {upcomingEvents.map((event) => (
//                   <div key={event.id} className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
//                     <div className="font-medium text-emerald-800 dark:text-emerald-300">{event.title}</div>
//                     <div className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">{event.time}</div>
//                     <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">{event.location}</div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Performance Metrics */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-center space-x-2">
//                 <TrendingUp className="h-5 w-5 text-emerald-600" />
//                 <CardTitle>Performance Metrics</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendance</span>
//                     <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">95%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                     <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '95%' }}></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Task Completion</span>
//                     <span className="text-sm font-medium text-blue-600 dark:text-blue-400">88%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                     <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Productivity</span>
//                     <span className="text-sm font-medium text-purple-600 dark:text-purple-400">92%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                     <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-center space-x-2">
//                   <Award className="h-5 w-5 text-amber-500" />
//                   <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Top Performer This Month</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Links */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Links</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                   <div className="font-medium text-gray-900 dark:text-white">Company Policies</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">View HR policies and guidelines</div>
//                 </button>
//                 <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                   <div className="font-medium text-gray-900 dark:text-white">Training Materials</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">Access learning resources</div>
//                 </button>
//                 <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                   <div className="font-medium text-gray-900 dark:text-white">Help & Support</div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">Get assistance</div>
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


import React, { useState } from 'react';

// Modal Component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [user] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com'
  });

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  
  const [dashboardStats, setDashboardStats] = useState({
    leaveBalance: 12,
    attendanceRate: '95%',
    pendingRequests: 2,
    currentSalary: '5,200'
  });

  const [holidays] = useState([
    {
      date: '25',
      month: 'Dec',
      name: 'Christmas Day',
      type: 'Public Holiday',
      status: 'Holiday'
    },
    {
      date: '26',
      month: 'Dec',
      name: 'Boxing Day',
      type: 'Public Holiday',
      status: 'Holiday'
    },
    {
      date: '01',
      month: 'Jan',
      name: 'New Year\'s Day',
      type: 'Public Holiday',
      status: 'Holiday'
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      title: 'Vacation Leave',
      description: 'Family trip to beach',
      date: '2024-12-20',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Sick Leave',
      description: 'Medical appointment',
      date: '2024-12-15',
      status: 'approved'
    }
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: 'Client Meeting Lunch',
      description: 'Business lunch with client',
      date: '2024-12-05',
      amount: 150,
      status: 'pending'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    amount: ''
  });

  const handleCheckInOut = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    if (!isCheckedIn) {
      setCheckInTime(currentTime);
      setIsCheckedIn(true);
    } else {
      setCheckOutTime(currentTime);
      setIsCheckedIn(false);
      // Update attendance rate
      const currentRate = parseInt(dashboardStats.attendanceRate);
      setDashboardStats({
        ...dashboardStats,
        attendanceRate: `${Math.min(currentRate + 1, 100)}%`
      });
    }
  };

  const handleQuickAction = (action) => {
    setModalType(action);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      amount: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'leave') {
      const newLeave = {
        id: Math.max(...leaveRequests.map(l => l.id), 0) + 1,
        ...formData,
        status: 'pending'
      };
      setLeaveRequests([newLeave, ...leaveRequests]);
      setDashboardStats({
        ...dashboardStats,
        pendingRequests: dashboardStats.pendingRequests + 1
      });
    } else if (modalType === 'expense') {
      const newExpense = {
        id: Math.max(...expenses.map(e => e.id), 0) + 1,
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'pending'
      };
      setExpenses([newExpense, ...expenses]);
      setDashboardStats({
        ...dashboardStats,
        pendingRequests: dashboardStats.pendingRequests + 1
      });
    }
    
    setShowModal(false);
    setFormData({ title: '', description: '', date: '', amount: '' });
  };

  const handleDeleteRequest = (type, id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      if (type === 'leave') {
        setLeaveRequests(leaveRequests.filter(item => item.id !== id));
      } else if (type === 'expense') {
        setExpenses(expenses.filter(item => item.id !== id));
      }
      setDashboardStats({
        ...dashboardStats,
        pendingRequests: Math.max(dashboardStats.pendingRequests - 1, 0)
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Check-in/Check-out Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-900">Today's Attendance</h3>
            <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <div className="mt-2 flex space-x-4 text-sm">
              {checkInTime && (
                <span className="text-green-600 font-medium">
                  ✓ Check-in: {checkInTime}
                </span>
              )}
              {checkOutTime && (
                <span className="text-red-600 font-medium">
                  ✓ Check-out: {checkOutTime}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleCheckInOut}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg ${
              isCheckedIn
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isCheckedIn ? '⏱️ Check Out' : '▶️ Check In'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {dashboardStats.leaveBalance}
          </div>
          <div className="text-sm text-gray-600">Leave Balance</div>
          <div className="text-xs text-gray-400 mt-1">days remaining</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {dashboardStats.attendanceRate}
          </div>
          <div className="text-sm text-gray-600">Attendance</div>
          <div className="text-xs text-gray-400 mt-1">this month</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {dashboardStats.pendingRequests}
          </div>
          <div className="text-sm text-gray-600">Pending Requests</div>
          <div className="text-xs text-gray-400 mt-1">awaiting approval</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            ${dashboardStats.currentSalary}
          </div>
          <div className="text-sm text-gray-600">This Month Salary</div>
          <div className="text-xs text-gray-400 mt-1">expected payout</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleQuickAction('leave')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-4xl mb-3">📋</span>
            <span className="font-medium text-gray-900">Apply Leave</span>
          </button>
          <button
            onClick={() => handleQuickAction('expense')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-4xl mb-3">🧾</span>
            <span className="font-medium text-gray-900">Submit Expense</span>
          </button>
          <button
            onClick={() => alert('Payslip download feature')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-4xl mb-3">📄</span>
            <span className="font-medium text-gray-900">Download Payslip</span>
          </button>
          <button
            onClick={() => alert('Profile update feature')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-4xl mb-3">✏️</span>
            <span className="font-medium text-gray-900">Update Profile</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Recent Leave Requests */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
          <div className="space-y-3">
            {leaveRequests.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No leave requests</p>
            ) : (
              leaveRequests.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{leave.title}</h4>
                    <p className="text-sm text-gray-600">{leave.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                      leave.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leave.status}
                    </span>
                    <button
                      onClick={() => handleDeleteRequest('leave', leave.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No expense requests</p>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{expense.title}</h4>
                    <p className="text-sm text-gray-600">{expense.date} • ${expense.amount}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                      expense.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.status}
                    </span>
                    <button
                      onClick={() => handleDeleteRequest('expense', expense.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Holidays */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Upcoming Holidays</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {holidays.map((holiday, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-red-50 rounded-lg flex flex-col items-center justify-center mr-4">
                  <span className="text-red-600 font-bold text-xl">{holiday.date}</span>
                  <span className="text-red-500 text-xs">{holiday.month}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{holiday.name}</h4>
                  <p className="text-sm text-gray-600">{holiday.type}</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium px-3 py-1 bg-green-50 rounded-full">
                {holiday.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {modalType === 'leave' ? '📋 Apply for Leave' : 
             modalType === 'expense' ? '🧾 Submit Expense' : 'Action'}
          </h3>
          <div>
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
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {modalType === 'expense' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;