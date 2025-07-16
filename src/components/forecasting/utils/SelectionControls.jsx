import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Building2, Calendar } from 'lucide-react';
import { hotelOptions, yearOptions } from './tableUtils';

/**
 * @typedef {Object} SelectionControlsProps
 * @property {string} selectedHotel
 * @property {(hotel: string) => void} setSelectedHotel
 * @property {string} selectedYear
 * @property {(year: string) => void} setSelectedYear
 */

/**
 * Hotel and Year selection component.
 * @param {SelectionControlsProps} props
 */
export function HotelYearSelection({ 
  selectedHotel, 
  setSelectedHotel, 
  selectedYear, 
  setSelectedYear 
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-gray-500" />
        <Select value={selectedHotel} onValueChange={setSelectedHotel}>
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

      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Year..." />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
