import React from 'react';
import DailyMPRTable from '@/components/labor/DailyMPRTable';
import CostPerRoomTable from '@/components/labor/CostPerRoomTable';
import DailyPerformanceTable from '@/components/labor/DailyPerformanceTable';

const LaborTablesGrid = ({
  dailyMPRData,
  costPerRoomData,
  dailyPerformanceData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyMPRTable data={dailyMPRData} />
        <CostPerRoomTable data={costPerRoomData} />
      </div>
      
      <DailyPerformanceTable data={dailyPerformanceData} />
    </>
  );
};

export default LaborTablesGrid;
