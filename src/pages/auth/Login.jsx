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
  Shield,
  Users,
  Briefcase
} from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoCredentials = [
    { 
      role: 'Super Admin', 
      username: 'superadmin', 
      password: 'super123',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800'
    },
    { 
      role: 'Admin', 
      username: 'admin', 
      password: 'admin123',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      role: 'Employee', 
      username: 'employee', 
      password: 'employee123',
      icon: <Briefcase className="h-5 w-5" />,
      color: 'bg-emerald-100 text-emerald-800'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section - Login Form */}
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-2xl mb-4">
              <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2"></h1>
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              Employee Management System
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Secure & Centralized HR Platform</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter username or email"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                onClick={() => toast.info('Password reset feature coming soon')}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Demo Credentials
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {demoCredentials.map((cred, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${cred.color}`}>
                      {cred.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{cred.role}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {cred.username} / {cred.password}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => fillCredentials(cred.username, cred.password)}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-md transition-colors"
                  >
                    Fill
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Info */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 lg:p-12 text-white hidden lg:flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose EMS?</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Centralized employee database management</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Automated attendance and payroll processing</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Secure document management system</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Real-time reporting and analytics</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Role-based access control for security</span>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/20">
              <h3 className="font-semibold mb-2">Need Assistance?</h3>
              <p className="text-emerald-100 mb-4">
                Contact our support team for any queries or assistance with the system.
              </p>
              <button
                onClick={() => toast.info('Support contact feature coming soon')}
                className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;