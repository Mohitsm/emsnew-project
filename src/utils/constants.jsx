// src/utils/constants.js
export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  EMPLOYEE: 'employee'
};

export const PERMISSIONS = {
  ALL: '*',
  USER_MANAGEMENT: 'user_management',
  EMPLOYEE_MANAGEMENT: 'employee_management',
  ATTENDANCE: 'attendance',
  LEAVE_MANAGEMENT: 'leave_management',
  PAYROLL: 'payroll',
  REPORTS: 'reports',
  SYSTEM_SETTINGS: 'system_settings'
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  USERS: '/api/users',
  EMPLOYEES: '/api/employees',
  ATTENDANCE: '/api/attendance',
  LEAVE: '/api/leave',
  PAYROLL: '/api/payroll'
};

export const STATUS_COLORS = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-blue-100 text-blue-800',
  REJECTED: 'bg-red-100 text-red-800'
};