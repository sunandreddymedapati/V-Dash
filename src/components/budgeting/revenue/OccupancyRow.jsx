import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { MONTHS } from './RevenueConstants';
import { calculateOccupancyTotal, formatPercentage } from './RevenueUtils';

const OccupancyRow = ({ revenueData, onValueChange }) => {
  return (
    <TableRow className="bg-gray-50">
      <TableCell className="sticky left-0 bg-gray-50 z-10 font-medium">
        <div className="flex items-center space-x-2">
          <span>Occupancy</span>
          <button className="text-gray-400 hover:text-gray-600">
            <MessageCircle className="w-3 h-3" />
          </button>
        </div>
      </TableCell>
      {MONTHS.map((month) => (
        <TableCell key={month} className="p-1">
          <div className="relative">
            <Input
              type="number"
              value={revenueData['occupancy']?.[month] || ''}
              onChange={(e) => onValueChange('occupancy', month, e.target.value)}
              className="text-right text-sm border-gray-200 focus:border-blue-300 bg-gray-50 pr-6"
              placeholder="0.00"
              min="0"
              max="100"
              step="0.01"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">%</span>
          </div>
        </TableCell>
      ))}
      <TableCell className="text-right bg-gray-100 border-l border-gray-200 font-semibold">
        {formatPercentage(calculateOccupancyTotal(revenueData))}
      </TableCell>
    </TableRow>
  );
};

export default OccupancyRow;
