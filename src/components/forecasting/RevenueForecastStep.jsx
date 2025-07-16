import React from 'react';
import RevenueForecast from './RevenueForecast';
import { generateKPIData } from './utils/revenueForecastUtils';

const RevenueForecastStep = ({ selectedMonthYear, selectedHotel }) => {
  console.log('RevenueForecastStep - selectedHotel:', selectedHotel);
  
  // Generate property-specific KPI data
  const kpiData = generateKPIData(selectedHotel);
  
  return (
    <RevenueForecast 
      kpiData={kpiData}
      selectedMonthYear={selectedMonthYear}
      selectedHotel={selectedHotel}
    />
  );
};

export default RevenueForecastStep;
