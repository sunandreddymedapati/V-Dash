/**
 * @typedef {Object} KPIItem
 * @property {number} occupiedRooms
 * @property {number} occupancyPercent
 * @property {number} adr
 * @property {number} revpar
 * @property {number} roomRevenue
 */

/**
 * @typedef {Object} KPIData
 * @property {KPIItem} forecast
 * @property {KPIItem} actualOTB
 * @property {KPIItem} budget
 * @property {KPIItem} projectedEOM
 * @property {KPIItem} actualBudget
 */

/**
 * @typedef {Object} DailyForecastItem
 * @property {string} date
 * @property {string} dayOfWeek
 * @property {{ occ: number, adr: number, revenue: number }} actualOTB
 * @property {{ occ: number, adr: number, revenue: number }} sevenDayPickup
 * @property {{ occ: number, adr: number, revenue: number }} transientForecast
 * @property {{ occ: number, adr: number, revenue: number }} groupForecast
 * @property {{ occ: number, adr: number, revenue: number }} totalForecast
 * @property {{ occ: number, adr: number, revenue: number }} budget
 * @property {{ occ: number, adr: number, revenue: number }} lastYear
 */

/**
 * Format a number as currency.
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value) => 
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Format a number as percentage.
 * @param {number} value
 * @returns {string}
 */
export const formatPercentage = (value) => `${value.toFixed(2)}%`;

/**
 * Format a number with commas.
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => value.toLocaleString('en-US');

/**
 * Calculate variance between actual and comparison values.
 * @param {number} actual
 * @param {number} comparison
 * @returns {{ difference: number, percentChange: number }}
 */
export const calculateVariance = (actual, comparison) => {
  const difference = actual - comparison;
  const percentChange = comparison !== 0 ? (difference / comparison) * 100 : 0;
  return { difference, percentChange };
};

/**
 * Generate KPI data for a hotel.
 * @param {string} [selectedHotel]
 * @returns {KPIData}
 */
export const generateKPIData = (selectedHotel) => {
  console.log('generateKPIData called with selectedHotel:', selectedHotel);
  
  const hotelMultiplier = selectedHotel ? selectedHotel.length * 0.1 : 1;
  const baseMultiplier = 1 + (hotelMultiplier * 0.2);
  
  console.log('Using multiplier:', baseMultiplier, 'for hotel:', selectedHotel);
  
  return {
    forecast: {
      occupiedRooms: Math.round(380 * baseMultiplier),
      occupancyPercent: 91.1 + (hotelMultiplier * 2),
      adr: 145.50 * baseMultiplier,
      revpar: 132.5 * baseMultiplier,
      roomRevenue: Math.round(55290 * baseMultiplier)
    },
    actualOTB: {
      occupiedRooms: Math.round(382 * baseMultiplier),
      occupancyPercent: 91.6 + (hotelMultiplier * 1.5),
      adr: 109.93 * baseMultiplier,
      revpar: 100.7 * baseMultiplier,
      roomRevenue: Math.round(41993 * baseMultiplier)
    },
    budget: {
      occupiedRooms: Math.round(396 * baseMultiplier),
      occupancyPercent: 95.0 + (hotelMultiplier * 1.2),
      adr: 130.00 * baseMultiplier,
      revpar: 123.5 * baseMultiplier,
      roomRevenue: Math.round(51480 * baseMultiplier)
    },
    projectedEOM: {
      occupiedRooms: Math.round(385 * baseMultiplier),
      occupancyPercent: 92.3 + (hotelMultiplier * 1.8),
      adr: 142.75 * baseMultiplier,
      revpar: 131.8 * baseMultiplier,
      roomRevenue: Math.round(54959 * baseMultiplier)
    },
    actualBudget: {
      occupiedRooms: Math.round(375 * baseMultiplier),
      occupancyPercent: 89.9 + (hotelMultiplier * 1.3),
      adr: 138.25 * baseMultiplier,
      revpar: 124.3 * baseMultiplier,
      roomRevenue: Math.round(51844 * baseMultiplier)
    }
  };
};

/**
 * Generate daily forecast data.
 * @returns {DailyForecastItem[]}
 */
export const generateDailyData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    
    const baseOcc = 85 + Math.random() * 20;
    const baseAdr = 120 + Math.random() * 40;
    const baseRevenue = baseOcc * baseAdr * 4.17;
    
    return {
      date: dateStr,
      dayOfWeek,
      actualOTB: i === 0 
        ? { occ: 91.61, adr: 109.93, revenue: 41993.04 } 
        : { occ: 0, adr: 0, revenue: 0 },
      sevenDayPickup: {
        occ: Math.random() * 5,
        adr: Math.random() * 10,
        revenue: Math.random() * 5000
      },
      transientForecast: {
        occ: baseOcc * 0.7,
        adr: baseAdr * 0.95,
        revenue: baseRevenue * 0.7
      },
      groupForecast: {
        occ: baseOcc * 0.3,
        adr: baseAdr * 1.05,
        revenue: baseRevenue * 0.3
      },
      totalForecast: {
        occ: baseOcc,
        adr: baseAdr,
        revenue: baseRevenue
      },
      budget: {
        occ: 95,
        adr: 130,
        revenue: 95 * 130 * 4.17
      },
      lastYear: {
        occ: baseOcc * 0.9,
        adr: baseAdr * 0.85,
        revenue: baseRevenue * 0.8
      }
    };
  });
};
