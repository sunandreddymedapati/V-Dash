export const generateDynamicLaborData = (roomCount) => {
  const sizeFactor = roomCount / 100;
  const baseHours = Math.round(roomCount * 3.5);

  return {
    mprData: [
      { date: '1', actual: 28.5 + (sizeFactor * 2), budgeted: 30.0 },
      { date: '2', actual: 32.1 - (sizeFactor * 1), budgeted: 30.0 },
      { date: '3', actual: 29.8 + (sizeFactor * 0.5), budgeted: 30.0 },
      { date: '4', actual: 31.2 - (sizeFactor * 0.8), budgeted: 30.0 },
      { date: '5', actual: 27.9 + (sizeFactor * 1.2), budgeted: 30.0 },
    ],
    
    monthlyHoursData: [
      { 
        month: 'Jan', 
        Housekeeping: Math.round(baseHours * 0.4), 
        FrontOffice: Math.round(baseHours * 0.25), 
        FB: Math.round(baseHours * 0.2), 
        Maintenance: Math.round(baseHours * 0.1), 
        Admin: Math.round(baseHours * 0.05) 
      },
      { 
        month: 'Feb', 
        Housekeeping: Math.round(baseHours * 0.38), 
        FrontOffice: Math.round(baseHours * 0.24), 
        FB: Math.round(baseHours * 0.19), 
        Maintenance: Math.round(baseHours * 0.09), 
        Admin: Math.round(baseHours * 0.05) 
      },
      { 
        month: 'Mar', 
        Housekeeping: Math.round(baseHours * 0.42), 
        FrontOffice: Math.round(baseHours * 0.26), 
        FB: Math.round(baseHours * 0.21), 
        Maintenance: Math.round(baseHours * 0.11), 
        Admin: Math.round(baseHours * 0.06) 
      },
    ],
    
    laborMeteringData: [
      { 
        department: 'Housekeeping', 
        hours: baseHours * 0.4, 
        cost: baseHours * 0.4 * 26, 
        revenuePercent: 8.5, 
        mpr: 28.5 + (sizeFactor * 2), 
        costPerRoom: (baseHours * 0.4 * 26) / roomCount 
      },
      { 
        department: 'Front Office', 
        hours: baseHours * 0.25, 
        cost: baseHours * 0.25 * 30, 
        revenuePercent: 6.5, 
        mpr: 0, 
        costPerRoom: (baseHours * 0.25 * 30) / roomCount 
      },
      { 
        department: 'Food & Beverage', 
        hours: baseHours * 0.2, 
        cost: baseHours * 0.2 * 30, 
        revenuePercent: 4.9, 
        mpr: 0, 
        costPerRoom: (baseHours * 0.2 * 30) / roomCount 
      },
      { 
        department: 'Maintenance', 
        hours: baseHours * 0.1, 
        cost: baseHours * 0.1 * 35, 
        revenuePercent: 3.8, 
        mpr: 0, 
        costPerRoom: (baseHours * 0.1 * 35) / roomCount 
      },
    ],
    
    dailyMPRData: [
      { date: '2024-01-01', mpr: 28.5 + (sizeFactor * 2) },
      { date: '2024-01-02', mpr: 32.1 - (sizeFactor * 1) },
      { date: '2024-01-03', mpr: 29.8 + (sizeFactor * 0.5) },
      { date: '2024-01-04', mpr: 31.2 - (sizeFactor * 0.8) },
      { date: '2024-01-05', mpr: 27.9 + (sizeFactor * 1.2) },
    ],
    
    costPerRoomData: [
      { date: '2024-01-01', actual: 85 + (sizeFactor * 5), budgeted: 85.00 },
      { date: '2024-01-02', actual: 88 + (sizeFactor * 4), budgeted: 85.00 },
      { date: '2024-01-03', actual: 82 + (sizeFactor * 6), budgeted: 85.00 },
      { date: '2024-01-04', actual: 87 + (sizeFactor * 4.5), budgeted: 85.00 },
      { date: '2024-01-05', actual: 84 + (sizeFactor * 5.5), budgeted: 85.00 },
    ],
    
    dailyPerformanceData: [
      { 
        department: 'Housekeeping', 
        '05/23': 8.5 * sizeFactor, 
        '05/24': 9.2 * sizeFactor, 
        '05/25': 7.8 * sizeFactor, 
        '05/26': 8.9 * sizeFactor, 
        '05/27': 8.1 * sizeFactor, 
        '05/28': 9.5 * sizeFactor, 
        '05/29': 8.7 * sizeFactor 
      },
      { 
        department: 'Front Office', 
        '05/23': 5.5 * sizeFactor, 
        '05/24': 6.0 * sizeFactor, 
        '05/25': 5.2 * sizeFactor, 
        '05/26': 5.8 * sizeFactor, 
        '05/27': 5.4 * sizeFactor, 
        '05/28': 6.2 * sizeFactor, 
        '05/29': 5.9 * sizeFactor 
      },
      { 
        department: 'Food & Beverage', 
        '05/23': 4.2 * sizeFactor, 
        '05/24': 4.8 * sizeFactor, 
        '05/25': 3.9 * sizeFactor, 
        '05/26': 4.5 * sizeFactor, 
        '05/27': 4.1 * sizeFactor, 
        '05/28': 4.9 * sizeFactor, 
        '05/29': 4.6 * sizeFactor 
      },
      { 
        department: 'Maintenance', 
        '05/23': 2.5 * sizeFactor, 
        '05/24': 3.0 * sizeFactor, 
        '05/25': 2.2 * sizeFactor, 
        '05/26': 2.8 * sizeFactor, 
        '05/27': 2.4 * sizeFactor, 
        '05/28': 3.2 * sizeFactor, 
        '05/29': 2.9 * sizeFactor 
      },
    ]
  };
};
