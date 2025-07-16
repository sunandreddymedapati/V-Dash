/**
 * @typedef {Object} MetricsData
 * @property {number} occupiedRooms
 * @property {number} occupancyPercent
 * @property {number} adr
 * @property {number} revpar
 * @property {number} roomRevenue
 */

/**
 * @typedef {Object} KPIData
 * @property {MetricsData} forecast
 * @property {MetricsData} actualOTB
 * @property {MetricsData} budget
 * @property {MetricsData} projectedEOM
 * @property {MetricsData} actualBudget
 */

/**
 * @typedef {Object} ComparisonData
 * @property {MetricsData} actual
 * @property {MetricsData} forecast
 * @property {MetricsData} budget
 * @property {MetricsData} projectedEOM
 */

/**
 * @typedef {Object} DailyForecastData
 * @property {string} date
 * @property {string} dayOfWeek
 * @property {{ occ: number, adr: number, revenue: number }} actualOTB
 * @property {{ occ: number, adr: number, revenue: number }} sevenDayPickup
 * @property {{ occ: number, adr: number, revenue: number }} transientForecast
 * @property {{ occ: number, adr: number, revenue: number }} groupForecast
 * @property {{ occ: number, occupancy: number, adr: number, revenue: number }} totalForecast
 * @property {{ occ: number, occupancy: number, adr: number, revenue: number }} mtd
 * @property {{ occ: number, occupancy: number, adr: number, revenue: number }} ytd
 * @property {{ occ: number, occupancy: number, adr: number, revenue: number }} projectedEOM
 */

/**
 * @typedef {Object} RevenueForecastProps
 * @property {KPIData} [kpiData]
 * @property {ComparisonData} [comparisonData]
 * @property {DailyForecastData[]} [dailyForecastData]
 * @property {boolean} [loading]
 */
