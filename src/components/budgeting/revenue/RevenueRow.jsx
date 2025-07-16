import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';
import { MONTHS } from './RevenueConstants';
import { calculateRowTotal, formatNumber } from './RevenueUtils';

function RevenueRow({ 
  category, 
  revenueData, 
  onValueChange,
  bgColorClass = 'bg-blue-50/50 border-l border-blue-200'
}) {
  return (
    <TableRow className="hover:bg-gray-50/30">
      <TableCell className="sticky left-0 bg-white z-10 font-medium border-r border-gray-100">
        <div className="flex items-center space-x-2">
          <span>{category.label}</span>
          <button className="text-gray-400 hover:text-gray-600">
            <MessageCircle className="w-3 h-3" />
          </button>
        </div>
      </TableCell>
      {MONTHS.map((month) => (
        <TableCell key={month} className="p-1">
          <Input
            type="number"
            value={revenueData[category.id]?.[month] || ''}
            onChange={(e) => onValueChange(category.id, month, e.target.value)}
            className="text-right text-sm border-gray-200 focus:border-blue-300"
            placeholder="$0"
            min="0"
          />
        </TableCell>
      ))}
      <TableCell className={`text-right font-semibold ${bgColorClass}`}>
        {formatNumber(calculateRowTotal(category.id, revenueData))}
      </TableCell>
    </TableRow>
  );
}

export default RevenueRow;
