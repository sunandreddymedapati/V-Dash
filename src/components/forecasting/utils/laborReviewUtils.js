/**
 * @typedef {Object} LaborReviewData
 * @property {number[]} daysInMonth
 * @property {number[]} availableRooms
 * @property {number[]} roomsOccupied
 * @property {number[]} adr
 * @property {number[]} revpar
 * @property {number[]} occupancyPercent
 * @property {number[]} roomRevenue
 * @property {number[]} meetingRoomRevenue
 * @property {number[]} otherRevenue
 * @property {number[]} totalRevenue
 * @property {number[]} grossRevenue
 * @property {number[]} departmentTotal
 * @property {number[]} divisionTotal
 */

/**
 * @typedef {Object} LaborReviewRow
 * @property {string} label
 * @property {number[]} values
 * @property {'number'|'currency'|'percentage'} type
 */

/**
 * Returns sample labor review data.
 * @returns {LaborReviewData}
 */
export const getSampleData = () => ({
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  availableRooms: [417, 417, 417, 417, 417, 417, 417, 417, 417, 417, 417, 417],
  roomsOccupied: [382, 350, 375, 390, 400, 410, 415, 405, 385, 375, 360, 370],
  adr: [109.93, 115.50, 120.25, 118.75, 125.30, 130.45, 135.60, 128.90, 122.35, 117.80, 112.25, 108.60],
  revpar: [100.70, 97.25, 108.45, 112.60, 119.80, 126.95, 132.40, 125.35, 115.90, 105.75, 95.60, 98.45],
  occupancyPercent: [91.61, 83.93, 89.93, 93.52, 95.92, 98.32, 99.52, 97.12, 92.33, 89.93, 86.33, 88.73],
  roomRevenue: [41993.04, 40425.00, 45093.75, 46312.50, 50120.00, 53484.50, 56274.00, 52204.50, 47105.75, 44175.00, 40410.00, 40182.00],
  meetingRoomRevenue: [5000, 4500, 5500, 6000, 6500, 7000, 7500, 7000, 6000, 5500, 5000, 4800],
  otherRevenue: [2500, 2200, 2800, 3000, 3200, 3500, 3800, 3500, 3000, 2750, 2500, 2400],
  totalRevenue: [49493.04, 47125.00, 53393.75, 55312.50, 59820.00, 63984.50, 67574.00, 62704.50, 56105.75, 52425.00, 47910.00, 47382.00],
  grossRevenue: [47493.04, 45125.00, 51393.75, 53312.50, 57820.00, 61984.50, 65574.00, 60704.50, 54105.75, 50425.00, 45910.00, 45382.00],
  departmentTotal: [18500, 17200, 19800, 20500, 22100, 23700, 25000, 23200, 20800, 19400, 17700, 17500],
  divisionTotal: [22000, 20500, 23500, 24400, 26300, 28200, 29700, 27600, 24700, 23100, 21100, 20800]
});

/**
 * Creates table row definitions from data.
 * @param {LaborReviewData} data
 * @returns {LaborReviewRow[]}
 */
export const createTableRows = (data) => [
  { label: 'Days in Month', values: data.daysInMonth, type: 'number' },
  { label: 'Available Rooms', values: data.availableRooms, type: 'number' },
  { label: 'Rooms Occupied', values: data.roomsOccupied, type: 'number' },
  { label: 'ADR', values: data.adr, type: 'currency' },
  { label: 'RevPAR', values: data.revpar, type: 'currency' },
  { label: 'Occupancy %', values: data.occupancyPercent, type: 'percentage' },
  { label: 'Room Revenue', values: data.roomRevenue, type: 'currency' },
  { label: 'Meeting Room Revenue', values: data.meetingRoomRevenue, type: 'currency' },
  { label: 'Other Revenue', values: data.otherRevenue, type: 'currency' },
  { label: 'Total Revenue', values: data.totalRevenue, type: 'currency' },
  { label: 'Gross Revenue', values: data.grossRevenue, type: 'currency' },
  { label: 'Department Total', values: data.departmentTotal, type: 'currency' },
  { label: 'Division Total', values: data.divisionTotal, type: 'currency' }
];
