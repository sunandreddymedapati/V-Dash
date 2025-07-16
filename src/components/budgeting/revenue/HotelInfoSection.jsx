import React from 'react';
import { Input } from '@/components/ui/input';

const HotelInfoSection = ({ 
  totalRooms, 
  onTotalRoomsChange 
}) => {
  const handleRoomsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    onTotalRoomsChange(value);
  };

  return (
    <div className="bg-white p-4 border-b">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">HOTEL INFORMATION</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">How many total rooms in this Hotel (Available Rooms)?</span>
            <Input
              type="number"
              value={totalRooms}
              onChange={handleRoomsChange}
              className="w-20 text-center"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInfoSection;
