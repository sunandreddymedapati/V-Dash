const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const REVENUE_CATEGORIES = [
  { id: 'discounted', label: 'Discounted', type: 'room' },
  { id: 'government', label: 'Government', type: 'room' },
  { id: 'group', label: 'Group', type: 'room' },
  { id: 'negotiated', label: 'Negotiated', type: 'room' },
  { id: 'package', label: 'Package', type: 'room' },
  { id: 'transient', label: 'Transient', type: 'room' },
  { id: 'online', label: 'Online', type: 'room' },
  { id: 'contract', label: 'Contract', type: 'room' },
  { id: 'pet-fees', label: 'Pet Fees', type: 'other' },
  { id: 'parking', label: 'Parking Fees', type: 'other' },
  { id: 'sundries', label: 'Sundries', type: 'other' },
  { id: 'meeting-room', label: 'Meeting Room', type: 'other' },
  { id: 'misc-revenue', label: 'Misc Revenue', type: 'other' },
  { id: 'beverages', label: 'Beverages', type: 'fb' },
  { id: 'breakfast', label: 'Breakfast', type: 'fb' },
  { id: 'lunch', label: 'Lunch', type: 'fb' },
  { id: 'dinner', label: 'Dinner', type: 'fb' },
  { id: 'room-service', label: 'Room Service', type: 'fb' }
];

export { MONTHS, REVENUE_CATEGORIES };
