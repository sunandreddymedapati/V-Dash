/**
 * @typedef {{ occ: number, adr: number, revenue: number }} ForecastTriple
 * @typedef {{ occ: number, occupancy: number, adr: number, revenue: number }} ForecastQuad
 */

/**
 * @typedef {Object} DailyForecastData
 * @property {ForecastTriple} actualOTB
 * @property {{ adr: number, revenue: number }} sevenDayPickup
 * @property {ForecastTriple} transientForecast
 * @property {ForecastTriple} groupForecast
 * @property {ForecastQuad} totalForecast
 * @property {ForecastQuad} mtd
 * @property {ForecastQuad} ytd
 * @property {ForecastQuad} projectedEOM
 */

/**
 * @typedef {Object} DailyRowData
 * @property {string} date
 * @property {string} day
 * @property {{ occ: number|null, adr: number|null, revenue: number|null }} actualOTB
 * @property {{ adr: number|null, revenue: number|null }} sevenDayPickup
 * @property {{ occ: number|null, adr: number|null, revenue: number|null }} transientForecast
 * @property {{ occ: number|null, adr: number|null, revenue: number|null }} groupForecast
 * @property {{ occ: number|null, occupancy: number|null, adr: number|null, revenue: number|null }} totalForecast
 * @property {{ occ: number|null, occupancy: number|null, adr: number|null, revenue: number|null }} mtd
 * @property {{ occ: number|null, occupancy: number|null, adr: number|null, revenue: number|null }} ytd
 * @property {{ occ: number|null, occupancy: number|null, adr: number|null, revenue: number|null }} projectedEOM
 */

export const generateDummyData = (day, monthYear) => {
  const dateObj = new Date(monthYear.year, monthYear.month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj > today) {
    return null;
  }

  const baseOcc = 120 + Math.floor(Math.random() * 30);
  const baseAdr = 115 + Math.floor(Math.random() * 25);
  const baseRevenue = baseOcc * baseAdr;
  
  const mtdOcc = baseOcc * day;
  const mtdRevenue = baseRevenue * day;
  const mtdAdr = mtdRevenue / mtdOcc;
  const mtdOccupancy = 85 + Math.random() * 10;
  
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(monthYear.year, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const ytdOcc = 15000 + (dayOfYear * 100);
  const ytdRevenue = ytdOcc * (105 + Math.random() * 10);
  const ytdAdr = ytdRevenue / ytdOcc;
  const ytdOccupancy = 80 + Math.random() * 8;

  return {
    actualOTB: { occ: baseOcc, adr: baseAdr, revenue: baseRevenue },
    sevenDayPickup: { adr: 130.58, revenue: 18150.62 },
    transientForecast: {
      occ: Math.floor(baseOcc * 0.6),
      adr: baseAdr * 0.95,
      revenue: baseRevenue * 0.6
    },
    groupForecast: {
      occ: Math.floor(baseOcc * 0.4),
      adr: baseAdr * 1.05,
      revenue: baseRevenue * 0.4
    },
    totalForecast: {
      occ: baseOcc,
      occupancy: 95 + Math.random() * 5,
      adr: baseAdr,
      revenue: baseRevenue
    },
    mtd: {
      occ: mtdOcc,
      occupancy: mtdOccupancy,
      adr: mtdAdr,
      revenue: mtdRevenue
    },
    ytd: {
      occ: ytdOcc,
      occupancy: ytdOccupancy,
      adr: ytdAdr,
      revenue: ytdRevenue
    },
    projectedEOM: {
      occ: 4000 + Math.floor(Math.random() * 200),
      occupancy: 96 + Math.random() * 3,
      adr: 120 + Math.random() * 15,
      revenue: 500000 + Math.random() * 50000
    }
  };
};

export const generateAllDaysOfMonth = (monthYear, selectedHotel) => {
  const { month, year } = monthYear;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const data = [];

  const getPropertyMultipliers = (hotelName) => {
    const multipliers = {
      "Best Western Fish Kill & Suites": { adr: 1.2, occupancy: 1.1, rooms: 139 },
      "Best Western Maple City Inn": { adr: 0.9, occupancy: 0.95, rooms: 62 },
      "Buffalo Marriott Niagara": { adr: 1.8, occupancy: 1.3, rooms: 356 },
      "DoubleTree by Hilton Buffalo - Amherst": { adr: 1.5, occupancy: 1.2, rooms: 187 },
      "Embassy Suites Syracuse": { adr: 1.6, occupancy: 1.25, rooms: 214 },
    };
    
    return multipliers[hotelName || ""] || { adr: 1.0, occupancy: 1.0, rooms: 100 };
  };

  const propertyMultipliers = getPropertyMultipliers(selectedHotel);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isPastOrToday = date <= currentDate;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateString = `${monthNames[month]} ${String(day).padStart(2, '0')}`;

    const generateValue = (baseValue, variance = 0.1) => {
      return baseValue * (1 + (Math.random() - 0.5) * variance);
    };

    const baseADR = 180 * propertyMultipliers.adr;
    const baseOccupancy = 75 * propertyMultipliers.occupancy;

    const actualOcc = isPastOrToday
      ? Math.round(generateValue(Math.min(baseOccupancy, 95)))
      : Math.round(generateValue(Math.min(baseOccupancy * 0.85, 90)));
    const actualADR = isPastOrToday
      ? generateValue(baseADR)
      : generateValue(baseADR * 1.1);
    const actualRevenue = actualOcc * actualADR;

    data.push({
      date: dateString,
      day: dayNames[date.getDay()],
      actualOTB: {
        occ: actualOcc,
        adr: actualADR,
        revenue: actualRevenue
      },
      sevenDayPickup: {
        adr: generateValue(baseADR * 0.95),
        revenue: generateValue(actualRevenue * 0.1)
      },
      transientForecast: {
        occ: Math.round(generateValue(actualOcc * 0.7)),
        adr: generateValue(baseADR * 1.05),
        revenue: generateValue(actualRevenue * 0.7)
      },
      groupForecast: {
        occ: Math.round(generateValue(actualOcc * 0.3)),
        adr: generateValue(baseADR * 0.9),
        revenue: generateValue(actualRevenue * 0.3)
      },
      totalForecast: {
        occ: actualOcc,
        occupancy: (actualOcc / propertyMultipliers.rooms) * 100,
        adr: actualADR,
        revenue: actualRevenue
      },
      mtd: {
        occ: isPastOrToday ? Math.round(generateValue(actualOcc * day * 0.95)) : null,
        occupancy: isPastOrToday
          ? ((actualOcc * day * 0.95) / (propertyMultipliers.rooms * day)) * 100
          : null,
        adr: isPastOrToday ? generateValue(baseADR * 1.02) : null,
        revenue: isPastOrToday ? generateValue(actualRevenue * day * 0.95) : null
      },
      ytd: {
        occ: isPastOrToday ? actualOcc * (month + 1) * 30 : null,
        occupancy: isPastOrToday
          ? ((actualOcc * (month + 1) * 30) / (propertyMultipliers.rooms * (month + 1) * 30)) * 100
          : null,
        adr: isPastOrToday ? generateValue(baseADR * 1.01) : null,
        revenue: isPastOrToday ? actualRevenue * (month + 1) * 30 : null
      },
      projectedEOM: {
        occ: actualOcc * daysInMonth,
        occupancy: ((actualOcc * daysInMonth) / (propertyMultipliers.rooms * daysInMonth)) * 100,
        adr: generateValue(baseADR * 1.03),
        revenue: actualRevenue * daysInMonth
      }
    });
  }

  return data;
};
