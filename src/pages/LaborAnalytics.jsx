import React, { useState } from 'react';
import { getPropertyRooms } from '@/constants/properties';
import LaborAnalyticsHeader from '@/components/labor/LaborAnalyticsHeader';
import LaborMeteringTable from '@/components/labor/LaborMeteringTable';
import LaborChartsGrid from '@/components/labor/LaborChartsGrid';
import { generateDynamicLaborData } from '@/utils/laborAnalyticsData';
import LaborHoursComponent from '@/components/labor/LaborHoursComponent';
import DailyPerformanceHoursComponent from '@/components/labor/DailyPerformanceHoursComponent';

const LaborAnalytics = ({ selectedHotel }) => {
  // Default to current date
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Use the selectedHotel prop, with fallback
  const hotelName = selectedHotel || "Best Western Fish Kill & Suites";
  const roomCount = getPropertyRooms(hotelName);
  
  // State for LaborMeteringTable
  const [selectedTab, setSelectedTab] = useState('Daily');

  // Generate dynamic data based on hotel size
  const dynamicData = generateDynamicLaborData(roomCount);

  return (
    <div className="space-y-6 max-w-none">
      <LaborAnalyticsHeader 
        hotelName={hotelName}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <LaborMeteringTable 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        laborMeteringData={dynamicData.laborMeteringData}
      />
      
      <LaborHoursComponent selectedHotel={hotelName} />
      
      <DailyPerformanceHoursComponent 
        selectedHotel={hotelName} 
        selectedDate={selectedDate}
      />
      
      <LaborChartsGrid 
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default LaborAnalytics;
