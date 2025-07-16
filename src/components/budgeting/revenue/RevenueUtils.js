import { MONTHS, REVENUE_CATEGORIES } from './RevenueConstants';

export const calculateRowTotal = (categoryId, revenueData) => {
  return MONTHS.reduce((sum, month) => sum + (revenueData[categoryId]?.[month] || 0), 0);
};

export const calculateCategoryTotal = (type, revenueData) => {
  return REVENUE_CATEGORIES
    .filter(cat => cat.type === type)
    .reduce((sum, cat) => sum + calculateRowTotal(cat.id, revenueData), 0);
};

export const calculateOccupancyTotal = (revenueData) => {
  const totalOccupancy = MONTHS.reduce((sum, month) => sum + (revenueData['occupancy']?.[month] || 0), 0);
  return totalOccupancy / MONTHS.length; // Average occupancy
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};
