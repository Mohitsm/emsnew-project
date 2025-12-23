import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [showGeneratePayrollModal, setShowGeneratePayrollModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewExportModal, setShowViewExportModal] = useState(false);
  const [exportType, setExportType] = useState('attendance');
  const [exportData, setExportData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [payrollMonth, setPayrollMonth] = useState('2024-12');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [payrollStep, setPayrollStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedPayslips, setGeneratedPayslips] = useState([]);

  // Form States
  const [newAttendance, setNewAttendance] = useState({
    name: '',
    employeeId: '',
    department: 'Engineering',
    status: 'present',
    time: '09:00',
    date: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  const [newLeave, setNewLeave] = useState({
    employeeId: '',
    employeeName: '',
    type: 'Sick Leave',
    duration: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
    department: 'Engineering',
    contact: ''
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'medium',
    department: 'all',
    expiresAt: ''
  });

  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    position: '',
    salary: '',
    joiningDate: new Date().toISOString().split('T')[0],
    address: ''
  });

  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [leavesFilter, setLeavesFilter] = useState('pending');
  const [announcementFilter, setAnnouncementFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Data
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'Rajesh Kumar', email: 'rajesh@company.com', phone: '9876543210', department: 'Engineering', position: 'Senior Developer', salary: 80000, joiningDate: '2023-01-15', address: 'Mumbai' },
    { id: 'EMP002', name: 'Priya Sharma', email: 'priya@company.com', phone: '9876543211', department: 'Marketing', position: 'Marketing Manager', salary: 70000, joiningDate: '2023-02-20', address: 'Delhi' },
    { id: 'EMP003', name: 'Amit Patel', email: 'amit@company.com', phone: '9876543212', department: 'Sales', position: 'Sales Executive', salary: 60000, joiningDate: '2023-03-10', address: 'Bangalore' },
    { id: 'EMP004', name: 'Sneha Reddy', email: 'sneha@company.com', phone: '9876543213', department: 'HR', position: 'HR Manager', salary: 75000, joiningDate: '2023-01-05', address: 'Hyderabad' },
    { id: 'EMP005', name: 'Vikram Singh', email: 'vikram@company.com', phone: '9876543214', department: 'Finance', position: 'Finance Analyst', salary: 90000, joiningDate: '2023-02-01', address: 'Pune' },
    { id: 'EMP006', name: 'Arjun Mehta', email: 'arjun@company.com', phone: '9876543215', department: 'Engineering', position: 'Developer', salary: 60000, joiningDate: '2023-04-15', address: 'Chennai' }
  ]);

  const [stats, setStats] = useState({
    totalEmployees: 6,
    presentToday: 5,
    absentToday: 1,
    lateToday: 0,
    onLeaveToday: 2,
    totalSalary: '4,65,000',
    taxDeductions: '69,750',
    netPayable: '3,95,250'
  });

  const [attendanceList, setAttendanceList] = useState([
    { id: 1, employeeId: 'EMP001', name: 'Rajesh Kumar', department: 'Engineering', status: 'present', time: '09:15 AM', date: '2024-12-10', remarks: 'On time' },
    { id: 2, employeeId: 'EMP002', name: 'Priya Sharma', department: 'Marketing', status: 'present', time: '09:00 AM', date: '2024-12-10', remarks: 'Early' },
    { id: 3, employeeId: 'EMP003', name: 'Amit Patel', department: 'Sales', status: 'late', time: '10:30 AM', date: '2024-12-10', remarks: 'Traffic delay' },
    { id: 4, employeeId: 'EMP004', name: 'Sneha Reddy', department: 'HR', status: 'present', time: '08:55 AM', date: '2024-12-10', remarks: 'On time' },
    { id: 5, employeeId: 'EMP005', name: 'Vikram Singh', department: 'Finance', status: 'absent', time: '-', date: '2024-12-10', remarks: 'Sick leave' }
  ]);

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rajesh Kumar',
      type: 'Sick Leave',
      duration: 2,
      startDate: '2024-12-10',
      endDate: '2024-12-11',
      reason: 'Medical checkup',
      status: 'pending',
      department: 'Engineering',
      contact: '9876543210'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Sharma',
      type: 'Casual Leave',
      duration: 3,
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      reason: 'Family function',
      status: 'pending',
      department: 'Marketing',
      contact: '9876543211'
    },
    {
      id: 3,
      employeeId: 'EMP006',
      employeeName: 'Arjun Mehta',
      type: 'Annual Leave',
      duration: 5,
      startDate: '2024-12-20',
      endDate: '2024-12-24',
      reason: 'Vacation',
      status: 'approved',
      department: 'Engineering',
      contact: '9876543215'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Holiday Notice',
      message: 'Office will be closed on December 25th for Christmas',
      date: '2024-12-08',
      priority: 'high',
      department: 'all',
      expiresAt: '2024-12-26'
    },
    {
      id: 2,
      title: 'Team Meeting',
      message: 'All hands meeting scheduled for Friday at 3 PM',
      date: '2024-12-09',
      priority: 'medium',
      department: 'all',
      expiresAt: '2024-12-10'
    }
  ]);

  const [payrollData, setPayrollData] = useState([
    { id: 1, employeeId: 'EMP001', employeeName: 'Rajesh Kumar', department: 'Engineering', basicSalary: 80000, allowances: 20000, deductions: 15000, netSalary: 85000, status: 'paid', month: '2024-12' },
    { id: 2, employeeId: 'EMP002', employeeName: 'Priya Sharma', department: 'Marketing', basicSalary: 70000, allowances: 15000, deductions: 12000, netSalary: 73000, status: 'paid', month: '2024-12' },
    { id: 3, employeeId: 'EMP003', employeeName: 'Amit Patel', department: 'Sales', basicSalary: 60000, allowances: 20000, deductions: 10000, netSalary: 70000, status: 'pending', month: '2024-12' }
  ]);

  // PDF Generation Functions
  const generateAttendancePDF = () => {
    setLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Title with gradient effect simulation
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('ATTENDANCE REPORT', 105, 20, null, null, 'center');
      
      // Company Info
      doc.setTextColor(100);
      doc.setFontSize(10);
      doc.text('TechCorp Solutions Pvt. Ltd.', 105, 35, null, null, 'center');
      doc.text('123 Business Park, Mumbai - 400001', 105, 42, null, null, 'center');
      
      // Report Details
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 55);
      doc.text(`Attendance Date: ${selectedDate}`, 20, 62);
      
      // Summary Box
      doc.setFillColor(240, 248, 255);
      doc.roundedRect(20, 70, 170, 30, 3, 3, 'F');
      doc.setTextColor(41, 128, 185);
      doc.setFontSize(14);
      doc.text('SUMMARY', 25, 85);
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(`Total Employees: ${stats.totalEmployees}`, 120, 85);
      doc.text(`Present: ${stats.presentToday}`, 120, 92);
      doc.text(`Absent: ${stats.absentToday}`, 120, 99);
      doc.text(`Late: ${stats.lateToday}`, 160, 85);
      doc.text(`On Leave: ${stats.onLeaveToday}`, 160, 92);
      
      // Table
      const filtered = attendanceFilter === 'all' 
        ? attendanceList.filter(a => a.date === selectedDate)
        : attendanceList.filter(a => a.date === selectedDate && a.status === attendanceFilter);
      
      const tableColumn = ["ID", "Employee", "Department", "Time", "Status", "Remarks"];
      const tableRows = filtered.map(emp => [
        emp.employeeId,
        emp.name,
        emp.department,
        emp.time,
        emp.status.toUpperCase(),
        emp.remarks || '-'
      ]);
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'grid',
        headStyles: { 
          fillColor: [41, 128, 185],
          textColor: 255,
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 20, right: 20 },
        styles: { overflow: 'linebreak' },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 40 },
          2: { cellWidth: 35 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 40 }
        }
      });
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Confidential - HR Department Use Only', 105, doc.internal.pageSize.height - 10, null, null, 'center');
        doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 5, null, null, 'center');
      }
      
      setExportData(doc.output('datauristring'));
      setShowViewExportModal(true);
      setLoading(false);
    }, 1500);
  };

  const generateLeavesPDF = () => {
    setLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      
      doc.setFillColor(39, 174, 96);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('LEAVE MANAGEMENT REPORT', 105, 20, null, null, 'center');
      
      doc.setFontSize(10);
      doc.text('TechCorp Solutions Pvt. Ltd.', 105, 35, null, null, 'center');
      
      doc.setTextColor(40);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 50);
      
      // Stats
      const pending = leaves.filter(l => l.status === 'pending').length;
      const approved = leaves.filter(l => l.status === 'approved').length;
      const rejected = leaves.filter(l => l.status === 'rejected').length;
      
      doc.setFillColor(240, 252, 245);
      doc.roundedRect(20, 60, 170, 25, 3, 3, 'F');
      doc.setTextColor(39, 174, 96);
      doc.setFontSize(14);
      doc.text('LEAVE STATISTICS', 25, 75);
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(`Pending: ${pending}`, 120, 70);
      doc.text(`Approved: ${approved}`, 120, 77);
      doc.text(`Rejected: ${rejected}`, 120, 84);
      doc.text(`Total: ${leaves.length}`, 160, 70);
      
      const filtered = leavesFilter === 'all' ? leaves : leaves.filter(l => l.status === leavesFilter);
      
      const tableColumn = ["ID", "Employee", "Department", "Type", "Duration", "Start Date", "End Date", "Status"];
      const tableRows = filtered.map(leave => [
        leave.employeeId,
        leave.employeeName,
        leave.department,
        leave.type,
        `${leave.duration} days`,
        leave.startDate,
        leave.endDate,
        leave.status.toUpperCase()
      ]);
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: 'grid',
        headStyles: { 
          fillColor: [39, 174, 96],
          textColor: 255,
          fontSize: 10
        },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 20, right: 20 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 20 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
          7: { cellWidth: 25 }
        }
      });
      
      setExportData(doc.output('datauristring'));
      setShowViewExportModal(true);
      setLoading(false);
    }, 1500);
  };

  const generatePayrollPDF = () => {
    setLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      
      doc.setFillColor(155, 89, 182);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('PAYROLL REPORT', 105, 20, null, null, 'center');
      
      doc.setFontSize(10);
      doc.text('TechCorp Solutions Pvt. Ltd.', 105, 35, null, null, 'center');
      
      doc.setTextColor(40);
      doc.setFontSize(12);
      doc.text(`Month: ${payrollMonth}`, 20, 50);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 57);
      
      const filtered = payrollData.filter(p => p.month === payrollMonth && 
        (selectedEmployees.length === 0 || selectedEmployees.includes(p.employeeId)));
      
      const totalBasic = filtered.reduce((sum, emp) => sum + emp.basicSalary, 0);
      const totalAllowances = filtered.reduce((sum, emp) => sum + emp.allowances, 0);
      const totalDeductions = filtered.reduce((sum, emp) => sum + emp.deductions, 0);
      const totalNet = filtered.reduce((sum, emp) => sum + emp.netSalary, 0);
      
      // Summary
      doc.setFillColor(245, 245, 255);
      doc.roundedRect(20, 65, 170, 40, 3, 3, 'F');
      doc.setTextColor(155, 89, 182);
      doc.setFontSize(14);
      doc.text('FINANCIAL SUMMARY', 25, 80);
      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text(`Total Basic Salary: ₹${totalBasic.toLocaleString()}`, 120, 75);
      doc.text(`Total Allowances: ₹${totalAllowances.toLocaleString()}`, 120, 82);
      doc.text(`Total Deductions: ₹${totalDeductions.toLocaleString()}`, 120, 89);
      doc.text(`Net Payable: ₹${totalNet.toLocaleString()}`, 120, 96);
      
      const tableColumn = ["ID", "Employee", "Department", "Basic", "Allowances", "Deductions", "Net Salary", "Status"];
      const tableRows = filtered.map(emp => [
        emp.employeeId,
        emp.employeeName,
        emp.department,
        `₹${emp.basicSalary.toLocaleString()}`,
        `₹${emp.allowances.toLocaleString()}`,
        `₹${emp.deductions.toLocaleString()}`,
        `₹${emp.netSalary.toLocaleString()}`,
        emp.status.toUpperCase()
      ]);
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 115,
        theme: 'grid',
        headStyles: { 
          fillColor: [155, 89, 182],
          textColor: 255,
          fontSize: 10
        },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 20, right: 20 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
          7: { cellWidth: 20 }
        }
      });
      
      // Signature area
      const finalY = doc.lastAutoTable.finalY + 20;
      doc.setFontSize(10);
      doc.text('Authorized Signature', 40, finalY);
      doc.text('___________________', 40, finalY + 10);
      doc.text('HR Manager', 40, finalY + 20);
      
      doc.text('Finance Approval', 150, finalY);
      doc.text('___________________', 150, finalY + 10);
      doc.text('Finance Head', 150, finalY + 20);
      
      setExportData(doc.output('datauristring'));
      setShowViewExportModal(true);
      setLoading(false);
    }, 1500);
  };

  const generateEmployeePayslip = (employee) => {
    const doc = new jsPDF();
    
    // Design Payslip
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('PAYSLIP', 105, 25, null, null, 'center');
    
    doc.setFontSize(10);
    doc.text('TechCorp Solutions Pvt. Ltd.', 105, 35, null, null, 'center');
    
    // Employee Details
    doc.setTextColor(40);
    doc.setFontSize(12);
    doc.text('EMPLOYEE DETAILS', 20, 50);
    doc.setFontSize(10);
    doc.text(`Name: ${employee.name}`, 25, 60);
    doc.text(`Employee ID: ${employee.id}`, 25, 67);
    doc.text(`Department: ${employee.department}`, 25, 74);
    doc.text(`Month: ${payrollMonth}`, 25, 81);
    doc.text(`Payment Date: ${new Date().toLocaleDateString()}`, 25, 88);
    
    // Salary Breakdown
    doc.setFontSize(12);
    doc.text('SALARY BREAKDOWN', 20, 105);
    
    const salaryData = payrollData.find(p => p.employeeId === employee.id && p.month === payrollMonth);
    
    if (salaryData) {
      doc.setFontSize(10);
      
      // Earnings
      doc.setTextColor(39, 174, 96);
      doc.text('EARNINGS', 25, 115);
      doc.line(25, 117, 80, 117);
      
      doc.setTextColor(40);
      doc.text(`Basic Salary: ₹${salaryData.basicSalary.toLocaleString()}`, 30, 125);
      doc.text(`Allowances: ₹${salaryData.allowances.toLocaleString()}`, 30, 132);
      doc.text(`Gross Salary: ₹${(salaryData.basicSalary + salaryData.allowances).toLocaleString()}`, 30, 139);
      
      // Deductions
      doc.setTextColor(231, 76, 60);
      doc.text('DEDUCTIONS', 120, 115);
      doc.line(120, 117, 180, 117);
      
      doc.setTextColor(40);
      doc.text(`Tax Deduction: ₹${salaryData.deductions.toLocaleString()}`, 125, 125);
      doc.text(`Total Deductions: ₹${salaryData.deductions.toLocaleString()}`, 125, 132);
      
      // Net Salary
      doc.setFillColor(240, 240, 240);
      doc.rect(20, 150, 170, 25, 'F');
      doc.setTextColor(155, 89, 182);
      doc.setFontSize(16);
      doc.text(`NET SALARY: ₹${salaryData.netSalary.toLocaleString()}`, 105, 165, null, null, 'center');
      
      // Payment Info
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text('Payment will be credited to your registered bank account within 24 hours.', 105, 185, null, null, 'center');
      doc.text('For any queries, contact HR department at hr@techcorp.com', 105, 192, null, null, 'center');
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('This is a computer generated document and requires no signature.', 105, 280, null, null, 'center');
    
    return doc;
  };

  const handleGeneratePayroll = () => {
    setLoading(true);
    const selected = selectedEmployees.length > 0 ? employees.filter(e => selectedEmployees.includes(e.id)) : employees;
    const payslips = [];
    
    setTimeout(() => {
      selected.forEach(emp => {
        const payslip = generateEmployeePayslip(emp);
        payslips.push({
          employee: emp.name,
          pdf: payslip.output('datauristring')
        });
      });
      
      setGeneratedPayslips(payslips);
      setPayrollStep(3);
      setLoading(false);
      
      // Update payroll status
      setPayrollData(prev => prev.map(item => 
        selectedEmployees.includes(item.employeeId) || selectedEmployees.length === 0
          ? { ...item, status: 'paid', month: payrollMonth }
          : item
      ));
    }, 2000);
  };

  const downloadPayslips = () => {
    generatedPayslips.forEach((payslip, index) => {
      const link = document.createElement('a');
      link.href = payslip.pdf;
      link.download = `payslip_${payslip.employee}_${payrollMonth}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    
    setShowGeneratePayrollModal(false);
    setPayrollStep(1);
    setSelectedEmployees([]);
    setGeneratedPayslips([]);
    alert('All payslips downloaded successfully!');
  };

  const handleExport = () => {
    switch(exportType) {
      case 'attendance':
        generateAttendancePDF();
        break;
      case 'leaves':
        generateLeavesPDF();
        break;
      case 'payroll':
        generatePayrollPDF();
        break;
      case 'employees':
        // Generate employee report
        break;
      default:
        generateAttendancePDF();
    }
  };

  // Handler Functions
  const handleAddAttendance = () => {
    if (!newAttendance.name || !newAttendance.time) {
      alert('Please fill in required fields');
      return;
    }
    
    const newId = attendanceList.length > 0 ? Math.max(...attendanceList.map(a => a.id)) + 1 : 1;
    const attendanceToAdd = {
      id: newId,
      ...newAttendance,
      time: `${newAttendance.time} ${parseInt(newAttendance.time) < 12 ? 'AM' : 'PM'}`
    };
    
    setAttendanceList([attendanceToAdd, ...attendanceList]);
    setShowAddAttendanceModal(false);
    setNewAttendance({
      name: '',
      employeeId: '',
      department: 'Engineering',
      status: 'present',
      time: '09:00',
      date: new Date().toISOString().split('T')[0],
      remarks: ''
    });
    
    alert('Attendance added successfully!');
  };

  const handleAddLeave = () => {
    if (!newLeave.employeeName || !newLeave.reason) {
      alert('Please fill in required fields');
      return;
    }
    
    const newId = leaves.length > 0 ? Math.max(...leaves.map(l => l.id)) + 1 : 1;
    const leaveToAdd = {
      id: newId,
      ...newLeave,
      status: 'pending'
    };
    
    setLeaves([leaveToAdd, ...leaves]);
    setShowAddLeaveModal(false);
    setNewLeave({
      employeeId: '',
      employeeName: '',
      type: 'Sick Leave',
      duration: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: '',
      department: 'Engineering',
      contact: ''
    });
    
    alert('Leave request added successfully!');
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) {
      alert('Please fill in required fields');
      return;
    }
    
    const newEmp = {
      ...newEmployee,
      id: `EMP${(employees.length + 1).toString().padStart(3, '0')}`
    };
    
    setEmployees([...employees, newEmp]);
    setStats(prev => ({ ...prev, totalEmployees: prev.totalEmployees + 1 }));
    setShowAddEmployeeModal(false);
    setNewEmployee({
      id: '',
      name: '',
      email: '',
      phone: '',
      department: 'Engineering',
      position: '',
      salary: '',
      joiningDate: new Date().toISOString().split('T')[0],
      address: ''
    });
    
    alert('Employee added successfully!');
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      alert('Please fill in required fields');
      return;
    }
    
    const newAnn = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0]
    };
    
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({
      title: '',
      message: '',
      priority: 'medium',
      department: 'all',
      expiresAt: ''
    });
    setShowAnnouncementModal(false);
    
    alert('Announcement added successfully!');
  };

  const handleDeleteAttendance = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      setAttendanceList(attendanceList.filter(a => a.id !== id));
      alert('Attendance record deleted!');
    }
  };

  const handleDeleteLeave = (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaves(leaves.filter(l => l.id !== id));
      alert('Leave request deleted!');
    }
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      alert('Announcement deleted!');
    }
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(e => e.id !== id));
      setStats(prev => ({ ...prev, totalEmployees: prev.totalEmployees - 1 }));
      alert('Employee deleted!');
    }
  };

  const handleApproveLeave = (leaveId) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId ? { ...leave, status: 'approved' } : leave
    ));
    alert('Leave request approved!');
    setShowLeaveModal(false);
  };

  const handleRejectLeave = (leaveId) => {
    if (window.confirm('Are you sure you want to reject this leave request?')) {
      setLeaves(leaves.map(leave => 
        leave.id === leaveId ? { ...leave, status: 'rejected' } : leave
      ));
      alert('Leave request rejected!');
      setShowLeaveModal(false);
    }
  };

  const handleViewLeaveDetails = (leave) => {
    setSelectedLeave(leave);
    setShowLeaveModal(true);
  };

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const selectAllEmployees = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(e => e.id));
    }
  };

  // Helper Functions
  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeaveStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filtered Data
  const filteredAttendance = attendanceList.filter(emp => {
    if (attendanceFilter === 'all') return true;
    return emp.status === attendanceFilter;
  });

  const filteredLeaves = leaves.filter(leave => {
    if (leavesFilter === 'all') return true;
    return leave.status === leavesFilter;
  });

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render Components
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Employees', value: stats.totalEmployees, icon: '👥', color: 'from-blue-500 to-cyan-500', change: '+2%' },
          { title: 'Present Today', value: stats.presentToday, icon: '✅', color: 'from-green-500 to-emerald-500', change: '94%' },
          { title: 'Absent Today', value: stats.absentToday, icon: '❌', color: 'from-red-500 to-rose-500', change: '6%' },
          { title: 'Pending Leaves', value: leaves.filter(l => l.status === 'pending').length, icon: '🏖️', color: 'from-amber-500 to-orange-500', change: `${leaves.filter(l => l.status === 'pending').length}` },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Attendance and Leaves Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Today's Attendance</h3>
            <button 
              onClick={() => setActiveTab('attendance')}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
            >
              View All <span className="ml-1">→</span>
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { label: 'Present', value: stats.presentToday, color: 'bg-green-500' },
              { label: 'Absent', value: stats.absentToday, color: 'bg-red-500' },
              { label: 'Late', value: stats.lateToday, color: 'bg-yellow-500' },
              { label: 'On Leave', value: stats.onLeaveToday, color: 'bg-blue-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <span className="font-semibold">{item.value} employees</span>
              </div>
            ))}
          </div>

          {/* Recent Check-ins */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Check-ins</h4>
            <div className="space-y-3">
              {attendanceList.slice(0, 3).map(emp => (
                <div key={emp.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-blue-600">👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{emp.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pending Leave Requests */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Pending Leave Requests</h3>
            <button 
              onClick={() => { setActiveTab('leaves'); setLeavesFilter('pending'); }}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
            >
              View All <span className="ml-1">→</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {leaves.filter(l => l.status === 'pending').length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">✅</span>
                <p>No pending leave requests</p>
              </div>
            ) : (
              leaves.filter(l => l.status === 'pending').slice(0, 3).map((leave) => (
                <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{leave.employeeName}</h4>
                      <p className="text-sm text-gray-600">{leave.type} • {leave.duration} days</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {leave.startDate} to {leave.endDate}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleViewLeaveDetails(leave)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Details
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleApproveLeave(leave.id)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      ✓ Approve
                    </button>
                    <button 
                      onClick={() => handleRejectLeave(leave.id)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Payroll Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Payroll Summary</h3>
          <button 
            onClick={() => setActiveTab('payroll')}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center"
          >
            View Details <span className="ml-1">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Total Monthly Salary', value: `₹${stats.totalSalary}`, desc: 'For 6 employees', color: 'from-blue-500 to-cyan-500' },
            { title: 'Tax Deductions', value: `₹${stats.taxDeductions}`, desc: '15% average rate', color: 'from-green-500 to-emerald-500' },
            { title: 'Net Payable', value: `₹${stats.netPayable}`, desc: 'After all deductions', color: 'from-purple-500 to-pink-500' },
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-r ${item.color} p-6 rounded-xl text-white`}>
              <div className="text-3xl font-bold mb-2">{item.value}</div>
              <div className="text-sm font-medium mb-1">{item.title}</div>
              <div className="text-xs opacity-90">{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                HR Admin Dashboard
              </h2>
              <p className="text-gray-600">Manage your human resources efficiently</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowAddEmployeeModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm font-medium"
              >
                + Add Employee
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                A
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'attendance', label: 'Attendance', icon: '📅' },
              { id: 'leaves', label: 'Leaves', icon: '🏖️' },
              { id: 'payroll', label: 'Payroll', icon: '💰' },
              { id: 'employees', label: 'Employees', icon: '👥' },
              { id: 'announcements', label: 'Announcements', icon: '📢' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-300 flex items-center ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'attendance' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
                    <p className="text-gray-600">Track and manage daily attendance</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                    <select 
                      value={attendanceFilter}
                      onChange={(e) => setAttendanceFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                      onClick={() => setShowExportModal(true)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Export PDF
                    </button>
                    <button 
                      onClick={() => setShowAddAttendanceModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      + Add Attendance
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAttendance.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs text-blue-600">👤</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{emp.name}</div>
                                <div className="text-sm text-gray-500">{emp.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{emp.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{emp.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{emp.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(emp.status)}`}>
                              {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.remarks}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => handleDeleteAttendance(emp.id)}
                              className="text-red-600 hover:text-red-900 mr-3"
                            >
                              Delete
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'leaves' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
                    <p className="text-gray-600">Approve, reject, and manage leave requests</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                    <select 
                      value={leavesFilter}
                      onChange={(e) => setLeavesFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="all">All</option>
                    </select>
                    <button 
                      onClick={() => setShowExportModal(true)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Export PDF
                    </button>
                    <button 
                      onClick={() => setShowAddLeaveModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      + Add Leave
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Pending', value: leaves.filter(l => l.status === 'pending').length, color: 'from-yellow-500 to-amber-500' },
                    { label: 'Approved', value: leaves.filter(l => l.status === 'approved').length, color: 'from-green-500 to-emerald-500' },
                    { label: 'Rejected', value: leaves.filter(l => l.status === 'rejected').length, color: 'from-red-500 to-rose-500' },
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white`}>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="text-sm font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeaves.map(leave => (
                        <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs text-blue-600">👤</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{leave.employeeName}</div>
                                <div className="text-sm text-gray-500">{leave.department}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{leave.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{leave.duration} days</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {leave.startDate} to {leave.endDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${getLeaveStatusColor(leave.status)}`}>
                              {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button 
                              onClick={() => handleViewLeaveDetails(leave)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleDeleteLeave(leave.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'payroll' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payroll Management</h2>
                    <p className="text-gray-600">Process salaries and generate payslips</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                    <input
                      type="month"
                      value={payrollMonth}
                      onChange={(e) => setPayrollMonth(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                      onClick={() => setShowExportModal(true)}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Export PDF
                    </button>
                    <button 
                      onClick={() => setShowGeneratePayrollModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Generate Payroll
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[
                    { title: 'Total Basic Salary', value: `₹${payrollData.reduce((sum, emp) => sum + emp.basicSalary, 0).toLocaleString()}`, desc: 'For all employees', color: 'from-blue-500 to-cyan-500' },
                    { title: 'Total Deductions', value: `₹${payrollData.reduce((sum, emp) => sum + emp.deductions, 0).toLocaleString()}`, desc: 'Tax & other deductions', color: 'from-green-500 to-emerald-500' },
                    { title: 'Net Payable', value: `₹${payrollData.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString()}`, desc: 'After all deductions', color: 'from-purple-500 to-pink-500' },
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r ${item.color} p-6 rounded-xl text-white`}>
                      <div className="text-2xl font-bold mb-2">{item.value}</div>
                      <div className="text-sm font-medium mb-1">{item.title}</div>
                      <div className="text-xs opacity-90">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payrollData.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs text-blue-600">👤</span>
                              </div>
                              <div className="font-medium text-gray-900">{emp.employeeName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{emp.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">₹{emp.basicSalary.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">₹{emp.allowances.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">₹{emp.deductions.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">₹{emp.netSalary.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                              emp.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'employees' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
                    <p className="text-gray-600">Manage your team members</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <button 
                      onClick={() => setShowAddEmployeeModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      + Add Employee
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.map(emp => (
                    <div key={emp.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {emp.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h3 className="font-bold text-gray-900">{emp.name}</h3>
                            <p className="text-sm text-gray-600">{emp.position}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {emp.department}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {emp.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {emp.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ₹{emp.salary.toLocaleString()}/month
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                        <span className="text-xs text-gray-500">Joined {emp.joiningDate}</span>
                        <button 
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Modals */}
        {/* Add Employee Modal */}
        <AnimatePresence>
          {showAddEmployeeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl max-w-2xl w-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Add New Employee</h3>
                  <button 
                    onClick={() => setShowAddEmployeeModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter employee name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="employee@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Salary</label>
                    <input
                      type="number"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 50000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={newEmployee.address}
                      onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Full address"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddEmployeeModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEmployee}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Add Employee
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Generate Payroll Modal */}
        <AnimatePresence>
          {showGeneratePayrollModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl max-w-4xl w-full p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {payrollStep === 1 && 'Select Employees'}
                    {payrollStep === 2 && 'Select Month'}
                    {payrollStep === 3 && 'Generated Payslips'}
                  </h3>
                  <button 
                    onClick={() => {
                      setShowGeneratePayrollModal(false);
                      setPayrollStep(1);
                      setSelectedEmployees([]);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        payrollStep >= step 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-2 ${payrollStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Select Employees */}
                {payrollStep === 1 && (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Select Employees for Payroll</h4>
                        <button 
                          onClick={selectAllEmployees}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          {selectedEmployees.length === employees.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
                        {employees.map(emp => (
                          <div 
                            key={emp.id}
                            onClick={() => toggleEmployeeSelection(emp.id)}
                            className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                              selectedEmployees.includes(emp.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                                selectedEmployees.includes(emp.id)
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'border-gray-300'
                              }`}>
                                {selectedEmployees.includes(emp.id) && (
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{emp.name}</div>
                                <div className="text-sm text-gray-500">{emp.department} • ₹{emp.salary.toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setPayrollStep(2)}
                        disabled={selectedEmployees.length === 0}
                        className={`px-6 py-3 rounded-xl font-medium ${
                          selectedEmployees.length === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg transition-all duration-300'
                        }`}
                      >
                        Next: Select Month
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Month */}
                {payrollStep === 2 && (
                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Select Month for Payroll</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center space-x-4">
                          <input
                            type="month"
                            value={payrollMonth}
                            onChange={(e) => setPayrollMonth(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="text-sm text-gray-600">
                            <p>Payroll will be generated for {selectedEmployees.length} selected employees</p>
                            <p className="text-gray-500">Selected month: {payrollMonth}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setPayrollStep(1)}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleGeneratePayroll}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Generating...
                          </div>
                        ) : 'Generate Payroll'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Generated Payslips */}
                {payrollStep === 3 && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Payroll Generated Successfully!</h4>
                      <p className="text-gray-600">
                        {generatedPayslips.length} payslips have been generated for {payrollMonth}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h5 className="font-medium text-gray-900 mb-3">Generated Payslips:</h5>
                      <div className="space-y-3">
                        {generatedPayslips.map((payslip, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>{payslip.employee} - {payrollMonth}</span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setPayrollStep(2)}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <div className="space-x-3">
                        <button
                          onClick={() => setShowGeneratePayrollModal(false)}
                          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={downloadPayslips}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                        >
                          Download All Payslips
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Export Modal */}
        <AnimatePresence>
          {showExportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Export Data</h3>
                  <button 
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Export Type</label>
                    <select
                      value={exportType}
                      onChange={(e) => setExportType(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="attendance">Attendance Report</option>
                      <option value="leaves">Leave Report</option>
                      <option value="payroll">Payroll Report</option>
                      <option value="employees">Employee Directory</option>
                    </select>
                  </div>

                  {exportType === 'attendance' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {exportType === 'payroll' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                      <input
                        type="month"
                        value={payrollMonth}
                        onChange={(e) => setPayrollMonth(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-blue-800">
                        Export will generate a professional PDF report with company branding.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExport}
                    disabled={loading}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center ${
                      loading 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg transition-all duration-300'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export as PDF
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* View Export Modal */}
        <AnimatePresence>
          {showViewExportModal && exportData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl max-w-4xl w-full"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">PDF Preview</h3>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = exportData;
                        link.download = `export_${exportType}_${new Date().getTime()}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        alert('PDF downloaded successfully!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      Download PDF
                    </button>
                    <button 
                      onClick={() => {
                        setShowViewExportModal(false);
                        setExportData(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <iframe 
                    src={exportData}
                    className="w-full h-[500px] border border-gray-200 rounded-lg"
                    title="PDF Preview"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;