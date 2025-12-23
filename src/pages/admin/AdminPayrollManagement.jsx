// components/PayrollManagement.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Send, 
  Edit, 
  Trash2, 
  Eye, 
  Filter, 
  Search, 
  Calendar,
  DollarSign,
  Users,
  FileText,
  Printer,
  Upload,
  BarChart3,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Copy,
  Share2,
  Archive,
  TrendingUp,
  TrendingDown,
  Plus
} from 'lucide-react';

// Modal Component with animations
const Modal = ({ show, onClose, title, children, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Card Component
const StatCard = ({ title, value, icon: Icon, color, trend, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${loading ? 'animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4 inline mr-1" /> : <TrendingDown className="w-4 h-4 inline mr-1" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </motion.div>
  );
};

const AdminPayrollManagement = () => {
  const [loading, setLoading] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salaryStructure, setSalaryStructure] = useState({
    basic: 40,
    hra: 20,
    da: 10,
    specialAllowance: 15,
    medical: 5,
    conveyance: 5,
    pf: 12,
    esic: 3.25,
    tds: 10,
    professionalTax: 200,
    insurance: 1000
  });

  // Modal states
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPayrollForDelete, setSelectedPayrollForDelete] = useState(null);
  const [selectedPayrollForPreview, setSelectedPayrollForPreview] = useState(null);

  // Form states
  const [generateData, setGenerateData] = useState({
    month: '',
    year: '',
    includeBonuses: true,
    includeDeductions: true,
    includeOvertime: false,
    includeAllowances: true,
    payrollCycle: 'monthly'
  });

  const [editData, setEditData] = useState({
    id: null,
    month: '',
    employeeCount: '',
    totalSalary: '',
    status: 'pending',
    notes: '',
    processedBy: '',
    processedDate: ''
  });

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    month: '',
    year: '',
    status: '',
    department: '',
    salaryRange: { min: 0, max: 500000 },
    dateRange: { start: '', end: '' }
  });

  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [selectedPayrolls, setSelectedPayrolls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'month', direction: 'desc' });
  const [expandedPayroll, setExpandedPayroll] = useState(null);
  const itemsPerPage = 10;

  // Initialize data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Static employee data
      const employeeData = [
        { 
          id: 1, 
          name: 'John Doe', 
          employeeId: 'EMP001',
          department: 'Engineering',
          designation: 'Senior Developer',
          basicSalary: 50000,
          bankAccount: 'HDFC1234567890',
          ifsc: 'HDFC0000123',
          joinDate: '2022-01-15',
          email: 'john@company.com',
          contact: '+91 9876543210',
          taxSlab: 'Old Regime',
          pfNumber: 'PF123456789',
          esicNumber: 'ESIC123456789'
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          employeeId: 'EMP002',
          department: 'Sales',
          designation: 'Sales Manager',
          basicSalary: 60000,
          bankAccount: 'ICICI1234567890',
          ifsc: 'ICIC0000123',
          joinDate: '2021-03-10',
          email: 'jane@company.com',
          contact: '+91 9876543211',
          taxSlab: 'New Regime',
          pfNumber: 'PF123456780',
          esicNumber: 'ESIC123456780'
        },
        { 
          id: 3, 
          name: 'Robert Johnson', 
          employeeId: 'EMP003',
          department: 'Marketing',
          designation: 'Marketing Head',
          basicSalary: 70000,
          bankAccount: 'SBI1234567890',
          ifsc: 'SBIN0000123',
          joinDate: '2020-11-05',
          email: 'robert@company.com',
          contact: '+91 9876543212',
          taxSlab: 'Old Regime',
          pfNumber: 'PF123456781',
          esicNumber: 'ESIC123456781'
        },
        { 
          id: 4, 
          name: 'Sarah Williams', 
          employeeId: 'EMP004',
          department: 'HR',
          designation: 'HR Manager',
          basicSalary: 55000,
          bankAccount: 'AXIS1234567890',
          ifsc: 'UTIB0000123',
          joinDate: '2021-08-20',
          email: 'sarah@company.com',
          contact: '+91 9876543213',
          taxSlab: 'New Regime',
          pfNumber: 'PF123456782',
          esicNumber: 'ESIC123456782'
        },
        { 
          id: 5, 
          name: 'Michael Brown', 
          employeeId: 'EMP005',
          department: 'Finance',
          designation: 'Finance Analyst',
          basicSalary: 45000,
          bankAccount: 'KOTAK1234567890',
          ifsc: 'KKBK0000123',
          joinDate: '2023-01-10',
          email: 'michael@company.com',
          contact: '+91 9876543214',
          taxSlab: 'Old Regime',
          pfNumber: 'PF123456783',
          esicNumber: 'ESIC123456783'
        },
        { 
          id: 6, 
          name: 'Emily Davis', 
          employeeId: 'EMP006',
          department: 'Engineering',
          designation: 'Frontend Developer',
          basicSalary: 40000,
          bankAccount: 'YES1234567890',
          ifsc: 'YESB0000123',
          joinDate: '2022-06-15',
          email: 'emily@company.com',
          contact: '+91 9876543215',
          taxSlab: 'New Regime',
          pfNumber: 'PF123456784',
          esicNumber: 'ESIC123456784'
        },
        { 
          id: 7, 
          name: 'David Wilson', 
          employeeId: 'EMP007',
          department: 'Operations',
          designation: 'Operations Manager',
          basicSalary: 65000,
          bankAccount: 'INDUS1234567890',
          ifsc: 'INDB0000123',
          joinDate: '2019-12-01',
          email: 'david@company.com',
          contact: '+91 9876543216',
          taxSlab: 'Old Regime',
          pfNumber: 'PF123456785',
          esicNumber: 'ESIC123456785'
        }
      ];

      // Static payroll data
      const payrollData = [
        {
          id: 1,
          month: 'January 2024',
          year: 2024,
          monthNumber: 1,
          employeeCount: 45,
          totalSalary: 2250000,
          totalBasic: 1800000,
          totalAllowances: 450000,
          totalDeductions: 337500,
          netSalary: 1912500,
          status: 'processed',
          processedDate: '2024-01-31',
          processedBy: 'Admin User',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2024-02-01',
          notes: 'Regular payroll processed'
        },
        {
          id: 2,
          month: 'December 2023',
          year: 2023,
          monthNumber: 12,
          employeeCount: 43,
          totalSalary: 2150000,
          totalBasic: 1720000,
          totalAllowances: 430000,
          totalDeductions: 322500,
          netSalary: 1827500,
          status: 'processed',
          processedDate: '2023-12-30',
          processedBy: 'Admin User',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2023-12-31',
          notes: 'Year-end payroll with bonuses'
        },
        {
          id: 3,
          month: 'November 2023',
          year: 2023,
          monthNumber: 11,
          employeeCount: 42,
          totalSalary: 2100000,
          totalBasic: 1680000,
          totalAllowances: 420000,
          totalDeductions: 315000,
          netSalary: 1785000,
          status: 'processed',
          processedDate: '2023-11-30',
          processedBy: 'Admin User',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2023-12-01',
          notes: 'Regular payroll'
        },
        {
          id: 4,
          month: 'February 2024',
          year: 2024,
          monthNumber: 2,
          employeeCount: 46,
          totalSalary: 2300000,
          totalBasic: 1840000,
          totalAllowances: 460000,
          totalDeductions: 345000,
          netSalary: 1955000,
          status: 'pending',
          processedDate: null,
          processedBy: null,
          paymentMethod: null,
          paymentDate: null,
          notes: 'Awaiting approval'
        },
        {
          id: 5,
          month: 'January 2023',
          year: 2023,
          monthNumber: 1,
          employeeCount: 40,
          totalSalary: 2000000,
          totalBasic: 1600000,
          totalAllowances: 400000,
          totalDeductions: 300000,
          netSalary: 1700000,
          status: 'processed',
          processedDate: '2023-01-31',
          processedBy: 'Admin User',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2023-02-01',
          notes: 'Regular payroll'
        },
        {
          id: 6,
          month: 'February 2023',
          year: 2023,
          monthNumber: 2,
          employeeCount: 41,
          totalSalary: 2050000,
          totalBasic: 1640000,
          totalAllowances: 410000,
          totalDeductions: 307500,
          netSalary: 1742500,
          status: 'processed',
          processedDate: '2023-02-28',
          processedBy: 'Admin User',
          paymentMethod: 'Bank Transfer',
          paymentDate: '2023-03-01',
          notes: 'Regular payroll'
        }
      ];

      setEmployees(employeeData);
      setPayrolls(payrollData);
      setLoading(false);
    }, 1000);
  };

  // Calculate salary components
  const calculateSalary = (employee, bonuses = 0, deductions = 0) => {
    const basic = (employee.basicSalary * salaryStructure.basic) / 100;
    const hra = (employee.basicSalary * salaryStructure.hra) / 100;
    const da = (employee.basicSalary * salaryStructure.da) / 100;
    const specialAllowance = (employee.basicSalary * salaryStructure.specialAllowance) / 100;
    const medical = (employee.basicSalary * salaryStructure.medical) / 100;
    const conveyance = (employee.basicSalary * salaryStructure.conveyance) / 100;
    
    const gross = basic + hra + da + specialAllowance + medical + conveyance + bonuses;
    
    const pf = (basic * salaryStructure.pf) / 100;
    const esic = (employee.basicSalary * salaryStructure.esic) / 100;
    const tds = (employee.basicSalary * salaryStructure.tds) / 100;
    const professionalTax = salaryStructure.professionalTax;
    const insurance = salaryStructure.insurance;
    
    const totalDeductions = pf + esic + tds + professionalTax + insurance + deductions;
    const net = gross - totalDeductions;
    
    return {
      gross,
      net,
      basic,
      hra,
      da,
      specialAllowance,
      medical,
      conveyance,
      bonuses,
      deductions: totalDeductions,
      pf,
      esic,
      tds,
      professionalTax,
      insurance
    };
  };

  // Filter payrolls
  const getFilteredPayrolls = () => {
    let filtered = [...payrolls];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.month.toLowerCase().includes(searchLower) ||
        p.status.toLowerCase().includes(searchLower) ||
        p.notes?.toLowerCase().includes(searchLower)
      );
    }

    // Month filter
    if (filters.month) {
      filtered = filtered.filter(p => {
        const monthName = new Date(p.month).toLocaleString('default', { month: 'long' });
        return monthName.toLowerCase().includes(filters.month.toLowerCase());
      });
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(p => p.year.toString() === filters.year);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(p => {
        const date = new Date(p.processedDate || p.month);
        return date >= new Date(filters.dateRange.start) && date <= new Date(filters.dateRange.end);
      });
    }

    // Salary range filter
    filtered = filtered.filter(p =>
      p.totalSalary >= filters.salaryRange.min && p.totalSalary <= filters.salaryRange.max
    );

    return filtered;
  };

  // Sort payrolls
  const sortPayrolls = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedPayrolls = () => {
    const filtered = getFilteredPayrolls();
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Pagination
  const getPaginatedPayrolls = () => {
    const sorted = getSortedPayrolls();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  };

  // CRUD Operations
  const handleGeneratePayroll = () => {
    if (!generateData.month || !generateData.year) {
      alert('Please select month and year');
      return;
    }

    const monthName = new Date(`${generateData.month} 1, ${generateData.year}`)
      .toLocaleString('en', { month: 'long' });
    const monthYear = `${monthName} ${generateData.year}`;
    
    // Check if payroll already exists
    const existingPayroll = payrolls.find(p => p.month === monthYear);
    if (existingPayroll) {
      alert('Payroll for this month already exists!');
      return;
    }

    // Calculate total salary
    const employeeSalaries = employees.map(emp => {
      const salary = calculateSalary(emp);
      return { ...emp, salary };
    });

    const totalSalary = employeeSalaries.reduce((sum, emp) => sum + emp.salary.gross, 0);
    const totalBasic = employeeSalaries.reduce((sum, emp) => sum + emp.salary.basic, 0);
    const totalAllowances = employeeSalaries.reduce((sum, emp) => 
      sum + emp.salary.hra + emp.salary.da + emp.salary.specialAllowance + emp.salary.medical + emp.salary.conveyance, 0);
    const totalDeductions = employeeSalaries.reduce((sum, emp) => sum + emp.salary.deductions, 0);
    const netSalary = employeeSalaries.reduce((sum, emp) => sum + emp.salary.net, 0);

    const newPayroll = {
      id: payrolls.length + 1,
      month: monthYear,
      year: parseInt(generateData.year),
      monthNumber: parseInt(generateData.month),
      employeeCount: employees.length,
      totalSalary,
      totalBasic,
      totalAllowances,
      totalDeductions,
      netSalary,
      status: 'pending',
      processedDate: null,
      processedBy: null,
      paymentMethod: null,
      paymentDate: null,
      notes: 'New payroll generated'
    };

    setPayrolls([newPayroll, ...payrolls]);
    setShowGenerateModal(false);
    
    // Reset form
    setGenerateData({
      month: '',
      year: '',
      includeBonuses: true,
      includeDeductions: true,
      includeOvertime: false,
      includeAllowances: true,
      payrollCycle: 'monthly'
    });
    
    alert('Payroll generated successfully!');
  };

  const handleUpdatePayrollStatus = (id, status) => {
    const payroll = payrolls.find(p => p.id === id);
    if (!payroll) return;

    const updatedPayroll = {
      ...payroll,
      status,
      processedDate: status === 'processed' ? new Date().toISOString().split('T')[0] : payroll.processedDate,
      processedBy: status === 'processed' ? 'Admin User' : payroll.processedBy
    };

    setPayrolls(payrolls.map(p => p.id === id ? updatedPayroll : p));
    alert(`Payroll status updated to ${status}`);
  };

  // FIXED: Add missing handleUpdatePayroll function
  const handleUpdatePayroll = () => {
    if (!editData.month || !editData.employeeCount || !editData.totalSalary) {
      alert('Please fill in all required fields');
      return;
    }

    // Update the payroll
    setPayrolls(payrolls.map(p => 
      p.id === editData.id 
        ? { 
            ...p, 
            month: editData.month,
            employeeCount: parseInt(editData.employeeCount),
            totalSalary: parseFloat(editData.totalSalary),
            status: editData.status,
            notes: editData.notes,
            processedBy: editData.processedBy || p.processedBy,
            processedDate: editData.processedDate || p.processedDate
          } 
        : p
    ));
    
    setShowEditModal(false);
    setEditData({
      id: null,
      month: '',
      employeeCount: '',
      totalSalary: '',
      status: 'pending',
      notes: '',
      processedBy: '',
      processedDate: ''
    });
    alert('Payroll updated successfully!');
  };

  const handleDeletePayroll = (id) => {
    if (window.confirm('Are you sure you want to delete this payroll? This action cannot be undone.')) {
      setPayrolls(payrolls.filter(p => p.id !== id));
      setShowDeleteConfirm(false);
      setSelectedPayrollForDelete(null);
      alert('Payroll deleted successfully!');
    }
  };

  const handleBulkDelete = () => {
    if (selectedPayrolls.length === 0) {
      alert('Please select payrolls to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedPayrolls.length} selected payrolls?`)) {
      setPayrolls(payrolls.filter(p => !selectedPayrolls.includes(p.id)));
      setSelectedPayrolls([]);
      alert('Selected payrolls deleted successfully!');
    }
  };

  const handleExportPayrolls = (format) => {
    const data = getFilteredPayrolls();
    
    if (format === 'csv') {
      const headers = ['Month', 'Employee Count', 'Total Salary', 'Net Salary', 'Status', 'Processed Date'];
      const csvContent = [
        headers.join(','),
        ...data.map(p => [
          p.month,
          p.employeeCount,
          p.totalSalary,
          p.netSalary,
          p.status,
          p.processedDate
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payroll-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else if (format === 'pdf') {
      // Simulate PDF generation
      alert('PDF export functionality would generate detailed payroll reports');
    }
    
    setShowExportModal(false);
    alert(`Payroll data exported as ${format.toUpperCase()}`);
  };

  const handleSendPayslips = (payrollId) => {
    const payroll = payrolls.find(p => p.id === payrollId);
    if (!payroll) return;

    // Simulate sending emails
    alert(`Payslips for ${payroll.month} sent to all employees!`);
    handleUpdatePayrollStatus(payrollId, 'sent');
  };

  const handleDownloadPayslip = (payrollId, employeeId = null) => {
    const payroll = payrolls.find(p => p.id === payrollId);
    if (!payroll) return;

    if (employeeId) {
      const employee = employees.find(e => e.id === employeeId);
      const salary = calculateSalary(employee);
      
      const payslipContent = `
        PAYSLIP - ${payroll.month}
        ========================
        Employee: ${employee.name}
        Employee ID: ${employee.employeeId}
        Department: ${employee.department}
        Designation: ${employee.designation}
        
        EARNINGS:
        ---------
        Basic Salary: ₹${salary.basic.toLocaleString()}
        HRA: ₹${salary.hra.toLocaleString()}
        DA: ₹${salary.da.toLocaleString()}
        Special Allowance: ₹${salary.specialAllowance.toLocaleString()}
        Medical: ₹${salary.medical.toLocaleString()}
        Conveyance: ₹${salary.conveyance.toLocaleString()}
        Bonuses: ₹${salary.bonuses.toLocaleString()}
        
        DEDUCTIONS:
        -----------
        PF: ₹${salary.pf.toLocaleString()}
        ESIC: ₹${salary.esic.toLocaleString()}
        TDS: ₹${salary.tds.toLocaleString()}
        Professional Tax: ₹${salary.professionalTax.toLocaleString()}
        Insurance: ₹${salary.insurance.toLocaleString()}
        
        SUMMARY:
        --------
        Gross Salary: ₹${salary.gross.toLocaleString()}
        Total Deductions: ₹${salary.deductions.toLocaleString()}
        Net Salary: ₹${salary.net.toLocaleString()}
        
        Payment Details:
        Bank: ${employee.bankAccount}
        IFSC: ${employee.ifsc}
        
        Generated on: ${new Date().toLocaleDateString()}
      `;

      const blob = new Blob([payslipContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip-${employee.employeeId}-${payroll.month.replace(' ', '-')}.txt`;
      a.click();
      
      alert(`Payslip downloaded for ${employee.name}`);
    } else {
      // Download bulk payroll summary
      const summaryContent = `
        PAYROLL SUMMARY - ${payroll.month}
        ===============================
        Total Employees: ${payroll.employeeCount}
        Total Salary: ₹${payroll.totalSalary.toLocaleString()}
        Total Basic: ₹${payroll.totalBasic.toLocaleString()}
        Total Allowances: ₹${payroll.totalAllowances.toLocaleString()}
        Total Deductions: ₹${payroll.totalDeductions.toLocaleString()}
        Net Salary Paid: ₹${payroll.netSalary.toLocaleString()}
        
        Status: ${payroll.status}
        Processed Date: ${payroll.processedDate || 'N/A'}
        Payment Method: ${payroll.paymentMethod || 'N/A'}
        
        Generated on: ${new Date().toLocaleDateString()}
      `;

      const blob = new Blob([summaryContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payroll-summary-${payroll.month.replace(' ', '-')}.txt`;
      a.click();
      
      alert('Payroll summary downloaded');
    }
  };

  const handleSaveSalaryStructure = () => {
    localStorage.setItem('salaryStructure', JSON.stringify(salaryStructure));
    alert('Salary structure saved successfully!');
    setShowStructureModal(false);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      month: '',
      year: '',
      status: '',
      department: '',
      salaryRange: { min: 0, max: 500000 },
      dateRange: { start: '', end: '' }
    });
    setAdvancedFilters(false);
  };

  // Calculate statistics
  const calculateStatistics = () => {
    const processedPayrolls = payrolls.filter(p => p.status === 'processed');
    const totalSalary = processedPayrolls.reduce((sum, p) => sum + p.totalSalary, 0);
    const totalEmployees = processedPayrolls.reduce((sum, p) => sum + p.employeeCount, 0);
    const averageSalary = processedPayrolls.length > 0 ? totalSalary / processedPayrolls.length : 0;
    const pendingPayrolls = payrolls.filter(p => p.status === 'pending').length;

    return {
      totalPayrolls: payrolls.length,
      totalSalary,
      totalEmployees,
      averageSalary: Math.round(averageSalary),
      pendingPayrolls
    };
  };

  const stats = calculateStatistics();

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      processed: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      sent: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Send },
      draft: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: FileText }
    };

    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Toggle payroll details
  const togglePayrollDetails = (id) => {
    setExpandedPayroll(expandedPayroll === id ? null : id);
  };

  // Duplicate payroll
  const handleDuplicatePayroll = (payrollId) => {
    const payroll = payrolls.find(p => p.id === payrollId);
    if (!payroll) return;

    const duplicatedPayroll = {
      ...payroll,
      id: payrolls.length + 1,
      month: `Copy of ${payroll.month}`,
      status: 'draft',
      processedDate: null,
      processedBy: null,
      notes: `Duplicated from ${payroll.month}`
    };

    setPayrolls([duplicatedPayroll, ...payrolls]);
    alert('Payroll duplicated successfully!');
  };

  // Archive payroll
  const handleArchivePayroll = (payrollId) => {
    if (window.confirm('Are you sure you want to archive this payroll?')) {
      setPayrolls(payrolls.map(p => 
        p.id === payrollId ? { ...p, status: 'archived' } : p
      ));
      alert('Payroll archived successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl font-bold text-gray-900"
            >
              Payroll Management
            </motion.h2>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-1"
            >
              Manage employee salaries, deductions, and payroll processing
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-wrap gap-3 mt-4 md:mt-0"
          >
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            
            <button
              onClick={() => setShowStructureModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
            >
              <Settings className="w-4 h-4" />
              Structure
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-500/25"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button
              onClick={() => setShowGenerateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-lg shadow-green-500/25"
            >
              <Plus className="w-4 h-4" />
              Generate Payroll
            </button>
          </motion.div>
        </div>

        {/* Statistics Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            title="Total Payrolls"
            value={stats.totalPayrolls}
            icon={FileText}
            color="text-blue-600"
            trend={12}
            loading={loading}
          />
          
          <StatCard
            title="Total Salary"
            value={`₹${stats.totalSalary.toLocaleString()}`}
            icon={DollarSign}
            color="text-green-600"
            trend={8.5}
            loading={loading}
          />
          
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            color="text-purple-600"
            trend={5}
            loading={loading}
          />
          
          <StatCard
            title="Pending Payrolls"
            value={stats.pendingPayrolls}
            icon={AlertCircle}
            color="text-yellow-600"
            loading={loading}
          />
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAdvancedFilters(!advancedFilters)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                {advancedFilters ? 'Simple Filters' : 'Advanced Filters'}
              </button>
              <button
                onClick={handleResetFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search payrolls by month, status, or notes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                value={filters.month}
                onChange={(e) => setFilters({...filters, month: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>

              <select
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="processed">Processed</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Advanced Filters */}
            {advancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range (₹{filters.salaryRange.min.toLocaleString()} - ₹{filters.salaryRange.max.toLocaleString()})
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={filters.salaryRange.min}
                        onChange={(e) => setFilters({
                          ...filters,
                          salaryRange: { ...filters.salaryRange, min: parseInt(e.target.value) }
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>₹0</span>
                        <span>₹500,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) => setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, start: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) => setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, end: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Payroll List */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Payroll History</h3>
              <p className="text-gray-600 text-sm mt-1">
                Showing {getFilteredPayrolls().length} of {payrolls.length} payrolls
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {selectedPayrolls.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedPayrolls.length})
                </button>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <select
                  value={sortConfig.key}
                  onChange={(e) => sortPayrolls(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg bg-transparent"
                >
                  <option value="month">Month</option>
                  <option value="totalSalary">Total Salary</option>
                  <option value="employeeCount">Employee Count</option>
                  <option value="status">Status</option>
                  <option value="processedDate">Processed Date</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {getPaginatedPayrolls().map((payroll) => (
              <motion.div
                key={payroll.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Payroll Header */}
                <div className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedPayrolls.includes(payroll.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPayrolls([...selectedPayrolls, payroll.id]);
                          } else {
                            setSelectedPayrolls(selectedPayrolls.filter(id => id !== payroll.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{payroll.month}</h4>
                          <p className="text-sm text-gray-500">{payroll.year} • {payroll.employeeCount} employees</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₹{payroll.totalSalary.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Net: ₹{payroll.netSalary.toLocaleString()}</div>
                      </div>
                      
                      {getStatusBadge(payroll.status)}
                      
                      <button
                        onClick={() => togglePayrollDetails(payroll.id)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        {expandedPayroll === payroll.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedPayroll === payroll.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 bg-white"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="space-y-2">
                            <h5 className="font-medium text-gray-900">Payroll Details</h5>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Basic Salary:</span>
                                <span className="font-medium">₹{payroll.totalBasic.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Allowances:</span>
                                <span className="font-medium text-green-600">₹{payroll.totalAllowances.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Deductions:</span>
                                <span className="font-medium text-red-600">₹{payroll.totalDeductions.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium text-gray-900">Processing Info</h5>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Processed Date:</span>
                                <span className="font-medium">{payroll.processedDate || 'Pending'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Processed By:</span>
                                <span className="font-medium">{payroll.processedBy || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Method:</span>
                                <span className="font-medium">{payroll.paymentMethod || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium text-gray-900">Actions</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => handleDownloadPayslip(payroll.id)}
                                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                              <button
                                onClick={() => handleSendPayslips(payroll.id)}
                                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                              >
                                <Send className="w-4 h-4" />
                                Send
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  setEditData({
                                    id: payroll.id,
                                    month: payroll.month,
                                    employeeCount: payroll.employeeCount,
                                    totalSalary: payroll.totalSalary,
                                    status: payroll.status,
                                    notes: payroll.notes || '',
                                    processedBy: payroll.processedBy || '',
                                    processedDate: payroll.processedDate || ''
                                  });
                                  setShowEditModal(true);
                                }}
                                className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDuplicatePayroll(payroll.id)}
                                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                              >
                                Duplicate
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          {payroll.status === 'pending' && (
                            <button
                              onClick={() => handleUpdatePayrollStatus(payroll.id, 'processed')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              Mark as Processed
                            </button>
                          )}
                          <button
                            onClick={() => handleArchivePayroll(payroll.id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                          >
                            Archive
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPayrollForDelete(payroll.id);
                              setShowDeleteConfirm(true);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {getFilteredPayrolls().length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FileText className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payrolls found</h3>
                <p className="text-gray-600">Try adjusting your filters or generate a new payroll</p>
                <button
                  onClick={() => setShowGenerateModal(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate First Payroll
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {getFilteredPayrolls().length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, getFilteredPayrolls().length)} of {getFilteredPayrolls().length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(Math.ceil(getFilteredPayrolls().length / itemsPerPage))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(getFilteredPayrolls().length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(getFilteredPayrolls().length / itemsPerPage)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Employee Salary Breakdown */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Employee Salary Breakdown</h3>
              <p className="text-gray-600 text-sm mt-1">Detailed salary calculations for each employee</p>
            </div>
            <button
              onClick={() => setShowBulkEditModal(true)}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              Bulk Edit Salaries
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((employee) => {
                  const salary = calculateSalary(employee);
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employeeId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          ₹{employee.basicSalary.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-green-600">
                          ₹{(salary.hra + salary.da + salary.specialAllowance + salary.medical + salary.conveyance).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          HRA: ₹{salary.hra.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-red-600">
                          ₹{salary.deductions.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          PF: ₹{salary.pf.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-blue-600">
                          ₹{salary.net.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownloadPayslip(4, employee.id)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            Payslip
                          </button>
                          <button
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Generate Payroll Modal */}
        <Modal
          show={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
          title="Generate New Payroll"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month *
                </label>
                <select
                  value={generateData.month}
                  onChange={(e) => setGenerateData({...generateData, month: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <select
                  value={generateData.year}
                  onChange={(e) => setGenerateData({...generateData, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payroll Cycle
              </label>
              <select
                value={generateData.payrollCycle}
                onChange={(e) => setGenerateData({...generateData, payrollCycle: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Inclusion Options</h4>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateData.includeBonuses}
                    onChange={(e) => setGenerateData({...generateData, includeBonuses: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">Include Bonuses</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateData.includeDeductions}
                    onChange={(e) => setGenerateData({...generateData, includeDeductions: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">Include Deductions</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateData.includeOvertime}
                    onChange={(e) => setGenerateData({...generateData, includeOvertime: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">Include Overtime</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateData.includeAllowances}
                    onChange={(e) => setGenerateData({...generateData, includeAllowances: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">Include Allowances</span>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="text-blue-800 mr-3">ℹ️</div>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Payroll Summary</p>
                  <p>Total Employees: {employees.length}</p>
                  <p>Estimated Total Salary: ₹{employees.reduce((sum, emp) => sum + calculateSalary(emp).gross, 0).toLocaleString()}</p>
                  <p>Estimated Net Salary: ₹{employees.reduce((sum, emp) => sum + calculateSalary(emp).net, 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGeneratePayroll}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium"
            >
              Generate Payroll
            </button>
          </div>
        </Modal>

        {/* Salary Structure Modal */}
        <Modal
          show={showStructureModal}
          onClose={() => setShowStructureModal(false)}
          title="Salary Structure Configuration"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(salaryStructure).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {key.replace(/([A-Z])/g, ' $1')}
                    {['basic', 'hra', 'da', 'specialAllowance', 'medical', 'conveyance', 'pf', 'esic', 'tds'].includes(key) ? ' (%)' : ' (₹)'}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      if (newValue >= 0 && newValue <= 100) {
                        setSalaryStructure({...salaryStructure, [key]: e.target.value});
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    step="0.01"
                    min="0"
                    max={['basic', 'hra', 'da', 'specialAllowance', 'medical', 'conveyance', 'pf', 'esic', 'tds'].includes(key) ? "100" : undefined}
                  />
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Sample Calculation (Basic Salary: ₹50,000)</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Gross Salary</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{calculateSalary({ basicSalary: 50000 }).gross.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Deductions</p>
                  <p className="text-lg font-bold text-red-600">
                    -₹{calculateSalary({ basicSalary: 50000 }).deductions.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Net Salary</p>
                  <p className="text-lg font-bold text-blue-600">
                    ₹{calculateSalary({ basicSalary: 50000 }).net.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowStructureModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSalaryStructure}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Save Structure
            </button>
          </div>
        </Modal>

        {/* Export Modal */}
        <Modal
          show={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Payroll Data"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Export Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleExportPayrolls('csv')}
                  className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 text-center"
                >
                  <div className="text-blue-600 text-2xl mb-2">📊</div>
                  <div className="font-medium text-gray-900">CSV</div>
                  <div className="text-sm text-gray-500 mt-1">Excel compatible</div>
                </button>
                <button
                  onClick={() => handleExportPayrolls('pdf')}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-red-600 hover:bg-red-50 transition-all duration-300 text-center"
                >
                  <div className="text-red-600 text-2xl mb-2">📄</div>
                  <div className="font-medium text-gray-900">PDF</div>
                  <div className="text-sm text-gray-500 mt-1">Printable format</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Range
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                onChange={(e) => {
                  // Handle export range selection
                }}
              >
                <option value="all">All Payrolls</option>
                <option value="current">Current Year</option>
                <option value="last3">Last 3 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="text-yellow-800 mr-3">⚠️</div>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Note:</p>
                  <p>Exported data will include payroll details, employee information, and salary breakdowns.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowExportModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Edit Payroll Modal */}
        <Modal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Payroll"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <input
                type="text"
                value={editData.month}
                onChange={(e) => setEditData({...editData, month: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                <input
                  type="number"
                  value={editData.employeeCount}
                  onChange={(e) => setEditData({...editData, employeeCount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Salary</label>
                <input
                  type="number"
                  value={editData.totalSalary}
                  onChange={(e) => setEditData({...editData, totalSalary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({...editData, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
                <option value="sent">Sent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={editData.notes}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                rows="3"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePayroll}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Update Payroll
            </button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setSelectedPayrollForDelete(null);
          }}
          title="Confirm Delete"
          size="sm"
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-red-600 text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Payroll</h3>
              <p className="text-gray-600">
                Are you sure you want to delete this payroll? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedPayrollForDelete(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedPayrollForDelete && handleDeletePayroll(selectedPayrollForDelete)}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* Bulk Edit Modal */}
        <Modal
          show={showBulkEditModal}
          onClose={() => setShowBulkEditModal(false)}
          title="Bulk Edit Employee Salaries"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply to Department
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Adjustment (%)
                </label>
                <input
                  type="number"
                  min="-100"
                  max="100"
                  step="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="e.g., 10 for 10% increase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bonus Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  placeholder="e.g., 5000"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="text-blue-800 mr-3">ℹ️</div>
                <div className="text-sm text-blue-800">
                  This will affect {employees.length} employees. Total estimated cost: ₹0
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setShowBulkEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Changes
            </button>
          </div>
        </Modal>
      </div>
    </motion.div>
  );
};

export default AdminPayrollManagement;