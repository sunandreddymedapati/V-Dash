import React from 'react';
import { Info } from 'lucide-react';

const LaborPageHeader = ({
  hotelName,
  propertyCode,
  currentDate,
  errorRecords
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Labor ({hotelName} – {propertyCode})
          </h1>
          <p className="text-sm text-gray-600 mb-1">Date: {currentDate}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-amber-600">
              Time Clock Issues – {errorRecords} error records. Error records are not counted.
            </p>
            <div
              className="cursor-help"
              title="Error records are excluded from calculations to ensure accuracy"
            >
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborPageHeader;
