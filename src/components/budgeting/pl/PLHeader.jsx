import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PLHeader = ({ selectedHotel, onHotelChange }) => {
  const hotelOptions = [
    { value: 'grand-plaza', label: 'Grand Plaza Hotel – GPH001' },
    { value: 'metropolitan', label: 'Metropolitan Suites – MET002' },
    { value: 'oceanview', label: 'Oceanview Resort – OVR003' }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Profit & Loss Budget – 2025</h2>
        <p className="text-sm text-gray-600 mt-1">Enter monthly budgeted P&L figures by category</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <Select value={selectedHotel} onValueChange={onHotelChange}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select hotel..." />
          </SelectTrigger>
          <SelectContent>
            {hotelOptions.map((hotel) => (
              <SelectItem key={hotel.value} value={hotel.value}>
                {hotel.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PLHeader;
