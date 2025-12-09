// src/components/layout/MobileMenu.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  X,
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
  LogOut
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

const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const getIconComponent = (iconChar) => {
    const IconComponent = iconMap[iconChar] || Home;
    return <IconComponent className="h-5 w-5" />;
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
        onClick={onClose}
      ></div>
      <div className="fixed inset-y-0 left-0 w-64 bg-emerald-800 text-white z-50 flex flex-col md:hidden">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold"></h1>
            <p className="text-emerald-200 text-7xl">EMS System</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* User Info */}
        <div className="px-6 py-4 border-t border-emerald-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="font-semibold">{user?.avatar || user?.name?.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-emerald-200 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'text-emerald-100 hover:bg-emerald-700/50'
                  }`
                }
              >
                {getIconComponent(item.icon)}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-emerald-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;