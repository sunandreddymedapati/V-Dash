import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LaborForecastDailyTable from './components/LaborForecastDailyTable';

const LaborForecastStep = ({ selectedMonthYear, selectedHotel }) => {
  return (
    <div className="space-y-6">
      <LaborForecastDailyTable 
        selectedMonthYear={selectedMonthYear} 
        selectedHotel={selectedHotel}
      />
    </div>
  );
};

export default LaborForecastStep;
