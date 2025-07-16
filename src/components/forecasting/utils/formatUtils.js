/**
 * Format a number as USD currency with 2 decimal places.
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => {
  return `$${value.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Format a number as USD currency with no decimal places.
 * @param {number} value
 * @returns {string}
 */
export const formatCurrencyWhole = (value) => {
  return `$${value.toLocaleString('en-US', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  })}`;
};

/**
 * Format a number as a percentage with 2 decimal places.
 * @param {number} value
 * @returns {string}
 */
export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

/**
 * Format a number as a percentage with 1 decimal place.
 * @param {number} value
 * @returns {string}
 */
export const formatPercentageOne = (value) => {
  return `${value.toFixed(1)}%`;
};

/**
 * Format a number with locale-aware thousands separators.
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => {
  return value.toLocaleString('en-US');
};

/**
 * Format a value based on type.
 * @param {number} value
 * @param {string} type
 * @returns {string}
 */
export const formatValue = (value, type) => {
  switch (type) {
    case 'currency':
      return formatCurrencyWhole(value);
    case 'percentage':
      return formatPercentageOne(value);
    default:
      return formatNumber(value);
  }
};
