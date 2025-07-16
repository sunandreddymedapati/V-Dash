// Sample data for different time periods and variance types
export const kpiDataSets = {
  daily: {
    'last-year': [
      { title: 'Rooms Sold', value: '156', variance: '+8', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$48,280', variance: '+$2,150', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$285.40', variance: '+$12.80', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$252.58', variance: '+$18.45', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '88.5%', variance: '+3.2%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '3', variance: '-2', trend: 'down', isPositive: true },
      { title: 'OoO', value: '2', variance: '0', trend: 'up', isPositive: true },
      { title: 'Comp Rooms', value: '4', variance: '+1', trend: 'up', isPositive: false }
    ],
    'budget': [
      { title: 'Rooms Sold', value: '156', variance: '+12', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$48,280', variance: '+$3,200', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$285.40', variance: '+$8.20', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$252.58', variance: '+$22.30', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '88.5%', variance: '+2.8%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '3', variance: '-1', trend: 'down', isPositive: true },
      { title: 'OoO', value: '2', variance: '+1', trend: 'up', isPositive: false },
      { title: 'Comp Rooms', value: '4', variance: '-2', trend: 'down', isPositive: true }
    ],
    'year-before': [
      { title: 'Rooms Sold', value: '156', variance: '+15', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$48,280', variance: '+$4,800', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$285.40', variance: '+$25.60', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$252.58', variance: '+$35.20', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '88.5%', variance: '+5.1%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '3', variance: '-3', trend: 'down', isPositive: true },
      { title: 'OoO', value: '2', variance: '-1', trend: 'down', isPositive: true },
      { title: 'Comp Rooms', value: '4', variance: '+2', trend: 'up', isPositive: false }
    ]
  },
  mtd: {
    'last-year': [
      { title: 'Rooms Sold', value: '4,680', variance: '+240', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$1,448,400', variance: '+$64,500', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$289.20', variance: '+$15.40', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$258.30', variance: '+$22.10', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.3%', variance: '+2.8%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '90', variance: '-30', trend: 'down', isPositive: true },
      { title: 'OoO', value: '60', variance: '+5', trend: 'up', isPositive: false },
      { title: 'Comp Rooms', value: '120', variance: '+15', trend: 'up', isPositive: false }
    ],
    'budget': [
      { title: 'Rooms Sold', value: '4,680', variance: '+360', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$1,448,400', variance: '+$96,000', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$289.20', variance: '+$12.80', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$258.30', variance: '+$28.70', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.3%', variance: '+3.5%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '90', variance: '-20', trend: 'down', isPositive: true },
      { title: 'OoO', value: '60', variance: '+10', trend: 'up', isPositive: false },
      { title: 'Comp Rooms', value: '120', variance: '-30', trend: 'down', isPositive: true }
    ],
    'year-before': [
      { title: 'Rooms Sold', value: '4,680', variance: '+450', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$1,448,400', variance: '+$144,000', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$289.20', variance: '+$35.80', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$258.30', variance: '+$42.50', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.3%', variance: '+6.2%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '90', variance: '-45', trend: 'down', isPositive: true },
      { title: 'OoO', value: '60', variance: '-15', trend: 'down', isPositive: true },
      { title: 'Comp Rooms', value: '120', variance: '+30', trend: 'up', isPositive: false }
    ]
  },
  ytd: {
    'last-year': [
      { title: 'Rooms Sold', value: '56,160', variance: '+2,880', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$17,380,800', variance: '+$774,000', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$292.80', variance: '+$18.50', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$261.40', variance: '+$26.30', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.8%', variance: '+3.1%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '1,080', variance: '-360', trend: 'down', isPositive: true },
      { title: 'OoO', value: '720', variance: '+60', trend: 'up', isPositive: false },
      { title: 'Comp Rooms', value: '1,440', variance: '+180', trend: 'up', isPositive: false }
    ],
    'budget': [
      { title: 'Rooms Sold', value: '56,160', variance: '+4,320', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$17,380,800', variance: '+$1,152,000', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$292.80', variance: '+$15.40', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$261.40', variance: '+$34.40', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.8%', variance: '+4.2%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '1,080', variance: '-240', trend: 'down', isPositive: true },
      { title: 'OoO', value: '720', variance: '+120', trend: 'up', isPositive: false },
      { title: 'Comp Rooms', value: '1,440', variance: '-360', trend: 'down', isPositive: true }
    ],
    'year-before': [
      { title: 'Rooms Sold', value: '56,160', variance: '+5,400', trend: 'up', isPositive: true },
      { title: 'Gross Revenue', value: '$17,380,800', variance: '+$1,728,000', trend: 'up', isPositive: true },
      { title: 'ADR', value: '$292.80', variance: '+$42.90', trend: 'up', isPositive: true },
      { title: 'RevPAR', value: '$261.40', variance: '+$51.00', trend: 'up', isPositive: true },
      { title: 'Occupancy %', value: '89.8%', variance: '+7.4%', trend: 'up', isPositive: true },
      { title: 'No Shows', value: '1,080', variance: '-540', trend: 'down', isPositive: true },
      { title: 'OoO', value: '720', variance: '-180', trend: 'down', isPositive: true },
      { title: 'Comp Rooms', value: '1,440', variance: '+360', trend: 'up', isPositive: false }
    ]
  }
};

export const getCurrentKPIData = (kpiTimeTab, kpiVarianceTab) => {
  return kpiDataSets[kpiTimeTab][kpiVarianceTab];
};
