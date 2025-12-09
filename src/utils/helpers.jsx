// src/utils/helpers.js
import { format, parseISO, isValid, differenceInDays } from 'date-fns';

export const formatDate = (date, formatString = 'dd MMM yyyy') => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, formatString) : 'Invalid Date';
};

export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount?.toLocaleString('en-IN') || '0'}`;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const generateId = (prefix = 'ID') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const calculateLeaveDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};