export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

export const calculateTotal = (values) => {
  return values.reduce((sum, val) => sum + val, 0);
};

export const calculateAverage = (values) => {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};
