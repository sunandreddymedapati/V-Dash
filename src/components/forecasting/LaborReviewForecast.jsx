import React, { useState } from 'react';
import LaborReviewHeader from './components/LaborReviewHeader';
import LaborReviewTable from './components/LaborReviewTable';
import { getSampleData, createTableRows } from './utils/laborReviewUtils';

const LaborReviewForecast = ({ data }) => {
  const [selectedHotel, setSelectedHotel] = useState('hotel1');
  const [selectedYear, setSelectedYear] = useState('2025');

  const sampleData = getSampleData();
  const rows = createTableRows(sampleData);

  return (
    <div className="space-y-6">
      <LaborReviewHeader
        selectedHotel={selectedHotel}
        setSelectedHotel={setSelectedHotel}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      
      <LaborReviewTable 
        rows={rows} 
        data={sampleData} 
      />
    </div>
  );
};

export default LaborReviewForecast;
