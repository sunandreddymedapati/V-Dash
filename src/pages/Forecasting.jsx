import React, { useState } from 'react';
import { Building2, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPropertyWithRooms } from '@/constants/properties';
import MonthYearPicker from '@/components/MonthYearPicker';
import ForecastingWizard from '@/components/forecasting/ForecastingWizard';

const Forecasting = ({ selectedHotel }) => {
  // Default to current month/year
  const currentDate = new Date();
  const [selectedMonthYear, setSelectedMonthYear] = useState({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  });
  
  // Use the selectedHotel prop, with fallback
  const hotelName = selectedHotel || "Best Western Fish Kill & Suites";

  console.log('Forecasting page - selectedHotel prop:', selectedHotel);
  console.log('Forecasting page - using hotelName:', hotelName);

  const handleUpload = () => {
    console.log('Upload clicked');
    // Add upload functionality here
  };

  const handleDownload = () => {
    console.log('Download clicked');
    // Add download functionality here
  };

  return (
    <div className="space-y-6">
      {/* Header with Hotel Name and Month/Year Picker - matching Budgeting page */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {getPropertyWithRooms(hotelName)}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <MonthYearPicker
            value={selectedMonthYear}
            onChange={setSelectedMonthYear}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpload}
            className="flex items-center gap-1"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Forecasting Wizard */}
      <ForecastingWizard 
        selectedMonthYear={selectedMonthYear} 
        selectedHotel={hotelName}
      />
    </div>
  );
};

export default Forecasting;
