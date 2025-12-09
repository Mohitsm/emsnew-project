import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

const demoUsers = {
  superadmin: {
    id: 1,
    username: 'superadmin',
    password: 'super123',
    email: 'superadmin@gmail.com',
    role: 'superadmin',
    name: 'Super Admin',
    avatar: 'SA',
    permissions: ['*']
  },
  admin: {
    id: 2,
    username: 'admin',
    password: 'admin123',
    email: 'admin@company.com',
    role: 'admin',
    name: 'Admin User',
    avatar: 'AU',
    permissions: ['employee_management', 'attendance', 'payroll', 'reports']
  },
  employee: {
    id: 3,
    username: 'employee',
    password: 'employee123',
    email: 'employee@company.com',
    role: 'employee',
    name: 'John Doe',
    avatar: 'JD',
    permissions: ['view_profile', 'mark_attendance', 'apply_leave', 'view_payslip']
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('ems_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    const { username, password } = credentials;
    let loggedInUser = null;

    if (username === demoUsers.superadmin.username && password === demoUsers.superadmin.password) {
      loggedInUser = demoUsers.superadmin;
    } else if (username === demoUsers.admin.username && password === demoUsers.admin.password) {
      loggedInUser = demoUsers.admin;
    } else if (username === demoUsers.employee.username && password === demoUsers.employee.password) {
      loggedInUser = demoUsers.employee;
    }

    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('ems_user', JSON.stringify(loggedInUser));
      toast.success(`Welcome, ${loggedInUser.name}`);
      return loggedInUser;
    } else {
      toast.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ems_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('ems_user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
    return updatedUser;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
        hasPermission,
        isSuperAdmin: user?.role === 'superadmin',
        isAdmin: user?.role === 'admin',
        isEmployee: user?.role === 'employee'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
