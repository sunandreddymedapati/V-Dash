/**
 * Calculate the sum of an array of numbers.
 * @param {number[]} values
 * @returns {number}
 */
export const calculateTotal = (values) => {
  return values.reduce((sum, val) => sum + val, 0);
};

/**
 * Calculate the average of an array of numbers.
 * @param {number[]} values
 * @returns {number}
 */
export const calculateAverage = (values) => {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

/**
 * Calculate % of revenue.
 * @param {number} value
 * @param {number} revenue
 * @returns {number}
 */
export const calculatePercentOfRevenue = (value, revenue) => {
  return (value / revenue) * 100;
};

/**
 * Calculate cost per occupied room.
 * @param {number} cost
 * @param {number} roomsOccupied
 * @returns {number}
 */
export const calculateCostPerRoom = (cost, roomsOccupied) => {
  return cost / roomsOccupied;
};

/**
 * Calculate variance as a percentage difference.
 * @param {number} actual
 * @param {number} comparison
 * @returns {number}
 */
export const calculateVariance = (actual, comparison) => {
  const variance = ((actual - comparison) / comparison) * 100;
  return Math.round(variance * 100) / 100;
};

/**
 * Calculate gross margin as a percentage.
 * @param {number} grossRevenue
 * @param {number} totalRevenue
 * @returns {number}
 */
export const calculateGrossMargin = (grossRevenue, totalRevenue) => {
  return (grossRevenue / totalRevenue) * 100;
};
