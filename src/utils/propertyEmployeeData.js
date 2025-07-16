// Property-specific employee data generator
export const generatePropertyEmployeeData = (hotelName) => {
  // Define different employee sets for different properties
  const employeeDataSets = {
    "Best Western Fish Kill & Suites": [
      'Soto,Cristian B',
      'Zavala Changra,Ninfa M',
      'Shabanlian,Enjel',
      'Young,Grace Olivia',
      'Sanchez Alvarez,Lina Maria',
      'Ramirez Ortiz,Yanet',
      'Portilla Flores,Guillermo C',
      'Martinez,Miguel',
      'Lopez Salazar,Evelyn De Maria',
      'Gjokaj,Drita',
      'Fajardo Lalvay,Irma Fabiola Fab',
      'Escoto,Cesar',
      'Arias,Jalyn',
      'Quituisaca-Uyaguari,Jessica Beat',
      'Mendoza,Henry H',
      'Hickman,Darla',
      'Guerra Duarte,Maria L',
      'Genis,Brandon C',
      'Espinoza Boconzaca,Ana G',
      'Chambers,Dickie Khalil',
    ],
    "Hampton Inn & Suites Newark": [
      'Anderson,Sarah M',
      'Thompson,Michael J',
      'Rodriguez,Carmen L',
      'Williams,James R',
      'Davis,Maria Elena',
      'Johnson,Robert K',
      'Wilson,Jennifer A',
      'Brown,David C',
      'Garcia,Patricia',
      'Miller,Christopher',
      'Moore,Lisa Marie',
      'Taylor,Kevin P',
      'Jackson,Amanda S',
      'White,Daniel E',
      'Harris,Rachel N',
    ],
    "Holiday Inn Express Boston": [
      'Chen,Wei Lin',
      "O'Connor,Patrick",
      'Kumar,Priya S',
      'Nguyen,Linh T',
      'Patel,Raj K',
      'Smith,Catherine E',
      'Lee,Jung Ho',
      'Martin,Ashley',
      'Clark,Brian T',
      'Lewis,Michelle',
      'Walker,Andrew',
      'Hall,Stephanie',
      'Young,Brian M',
      'King,Diana',
      'Wright,Thomas',
    ]
  };

  // Return property-specific employees or default set if property not found
  return employeeDataSets[hotelName] || employeeDataSets["Best Western Fish Kill & Suites"];
};
