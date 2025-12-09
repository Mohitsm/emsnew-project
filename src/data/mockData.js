// src/data/mockData.js
import { faker } from '@faker-js/faker';

export const users = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: i === 0 ? 'superadmin' : i < 3 ? 'admin' : 'employee',
  department: faker.commerce.department(),
  status: i < 8 ? 'active' : 'inactive',
  avatar: faker.person.firstName().charAt(0) + faker.person.lastName().charAt(0),
  lastLogin: faker.date.recent().toISOString(),
  createdAt: faker.date.past().toISOString()
}));

export const employees = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  employeeId: `EMP${String(i + 1).padStart(4, '0')}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  department: faker.commerce.department(),
  position: faker.person.jobTitle(),
  salary: faker.number.int({ min: 25000, max: 150000 }),
  status: i < 45 ? 'active' : 'inactive',
  joiningDate: faker.date.past({ years: 5 }).toISOString(),
  avatar: faker.image.avatar()
}));

export const attendanceRecords = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  employeeId: `EMP${String(Math.floor(Math.random() * 50) + 1).padStart(4, '0')}`,
  employeeName: faker.person.fullName(),
  date: faker.date.recent({ days: 30 }).toISOString(),
  checkIn: '09:00 AM',
  checkOut: '06:00 PM',
  status: Math.random() > 0.2 ? 'present' : 'absent',
  overtime: Math.random() > 0.7 ? faker.number.int({ min: 1, max: 4 }) : 0
}));

export const leaveApplications = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  employeeId: `EMP${String(Math.floor(Math.random() * 50) + 1).padStart(4, '0')}`,
  employeeName: faker.person.fullName(),
  type: ['Casual', 'Sick', 'Earned'][Math.floor(Math.random() * 3)],
  startDate: faker.date.future({ days: 30 }).toISOString(),
  endDate: faker.date.future({ days: 35 }).toISOString(),
  reason: faker.lorem.sentence(),
  status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
  appliedOn: faker.date.recent().toISOString()
}));

export const payrollRecords = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  employeeId: `EMP${String(i + 1).padStart(4, '0')}`,
  employeeName: faker.person.fullName(),
  month: faker.date.month(),
  basicSalary: faker.number.int({ min: 25000, max: 80000 }),
  allowances: faker.number.int({ min: 5000, max: 20000 }),
  deductions: faker.number.int({ min: 1000, max: 5000 }),
  netSalary: faker.number.int({ min: 30000, max: 95000 }),
  status: 'paid',
  paymentDate: faker.date.recent().toISOString()
}));

export const systemLogs = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  user: faker.person.fullName(),
  action: ['Login', 'User Created', 'Settings Updated', 'Report Generated'][Math.floor(Math.random() * 4)],
  details: faker.lorem.sentence(),
  ipAddress: faker.internet.ip(),
  timestamp: faker.date.recent().toISOString()
}));