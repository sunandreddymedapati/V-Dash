import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MONTHS } from './constants';

const LaborReviewTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 h-8">
        <TableHead className="min-w-40 font-semibold border-r h-8 py-1">Item</TableHead>
        {MONTHS.map((month) => (
          <TableHead key={month} className="text-center font-semibold border-r min-w-24 h-8 py-1">
            {month}
          </TableHead>
        ))}
        <TableHead className="text-center font-semibold border-r min-w-24 h-8 py-1">TOTAL</TableHead>
        <TableHead className="text-center font-semibold min-w-32 h-8 py-1">$ per Room</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LaborReviewTableHeader;
