import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { HotelYearSelection } from '../utils/SelectionControls';

const LaborReviewHeader = ({
  selectedHotel,
  setSelectedHotel,
  selectedYear,
  setSelectedYear
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Labor Review – Monthly Forecast
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monthly breakdown of revenue, occupancy, and labor alignment
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <HotelYearSelection
              selectedHotel={selectedHotel}
              setSelectedHotel={setSelectedHotel}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaborReviewHeader;
