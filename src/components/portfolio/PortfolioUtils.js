export const formatCurrency = (amount) => {
  const rounded = Number(amount.toFixed(2));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
};

export const generateDateColumns = () => {
  const dates = [];
  for (let i = 15; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push({
      label: `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`,
      value: date.toISOString().split('T')[0]
    });
  }
  return dates;
};

export const generateMockHotelData = () => [
  {
    name: 'Grand Plaza Hotel',
    roomsOccupied: 250,
    roomRevenue: 45000,
    fnbRevenue: 12000,
    otherRevenue: 3500,
    grossRevenue: 60500,
    occupancy: 85.2,
    adr: 180,
    revpar: 153.36,
    noShow: 5,
    ooo: 2,
    compRooms: 8
  },
  {
    name: 'Metropolitan Suites',
    roomsOccupied: 180,
    roomRevenue: 32400,
    fnbRevenue: 8500,
    otherRevenue: 2100,
    grossRevenue: 43000,
    occupancy: 78.3,
    adr: 180,
    revpar: 140.94,
    noShow: 3,
    ooo: 1,
    compRooms: 5
  },
  {
    name: 'Oceanview Resort',
    roomsOccupied: 320,
    roomRevenue: 67200,
    fnbRevenue: 18900,
    otherRevenue: 5600,
    grossRevenue: 91700,
    occupancy: 91.4,
    adr: 210,
    revpar: 191.94,
    noShow: 8,
    ooo: 3,
    compRooms: 12
  }
];

export const generateRevenueData = (hotelData, dateColumns) => {
  return hotelData.map(hotel => {
    const dailyRevenues = dateColumns.map(() =>
      Number((Math.random() * 20000 + 40000).toFixed(2))
    );
    const total = Number(dailyRevenues.reduce((sum, rev) => sum + rev, 0).toFixed(2));
    return {
      hotelName: hotel.name,
      dailyRevenues,
      total,
    };
  });
};

export const calculatePortfolioTotals = (hotelData) => ({
  roomsOccupied: hotelData.reduce((sum, hotel) => sum + hotel.roomsOccupied, 0),
  roomRevenue: hotelData.reduce((sum, hotel) => sum + hotel.roomRevenue, 0),
  fnbRevenue: hotelData.reduce((sum, hotel) => sum + hotel.fnbRevenue, 0),
  otherRevenue: hotelData.reduce((sum, hotel) => sum + hotel.otherRevenue, 0),
  grossRevenue: hotelData.reduce((sum, hotel) => sum + hotel.grossRevenue, 0),
  occupancy: hotelData.reduce((sum, hotel) => sum + hotel.occupancy, 0) / hotelData.length,
  adr: hotelData.reduce((sum, hotel) => sum + hotel.adr, 0) / hotelData.length,
  revpar: hotelData.reduce((sum, hotel) => sum + hotel.revpar, 0) / hotelData.length,
  noShow: hotelData.reduce((sum, hotel) => sum + hotel.noShow, 0),
  ooo: hotelData.reduce((sum, hotel) => sum + hotel.ooo, 0),
  compRooms: hotelData.reduce((sum, hotel) => sum + hotel.compRooms, 0)
});
