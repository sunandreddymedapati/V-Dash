import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';

const LaborTableHeader = ({ days }) => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-100">
        <TableHead className="min-w-48 font-semibold border-r bg-gray-100 sticky left-0 z-10">
          Day
        </TableHead>
        {days.map((day) => (
          <TableHead
            key={day.dayNumber}
            className="text-center font-semibold border-r min-w-20 whitespace-nowrap"
          >
            <div>{day.date}</div>
            <div className="text-xs text-gray-500">({day.dayName})</div>
          </TableHead>
        ))}
        <TableHead className="text-center font-semibold min-w-24">
          Total
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LaborTableHeader;
