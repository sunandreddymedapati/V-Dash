import React, { useState } from 'react';
import { Hotel, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROPERTIES_DATA } from '../../constants/properties';

const HotelSelector = ({ selectedHotel, setSelectedHotel }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
      >
        <Hotel className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {PROPERTIES_DATA.length}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-60 overflow-y-auto">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Hotels ({PROPERTIES_DATA.length})
            </p>
          </div>
          {PROPERTIES_DATA.map((property) => (
            <button
              key={property.name}
              onClick={() => {
                setSelectedHotel(property.name);
                setShowDropdown(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                property.name === selectedHotel ? "bg-yellow-50 text-yellow-700 font-medium" : "text-gray-700"
              )}
            >
              {property.name} ({property.rooms})
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelSelector;
