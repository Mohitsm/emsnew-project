// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/layout/Layout";

// Auth Pages
import Login from "./pages/auth/Login";

// Super Admin Pages
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import UserManagement from "./pages/superadmin/UserManagement";
import SystemSettings from "./pages/superadmin/SystemSettings";

// Admin Pages
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployeeManagement from "./pages/admin/AdminEmployeeManagement";
import AdminAttendanceManagement from "./pages/admin/AdminAttendanceManagement";
import AdminLeaveManagement from "./pages/admin/AdminLeaveManagement";
import AdminPayrollManagement from "./pages/admin/AdminPayrollManagement";


// Employee Pages

import Profile from "./pages/employee/Profile";
import Attendance from "./pages/employee/Attendance";
import LeaveManagement from "./pages/employee/LeaveManagement";
import Payroll from "./pages/employee/Payroll";

import Dashboard from "./pages/employee/Dashboard";
import Notifications from "./pages/employee/Notifications";
import Reimbursements from "./pages/employee/Reimbursements";
import HelpSupport from "./pages/employee/HelpSupport";
import FieldTracking from "./pages/employee/FieldTracking";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* Super Admin Routes */}
              <Route
                path="/superadmin/dashboard"
                element={
                  <PrivateRoute allowedRoles={["superadmin"]}>
                    <SuperAdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/superadmin/users"
                element={
                  <PrivateRoute allowedRoles={["superadmin"]}>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/superadmin/settings"
                element={
                  <PrivateRoute allowedRoles={["superadmin"]}>
                    <SystemSettings />
                  </PrivateRoute>
                }
              />
              {/* Admin Routes */}
              // Dashboard
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              // Employee Management
              <Route
                path="/admin/employees"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminEmployeeManagement />
                  </PrivateRoute>
                }
              />
              // Attendance Management
              <Route
                path="/admin/attendance"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminAttendanceManagement />
                  </PrivateRoute>
                }
              />
              // Leave Management
              <Route
                path="/admin/leave"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminLeaveManagement />
                  </PrivateRoute>
                }
              />
               // Payroll Management
              <Route
                path="/admin/payroll"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminPayrollManagement />
                  </PrivateRoute>
                }
              />
              {/*
              // Shift Roster
              <Route
                path="/admin/shift-roster"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <ShiftRosterManagement />
                  </PrivateRoute>
                }
              />
              // Department Management
              <Route
                path="/admin/departments"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <DepartmentManagement />
                  </PrivateRoute>
                }
              />
              // Document Management
              <Route
                path="/admin/documents"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <DocumentManagement />
                  </PrivateRoute>
                }
              />
              // Reports
              <Route
                path="/admin/reports"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <Reports />
                  </PrivateRoute>
                }
              />
              // Settings
              <Route
                path="/admin/settings"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <Settings />
                  </PrivateRoute>
                }
              />
              // HR Appraisal
              <Route
                path="/admin/hr-appraisal"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <HRAppraisal />
                  </PrivateRoute>
                }
              /> */}
              {/* Employee Routes */}
              // Employee Protected Routes
              <Route
                path="/employee/dashboard"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/attendance"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Attendance />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/leave"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <LeaveManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/payroll"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Payroll />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/notifications"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Notifications />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/reimbursements"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Reimbursements />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/field-tracking"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <FieldTracking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/help-support"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <HelpSupport />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee/profile"
                element={
                  <PrivateRoute allowedRoles={["employee"]}>
                    <Profile />
                  </PrivateRoute>
                }
              />
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  style: {
                    background: "#10b981",
                  },
                },
                error: {
                  style: {
                    background: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
