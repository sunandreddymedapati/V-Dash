/**
 * Unified source of property names and room counts for the app.
 */

const PROPERTIES_DATA = [
  { name: "Best Western Fish Kill & Suites", rooms: 139 },
  { name: "Best Western Maple City Inn", rooms: 62 },
  { name: "Best Western Plus University Inn", rooms: 60 },
  { name: "Best Western Rochester Marketplace Inn", rooms: 94 },
  { name: "Best Western Syracuse Downtown Hotel and Suites", rooms: 68 },
  { name: "Best Western Watertown Fort Drum", rooms: 139 },
  { name: "Buffalo Marriott Niagara", rooms: 356 },
  { name: "Candlewood Suites Buffalo Amherst, an IHG Hotel", rooms: 76 },
  { name: "Candlewood Suites Horseheads - Elmira, an IHG Hotel", rooms: 83 },
  { name: "Candlewood Suites Sayre, an IHG Hotel", rooms: 95 },
  { name: "Candlewood Suites Watertown-Fort Drum, an IHG Hotel", rooms: 112 },
  { name: "Courtyard by Marriott Elmira Horseheads", rooms: 98 },
  { name: "Courtyard by Marriott Fishkill", rooms: 152 },
  { name: "Courtyard Syracuse Carrier Circle", rooms: 149 },
  { name: "DoubleTree by Hilton Buffalo - Amherst", rooms: 187 },
  { name: "DoubleTree by Hilton Poughkeepsie", rooms: 195 },
  { name: "DoubleTree by Hilton Utica", rooms: 112 },
  { name: "Embassy Suites Syracuse", rooms: 214 },
  { name: "Fairfield by Marriott Inn & Suites Rome NY", rooms: 76 },
  { name: "Fairfield by Marriott Inn & Suites Wallingford New Haven", rooms: 116 },
  { name: "Fairfield by Marriott Rochester Henrietta/University Area", rooms: 63 },
  { name: "Fairfield Inn & Suites by Marriott Albany Downtown", rooms: 75 },
  { name: "Fairfield Inn & Suites by Marriott Belle Vernon", rooms: 116 },
  { name: "Fairfield Inn & Suites by Marriott Canton NY", rooms: 80 },
  { name: "Fairfield Inn & Suites by Marriott Cortland", rooms: 81 },
  { name: "Fairfield Inn & Suites by Marriott Elmira Corning", rooms: 79 },
  { name: "Fairfield Inn & Suites by Marriott Olean", rooms: 76 },
  { name: "Fairfield Inn & Suites by Marriott Utica", rooms: 79 },
  { name: "Fairfield Inn & Suites by Marriott Watertown Thousand Islands", rooms: 103 },
  { name: "Fairfield Inn and Suites by Marriott Rochester West/Greece", rooms: 78 },
  { name: "Fairfield Inn Boston Tewksbury/Andover", rooms: 122 },
  { name: "Fairfield Inn by Marriot Binghamton", rooms: 82 },
  { name: "Fairfield Inn by Marriott Amesbury", rooms: 98 },
  { name: "Fairfield Inn Corning Riverside", rooms: 63 },
  { name: "Fairfield Inn Rochester Airport", rooms: 63 },
  { name: "Hampton Inn & Suites Albany-East Greenbush, NY", rooms: 101 },
  { name: "Hampton Inn & Suites by Hilton Syracuse Dewitt", rooms: 80 },
  { name: "Hampton Inn and Suites New Hartford/Utica", rooms: 87 },
  { name: "Hampton Inn Corning/Painted Post", rooms: 98 },
  { name: "Hampton Inn Cortland", rooms: 69 },
  { name: "Hampton Inn East Aurora", rooms: 80 },
  { name: "Hampton Inn Potsdam", rooms: 94 },
  { name: "Hampton Inn Rome", rooms: 94 },
  { name: "Hampton Inn Utica", rooms: 84 },
  { name: "Holiday Inn Auburn-Finger Lakes Region, an IHG Hotel", rooms: 165 },
  { name: "Holiday Inn Express & Suites Buffalo Downtown, an IHG Hotel", rooms: 146 },
  { name: "Holiday Inn Express & Suites Utica, an IHG Hotel", rooms: 75 },
  { name: "Holiday Inn Express Canandaigua, an IHG Hotel", rooms: 75 },
  { name: "Holiday Inn Express Hotel & Suites Buffalo-Airport, an IHG Hotel", rooms: 110 },
  { name: "Holiday Inn Express Olean, an IHG Hotel", rooms: 76 },
  { name: "Holiday Inn Express Rochester - University Area, an IHG Hotel", rooms: 105 },
  { name: "Holiday Inn Hotel & Suites Rochester - Marketplace, an IHG Hotel", rooms: 120 },
  { name: "Home2 Suites by Hilton Albany Airport", rooms: 90 },
  { name: "Home2 Suites By Hilton Amherst Buffalo", rooms: 111 },
  { name: "Home2 Suites By Hilton Oswego", rooms: 89 },
  { name: "Home2 Suites by Hilton Rochester Henrietta, NY", rooms: 89 },
  { name: "Home2 Suites By Hilton Utica, Ny", rooms: 89 },
  { name: "Homewood Suites By Hilton New Hartford Utica", rooms: 85 },
  { name: "Residence Inn Syracuse Carrier Circle", rooms: 102 },
  { name: "Spark By Hilton Rochester University Area", rooms: 89 },
  { name: "SpringHill Suites Erie", rooms: 117 },
  { name: "The Clarkson Inn", rooms: 40 },
  { name: "TownePlace Suites by Marriott Albany Downtown/Medical Center", rooms: 106 },
  { name: "TownePlace Suites by Marriott New Hartford", rooms: 95 },
  { name: "TownePlace Suites by Marriott Syracuse Clay", rooms: 105 },
  { name: "Tru By Hilton Binghamton Vestal", rooms: 87 },
  { name: "Home2 Suites By Hilton Pittsburgh Cranberry", rooms: 79 }
];

// Legacy export for backward compatibility
const PROPERTIES = PROPERTIES_DATA.map(p => p.name);

// New exports
export { PROPERTIES_DATA };
export default PROPERTIES;

// Helper function to get property with room count display
export const getPropertyWithRooms = (propertyName) => {
  const property = PROPERTIES_DATA.find(p => p.name === propertyName);
  return property ? `${property.name} (${property.rooms})` : propertyName;
};

// Helper function to get room count for a property
export const getPropertyRooms = (propertyName) => {
  const property = PROPERTIES_DATA.find(p => p.name === propertyName);
  return property ? property.rooms : 0;
};
